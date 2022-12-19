const { Router } = require('express');
const { OK } = require('../utils/httpStatus/statusCode');


const router = Router();


router.get('/', (_req, res) => {
    res.status(OK).json({
        message: 'Welcome'
    })
})

module.exports = router;