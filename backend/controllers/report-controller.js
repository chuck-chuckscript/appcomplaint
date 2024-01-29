import db from '../controllers/db.js'
import ApiError from '../error/error.js'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import decoder from 'iconv-lite'
import ResponseCreator from '../utils/responseCreator.js'
import fs from 'fs';


const __dirname = dirname(fileURLToPath(import.meta.url));
const path = __dirname.split('\\').slice(0, -1).join('\\');

class ReportController{
    async createReport(req, res, next){
        try{

            if(!req.body.title && !req.body.details && !req.body.category && !req.body.user){
                throw ApiError.BadRequest('Поля не заполнены до конца');
            }

            const file = req.files.file;
            let typeFile = file.name.split('.').pop();
            let nameFile = file.name.split('.').slice(0, -1).join('');
            nameFile = decoder.encode(decoder.decode(nameFile, "utf8"), "utf8").toString();

            let filePath = `${path}\\reportImages\\${nameFile}.${typeFile}`;
            if(!fs.existsSync(filePath)){
                throw ApiError.BadRequest('Файл не найден');
            }
            
            
            let idReport = (Math.random() * (1000000 - 1)).toFixed(0);
            filePath = `${path}\\reportImages\\report-${idReport}.${typeFile}`
            fs.renameSync(`${path}\\reportImages\\${nameFile}.${typeFile}`, filePath)
            let report_photo = `report-${idReport}.${typeFile}`;
            const [result, field] = await db.query('INSERT INTO report (`report_id`, `report_name`,`report_details`,`report_category`,`report_status`,`report_date`,`report_user`, `report_photo`, `report_solution_photo`, `report_response`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NULL, NULL)', [idReport, req.body.title, req.body.details, req.body.category, 3, new Date().getTime(), req.body.user, report_photo]);
            res.status(200).send(new ResponseCreator(200, 'Жалоба отправлена').returnResponseObject())
        }
        catch(e){
            next(e);
        }
    }
    async changeStatusReport(req, res, next){
        try{
            if(req.files){
            const file = req.files.file;
            let typeFile = file.name.split('.').pop();
            let nameFile = file.name.split('.').slice(0, -1).join('');
            nameFile = decoder.encode(decoder.decode(nameFile, "utf8"), "utf8").toString();

            let filePath = `${path}\\reportImages\\${nameFile}.${typeFile}`;
            if(!fs.existsSync(filePath)){
                throw ApiError.BadRequest('Файл не найден');
            }
            
            
            let idReport = +req.query.id;
            filePath = `${path}\\reportImages\\report-${idReport}-solution.${typeFile}`
            fs.renameSync(`${path}\\reportImages\\${nameFile}.${typeFile}`, filePath)
            let report_photo_solution = `report-${idReport}-solution.${typeFile}`
            const [result, field] = await db.query('UPDATE report SET report_status = ?, report_solution_photo = ? WHERE report_id = ?', [+req.query.status , report_photo_solution ,+req.query.id]);
            }
            else{
                const [result, field] = await db.query('UPDATE report SET report_status = ? WHERE report_id = ?', [+req.query.status ,+req.query.id]);
            }
            

            res.status(200).send(new ResponseCreator(200, 'Статус жалобы изменен'))
        }
        catch(e){
            next(e)
        }
    }
    async getFourReport(req, res, next){
        try{
            const [result, field] = await db.query('SELECT * FROM report INNER JOIN report_categories ON report_category = report_categories.category_id WHERE report.report_status = 1  ORDER BY report_date DESC LIMIT 0,4');

            console.log(result)
            res.status(200).send(new ResponseCreator(200, 'Последние решенные жалобы').returnResponseData(result));
        }
        catch(e){
            next(e)
        }
    }
    async addCategory(req, res, next){
        try{
            const [result, field] = await db.query('INSERT INTO report_categories (`category_name`) VALUES (?)', [req.body.newCategory]);



            res.status(200).send(new ResponseCreator(200, 'Категория добавлена').returnResponseObject());
        }
        catch(e){
            next(e)
        }
    }
    async deleteCategory(req, res, next){
        try{
            const [result, field] = await db.query('DELETE FROM report_categories WHERE category_id = ?', [req.query.id]);


       
            res.status(200).send(new ResponseCreator(200, 'Категория удалена').returnResponseObject());
        }
        catch(e){
            next(e)
        }
    }
    async getAllReport(req, res, next){
        try{
            const [result, field] = await db.query('SELECT report_id, report_name, report_date, сomplaint_status.complain_status_state, report_categories.category_name FROM report INNER JOIN сomplaint_status  ON report_status = complain_status_id INNER JOIN report_categories ON report_category = category_id WHERE report_status = 3', [req.query.status ,req.query.id]);

            console.log(result);
            res.status(200).send(new ResponseCreator(200, 'Жалобы найдены').returnResponseData(result))
        }
        catch(e){
            next(e)
        }
    }
    async getReportById(req, res, next){
        try{
            const [result, field] = await db.query('SELECT * FROM report INNER JOIN report_categories ON report_category = category_id INNER JOIN сomplaint_status ON complain_status_id = report_status WHERE report_id = ?', [req.query.id]);

            let report = {
                "report_id": result[0].report_id,
                "report_name": result[0].report_name,
                "report_details": result[0].report_details,
                "report_category": result[0].category_name,
                "report_status": result[0].complain_status_state,
                "report_date": result[0].report_date,
                "report_user": result[0].report_user,
                "report_photo": result[0].report_photo,
                "report_solution_photo": result[0].report_solution_photo,
                "report_response": result[0].report_response
            }
            if(fs.existsSync(`${path}\\reportImages\\${report.report_photo}`)){

                report.report_photo =`http://localhost:5555/images/${report.report_photo}`;

            }
            if(fs.existsSync(`${path}\\reportImages\\${report.report_solution_photo}`)){

                report.report_solution_photo =`http://localhost:5555/images/${report.report_solution_photo}`;

            }
            if(result.length == 0){
                throw new ApiError(404, 'Жалоба не найдена')
            }
          
            res.status(200).send(new ResponseCreator(200, `Жалоба ${req.query.id}`).returnResponseData(report))
        }
        catch(e){
            next(e)
        }
    }
    async getCountSolutionsReports(req, res, next){
        try{
            const [result, field] = await db.query('SELECT COUNT(*) FROM `report` WHERE report_status = 1');


            
            res.status(200).send(new ResponseCreator(200, 'Категории портала').returnResponseData({count: result[0]["COUNT(*)"]}))
        }
        catch(e){
            next(e)
        }
    }
    async deleteReport(req, res, next){
        
        
       

        try {
            if(!req.query.id){
                throw new ApiError(404, 'Жалоба не найдена')
            }
            if(!req.query.user){
                throw new ApiError(404, 'Пользователь не указан')
            }
            const [сheckReport, field1] = await db.query('SELECT * FROM report WHERE report_id = ? AND report_user = ?', [req.query.id, req.query.user]);
            if(сheckReport.length == 0){
                throw new ApiError(404, 'Жалоба не найдена')
            }
            const [result, field2] = await db.query('DELETE FROM report WHERE report_id = ? AND report_user = ?', [req.query.id, req.query.user]);
            
            res.status(200).send(new ResponseCreator(200, 'Жалоба удалена').returnResponseObject());
        } catch (err) {
            next(err)
        }
    }
    async getCategories(req, res, next){
        try{
            const [result, field] = await db.query('SELECT * FROM `report_categories`');


            if(result.length == 0){
                throw new ApiError(404, 'Категории не найдены')
            }
            res.status(200).send(new ResponseCreator(200, 'Категории портала').returnResponseData(result))
        }
        catch(e){
            next(e)
        }
    }
    async getReportsByUser(req, res, next){
        try{
    
            const [result, field] = await db.query('SELECT report_id, report_name, report_user, report_date, сomplaint_status.complain_status_state, report_categories.category_name FROM report INNER JOIN сomplaint_status  ON report_status = complain_status_id INNER JOIN report_categories ON report_category = category_id WHERE report_user = ? ORDER BY report_date DESC', [req.body.user]);

            if(result.length == 0){
                throw new ApiError(404, 'Жалобы не найдены')
            }


            const resultConvertedClient = result.map(e => {
                return {
                    report_id: e.report_id,
                    report_name: e.report_name,
                    report_date: e.report_date,
                    report_category: e.category_name,
                    report_status: e.complain_status_state,
                }
            })
            res.status(200).send(new ResponseCreator(200, 'Лист жалоб пользователя').returnResponseData(resultConvertedClient))

        }
        catch(e){
            next(e);
        }
    }
    


}

export default new ReportController();