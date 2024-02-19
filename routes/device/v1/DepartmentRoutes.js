/**
 * DepartmentRoutes.js
 * @description :: CRUD API routes for Department
 */

const express = require('express');
const router = express.Router();
const DepartmentController = require('../../../controller/device/v1/DepartmentController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/department/create').post(auth(PLATFORM.DEVICE),checkRolePermission,DepartmentController.addDepartment);
router.route('/device/api/v1/department/list').post(auth(PLATFORM.DEVICE),checkRolePermission,DepartmentController.findAllDepartment);
router.route('/device/api/v1/department/count').post(auth(PLATFORM.DEVICE),checkRolePermission,DepartmentController.getDepartmentCount);
router.route('/device/api/v1/department/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,DepartmentController.getDepartment);
router.route('/device/api/v1/department/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,DepartmentController.updateDepartment);    
router.route('/device/api/v1/department/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,DepartmentController.partialUpdateDepartment);
router.route('/device/api/v1/department/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,DepartmentController.softDeleteDepartment);
router.route('/device/api/v1/department/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,DepartmentController.softDeleteManyDepartment);
router.route('/device/api/v1/department/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,DepartmentController.bulkInsertDepartment);
router.route('/device/api/v1/department/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,DepartmentController.bulkUpdateDepartment);
router.route('/device/api/v1/department/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,DepartmentController.deleteDepartment);
router.route('/device/api/v1/department/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,DepartmentController.deleteManyDepartment);

module.exports = router;
