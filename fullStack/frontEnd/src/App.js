import { Header } from './components/header/Header';
import { HomePage } from './components/content-home-page/HomePage';
import { Footer } from './components/footer/footer';
import { Autorization } from './components/autorization/Autorization'
import { Registration } from './components/registration/Registration';
import { Basicheader } from './components/basic-header/Basic-header';
import { UserSettings } from './components/user-settings/UserSettings';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from 'react-router-dom';

import './index.css';

export var BaseUrl = 'https://reqres.in/'


function App() {
  return (
    <>
      <Router>
      <Basicheader />
       
      <Routes>
        <Route path='' element={<><UserSettings /><Footer/></>} /> 
        <Route path='/authorization' element={<Autorization />} />
        <Route path='/registration' element={<Registration />} />
        

      </Routes>
       
      
    </Router>
    </>
  );
}

export default App;