import React from 'react';
import Router from './Router';
import './assets/style.css'
import './assets/reset.css'
import {Header} from './components/Header'

const App = () => {
  return (
    // <> means instead of <React.Fragment>
    <>
      <Header />
      <main className='c-main'>
        <Router />
      </main>
    </>
  )
}

export default App;