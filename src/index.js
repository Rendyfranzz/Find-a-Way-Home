import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import App2 from './App2';
import App3 from './App3';
import './index.css';
import Menu from './page/Menu';
import {BrowserRouter as Router ,Route,Routes} from 'react-router-dom'
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path='/' element={<Menu/>}/>
      <Route path='/App' element={<App/>}/>
      <Route path='/App2' element={<App2/>}/>
      <Route path='/App3' element={<App3/>}/>
    </Routes>
  </Router>,
  document.getElementById('root')
);

reportWebVitals();
