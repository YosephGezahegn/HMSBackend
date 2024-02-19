/**
 * AppointmentRoutes.js
 * @description :: CRUD API routes for Appointment
 */

const express = require('express');
const router = express.Router();
const AppointmentController = require('../../../controller/device/v1/AppointmentController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/appointment/create').post(auth(PLATFORM.DEVICE),checkRolePermission,AppointmentController.addAppointment);
router.route('/device/api/v1/appointment/list').post(auth(PLATFORM.DEVICE),checkRolePermission,AppointmentController.findAllAppointment);
router.route('/device/api/v1/appointment/count').post(auth(PLATFORM.DEVICE),checkRolePermission,AppointmentController.getAppointmentCount);
router.route('/device/api/v1/appointment/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,AppointmentController.getAppointment);
router.route('/device/api/v1/appointment/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,AppointmentController.updateAppointment);    
router.route('/device/api/v1/appointment/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,AppointmentController.partialUpdateAppointment);
router.route('/device/api/v1/appointment/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,AppointmentController.softDeleteAppointment);
router.route('/device/api/v1/appointment/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,AppointmentController.softDeleteManyAppointment);
router.route('/device/api/v1/appointment/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,AppointmentController.bulkInsertAppointment);
router.route('/device/api/v1/appointment/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,AppointmentController.bulkUpdateAppointment);
router.route('/device/api/v1/appointment/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,AppointmentController.deleteAppointment);
router.route('/device/api/v1/appointment/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,AppointmentController.deleteManyAppointment);

module.exports = router;
