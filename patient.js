const expreess = require('express')
const router= expreess.Router()

const controlller = require('./controlller')
const upload     = require('./upload')


router.get('/', controlller.index)
router.post('/show', controlller.show)
router.post('/store', upload.single('UPLOAD'), controlller.store )
router.post('/update', controlller.update)
router.post('/delete', controlller.destroy)

module.exports = router