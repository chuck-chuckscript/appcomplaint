import React, { FC } from 'react'
import { NavigationMenu } from './navigation/NavigationMenu'
import { Link } from 'react-router-dom'
type HeaderProp = {
  relative?: boolean
}
const Header : FC<HeaderProp> = ({relative}) => {
  return (
    <header className={relative ? 'header relative' : 'header absolute'}>
          <Link to={localStorage.getItem('uuid') ? '/home' : '/'}>ЖалобаОнлайн</Link>
          <NavigationMenu/>
          
    </header>
  )
}
export default Header;