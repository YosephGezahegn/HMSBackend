/**
 * DepartmentRoutes.js
 * @description :: CRUD API routes for Department
 */

const express = require('express');
const router = express.Router();
const DepartmentController = require('../../controller/admin/DepartmentController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/department/create').post(auth(PLATFORM.ADMIN),checkRolePermission,DepartmentController.addDepartment);
router.route('/admin/department/list').post(auth(PLATFORM.ADMIN),checkRolePermission,DepartmentController.findAllDepartment);
router.route('/admin/department/count').post(auth(PLATFORM.ADMIN),checkRolePermission,DepartmentController.getDepartmentCount);
router.route('/admin/department/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,DepartmentController.getDepartment);
router.route('/admin/department/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,DepartmentController.updateDepartment);    
router.route('/admin/department/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,DepartmentController.partialUpdateDepartment);
router.route('/admin/department/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,DepartmentController.softDeleteDepartment);
router.route('/admin/department/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,DepartmentController.softDeleteManyDepartment);
router.route('/admin/department/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,DepartmentController.bulkInsertDepartment);
router.route('/admin/department/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,DepartmentController.bulkUpdateDepartment);
router.route('/admin/department/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,DepartmentController.deleteDepartment);
router.route('/admin/department/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,DepartmentController.deleteManyDepartment);

module.exports = router;
