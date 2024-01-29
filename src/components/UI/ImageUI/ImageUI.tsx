import { FC } from 'react'
import { BsXLg } from 'react-icons/bs'
import { ButtonUI } from '../Button/ButtonUI'
import imageUi from './imageUI.module.scss'
type ImageUIProps = {
    sourceImage?: string
    closeFunc?: Function | null
}
export const ImageUI : FC<ImageUIProps> = ({sourceImage, closeFunc}) => {
  return (
    <div className={imageUi.ui}>
        <ButtonUI funcHandler={closeFunc} text={<BsXLg/>}></ButtonUI>
        <img src={sourceImage}/> 
    </div>
  )
}
