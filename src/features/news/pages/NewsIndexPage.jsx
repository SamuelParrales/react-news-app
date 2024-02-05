import { useDispatch, useSelector } from "react-redux"
import { Layout } from "../../../layouts/Layout"
import { Aside } from "../../../layouts/components"
import { useNavigate, useSearchParams } from "react-router-dom"
import { memo, useEffect, useState } from "react"
import { useQuery } from "react-query"
import { newsApi } from "../../../api/newsApi"
import { NewsCardLg } from "../components/NewsCardLg"
import { setNewsSearch, setSearchText } from "../../../store/aside/newsSlice"
import { useDocumentTitle, useLang,useRequestCounter } from "../../../hooks"
import { WithoutResults } from "../../../components/WithoutResults"
import { Icon } from "@iconify/react"

const newsParams = new URLSearchParams();
newsParams.set('apikey', import.meta.env.VITE_API_KEY_NEWS);
newsParams.set('image', 1);

export const NewsIndexPage = memo(function NewsIndexPage() {

  useDocumentTitle('news')
  const countRequest = useRequestCounter();
  const [hasLoaded, setHasLoaded] = useState(false);
  const { news, search = [] } = useSelector(state => state.news)
  const { country, lang } = useSelector(state => state.session);
  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get('category');
  const currentQ = searchParams.get('q');
  const Lang = useLang();
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const { refetch: refetchSerch } = useQuery({
    queryKey: ['newsSearch'],
    queryFn: async () => {


      newsParams.set('language', lang);
      newsParams.set('country', country);
      try {
        const { data } = await newsApi.get(`news?${newsParams.toString()}`)

        dispatch(setNewsSearch({ search: data.results }))

      } catch (error) {
        console.error(error)
      }

    },
    enabled: news.length > 0,
  }
  )
  //Controla las peticiones cuandos los searchs params cambian
  useEffect(() => {

    const category = searchParams.get('category')
    const q = searchParams.get('q')
    let makeRequest = false;

    if (category != newsParams.get('category')) {
      makeRequest = true;
      if (category) {
        newsParams.set('category', category)
      }
      else
        newsParams.delete('category');
    }

    if (q != newsParams.get('q')) {
      makeRequest = true;
      if (q) {
        newsParams.set('q', q)
      }
      else
        newsParams.delete('q');
    }

    if (makeRequest && news.length > 0) {
      refetchSerch();
    }


  }, [searchParams,news,refetchSerch])
   //Fin de Controla las peticiones cuandos los searchs params cambian

  useEffect(()=>{     //En caso de que el idioma o pais cambie vuelve a realizar la petición
    refetchSerch();
  },[country,lang,refetchSerch])

  useEffect(()=>{ //Se ejetcuta una sola vez, para colocar el texto en el buscador
    dispatch(setSearchText({searchText: currentQ || ''}))
  },[dispatch,currentQ])


  useEffect(()=>{  // Para indicar que las peticiones han terminado
    if(countRequest==0)
      setHasLoaded(true)
    else
      setHasLoaded(false)
  },[countRequest])


  // Functiones

  const onClearCategory = ()=>{
    searchParams.delete('category');
    navigate({
      pathname: '/news',
      search: `?${searchParams.toString()}`,
    })
  }
  return (
    <Layout>
      <div className="global-container container">

        <main className="">
          {
            currentCategory 
            ? 
            <div>
              <h2 className="d-inline-block">{Lang(currentCategory[0].toLocaleUpperCase()+currentCategory.slice(1))}</h2>
              <button onClick={onClearCategory} className="btn-transparent"><Icon icon='material-symbols:close'/></button>
            </div>
            : <h2>{Lang('All categories')}.</h2>
          } 
          <div className="pt-2 be-md-1 pe-md-2">
            {
              search.length == 0 && hasLoaded
              ?  <WithoutResults /> 
              : search.map((news, index) => <NewsCardLg key={index} {...news} />)
            }
          </div>

        </main>

        <Aside news={news.slice(10, 15)} />

      </div>

    </Layout>
  )
})
