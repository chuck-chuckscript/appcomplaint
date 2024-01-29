import React, { FC } from 'react'
import inputStyle from './input.module.scss'
import { BsFillFileEarmarkImageFill } from "react-icons/bs";
type InputFileUIProps = {

  funcChange: Function
}
export const InputFileUI : FC<InputFileUIProps> = ({funcChange}) => {
  return (
    <div className={inputStyle.file}>
        <BsFillFileEarmarkImageFill size={50}/>
        <input type='file' accept='image/png, image/jpeg, image/bmp, image/jpg' title='Прикрепить файл ' onChange={(e: any) => {
          if(e.target.files[0]){
            funcChange(e);
          }
        }}/>
    </div>
    
  )
}
