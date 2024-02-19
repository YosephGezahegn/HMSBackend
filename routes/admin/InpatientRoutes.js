/**
 * InpatientRoutes.js
 * @description :: CRUD API routes for Inpatient
 */

const express = require('express');
const router = express.Router();
const InpatientController = require('../../controller/admin/InpatientController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/inpatient/create').post(auth(PLATFORM.ADMIN),checkRolePermission,InpatientController.addInpatient);
router.route('/admin/inpatient/list').post(auth(PLATFORM.ADMIN),checkRolePermission,InpatientController.findAllInpatient);
router.route('/admin/inpatient/count').post(auth(PLATFORM.ADMIN),checkRolePermission,InpatientController.getInpatientCount);
router.route('/admin/inpatient/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,InpatientController.getInpatient);
router.route('/admin/inpatient/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,InpatientController.updateInpatient);    
router.route('/admin/inpatient/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,InpatientController.partialUpdateInpatient);
router.route('/admin/inpatient/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,InpatientController.softDeleteInpatient);
router.route('/admin/inpatient/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,InpatientController.softDeleteManyInpatient);
router.route('/admin/inpatient/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,InpatientController.bulkInsertInpatient);
router.route('/admin/inpatient/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,InpatientController.bulkUpdateInpatient);
router.route('/admin/inpatient/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,InpatientController.deleteInpatient);
router.route('/admin/inpatient/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,InpatientController.deleteManyInpatient);

module.exports = router;
