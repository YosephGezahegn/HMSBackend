/**
 * RoomsRoutes.js
 * @description :: CRUD API routes for Rooms
 */

const express = require('express');
const router = express.Router();
const RoomsController = require('../../../controller/device/v1/RoomsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/rooms/create').post(auth(PLATFORM.DEVICE),checkRolePermission,RoomsController.addRooms);
router.route('/device/api/v1/rooms/list').post(auth(PLATFORM.DEVICE),checkRolePermission,RoomsController.findAllRooms);
router.route('/device/api/v1/rooms/count').post(auth(PLATFORM.DEVICE),checkRolePermission,RoomsController.getRoomsCount);
router.route('/device/api/v1/rooms/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,RoomsController.getRooms);
router.route('/device/api/v1/rooms/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,RoomsController.updateRooms);    
router.route('/device/api/v1/rooms/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,RoomsController.partialUpdateRooms);
router.route('/device/api/v1/rooms/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,RoomsController.softDeleteRooms);
router.route('/device/api/v1/rooms/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,RoomsController.softDeleteManyRooms);
router.route('/device/api/v1/rooms/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,RoomsController.bulkInsertRooms);
router.route('/device/api/v1/rooms/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,RoomsController.bulkUpdateRooms);
router.route('/device/api/v1/rooms/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,RoomsController.deleteRooms);
router.route('/device/api/v1/rooms/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,RoomsController.deleteManyRooms);

module.exports = router;
