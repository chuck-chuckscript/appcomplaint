import React, { useContext, useEffect, useMemo, useState } from 'react'
import { InputUI } from '../UI/Input/InputUI'
import modalStyle from './modals.module.scss'
import { ButtonUI } from '../UI/Button/ButtonUI'
import { InputFileUI } from '../UI/Input/InputFileUI'
import { BsXLg } from 'react-icons/bs'
import { observer } from 'mobx-react-lite'
import { Context } from '../..'
import ApiService from '../../services/ApiService'
import { ImageUI } from '../UI/ImageUI/ImageUI'
export const ModalReport = observer(() => {
  const {store} = useContext(Context);
  const [file, setFile] = useState<any>();
  const [categories, setCategories] = useState<any>([]);
  const [sourceImage, setSourseImage] = useState('');
  const [reportForm, setReportForm] = useState({
    title: '',
    details: '',
    category: 0,
    user: ''
  })
  const getCat = async () => {
    try{
      let {body} = await ApiService.categories();
      setCategories([...categories, ...body]);
    }
    catch(e){
      let err = e as Error; 
      store.showError(err.message, 'error');
    }
    

  }
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
  useEffect(() => {
    getCat();
    
  }, [])

  // useEffect(() => {
    
  // }, [file])


  const categoriesList = useMemo(() => {
    return categories.map((e: any) => <option key={e.category_id} value={e.category_id}>{e.category_name}</option>)
  }, [categories]) 

  const sendReport = async () => {
    try{
      

      if(reportForm.category == 0){
        throw new Error('Вы не выбрали категорию жалобы')
      }
      let response = await ApiService.sendReport({
        title: reportForm.title,
        details: reportForm.details,
        file: file,
        category: reportForm.category,
        user: Number(localStorage.getItem('uuid'))
      });
      if(response.status !== 200){
        throw new Error(response.message);
      }
      store.showError(response.message, 'access');
      store.changeReload();
      store.closeReportForm();
    }
    catch(e){

      let err = e as Error
      store.showError(err.message, 'error');
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
  return (
    <div className={modalStyle.modalReport} onClick={() => store.closeReportForm()}>
      <form onSubmit={(e) => e.preventDefault()} onClick={(e) => e.stopPropagation()}>
            <button className={modalStyle.close} onClick={() => store.closeReportForm()} type='button'><BsXLg/></button>
            <h2>Название жалобы</h2>
            <InputUI value={reportForm.title} funcChange={(e: any) => setReportForm({...reportForm, title: e.target.value})}/>
            <h2>Описание жалобы</h2>
            <textarea value={reportForm.details} onChange={(e) => setReportForm({...reportForm, details: e.target.value})}>

            </textarea>
            <select name="" id="" value={reportForm.category} onChange={(e: any) => setReportForm({...reportForm, category: e.target.value})}>
              <option value={0} disabled={true}>Категория жалобы</option>
              {categoriesList}
            </select>
            <h2>Фото-доказательство</h2>
            {sourceImage ? <ImageUI sourceImage={sourceImage} closeFunc={changeFile}/>: <InputFileUI funcChange={async (e: any) => {
              setFile(e.target.files[0])
              uploadFile(e.target.files[0]);
              
            }}/> }
            <p style={{fontSize: 14, color: 'gray'}}>Поддерживаемый формат файла (jpg, jpeg, png,bmp) максимальный размер 10Мб</p>
            <ButtonUI text='Отправить' funcHandler={sendReport}/>
        </form>
    </div>
    
    /*Описать модальное окно для отпраки жалобы на рассмотрение*/
  )
})
