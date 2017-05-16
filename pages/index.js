import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import React, {Component} from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import {deepOrange500} from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'

// Make sure react-tap-event-plugin only gets injected once
// Needed for material-ui
if (!process.tapEventInjected) {
  injectTapEventPlugin()
  process.tapEventInjected = true
}

const muiTheme = {
  palette: {
    accent1Color: deepOrange500
  }
}

const Index = ({userAgent, movies}) => (
      <MuiThemeProvider muiTheme={getMuiTheme({userAgent, ...muiTheme})}>
          <Layout>
            <h1>Batman Movies</h1>
              {movies.map((movie) => (
                <div key={movie.imdbID} style={{margin: 10}}>
                  <Link as={`/p/${movie.imdbID}`} href={`/post?id=${movie.imdbID}`} >
                    <RaisedButton label={movie.Title} primary={true} />
                  </Link>
                </div>
              ))}
          </Layout>
      </MuiThemeProvider>
)

Index.getInitialProps = async function({ req }) {
    // Ensures material-ui renders the correct css prefixes server-side
    let userAgent
    if (process.browser) {
      userAgent = navigator.userAgent
    } else {
      userAgent = req.headers['user-agent']
    }

    const res = await fetch('http://www.omdbapi.com/?s=batman')
    const data = await res.json()

    return { 
      userAgent,
      movies: data.Search
     }
}

export default Index
