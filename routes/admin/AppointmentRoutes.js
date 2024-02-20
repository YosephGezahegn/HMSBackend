/**
 * AppointmentRoutes.js
 * @description :: CRUD API routes for Appointment
 */

const express = require('express');
const router = express.Router();
const AppointmentController = require('../../controller/admin/AppointmentController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/appointment/create').post(auth(PLATFORM.ADMIN),checkRolePermission,AppointmentController.addAppointment);
router.route('/admin/appointment/list').post(auth(PLATFORM.ADMIN),checkRolePermission,AppointmentController.findAllAppointment);
router.route('/admin/appointment/count').post(auth(PLATFORM.ADMIN),checkRolePermission,AppointmentController.getAppointmentCount);
router.route('/admin/appointment/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,AppointmentController.getAppointment);
router.route('/admin/appointment/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,AppointmentController.updateAppointment);    
router.route('/admin/appointment/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,AppointmentController.partialUpdateAppointment);
router.route('/admin/appointment/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,AppointmentController.softDeleteAppointment);
router.route('/admin/appointment/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,AppointmentController.softDeleteManyAppointment);
router.route('/admin/appointment/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,AppointmentController.bulkInsertAppointment);
router.route('/admin/appointment/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,AppointmentController.bulkUpdateAppointment);
router.route('/admin/appointment/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,AppointmentController.deleteAppointment);
router.route('/admin/appointment/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,AppointmentController.deleteManyAppointment);

module.exports = router;
