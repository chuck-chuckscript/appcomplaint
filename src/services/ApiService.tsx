import axios, {AxiosError } from "axios";
import { AuthRestObject, RegisterRestObject, SendingReport } from "../types";

class ApiService {
    host = 'http://localhost:5555'

    async login(object: AuthRestObject){
       try{
            let response = await axios.post(this.host + '/api/login', object)

            return response.data
       }
       catch(e : any){
        let err = e as AxiosError;
        return e.response.data;
       }
    }

    async register(object: RegisterRestObject){
        try{
            let response = await axios.post(this.host + '/api/register', object)

            return response.data
       }
       catch(e : any){
        let err = e as AxiosError;
        return e.response.data;
       }
    }
    async myReports(object: any){
        try{
            let response = await axios.post(this.host + '/api/getReports', object)

            return response.data
       }
       catch(e : any){
        let err = e as AxiosError;
        return e.response.data;
       }
    }
    async categories(){
        try{
            let response = await axios.get(this.host + '/api/getCategories')

            return response.data
       }
       catch(e : any){
        let err = e as AxiosError;
        return e.response.data;
       }
    }
    async uploadFile(file: any){
        let formData = new FormData();
        formData.append('file', file);

        try{
            let response = await fetch(this.host + '/api/uploadFile', {
                mode: 'cors',
                method: 'post',
                body: formData
            })
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            return url
       }
       catch(e : any){
        let err = e as AxiosError;
        return e.response.data;
       }
    }
    async deleteFile(file: any){
        let formData = new FormData();
        formData.append('file', file);
        try{
            let response = await axios.post(this.host + '/api/deleteFile', formData);
            return response.data;
        }
        catch(e){
            let err = e as AxiosError;
            return err.response?.data; 
        }
    }
    async getReport(id: string){
        try{
            let response = await axios.get(this.host + `/api/getReport?id=${id}`);
            return response.data;
        }
        catch(e){
            let err = e as AxiosError;
            return err.response?.data; 
        }
    }
    async getReports(){
        try{
            let response = await axios.get(this.host + `/api/getReports`);
            return response.data;
        }
        catch(e){
            let err = e as AxiosError;
            return err.response?.data; 
        }
    }
    async getLastReports(){
        try{
            let response = await axios.get(this.host + `/api/getLastReports`);
            return response.data;
        }
        catch(e){
            let err = e as AxiosError;
            return err.response?.data; 
        }
    }
    async changeStatus(id: number, status: number, file?: any){
        let formData = new FormData();
        formData.append('file', file)
        try{
            let response = await axios.put(this.host + `/api/changeStatusReport?status=${status}&id=${id}`, file ? formData : null);
            return response.data;
        }
        catch(e){
            let err = e as AxiosError;
            return err.response?.data; 
        }
    }
    async deleteCategory(id: number){
        try{
            let response = await axios.delete(this.host + `/api/deleteCategory?id=${id}`);
            return response.data;
        }
        catch(e){
            let err = e as AxiosError;
            return err.response?.data; 
        }
    }
    async deleteReport(id: number){
        try{
            let response = await axios.delete(this.host + `/api/deleteReport?id=${id}&user=${localStorage.getItem('uuid')}`);
            return response.data;
        }
        catch(e){
            let err = e as AxiosError;
            return err.response?.data; 
        }
    }
    async getCount(){
        try{
            let response = await axios.get(this.host + `/api/getCount`);
            return response.data;
        }
        catch(e){
            let err = e as AxiosError;
            return err.response?.data; 
        }
    }
    async addCategory(newCategory: string){
        try{
            let response = await axios.post(this.host + `/api/addCategory`, {
                newCategory: newCategory
            });
            return response.data;
        }
        catch(e){
            let err = e as AxiosError;
            return err.response?.data; 
        }
    }
    async sendReport(object: SendingReport){

        let formData = new FormData();
        formData.append('title', object.title);
        formData.append('details', object.details);
        formData.append('category', ""+object.category);
        formData.append('user', ""+object.user);
        formData.append('file', object.file);


        try{
            let response = await axios.post(this.host + '/api/createReport', formData)

            return response.data
       }
       catch(e : any){
        let err = e as AxiosError;
        return e.response.data;
       }
    }
    

}
export default new ApiService();