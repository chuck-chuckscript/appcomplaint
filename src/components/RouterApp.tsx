import { FC, useContext, useEffect } from 'react'
import { BrowserRouter, Route, Routes, redirect } from 'react-router-dom'
import App from '../App'
import { Cabinet } from './cabinet/Cabinet'
import { Context } from '..'
import { observer } from 'mobx-react-lite'
import { AdminPanel } from './admin/AdminPanel'
import { ReportPage } from './ReportPage/ReportPage'


export const RouterApp : FC = observer(() => {
  const {store} = useContext(Context);

  useEffect(() => {
    
    store.checkAuth();
    // console.log(store.auth)
  }, [])  

  return (
    <BrowserRouter>
      <Routes>
      
        {store.auth ? <>
            {store.getRoot === 'admin' ?  <Route element={<AdminPanel/>} path={'/'}/> : <Route element={<Cabinet/>} path={'/'}/> } 
            <Route element={<App/>} path={'/home'}/>
            
        </>: 
        <Route element={<App/>} path={'/'}/>
        
        }
        <Route element={<ReportPage/>} path={'/report/:id'}/>
      </Routes>
    </BrowserRouter>
  )
})
