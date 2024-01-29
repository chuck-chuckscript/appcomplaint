import { FC, useContext, useEffect, useState } from 'react'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { ButtonUI } from '../../UI/Button/ButtonUI'
import { Context } from '../../..'
import { observer } from 'mobx-react-lite'



export const NavigationMenu : FC = observer(() =>  {
  const [title, setTitle] = useState("");
  const navigator = useNavigate();
  useEffect(() => {
    setTitle(document.title);
    console.log(document.title)
    return () => setTitle("");
  }, [])

  const {store} = useContext(Context);


  return (
    <nav>
      
        {
          title == 'Главная' || title == "Жалоба" ? 
          <>
            {localStorage.getItem('root') && localStorage.getItem('root') === 'user' ? <Link to={'/'}>Личный кабинет</Link> : null}
            {localStorage.getItem('root') && localStorage.getItem('root') === 'admin' ? <Link to={'/'}>Панель администратора</Link> : null}
          </>
          : null
        }
        
        
        {store.auth ? <ButtonUI text='Выйти' funcHandler={() => {
          localStorage.removeItem('uuid');
          localStorage.removeItem('root');
          store.setRoot = ''
          store.setAuth(false)
          navigator('/')
        }}/> :  <ButtonUI text='Войти' funcHandler={() => store.openAuth()}/>}
        
    </nav>
  )
})
