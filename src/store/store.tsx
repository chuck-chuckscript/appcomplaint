import { makeAutoObservable } from "mobx";
import { RestResponse } from "../types";
import ApiService from "../services/ApiService";




export default class Store{
    auth = false
    isOpenAuth = false
    isOpenReportForm = false
    isOpenReportChangeForm = false
    isOpenModalCategories = false
    report_id = 0;
    report_status = '';

    _error = false
    typeResponse = 'error'
    errMessage = ''
    reload = false
    _root = ''
    constructor(){
        makeAutoObservable(this)
    }
    async login(login: string, password: string){
        try{
            let result : RestResponse = await ApiService.login({login: login, password: password});
            if(result.status !== 200){
              throw new Error(result.message);
            }
            this.setAuth(true)
            this.closeAuth();
            localStorage.setItem('uuid', result.body.user_id);
            localStorage.setItem('root', result.body.root);

            this.setRoot = result.body.root;
            // redirect('/cabinet');
            
          }
          catch(e){
            let err = e as Error;
            this.showError(err.message, 'error');
          }
    }

    checkAuth(){
        if(localStorage.getItem('uuid')){
            this.setAuth(true);

            if(localStorage.getItem('root')){
                 this.setRoot = localStorage.getItem('root') || '';
                
            }



        }
        else{
          this.setAuth(false)
        }
    }
    setAuth(isAuth : boolean){
        this.auth = isAuth;
        
    }
    showError(message: string, type: string){
        
        if(type === 'error'){
            this.typeResponse = 'error';
        }
        else{
            this.typeResponse = 'access';
        }
       this.setStateError = true
       this.setErrMessage = message
        setTimeout(
            () => this.setStateError = false
            // runInAction(() => this.setError = false);
        , 3000);
    }
    set setStateError(isErr: boolean){
        this._error = isErr
    }
    get getStateError(){
        return this._error
    }
    set setErrMessage(message: string){
        this.errMessage = message
    }
    set setRoot(root: string){
        this._root = root
    }
    get getRoot(){
        return this._root
    }
    openAuth(){
        this.isOpenAuth = true;
    }
    closeAuth(){
        this.isOpenAuth = false;
    }
    changeReload(){
        this.reload = !this.reload;
    }
    openReportForm(){
        this.isOpenReportForm = true;
    }
    closeReportForm(){
        this.isOpenReportForm = false;
    }
    openReportChangeForm(){
        this.isOpenReportChangeForm = true;
    }
    closeReportChangeForm(){
        this.isOpenReportChangeForm = false;
    }

    openModalCat(){
        this.isOpenModalCategories = true;
    }
    closeModalCat(){
        this.isOpenModalCategories = false;
    }
    setReport(id: number, status: string){
        this.report_id = id
        this.report_status = status
    }


}


