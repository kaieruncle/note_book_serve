import SystemController from '@/controller/system';
import multer from "@koa/multer";
const upLoadMiddle = multer();
export default r => {
    r.post('/system/upload-file',upLoadMiddle.fields([{ name: "file", maxCount: 1 }]),SystemController.uploadFile)
    r.post('/system/create-activity-id',SystemController.createActivityId)
    r.post('/system/submit-note',SystemController.submitNote)
    r.get('/system/get-notes-by-date',SystemController.getNotesByDate)
    r.get('/system/get-note-detail',SystemController.getNoteDetail)
    r.post('/system/edit-note',SystemController.editNote)
    r.get('/system/get-file',SystemController.getFile)
}