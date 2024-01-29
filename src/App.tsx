
import './styles/App.scss';
import { Context } from './index';
import { observer } from 'mobx-react-lite';
import { ModalAuth } from './components/Modals/ModalAuth';
import Header from './components/header/Header';
import { useContext, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { Intro } from './components/Intro/Intro';
import { ModalError } from './components/Modals/ModalError';
import { ReportAccess } from './components/admin/ReportAccess';
import ApiService from './services/ApiService';



function App() {
  useLayoutEffect(() => {document.title = 'Главная'}, [])
  const { store } = useContext(Context);
  const [count, setCount] = useState(0);
  const [lastReports, setLastReports] = useState<any>([]);
  const getLastReports = async () => {
    try{
      let data = await ApiService.getLastReports();
      setLastReports([...data.body])
      let data2 = await ApiService.getCount();
      setCount(data2.body.count)
    }
    catch(e){
      console.log(e)
    }
  }
  useEffect(() => {
    getLastReports();
    
    let intreval = setInterval(async () => {
      try{
        let data = await ApiService.getCount();
   
        setCount(data.body.count)
        let data2 = await ApiService.getLastReports();
        setLastReports([...data2.body])
      }
      catch(e){
        console.log(e)
        clearInterval(intreval)
      }
    }, 5000, null)
  }, [])


  

  const result = useMemo(() => {
    return lastReports.map((e:any) => <ReportAccess key={e.report_id} report_id={e.report_id} report_category={e.category_name} report_name={e.report_name} report_date={e.report_date} report_photo={e.report_photo} report_solution_photo={e.report_solution_photo}/>)
  }, [lastReports])
  return (
    <div className="App">
        <ModalError/>
        {store.isOpenAuth ? <ModalAuth/> : null}
        <Header relative={true}/>
        <main>
            <h2 style={{textAlign: 'center'}}>Решенных жалоб<br/>{count}</h2>
            <div className='solutionList'>

                {result}
            </div>
            
        </main>
        <footer className='footer'>

        </footer>

        
        
        
    </div>
  );
}

export default observer(App);