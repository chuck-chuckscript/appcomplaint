
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import decoder from 'iconv-lite'
import ResponseCreator from '../utils/responseCreator.js';
import ApiError from '../error/error.js';
const __dirname = dirname(fileURLToPath(import.meta.url));
const path = __dirname.split('\\').slice(0, -1).join('\\');
class FileManager {

    async upload(req, res, next){
        try{

            const file = req.files.file;
            
            let typeFile = file.name.split('.').pop();
            let nameFile = file.name.split('.').slice(0, -1).join('');
            nameFile = decoder.encode(decoder.decode(nameFile, "utf8"), "utf8").toString();
            

            
            let filePath = `${path}\\reportImages\\${nameFile}.${typeFile}`;
            
            if(file.size > 10485760){
                throw ApiError.BadRequest('Размер файла превышает 10 мб')
            }

            await file.mv(filePath);
           
            res.status(200).sendFile(filePath);
        }
        catch(e){
            next(e);
        }
    }
    async delete(req, res, next){
        try{
            const file = req.files.file;
            let typeFile = file.name.split('.').pop();
            let nameFile = file.name.split('.').slice(0, -1).join('');
            nameFile = decoder.encode(decoder.decode(nameFile, "utf8"), "utf8").toString();
            const pathFile = `${path}\\reportImages\\${nameFile}.${typeFile}`;
            

            if(!fs.existsSync(pathFile)){
                throw new ApiError(404, 'Файл не найден');
            }
            fs.rmSync(pathFile);
            
            res.status(200).send(new ResponseCreator(200, 'Файл удален').returnResponseObject());
        }
        catch(e){
            next(e);
        }
    }
    async existFileDirectory(file){

        let typeFile = file.name.split('.').pop();
        let nameFile = file.name.split('.').slice(0, -1).join('');
        nameFile = decoder.encode(decoder.decode(nameFile, "utf8"), "utf8").toString();
        const pathFile = `${path}\\reportImages\\${nameFile}.${typeFile}`;
        return fs.existsSync(pathFile);
    }


}
export default new FileManager();