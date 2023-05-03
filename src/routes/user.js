import UserController from '@/controller/user';
export default r => {
    r.post('/user/login', UserController.login);
    r.get('/user/get-user-info', UserController.getUserInfo);
    r.get('/user/get-user-info-by-openid',UserController.getUserInfoByOpenid)
    r.post('/user/update-user-info',UserController.updateUserInfo)
    r.post('/user/update-user-email',UserController.updateUserEmail)
}