import React, { Component } from 'react'
import { Router } from '@reach/router'
import ArticleForm from './ArticleForm.js'
import AdminFiltres from './AdminFiltres.js'
import AdminNav from './AdminNav.js'
import AdminArticles from './AdminArticles.js'
import { AdminNewArticle, AdminEditArticle } from './AdminArticle.js'
import { AdminNewFiltre, AdminEditFiltre } from './AdminFiltre.js'
import AdminPartenaires from './AdminPartenaires.js'
import AdminEquipe from './AdminEquipe.js'


const AdminHome = () => <div>ADMIN</div>

class Admin extends Component {
  state = {
    articles: [],
    filtres: [],
    equipe: [],
    partenaires: []
  }

  componentDidMount () {
    console.log('admin mounted')
    fetch('http://localhost:3456/articles')
      .then(res => res.json())
      .then(articles => console.log('articles fetched') || this.setState({ articles: articles }))

    fetch('http://localhost:3456/filters')
      .then(res => res.json())
      .then(filtres => this.setState({ filtres: filtres}))

    fetch('http://localhost:3456/equipe')
      .then(res => res.json())
      .then(equipe => this.setState({ equipe: equipe }))
  }

  render () {
    console.log('admin render')

    return (
      <div className="App">
        <AdminNav />
        <div className="spacer"></div>
        <Router>
          <AdminHome path='/' />
          <AdminArticles path='articles' articles={this.state.articles} />
          <AdminNewArticle path='articles/new' />
          <AdminEditArticle path='articles/:articleId' articles={this.state.articles} />
          <AdminFiltres path='filtres' filtres={this.state.filtres}/>
          <AdminEditFiltre path='filtres/:filtreId' filtres={this.state.filtres} />
          <AdminNewFiltre path='filtres/new' />
        </Router>
      </div>
    )
  }
}

export default Admin