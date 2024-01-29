import {Router} from 'express'
import ReportController from '../controllers/report-controller.js'

const router = new Router();

router.post('/createReport', ReportController.createReport)
router.put('/changeStatusReport', ReportController.changeStatusReport)
router.post('/addCategory', ReportController.addCategory)
router.post('/getReports', ReportController.getReportsByUser)
router.get('/getCategories', ReportController.getCategories)
router.get('/getCount', ReportController.getCountSolutionsReports)
router.get('/getReport', ReportController.getReportById)
router.get('/getReports', ReportController.getAllReport)
router.get('/getLastReports', ReportController.getFourReport)
router.delete('/deleteReport', ReportController.deleteReport)
router.delete('/deleteCategory', ReportController.deleteCategory)
export default router;