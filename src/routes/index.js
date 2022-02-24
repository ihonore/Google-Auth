const { Router } = require('express');
const controllers = require('../controllers');

const router = Router();

router.get('/', (req, res) => res.json({"status":200,"message":"Welcome to Google Auth"}))

router.post('/profiles/:userId', controllers.createProfile);
router.get('/profiles', controllers.getAllProfiles);
router.get('/users', controllers.getAllUsers);
router.get('/profiles/:profileId', controllers.getSingleProfile);
router.put('/profiles/:profileId', controllers.updateProfile);
router.delete('/profiles/:profileId', controllers.deleteProfile);
router.delete('/users/:userId', controllers.deleteUser);
module.exports = router;