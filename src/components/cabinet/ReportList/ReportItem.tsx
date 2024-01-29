import { FC } from 'react'
import { ReportItem as ReportFields } from '../../../types'
import reportStyle from './report.module.scss'
import { Link } from 'react-router-dom'
export const ReportItem : FC<ReportFields> = ({report_date, report_category, report_id, report_name, report_status}) => {
  
    const colorStatus = (status: string) => {
        if(status === 'Новая'){
            return [reportStyle.status, reportStyle.orange].join(' ');
        }
        else if(status === 'Решена'){
            return [reportStyle.status, reportStyle.green].join(' ');
        }
        else{
            return [reportStyle.status, reportStyle.red].join(' ');
        }
    }
    const converDate = (date: string) => {
        return new Date(+date).toLocaleDateString();
    }
  
  
    return (
    <Link to={`/report/${report_id}`} className={reportStyle.item}>
        <h1>{report_name} №{report_id}</h1>
        <div>
            <p className={reportStyle.category}>Категория жалобы:<br/>{report_category}</p>
            <p className={reportStyle.date}>Дата жалобы:<br/>{converDate(report_date)}</p>
            <p className={colorStatus(report_status)}>Статус:<span>{report_status}</span></p>
        </div>
    </Link>
  )
}
