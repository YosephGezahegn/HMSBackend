/**
 * StaffRoutes.js
 * @description :: CRUD API routes for Staff
 */

const express = require('express');
const router = express.Router();
const StaffController = require('../../../controller/device/v1/StaffController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/staff/create').post(auth(PLATFORM.DEVICE),checkRolePermission,StaffController.addStaff);
router.route('/device/api/v1/staff/list').post(auth(PLATFORM.DEVICE),checkRolePermission,StaffController.findAllStaff);
router.route('/device/api/v1/staff/count').post(auth(PLATFORM.DEVICE),checkRolePermission,StaffController.getStaffCount);
router.route('/device/api/v1/staff/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,StaffController.getStaff);
router.route('/device/api/v1/staff/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,StaffController.updateStaff);    
router.route('/device/api/v1/staff/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,StaffController.partialUpdateStaff);
router.route('/device/api/v1/staff/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,StaffController.softDeleteStaff);
router.route('/device/api/v1/staff/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,StaffController.softDeleteManyStaff);
router.route('/device/api/v1/staff/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,StaffController.bulkInsertStaff);
router.route('/device/api/v1/staff/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,StaffController.bulkUpdateStaff);
router.route('/device/api/v1/staff/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,StaffController.deleteStaff);
router.route('/device/api/v1/staff/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,StaffController.deleteManyStaff);

module.exports = router;
