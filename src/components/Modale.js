import React from 'react'
import './css/Modale.css'
import { Link, navigate } from '@reach/router'
import store from '../store.js'
import Partenaire from './Partenaire.js'
import ArticleThumbnail from './ArticleThumbnail.js'
import RedirectingBlockToAllArticles from './RedirectingBlockToAllArticles.js'
import ReactHtmlParser from 'react-html-parser'

const generateValidUrl = value => {
  if (value.includes('&')) {
    const splitUrl = value.split('&').slice()
    const validUrl = splitUrl[0].replace('watch?v=', 'embed/')
    return validUrl
  } else if (value.includes('watch?v=')) {
    return value.replace('watch?v=', 'embed/')
  } else if (value.includes('youtu.be')) {
    return value.replace('youtu.be', 'youtube.com/embed')
  } else if (!value.includes('youtube')) {
    return `https://youtube.com/embed/${value}`
  }
}

const toHTML = {
  h2: ({ value }) => <h4>{value}</h4>,
  p: ({ value }) => (
    <div style={{ alignSelf: 'flex-start' }}>{ReactHtmlParser(value)}</div>
  ),
  blockquote: ({ value }) => <blockquote className="quote">{value}</blockquote>,
  caption: ({ value }) => <p className="caption">{value}</p>,
  abstract: ({ value }) => <p className="abstract">{value}</p>,
  imgs: ({ value }) =>
    value.split(',').map((url, i) => <img key={i} src={url} alt="" />),
  video: ({ value }) =>
    value
      .split(',')
      .map((videoValue, i) => (
        <iframe
          title={`video-${i}`}
          key={i}
          width="425"
          height="344"
          src={generateValidUrl(videoValue)}
          allowfullscreen="allowfullscreen"
          alt=""
          frameborder="0"
        />
      ))
}

const Element = ({ element }) => toHTML[element.type](element)

const Modale = ({ article }) => {
  let treatedContent = ''

  if (typeof article.content === 'string') {
    treatedContent = JSON.parse(article.content)
  } else {
    treatedContent = article.content
  }

  const content = treatedContent.map((element, i) => (
    <Element key={i} element={element} />
  ))

  const parentContextPath = window.location.pathname.replace(/\/\d+$/, '')

  document.addEventListener('keydown', function(e) {
    let keyCode = e.keyCode
    if (keyCode === 27) {
      navigate(parentContextPath)
    }
  })

  const state = store.getState()

  const articles = state.articles.allArticles

  const getSection = parentContextPath.slice(1, parentContextPath.length)

  const articleThumbnails = articles
    .filter(article => article.isDraft === '0')
    .filter(article => article.hasImage === '0')
    .filter(article => article.section === getSection)
    .slice(0, 2)
    .map((article, index) => (
      <ArticleThumbnail
        key={article.id}
        article={article}
        index={index}
        className="ArticleThumbnailClassic"
      />
    ))

  const getArticlePartners = article.partners

  const getPartners = array =>
    state.partners.allPartners.filter(
      el => el.name === array.find(elem => elem === el.name)
    )

  const partners = getPartners(getArticlePartners).map(partner => (
    <Partenaire partner={partner} />
  ))

  const articlesSuggestions = (
    <div className="ArticlesBlock">
      <div className="articleSuggestion">
        <h4>Ceci pourrait aussi vous intéresser :</h4>
      </div>
      {articleThumbnails}
      <RedirectingBlockToAllArticles section={getSection} />
    </div>
  )

  const projectLink = (
    <a href={article.projectLink} target="_blank">
      <p className="smallLink">Lien du projet</p>
    </a>
  )

  return (
    <div id="scrollToTop">
      <Link className="closeModaleBtn" to={parentContextPath}>
        <div className="closeModaleBtn">✕</div>
      </Link>
      <div
        className="ModalePic"
        style={{
          background: `center / cover no-repeat url(${article.headerImage})`
        }}
      >
        <div className="ModaleHeader FilterBlack">
          <h2 className="green">{article.title}</h2>
          <h3 style={{ marginTop: '1.15rem' }}>{article.shortDescription}</h3>
          {article.projectLink === '' ? '' : projectLink}
        </div>
      </div>
      <div className="contentBlock">
        <div className="recapBlockFixed">
          <h6 className="recapBlockTitle">{article.title}</h6>
          {article.section === 'lab' ? <h6>{article.shortDescription}</h6> : ''}
          {article.client.length === 0 ? (
            ''
          ) : (
            <h6 style={{ marginTop: '1rem' }}>
              <u>Client</u> : {article.client}
            </h6>
          )}
          <h6 style={{ marginTop: '1rem' }}>
            <u>Date</u> : {article.date}
          </h6>
          {article.place.length === 0 ? (
            ''
          ) : (
            <h6 style={{ marginTop: '1rem' }}>
              <u>Lieu</u> : {article.place}
            </h6>
          )}
          {article.type.length === 0 ? (
            ''
          ) : (
            <h6 style={{ marginTop: '1rem' }}>
              <u>Type</u> : {article.type}
            </h6>
          )}
        </div>
        <div className="content">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            {content}
          </div>
          {article.partners.length === 0 ? (
            ''
          ) : (
            <h4>Nos partenaires sur ce projet :</h4>
          )}
          {!partners ? (
            ''
          ) : (
            <div className="PartenairesContainer">{partners}</div>
          )}
          {window.location.pathname.includes('admin')
            ? ''
            : articlesSuggestions}
        </div>
      </div>
    </div>
  )
}

export default Modale
