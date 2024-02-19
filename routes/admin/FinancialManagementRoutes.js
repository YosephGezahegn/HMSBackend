/**
 * FinancialManagementRoutes.js
 * @description :: CRUD API routes for FinancialManagement
 */

const express = require('express');
const router = express.Router();
const FinancialManagementController = require('../../controller/admin/FinancialManagementController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/financialmanagement/create').post(auth(PLATFORM.ADMIN),checkRolePermission,FinancialManagementController.addFinancialManagement);
router.route('/admin/financialmanagement/list').post(auth(PLATFORM.ADMIN),checkRolePermission,FinancialManagementController.findAllFinancialManagement);
router.route('/admin/financialmanagement/count').post(auth(PLATFORM.ADMIN),checkRolePermission,FinancialManagementController.getFinancialManagementCount);
router.route('/admin/financialmanagement/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,FinancialManagementController.getFinancialManagement);
router.route('/admin/financialmanagement/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,FinancialManagementController.updateFinancialManagement);    
router.route('/admin/financialmanagement/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,FinancialManagementController.partialUpdateFinancialManagement);
router.route('/admin/financialmanagement/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,FinancialManagementController.softDeleteFinancialManagement);
router.route('/admin/financialmanagement/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,FinancialManagementController.softDeleteManyFinancialManagement);
router.route('/admin/financialmanagement/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,FinancialManagementController.bulkInsertFinancialManagement);
router.route('/admin/financialmanagement/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,FinancialManagementController.bulkUpdateFinancialManagement);
router.route('/admin/financialmanagement/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,FinancialManagementController.deleteFinancialManagement);
router.route('/admin/financialmanagement/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,FinancialManagementController.deleteManyFinancialManagement);

module.exports = router;
