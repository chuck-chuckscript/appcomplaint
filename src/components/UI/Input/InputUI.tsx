import { FC } from 'react'
import inputStyle from './input.module.scss'
type InputUIProps = {
  type?: string
  placeholder?: string
  value: string
  funcChange : Function | null
}
export const InputUI : FC<InputUIProps> = ({type, value, funcChange, placeholder}) => {

  

  return (
    <input type={type ? type : 'text'} placeholder={placeholder ? placeholder : ''} className={inputStyle.ui} value={value} onChange={(e) => funcChange ? funcChange(e) : null}/>
  )
}
