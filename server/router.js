
// Import express router
const router = require('express').Router();
const broadcastController = require('./controllers/broadcast-controller');


// Route to get all broadcasts
router.get('/api/get-all-broadcasts', broadcastController.getAllBroadcast);
// Route to get broadcast page (by client POSTing id to identify broadcast)
router.post('/api/get-broadcast', broadcastController.getBroadcast);
// Route to create a new broadcast
router.post('/api/create-broadcast', broadcastController.createBroadcast);
// Route to delete a broadcast
router.delete('/api/delete-broadcast', broadcastController.deleteBroadcast);

module.exports = router;