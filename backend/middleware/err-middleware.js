import ApiError from '../error/error.js';

export default function(err, req, res, next){
    console.log(err);

    
    if(err instanceof ApiError){

        return res.status(err.status).send({status: err.status, message: err.message, errors: err.errors});
    }
    return res.status(500).send({status: err.status, message: 'Непридвиденная ошибка'})
}