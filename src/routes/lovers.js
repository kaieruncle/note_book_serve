import LoversController from '@/controller/lovers';
export default r => {
    r.post('/lovers/bind-lovers', LoversController.bindLovers);
    r.post('/lovers/un-bind-lovers',LoversController.unBindLovers)
}