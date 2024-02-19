/**
 * InpatientRoutes.js
 * @description :: CRUD API routes for Inpatient
 */

const express = require('express');
const router = express.Router();
const InpatientController = require('../../../controller/device/v1/InpatientController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/inpatient/create').post(auth(PLATFORM.DEVICE),checkRolePermission,InpatientController.addInpatient);
router.route('/device/api/v1/inpatient/list').post(auth(PLATFORM.DEVICE),checkRolePermission,InpatientController.findAllInpatient);
router.route('/device/api/v1/inpatient/count').post(auth(PLATFORM.DEVICE),checkRolePermission,InpatientController.getInpatientCount);
router.route('/device/api/v1/inpatient/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,InpatientController.getInpatient);
router.route('/device/api/v1/inpatient/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,InpatientController.updateInpatient);    
router.route('/device/api/v1/inpatient/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,InpatientController.partialUpdateInpatient);
router.route('/device/api/v1/inpatient/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,InpatientController.softDeleteInpatient);
router.route('/device/api/v1/inpatient/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,InpatientController.softDeleteManyInpatient);
router.route('/device/api/v1/inpatient/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,InpatientController.bulkInsertInpatient);
router.route('/device/api/v1/inpatient/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,InpatientController.bulkUpdateInpatient);
router.route('/device/api/v1/inpatient/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,InpatientController.deleteInpatient);
router.route('/device/api/v1/inpatient/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,InpatientController.deleteManyInpatient);

module.exports = router;
