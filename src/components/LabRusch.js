import React from 'react'
import ArticleThumbnail from './ArticleThumbnail.js'
import FiltersSection from './FiltersSection.js'
import SectionTitleBlock from './SectionTitleBlock.js'

const LabRusch = (props) => {

  const { articles } = props.articles

  console.log(props.filters)

  const articleThumbnails = articles
    .filter(article => article.section === 'Lab')
    .map((article, index) => <ArticleThumbnail key={article.id} article={article} index={index} />)

  return (
    <div>

      <FiltersSection data={props} />

      <div className="ArticlesBlock">
        <SectionTitleBlock />
        {articleThumbnails}
      </div>

    </div>
  )
}

export default LabRusch
