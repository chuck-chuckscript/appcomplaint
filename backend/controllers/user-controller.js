import validator from "validator";
import ApiError from "../error/error.js";
import db from "./db.js";
import ResponseCreator from "../utils/responseCreator.js";
import bcrypt from 'bcrypt'

class UserController{

    async login(req, res, next){
        try{
     
            const [result, fields] = await db.query(`SELECT user_id, user_login, user_password, role.role_name FROM users INNER JOIN role ON user_role = role_id WHERE user_login = ?`, 
            [req.body.login]);
            if(result.length == 0){
                throw new ApiError(404, 'Пользователь не найден')
            }
            const user = result[0];
            console.log(user)
            if(!bcrypt.compareSync(req.body.password, user.user_password)){
                throw new ApiError(403,'Не верный логин или пароль')
            }
            res.status(200).send(new ResponseCreator(200, 'Авторизация успешна').returnResponseData({user_id: user.user_id, root: user.role_name}))
            
        }
        catch(e){
            next(e)
        }
    }
    async logout(){
        
    }

    async register(req, res, next){
        try{
            if(!validator.isEmail(req.body.email)){
                throw ApiError.BadRequest('Указана некорректная почта')
            }
            const [checkIsContainEmail, fieldsQuery1] = await db.query(`SELECT user_email FROM users WHERE user_email = ?`, 
            [req.body.email]);
            if(checkIsContainEmail.length > 0){
                throw ApiError.BadRequest('Пользователь с такой почтой зарегистрирован')
            }
            const [checkIsContainLogin, fieldsQuery2] = await db.query(`SELECT user_login FROM users WHERE user_login = ?`, 
            [req.body.login]);
            if(checkIsContainLogin.length > 0){
                throw ApiError.BadRequest('Пользователь c таким логином зарегистрирован')
            }
            
            const passwordHash = bcrypt.hashSync(req.body.password, 10)
            const [result, fieldsQuery3] = await db.query(`INSERT INTO users (user_name, user_surname, user_fathername, user_login, user_password, user_email, user_role) VALUES (?, ?, ?, ?, ?, ?, 1)`, 
            [req.body.name, req.body.surname, req.body.fathername, req.body.login, passwordHash, req.body.email]);
            res.status(200).send(new ResponseCreator(200, 'Регистрация успешна').returnResponseObject())
        }
        catch(e){
            next(e)
        }
    }

}
export default new UserController();