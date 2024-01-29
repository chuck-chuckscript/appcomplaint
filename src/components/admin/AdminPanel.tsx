import React, { useContext, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { ModalError } from '../Modals/ModalError';
import { ModalReport } from '../Modals/ModalReport';
import Header from '../header/Header';
import { Context } from '../..';
import { ReportList } from '../cabinet/ReportList/ReportList';
import { InputUI } from '../UI/Input/InputUI';
import { observer } from 'mobx-react-lite';
import { ModalChangeStatus } from '../Modals/ModalChangeStatus';
import ApiService from '../../services/ApiService';
import { ReportAdminItem } from './ReportAdminItem';
import { ButtonUI } from '../UI/Button/ButtonUI';
import { ModalCategories } from '../Modals/ModalCategories';

export const AdminPanel = observer(() => {
    const {store} = useContext(Context);
    const [reports, setReports] = useState<any>([]);

    const getReportList = async () => {
        try{
            let data = await ApiService.getReports();
            setReports([...data.body])
        }
        catch(e){
            console.log(e);
        }

    }
    useLayoutEffect(() => {document.title = 'Панель администратора'}, [])
    useEffect(() => {
        getReportList();
    }, []);
    useEffect(() => {
        getReportList();
    }, [store.reload]);
    const result = useMemo(() => {
        return reports.map((e: any) => <ReportAdminItem key={e.report_id} report_status={e.complain_status_state} report_category={e.category_name} report_id={e.report_id} report_name={e.report_name} report_date={e.report_date}/>)
    }, [reports])
    return (
        <div className='App'>
            <ModalError/>
            {store.isOpenReportChangeForm ? <ModalChangeStatus/> : null}
            {store.isOpenModalCategories ? <ModalCategories/> : null}
            <Header relative={true}/>
            <main>
                <div style={{display: 'flex', width: '90%', margin: '10px auto'}}>
                    <ButtonUI text={'Добавить или удалить категорию'} funcHandler={() => store.openModalCat()}/>
                </div>
                
                <section className='adminList'>
                   
                    <div>
                        {result.length > 0 ? result : <h1>Нет активных жалоб</h1>}
                    </div>
                </section>
            </main>
            <footer></footer>
        </div>
      )
})
