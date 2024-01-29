export default class ResponseCreator {
    message
    status

    constructor(status, message){
        this.message = message;
        this.status = status;

    }


    returnResponseObject(){
        return {status: this.status, message: this.message}
    }
    returnResponseData(data){
        return{status: this.status, message: this.message, body: data}
    }
}


