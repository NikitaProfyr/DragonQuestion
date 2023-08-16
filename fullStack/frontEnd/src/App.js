import { Header } from './components/header/Header';
import { HomePage } from './components/content-home-page/HomePage';
import { Footer } from './components/footer/footer';
import { Autorization } from './components/autorization/Autorization'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from 'react-router-dom';

import './index.css';

function App() {
  return (
    <>
      <Router>
      <Header />
       
      <Routes>
        <Route path='' element={<><HomePage /><Footer/></>} /> 
        <Route path='/authorization' element={<Autorization />} />
      </Routes>
       
      
    </Router>
    </>
  );
}

export default App;