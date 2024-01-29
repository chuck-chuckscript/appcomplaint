import { observer } from 'mobx-react-lite'
import React, { FC, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../..'
import reportStyle from './reportItem.module.scss'

type ReportAdminItemProps = {
    "report_id": number,
    "report_name": string,

    "report_category": string,
    "report_status": string,
    "report_date": string,



}


export const ReportAdminItem : FC<ReportAdminItemProps> = observer(({report_id, report_name, report_status, report_category, report_date}) => {
  const {store} = useContext(Context);
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
    <article className={reportStyle.item} onClick={() => {
        store.setReport(report_id, report_status)
        store.openReportChangeForm();
    }}>
        <h1>{report_name} №{report_id}</h1>
        <div>
            <p className={reportStyle.category}>Категория жалобы:<br/>{report_category}</p>
            <p className={reportStyle.date}>Дата жалобы:<br/>{converDate(report_date)}</p>
            <p className={colorStatus(report_status)}>Статус:<span>{report_status}</span></p>
        </div>

        <Link className={reportStyle.link} to={`/report/${report_id}`} onClick={(e) => e.stopPropagation()}>Просмотреть жалобу</Link>
    </article>
  )
})
