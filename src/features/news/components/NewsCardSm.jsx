import { fromHtmlEntities } from "../../../helpers/htmlEntities"

import PropTypes from 'prop-types';
export const NewsCardSm = ({title,source,link}) => {
  return (
  <article className="news-card-sm">
   <h3 className="news-card-sm__heading"><a target="_blank" rel="noreferrer" href={link}>{fromHtmlEntities(title)}</a> </h3>
      <div className="news-card-sm__metadata">
        <cite className="news-card-sm__author">{source}</cite>
      </div>
  </article>
  )
}


NewsCardSm.propTypes = {
  title: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
}