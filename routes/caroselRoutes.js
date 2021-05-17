const router = require('express').Router()
const auth=require('../middleware/auth')
const authAdmin=require('../middleware/authAdmin')

const caroselCtrl=require('../controllers/caroselCtrl')
router.route('/carosel',auth,authAdmin)
    .get(caroselCtrl.getCarosel)
    .post(caroselCtrl.createCarosel)
router.route('/carosel/:id',auth,authAdmin)
    .delete(caroselCtrl.deleteCarosel)

module.exports = router