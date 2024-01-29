import { useContext, useEffect, useMemo, useState } from 'react'
import { Context } from '../..'
import modalStyle from './modals.module.scss'
import ApiService from '../../services/ApiService';
import { observer } from 'mobx-react-lite';
import { BsTrash3, BsXLg } from 'react-icons/bs';
import { ButtonUI } from '../UI/Button/ButtonUI';
import { InputUI } from '../UI/Input/InputUI';
export const ModalCategories = observer(() => {

  const {store} = useContext(Context);  
  const [categoriesList, setCategoriesList] = useState<any>([])
  const [isAdd, setAdd] = useState(false);
  const [fieldNameCat, setFieldName] = useState('');
  const [reload, setReload] = useState(false);
  const getCat = async () => {
    try{
        let data = await ApiService.categories();

        setCategoriesList([...data.body])
    }
    catch(e){
        console.log(e);
    }
  }
  const delCat = async (id: number) => {
    setReload(true);
    try{
      let response = await ApiService.deleteCategory(id);
      if(response.status !== 200){
        throw new Error(response.message);
      }
      store.showError(response.message, 'success')
      setReload(false);
    }
    catch(e){
      let err = e as Error;
      store.showError(err.message, 'error')
    }
  }
  const addCat = async (id: number) => {
    setReload(true);
    try{
      let response = await ApiService.addCategory(fieldNameCat);
      if(response.status !== 200){
        throw new Error(response.message);
      }
      store.showError(response.message, 'success')
      setAdd(false);
      setFieldName('');
      setReload(false);
    }
    catch(e){
      let err = e as Error;
      store.showError(err.message, 'error')
    }
  }
  useEffect(() => {
    
    getCat();
  }, [])  

  useEffect(() => {
    if(reload){
      getCat()
      
    }
  }, [reload])


  const result = useMemo(() => {
    return categoriesList.map((e: any) => <div className={modalStyle.listItem}>{e.category_name}<button onClick={() => delCat(e.category_id)}><BsTrash3/></button></div>)
  }, [categoriesList])
  return (
    <div className={modalStyle.modalCat} onClick={() => store.closeModalCat()}>
        <div className={modalStyle.listContainer} onClick={(e) => e.stopPropagation()}>
            <button className={modalStyle.close} onClick={() => store.closeModalCat()}><BsXLg/></button>
            <div className={modalStyle.list}>
            {result}
            </div>
            {!isAdd ? <ButtonUI text={'Добавить категорию'} funcHandler={() => setAdd(true)}/> : <div className={modalStyle.formAdding}>
            
                <InputUI value={fieldNameCat} placeholder='Название категории' funcChange={(e: any) => setFieldName(e.target.value)}/>
                <ButtonUI text={'Выполнить операцию'} funcHandler={addCat}/>
                <ButtonUI text={'Отменить операцию'} funcHandler={() => {
                    setAdd(false)
                    setFieldName('');
                }}/>
                
            
            </div>}
        </div>
    </div>
  )
})
