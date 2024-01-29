import { FC, useContext, useEffect, useMemo, useState } from 'react'
import reportStyle from './report.module.scss'
import { InputUI } from '../../UI/Input/InputUI'
import { ButtonUI } from '../../UI/Button/ButtonUI'
import { observer } from 'mobx-react-lite'
import { Context } from '../../..'

import { ReportItem } from './ReportItem'
import ApiService from '../../../services/ApiService'
export const ReportList : FC = observer(() => {

  const {store} = useContext(Context);  
  const [myReports, setMyReports] = useState<any>([])
  const [filter, setFilter] = useState("");

  const getReports = async () => {
    
    try{
      let data = await ApiService.myReports({user: Number(localStorage.getItem('uuid'))}) 
      console.log(data);
      if(data.body){
        setMyReports([...data.body])
      }
    }
    catch(e){
      let err = e as Error;
      store.showError(err.message, 'error')
    }
  }
  // useEffect(() => {
    
    
    
  // }, [])

  useEffect(() => {
    getReports();
  }, [store.reload])


  const reports = useMemo(() => {
    if(filter){
        return myReports.filter((e: any) => e.report_status === filter).map((e : any) => <ReportItem key={e.report_id} report_category={e.report_category} report_date={e.report_date} report_status={e.report_status} report_name={e.report_name} report_id={e.report_id}/>)
    }
    return myReports.map((e : any) => <ReportItem key={e.report_id} report_category={e.report_category} report_date={e.report_date} report_status={e.report_status} report_name={e.report_name} report_id={e.report_id}/>)
  }, [myReports, filter]);
  return (
    <section className={reportStyle.reportContainer}>
        
        <h2>Ваши жалобы</h2>
        <ButtonUI text='Написать жалобу' funcHandler={() => store.openReportForm()}/>
        <select name="" id="" onChange={(e: any) => setFilter(e.target.value)}>
          <option value={""}>Отобразить все жалобы</option>
          <option value={"Решена"}>Только со статусом "Решена"</option>
          <option value={"Отклонена"}>Только со статусом "Отклонена"</option>
          <option value={"Новая"}>Только со статусом "Новая"</option>
        </select>
        
        <div className={reportStyle.wrapperList}>
     

          {reports.length > 0 ? reports : <h3>Нет активных жалоб</h3>}
        
        
        </div>
    </section>
  )
})
