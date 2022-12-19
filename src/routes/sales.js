const { Router } = require('express');
const { OK, NO_CONTENT, CREATED} = require('../utils/httpStatus/statusCode');

const router = Router();


router.get('/', async (_req, res) => {
    const sales = [{ id: 1, customer_id: 1, product_id: 1, quantity: 10, order_date: new Date() }]
    res.status(OK).json(sales)
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const sale = { id: 1, customer_id: 1, product_id: 1, quantity: 10, order_date: new Date() }

    res.status(OK).json(sale)

})

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    
    res.status(OK).json({
        message: `Sale with id ${id} was updated`
    })
})



router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    res.status(NO_CONTENT).json()
})

router.post('/', async (req, res) => {
    const data = req.body;
   
    res.status(CREATED).json({
        message: `Sale with id ${1} was created`
    })
})

module.exports = router;