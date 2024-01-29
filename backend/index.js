import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import userRoutes from './routes/user.routes.js';
import reportRoutes from './routes/report.routes.js';
import fileRoutes from './routes/files.routes.js';
import errMiddleware from './middleware/err-middleware.js';
import fileUpload from 'express-fileupload';
const app = express();
dotenv.config();
const PORT = process.env.SERVER_PORT || 5000;
app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    methods: 'GET, POST, DELETE, PATCH, PUT, HEAD',
    credentials: true
}))

app.use(fileUpload());
app.use(express.json())
app.use('/api', userRoutes);
app.use('/api', reportRoutes);
app.use('/api', fileRoutes);
app.use('/images', express.static('reportImages'))
app.use(errMiddleware);
async function start (){
    

    app.listen(PORT,() => console.log(`Сервер запущен по адресу http://localhost:${PORT}/`))

} 

start();