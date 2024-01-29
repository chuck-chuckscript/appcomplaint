import {FC} from 'react'
import { BsCheck2 } from "react-icons/bs";
import styleBox from './checkbox.module.scss'
type CheckBoxProps = {
    checked: boolean
    funcChangeChecked: Function
}

export const CheckBox : FC<CheckBoxProps> = ({checked, funcChangeChecked}) => {
  return (
    <div className={checked ? [styleBox.uiCheckbox, styleBox.checked].join(' '):styleBox.uiCheckbox} onClick={(e) => funcChangeChecked(e)}>
        {checked ? <BsCheck2/> : null}
    </div>
  )
}
