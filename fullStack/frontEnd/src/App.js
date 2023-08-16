import { Header } from './components/header/Header';
import { HomePage } from './components/content-home-page/HomePage';
import { Footer } from './components/footer/footer';
import { Autorization } from './components/autorization/Autorization'

import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'

import './index.css'

function App() {
  return (
    <>
      <Header />
      <Autorization />
      {/* <HomePage />
      <Footer/> */}
    </>
  );
}

export default App;
