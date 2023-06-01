const router = require('express').Router()
const {getTicket,createTicket} = require('../controllers/ticketController.js')

router.get('/:id', getTicket)
router.post('/', createTicket)

module.exports = router