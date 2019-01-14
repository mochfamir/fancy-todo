const express = require('express')
const router = express.Router()
const { create, getAll, updateTodo, getOne, updateMember } = require('../controllers/project')
const { authentication, uniqueProjectValidation, findUser } = require('../middleware/middleware');

router.post('/', authentication, uniqueProjectValidation, create);
router.get('/', authentication, getAll);
router.get('/:id', authentication, getOne)
router.put('/:name', authentication, updateTodo);
router.put('/members/:id', authentication, findUser, updateMember);

module.exports = router