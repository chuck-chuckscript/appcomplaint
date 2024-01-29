import React, { useContext, useEffect, useState } from 'react'
import { InputFileUI } from '../UI/Input/InputFileUI'
import modalStyle from './modals.module.scss'
import { ButtonUI } from '../UI/Button/ButtonUI'
import { Context } from '../..'
import { observer } from 'mobx-react-lite'
import { BsXLg } from 'react-icons/bs'
import ApiService from '../../services/ApiService'
import { ImageUI } from '../UI/ImageUI/ImageUI'
export const ModalChangeStatus = observer(() => {
    const {store} = useContext(Context);
    const [status, setStatus] = useState(1);
    const [file, setFile] = useState<any>();
    const [sourceImage, setSourseImage] = useState('');
    const uploadFile = async (file: any) => {
        if(file){
          try{
            let res = await ApiService.uploadFile(file);
            const src = res;
  
  
            setSourseImage(src);
          }
          catch(e){
            console.log(e);
          }
        }
        
    }
    const changeFile = async () => {
        try{
          let response = await ApiService.deleteFile(file);
    
          if(response.status !== 200){
            throw new Error(response.message);
          }
        
          setSourseImage('');
        }
        catch(e){
          console.log(e);
        }
      }
    useEffect(() => {
      switch(store.report_status){
          case 'Новая':
              setStatus(3);
              break;
          case 'Отклонена':
              setStatus(2);
              break;
          case 'Решена': 
              setStatus(1);
              break;
      }
    }, [])
    const changeReport = async () => {
        try{
          
          let response = await ApiService.changeStatus(store.report_id, status, file);
          if(response.status !== 200){
            throw new Error(response.message);
          }
          store.showError(response.message, 'access');
          store.changeReload();
          store.closeReportChangeForm();
        }
        catch(e){
    
          let err = e as Error
          store.showError(err.message, 'error');
        }
      }
    
  return (
    <div className={modalStyle.statusChange} onClick={() => store.closeReportChangeForm()}>
        
        <form onSubmit={(e) => e.preventDefault()} onClick={(e) => e.stopPropagation()}>
        <button onClick={() => store.closeReportChangeForm()} className={modalStyle.close}><BsXLg/></button>
            {
                status === 1 
                ? 
                <>
                <h3>Фотодоказательство решения проблемы</h3>
                {sourceImage ? <ImageUI sourceImage={sourceImage} closeFunc={changeFile}/>: <InputFileUI funcChange={async (e: any) => {
                    setFile(e.target.files[0])
                    uploadFile(e.target.files[0]);
                    
                    }}/> }
                </>
                : 
                null
            }
            <select value={status}  onChange={(e : any) => setStatus(Number(e.target.value))}>
                <option value={1}>Решена</option>
                <option value={2}>Отклонена</option>
                <option value={3}>Новая</option>
            </select>
            <ButtonUI funcHandler={changeReport} text={'Изменить статус жалобы'}/>
        </form>
    </div>
  )
})
