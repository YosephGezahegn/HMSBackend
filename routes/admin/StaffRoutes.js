/**
 * StaffRoutes.js
 * @description :: CRUD API routes for Staff
 */

const express = require('express');
const router = express.Router();
const StaffController = require('../../controller/admin/StaffController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/staff/create').post(auth(PLATFORM.ADMIN),checkRolePermission,StaffController.addStaff);
router.route('/admin/staff/list').post(auth(PLATFORM.ADMIN),checkRolePermission,StaffController.findAllStaff);
router.route('/admin/staff/count').post(auth(PLATFORM.ADMIN),checkRolePermission,StaffController.getStaffCount);
router.route('/admin/staff/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,StaffController.getStaff);
router.route('/admin/staff/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,StaffController.updateStaff);    
router.route('/admin/staff/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,StaffController.partialUpdateStaff);
router.route('/admin/staff/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,StaffController.softDeleteStaff);
router.route('/admin/staff/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,StaffController.softDeleteManyStaff);
router.route('/admin/staff/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,StaffController.bulkInsertStaff);
router.route('/admin/staff/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,StaffController.bulkUpdateStaff);
router.route('/admin/staff/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,StaffController.deleteStaff);
router.route('/admin/staff/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,StaffController.deleteManyStaff);

module.exports = router;
