import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import Header from '../header/Header';
import { Context } from '../..';
import reportPageStyle from './reportDetails.module.scss'
import { Link, redirect, useNavigate, useParams } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { ButtonUI } from '../UI/Button/ButtonUI';
import { BsTrash3, BsXLg } from "react-icons/bs";
export const ReportPage = () => {
  
  const [report, setReport] = useState({
    report_category: 0,
    report_date: "",
    report_details: "",
    report_id: 0,
    report_name: "",
    report_photo: '',
    report_response: '',
    report_solution_photo: '',
    report_status: '',
    report_user: 0,
  });
  const {store} = useContext(Context);
  const navigator = useNavigate();
  const params = useParams();
  const [resizePhoto, setResize] = useState({
    state: false,
    photo: ''
  });
  const [src, setSrc] = useState('');
  const getInfo = async () => {
    try{
      let data = await ApiService.getReport(String(params.id));
      if(!data){
        throw new Error();
      }
      
      setReport({...data.body});
      // setSrc(URL.createObjectURL(report.report_photo as Blob));
    }
    catch(e){
      console.log(e);
      navigator('/');
    }

    
  }
  useLayoutEffect(() => {document.title = 'Жалоба'}, [])
  useEffect(() => {
    getInfo();
    
  }, [])
  const colorStatus = (status: string) => {
    if(status === 'Новая'){
        return [reportPageStyle.status, reportPageStyle.orange].join(' ');
    }
    else if(status === 'Решена'){
        return [reportPageStyle.status, reportPageStyle.green].join(' ');
    }
    else{
        return [reportPageStyle.status, reportPageStyle.red].join(' ');
    }
}

  const deleteReport = async () => {
      try{
        let response = await ApiService.deleteReport(report.report_id);
        if(response.status !== 200){
          throw new Error(response.message);
        }
        navigator('/');

        
      }
      catch(e){
        let err = e as Error;
        store.showError(err.message, 'error');
      }
  }
  return (
    <div className='App'>
        {/* <ModalError/> */}

        <Header relative={true}/>
        <main>
            <article className={reportPageStyle.info}>
              {report.report_status == 'Новая' && report.report_user === Number(localStorage.getItem('uuid'))  ? <button onClick={deleteReport} className={reportPageStyle.delete}><BsTrash3/></button> : null}
              <div className={reportPageStyle.reportAbout}>
                <h2>{report.report_name} №{report.report_id}</h2>
                <p>Дата отправки: {new Date(Number(report.report_date)).toLocaleDateString()}</p>
                <p className={colorStatus(report.report_status)}>Статус жалобы: <span>{report.report_status}</span></p>
              </div>
              <div className={reportPageStyle.reportContent}>
                <p>Содержание жалобы:<br/><br/><span>{report.report_details}</span></p>
                <br />
                <p>Фотография жалобы:
                <img src={report.report_photo} alt="" onClick={() => setResize({state: true, photo: report.report_photo})}/>
                  
                </p>
                {report.report_status == 'Решена' ? <p>Фотография решения:
                  <img src={report.report_solution_photo} alt="" onClick={() => setResize({state: true, photo: report.report_solution_photo})}/>
                </p>: null}
                {resizePhoto.state ? <div className={reportPageStyle.bigPicture} onClick={() => setResize({state: false, photo: ''})}>
                    <button><BsXLg/></button>
                    <img src={resizePhoto.photo} alt="" />
                  </div>: null}
              </div>
                

                
            </article>
   
        </main>
        <footer></footer>
    </div>
  )
}
