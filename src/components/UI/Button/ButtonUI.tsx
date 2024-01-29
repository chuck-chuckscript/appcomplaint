import { FC, ReactElement } from "react"
import buttonStyle from './button.module.scss'
type ButtonProps = {
    text?: string | ReactElement
    funcHandler?: Function | null 
}


export const ButtonUI : FC<ButtonProps> = ({text, funcHandler}) => {
  return (
    <button className={buttonStyle.ui} onClick={() => funcHandler ? funcHandler() : null}>{text ? text : ''}</button>
  )
}
