var express = require('express');
var router = express.Router();
const middleware = require('../middleware/middleware');
const todoController = require('../controllers/todo');

/* GET users listing. */
router.post('/', middleware.authentication, todoController.add);
router.get('/', middleware.authentication, todoController.get);
router.get('/:id', middleware.authentication, todoController.getOne);
router.put('/:id', middleware.authentication, todoController.update);
router.delete('/:id', middleware.authentication, todoController.remove);
module.exports = router;
