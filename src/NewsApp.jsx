import { useDispatch, useSelector } from "react-redux";
import { setCountry, setLat, setLon } from "./store/global/sessionSlice";
import { useIsFetching, useIsMutating, useQuery } from "react-query";
import { weatherApi } from "./api/weatherApi";
import { setData } from "./store/aside";
import { setNews } from "./store/aside/newsSlice";
import { newsApi } from "./api/newsApi";
import { useEffect } from "react";
import { Loader } from "./components/Loader";
import { AppRoute } from "./routes/AppRoute";
import { Modal } from "./components/Modal";
import { useLang } from "./hooks";


const params = new URLSearchParams();
params.set('units', 'metric');
params.set('appid', import.meta.env.VITE_API_KEY_WEATHER)


const newsParams = new URLSearchParams();
newsParams.set('apikey', import.meta.env.VITE_API_KEY_NEWS);
newsParams.set('image', 1);



//*************Start component */
function NewsApp() {
  const Lang = useLang();
  const dispatch = useDispatch();
  const { country, lang, lat } = useSelector(state => state.session);

  newsParams.set('language', lang);
  newsParams.set('country', country);

  useEffect(() => {
    if (navigator.geolocation) {

      navigator.permissions
        .query({ name: "geolocation" })
        .then((permissionStatus) => {
          console.log(`geolocation permission state is ${permissionStatus.state}`);

          navigator.geolocation.getCurrentPosition(({ coords }) => {
            dispatch(setLat(coords.latitude));
            dispatch(setLon(coords.longitude));
            params.set('lat', coords.latitude);
            params.set('lon', coords.longitude);
          }, () => {
            console.error("No se pudo obtener las coordenadas")
          });


          permissionStatus.onchange = () => {

            navigator.geolocation.getCurrentPosition(({ coords }) => {
              dispatch(setLat(coords.latitude));
              dispatch(setLon(coords.longitude));
              params.set('lat', coords.latitude);
              params.set('lon', coords.longitude);
            }, () => {
              console.error("No se pudo obtener las coordenadas")
            });


            console.log(
              `geolocation permission state has changed to ${permissionStatus.state}`,
            );

          };
        });

    }
  }, [dispatch])

  //**************Query weather
  useQuery({
    queryKey: ['weather'],
    queryFn: () => (
      Promise.all([
        weatherApi.get(`weather?${params.toString()}`).then(r => r.data),
        weatherApi.get(`forecast?${params.toString()}`).then(r => r.data),
      ])
    ),
    onSuccess: (data) => {
      const [today, { list: weathers, city }] = data;


      if (localStorage.getItem('country')) {
        dispatch(setCountry(localStorage.getItem('country')))
      }
      else {
        dispatch(setCountry(city.country.toLocaleLowerCase()))
      }
      weathers.unshift(today);

      dispatch(setData({ city, weathers }));
    },
    enabled: !!lat,

  })
  //**************End Query weather

  //**************Query news
  const { refetch: refetchNews } = useQuery({
    queryKey: ['news'],
    queryFn: async () => {

      try {
        const res1 = await newsApi.get(`news?${newsParams.toString()}`)
        const res2 = await newsApi.get(`news?${newsParams.toString()}&page=${res1.data.nextPage}`)
        const data = [...res1.data.results, ...res2.data.results]
        dispatch(setNews({ news: data }))
      } catch (error) {

        dispatch(setNews({ news: [] }))
      }



    },
    enabled: false,
  });

  //End Query news
  useEffect(() => {
    if (lang && country) {

      refetchNews()
    }
  }, [lang, country, refetchNews])


  const countRequest = useIsFetching() + useIsMutating();

  return (
    <>
      {/* Loader */}
      {(countRequest || !lat) && <Loader />}
      <AppRoute />
      <Modal
            className="modal-setting"
            title={Lang('Permission')}
            visible={true}
            zIndex={100}
            unclosable = {true}
        >
            <div className="modal-setting__body">
              <p>{Lang('Please, allow me to access your geolocation')}</p>
            </div>

        </Modal>
    </>
  )
}

export default NewsApp;
