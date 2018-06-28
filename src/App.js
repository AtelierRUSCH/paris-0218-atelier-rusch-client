import React, { Component } from 'react'
import { Router } from '@reach/router'

import Nav from './components/Nav.js'
import Homepage from './components/Homepage.js'
import Atelier from './components/Atelier.js'
import Contact from './components/Contact.js'
import LabRusch from './components/LabRusch.js'
import Projets from './components/Projets.js'
import './App.css'

import store from './store'
import { loadArticles, loadFilters } from './actions'

class App extends Component {
  componentDidMount () {
    this.unsubscribe = store.subscribe(() => this.forceUpdate())

    fetch('http://localhost:3456/articles')
      .then(res => res.json())
      .then(articles => store.dispatch(loadArticles(articles)))

    fetch('http://localhost:3456/filters')
      .then(res => res.json())
      .then(filters => store.dispatch(loadFilters(filters)))
  }

  componentWillUnmount () {
    this.unsubscribe()
  }

  render () {
    return (
      <div className="App">
        <Nav />
        <div className="spacer"></div>
        <Router>
          <Homepage path='/' />
          <Homepage path='/:articleId' />
          <Atelier path='/atelier' />
          <Projets path='/projets' />
          <Projets path='/projets/:articleId' />
          <LabRusch path='/lab' />
          <LabRusch path='/lab/:articleId' />
          <Contact path='/contact' />
        </Router>
      </div>
    )
  }
}

export default App
