import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';

export const FeaturedNews = ({title='',description='',link,image_url='/spinner.gif'}) => {
  const featuredNews = useRef(null);

  useEffect(()=>{
    if(title)
    {
      featuredNews.current.style.backgroundImage = `
      linear-gradient(to right, rgb(0 0 0 /.95) 25%, rgb(0 0 0 /.5) 50%,  transparent),
          url(${image_url})
      `;
      featuredNews.current.style.backgroundSize= 'cover';
      featuredNews.current.style.backgroundPosition= 'right, right center'
    }
    else 
    {
      featuredNews.current.style.backgroundImage = `
      url(${image_url}),url(/img-blur.jpg)
      `;
      featuredNews.current.style.backgroundSize= '10%,cover';
      featuredNews.current.style.backgroundPosition= 'center';
    }
  })
  return (
    <div ref={featuredNews} className="featured-news">
      <div className="featured-news__grid container">
        <div className="featured-news__metadata">
        <a href={link} target='_blank' rel='noreferrer'><h1 className="featured-news__title">{title}</h1></a>
          <p className="featured-news__description"> {description}</p>
        </div>
        {/* <div className="featured-news__img-container">
          <img className="featured-news__img" src="" alt="feature-news" />
        </div> */}
      </div>
    </div>
  )
}


FeaturedNews.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  link: PropTypes.string,
  image_url: PropTypes.string
}
