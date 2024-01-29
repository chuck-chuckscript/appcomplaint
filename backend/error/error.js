export default class ApiError extends Error{
    errors
    status

    constructor(status, message, errors = []){
        super(message)
        this.errors = errors;
        this.status = status;
        
    }


    static BadRequest(message, errors){
        return new ApiError(400, message, errors)
    }
}

