import PropTypes from 'prop-types';
import { fromHtmlEntities } from '../../../helpers/htmlEntities';

export const NewsCard = ({ title, description='', image_url,link }) => {
  return (
    <article  className="news-card">
      <a target="_blank" rel='noreferrer' href={link}>
        <figure className="news-card__header">
          <img src={image_url} className="news-card__img" alt="" />
        </figure>
        <div className="news-card__body">
          <h3>{fromHtmlEntities(title)}</h3>
          <p className='news-card__content'>{description} </p>
        </div>
      </a>

    </article>
  )
}

NewsCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  image_url: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,

}

