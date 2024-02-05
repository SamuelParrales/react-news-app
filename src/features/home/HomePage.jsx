import { useDocumentTitle } from "../../hooks";
import { Layout } from "../../layouts/Layout"
import { Aside } from "../../layouts/components";
import { FeaturedNews, RecentNews } from "../news/components"

import { useSelector } from "react-redux";



export const HomePage = () => {


  useDocumentTitle('React News App')


  const { news } = useSelector(state => state.news)


  return (
    <Layout>

      <main>      
        {/* FeatureNews es el componente utilizado para la noticia principal */}
        <FeaturedNews
          {...news[0]}
        />
      </main>

      <div className="home-container container">

        {/* Son las noticias mas recientes */}
        <RecentNews news={news.slice(1, 10)} />

        {/* El aside muestra las noticias mas destacadas */}
        <Aside news={news.slice(10, 15)} />
      </div>


    </Layout>
  )
}
