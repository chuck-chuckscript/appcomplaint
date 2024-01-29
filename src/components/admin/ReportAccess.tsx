import React, { FC, useEffect } from 'react'
import { Link } from 'react-router-dom'


type ReportAccessProps = {
    report_id?: number
    report_category: string
    report_name: string
    report_date: string
    report_photo: string
    report_solution_photo: string
}

export const ReportAccess : FC<ReportAccessProps> = ({report_id, report_category, report_date, report_name, report_photo, report_solution_photo}) => {



  return (
    <Link to={`/report/${report_id}`} className='reportAccess'>
        <div className='images'>
            <img className='main' src={'http://localhost:5555/images/'+report_photo} alt="" />
            <img className='sol'src={'http://localhost:5555/images/'+report_solution_photo} alt="" />
        </div>
       
        <div>
            <h2>{report_name} №{report_id}</h2>
            <p className='category'>Категория жалобы: {report_category}</p>
            <p className='date'>Дата жалобы: {new Date(Number(report_date)).toLocaleDateString()}</p>
            
        </div>
    </Link>
  )
}
