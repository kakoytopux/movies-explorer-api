const router = require('express').Router();
const { celebrate } = require('celebrate');
const { getUserInfo, updateUserInfo } = require('../controllers/users');
const { validateUpdateUser } = require('../middlewares/validation');

router.get('/me', getUserInfo);
router.patch('/me', celebrate(validateUpdateUser), updateUserInfo);

module.exports = router;
