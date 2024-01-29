import { useContext, useState } from 'react'
import { InputUI } from '../UI/Input/InputUI'
import { ButtonUI } from '../UI/Button/ButtonUI'

import { Context } from '../..'
import modalStyle from './modals.module.scss'
import { observer } from 'mobx-react-lite'
import { BsXLg } from "react-icons/bs";
import { CheckBox } from '../UI/CheckBox/CheckBox'
import ApiService from '../../services/ApiService'
import validate from '../../utils/validate'
import { RestResponse } from '../../types'

export const ModalAuth = observer(() => {
  const [authForm, setFieldAuthForm] = useState({
    login: '',
    password: ''
  })
  const [regForm, setFieldRegForm] = useState({
    FIO: '',
    login: '',
    password: '',
    copypassword: '',
    email: '',
    acceptPersonalData: false
  })
  const {store} = useContext(Context);
  const [isRegForm, setIsReg] = useState(false);
  
  const authFunction = async () => {
    store.login(authForm.login, authForm.password);
  }

  const regFunction = async () => {
    try{

      if(!regForm.login && !regForm.password && !regForm.FIO && !regForm.email){
        throw new Error('Поля ввода не заполнены до конца')
      }

      if(!validate.isCyrillic(regForm.FIO)){
        throw new Error('В поле ФИО указаны данные не на кириллице');
      }

      const FIOsplit = regForm.FIO.split(/[ -]/g);
      console.log(FIOsplit)

      if(!regForm.acceptPersonalData){
        throw new Error('Поставьте согласие на обработку персональных данных');
      }

      if(regForm.password != regForm.copypassword){
        throw new Error('Введенные пароли не совпадают');
      }

      

      let result : RestResponse = await ApiService.register({
        name: FIOsplit[1],
        surname: FIOsplit[0],
        fathername: FIOsplit[2],
        login: regForm.login,
        password: regForm.password,
        email: regForm.email
      })


      if(result.status != 200){
        throw new Error(result.message);
      }


    }
    catch(e){
      let err = e as Error;
      store.showError(err.message, 'error') ;
    }
  

    
  }

  return (
    <div onClick={() => store.closeAuth()} className={modalStyle.modalAuth}>
        {
        isRegForm 
            ? 
            <form onSubmit={(e) => e.preventDefault()} onClick={(e) => {e.stopPropagation()}}>
                <button className={modalStyle.close} type='button' onClick={() => store.closeAuth()}><BsXLg/></button>
                <InputUI placeholder='ФИО' value={regForm.FIO} funcChange={(e: any) => setFieldRegForm({...regForm, FIO: e.target.value})}/>
                <InputUI placeholder='Логин' value={regForm.login} funcChange={(e: any) => setFieldRegForm({...regForm, login: e.target.value})}/>
                <InputUI placeholder='Почта' value={regForm.email} funcChange={(e: any) => setFieldRegForm({...regForm, email: e.target.value})}/>
                <InputUI type='password' placeholder='Пароль' value={regForm.password} funcChange={(e: any) => setFieldRegForm({...regForm, password: e.target.value})}/>
                <InputUI type='password' placeholder='Повторите пароль' value={regForm.copypassword} funcChange={(e: any) => setFieldRegForm({...regForm, copypassword: e.target.value})}/>
                <div style={{display: 'flex', alignItems: 'center'}}>
                <CheckBox checked={regForm.acceptPersonalData} funcChangeChecked={(e: any) => setFieldRegForm({...regForm, acceptPersonalData: !regForm.acceptPersonalData})}/>
                <p>Согласие на обработку персональных данных</p>
                </div>

                <ButtonUI text='Зарегистрироваться' funcHandler={() => regFunction()}/>

            </form> 
            : 
            <form onSubmit={(e) => e.preventDefault()} onClick={(e) => {e.stopPropagation()}}>
                <button className={modalStyle.close} type='button' onClick={() => store.closeAuth()}><BsXLg/></button>
                <InputUI placeholder='Логин' value={authForm.login} funcChange={(e: any) => setFieldAuthForm({...authForm, login: e.target.value})}/>
                <InputUI type='password' placeholder='Пароль' value={authForm.password} funcChange={(e: any) => setFieldAuthForm({...authForm, password: e.target.value})}/>
                <ButtonUI text='Войти' funcHandler={() => authFunction()}/>
                <ButtonUI text='Регистрация' funcHandler={() => setIsReg(true)}/>
            </form>
        }
        

        

    </div>
  )
})
