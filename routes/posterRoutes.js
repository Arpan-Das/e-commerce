const router = require('express').Router()
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const posterCtrl = require('../controllers/posterCtrl')


router.route('/Poster')
      .get(posterCtrl.getPoster)
      .post(posterCtrl.createPoster)

router.route('/Poster/:id')
      .delete(posterCtrl.deletePoster)
      .put(posterCtrl.updatePoster)

module.exports = router