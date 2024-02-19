/**
 * RoomsRoutes.js
 * @description :: CRUD API routes for Rooms
 */

const express = require('express');
const router = express.Router();
const RoomsController = require('../../controller/admin/RoomsController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/rooms/create').post(auth(PLATFORM.ADMIN),checkRolePermission,RoomsController.addRooms);
router.route('/admin/rooms/list').post(auth(PLATFORM.ADMIN),checkRolePermission,RoomsController.findAllRooms);
router.route('/admin/rooms/count').post(auth(PLATFORM.ADMIN),checkRolePermission,RoomsController.getRoomsCount);
router.route('/admin/rooms/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,RoomsController.getRooms);
router.route('/admin/rooms/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,RoomsController.updateRooms);    
router.route('/admin/rooms/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,RoomsController.partialUpdateRooms);
router.route('/admin/rooms/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,RoomsController.softDeleteRooms);
router.route('/admin/rooms/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,RoomsController.softDeleteManyRooms);
router.route('/admin/rooms/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,RoomsController.bulkInsertRooms);
router.route('/admin/rooms/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,RoomsController.bulkUpdateRooms);
router.route('/admin/rooms/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,RoomsController.deleteRooms);
router.route('/admin/rooms/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,RoomsController.deleteManyRooms);

module.exports = router;
