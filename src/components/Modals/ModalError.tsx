import { observer } from 'mobx-react-lite'
import {FC, useContext} from 'react'
import { Context } from '../..'
import modalStyle from './modals.module.scss'

export const ModalError : FC = observer(() => {

  const {store} = useContext(Context);  

  return (
    <div style={{color: store.typeResponse && store.typeResponse == 'access' ? 'green': 'red'}} className={store.getStateError ? [modalStyle.error, modalStyle.active].join(' ') : modalStyle.error}>
        {store.errMessage}
    </div>
  )
})
