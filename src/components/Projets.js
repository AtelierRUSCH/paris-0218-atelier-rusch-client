import React from 'react'
import ArticleThumbnail from './ArticleThumbnail.js'
import SectionTitleBlock from './SectionTitleBlock.js'
import FiltersSection from './FiltersSection.js'

const Projets = (props) => {

  const { articles } = props.articles

  const articleThumbnails = articles
    .filter(article => article.section === 'Projet')
    .map(article => <ArticleThumbnail key={article.id} article={article} />)

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

export default Projets
