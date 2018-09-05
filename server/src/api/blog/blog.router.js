const Express = require('express');
const controller = require('./blog.controller.js');
const asyncWrapper = require('../../asyncWrapper.helper.js');
const router = Express.Router();

router.get('/', asyncWrapper(controller.getList));
router.post('/', asyncWrapper(controller.create));

module.exports = router;
