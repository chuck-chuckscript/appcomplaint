
import { observer } from 'mobx-react-lite'
import { ModalReport } from '../Modals/ModalReport'
import Header from '../header/Header'
import { ReportList } from './ReportList/ReportList'
import { useContext, useEffect, useLayoutEffect } from 'react'
import { Context } from '../..'
import { ModalError } from '../Modals/ModalError'

export const Cabinet = observer(() => {
  const {store} = useContext(Context);
  useLayoutEffect(() => {document.title = 'Личный кабинет'}, [])

  return (
    <div className='App'>
        <ModalError/>
        {store.isOpenReportForm ? <ModalReport/> : null}
        <Header relative={true}/>
        <main>
            <ReportList/>
        </main>
        <footer></footer>
    </div>
  )
})
