import React from 'react'
import { Link } from '@reach/router'

const ArticleCard = ({ article }) =>
  <div className='AdminCardFullWidth'>
    <div className='currentText' style={{ width: '40vw' }}>{article.title}</div>
    <div className='EditButtonsContainer'>
      <h6 style={{ marginRight: '50px' }}>{article.createdAt}</h6>
      <Link to={String(article.id)}>
        <button>E</button>
      </Link>
      <button>S</button>
    </div>
  </div>

const AdminArticles = ({ articles }) => {
  const projetsArticlesList = articles
  .filter(article => article.section === 'projets')
  .map(article => <ArticleCard key={article.id} article={article} />)

  const labArticlesList = articles
  .filter(article => article.section === 'lab')
  .map(article => <ArticleCard key={article.id} article={article} />)

  return (
    <div className='GlobalContainer'>
      <Link to='new'>
        <div className='ButtonCreateElement'>Créer un nouvel article</div>
      </Link>
      <div className='AdminTitles yellow'>Articles de la section Projets :</div>
      {projetsArticlesList}
      <br/>
      <div className='AdminTitles yellow'>Articles de la section LabRusch :</div>
      {labArticlesList}
    </div>
  )
}

export default AdminArticles
