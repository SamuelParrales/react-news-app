
import PropTypes from 'prop-types';

export const NewsCardLg = ({ title, description, image_url, link }) => {
  return (

    <div className="news-card-lg">
      <figure className="news-card-lg__img-container">
        <img
          className="news-card-lg__img"
          src={image_url}
          alt=""
        />
      </figure>
      <div className="news-card-lg__body">
        <h3 ><a className="news-card-lg__title" href={link} target="_blank" rel="noreferrer">{title}</a></h3>
        <div className="news-card-lg__content">
          <p>{description}</p>
        </div>
      </div>
      
    </div>
  )
}


NewsCardLg.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  image_url: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,

}

