import { useLang } from "../../../hooks";
import { NewsCard } from "./NewsCard"
import PropTypes from 'prop-types';

export const RecentNews = ({news=[]}) => {
  const Lang = useLang();
  return (
    <section className="recent-news">
        <h2 className="recent-news__heading">{Lang('Recent news')}</h2>
        <div className="recent-news__content">
          {
            news.map((n,index)=><NewsCard key={index} {...n}/>)
          }
          </div>
    </section>
  )
}

RecentNews.propTypes = {
  news: PropTypes.array.isRequired
}
