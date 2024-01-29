import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Store from './store/store';
import { Cabinet } from './components/cabinet/Cabinet';
import { RouterApp } from './components/RouterApp';



const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);


const store = new Store();

interface State{
  store : Store
}

export const Context = createContext<State>({store})

root.render(
  <Context.Provider value={{store}}>


  <React.Fragment>

    <RouterApp/>
   
  </React.Fragment>
  </Context.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

