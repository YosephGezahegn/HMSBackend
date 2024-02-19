/**
 * FinancialManagementRoutes.js
 * @description :: CRUD API routes for FinancialManagement
 */

const express = require('express');
const router = express.Router();
const FinancialManagementController = require('../../../controller/device/v1/FinancialManagementController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/financialmanagement/create').post(auth(PLATFORM.DEVICE),checkRolePermission,FinancialManagementController.addFinancialManagement);
router.route('/device/api/v1/financialmanagement/list').post(auth(PLATFORM.DEVICE),checkRolePermission,FinancialManagementController.findAllFinancialManagement);
router.route('/device/api/v1/financialmanagement/count').post(auth(PLATFORM.DEVICE),checkRolePermission,FinancialManagementController.getFinancialManagementCount);
router.route('/device/api/v1/financialmanagement/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,FinancialManagementController.getFinancialManagement);
router.route('/device/api/v1/financialmanagement/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,FinancialManagementController.updateFinancialManagement);    
router.route('/device/api/v1/financialmanagement/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,FinancialManagementController.partialUpdateFinancialManagement);
router.route('/device/api/v1/financialmanagement/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,FinancialManagementController.softDeleteFinancialManagement);
router.route('/device/api/v1/financialmanagement/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,FinancialManagementController.softDeleteManyFinancialManagement);
router.route('/device/api/v1/financialmanagement/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,FinancialManagementController.bulkInsertFinancialManagement);
router.route('/device/api/v1/financialmanagement/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,FinancialManagementController.bulkUpdateFinancialManagement);
router.route('/device/api/v1/financialmanagement/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,FinancialManagementController.deleteFinancialManagement);
router.route('/device/api/v1/financialmanagement/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,FinancialManagementController.deleteManyFinancialManagement);

module.exports = router;
