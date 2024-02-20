/**
 * AdmissionRoutes.js
 * @description :: CRUD API routes for Admission
 */

const express = require('express');
const router = express.Router();
const AdmissionController = require('../../../controller/device/v1/AdmissionController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/admission/create').post(auth(PLATFORM.DEVICE),checkRolePermission,AdmissionController.addAdmission);
router.route('/device/api/v1/admission/list').post(auth(PLATFORM.DEVICE),checkRolePermission,AdmissionController.findAllAdmission);
router.route('/device/api/v1/admission/count').post(auth(PLATFORM.DEVICE),checkRolePermission,AdmissionController.getAdmissionCount);
router.route('/device/api/v1/admission/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,AdmissionController.getAdmission);
router.route('/device/api/v1/admission/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,AdmissionController.updateAdmission);    
router.route('/device/api/v1/admission/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,AdmissionController.partialUpdateAdmission);
router.route('/device/api/v1/admission/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,AdmissionController.softDeleteAdmission);
router.route('/device/api/v1/admission/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,AdmissionController.softDeleteManyAdmission);
router.route('/device/api/v1/admission/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,AdmissionController.bulkInsertAdmission);
router.route('/device/api/v1/admission/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,AdmissionController.bulkUpdateAdmission);
router.route('/device/api/v1/admission/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,AdmissionController.deleteAdmission);
router.route('/device/api/v1/admission/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,AdmissionController.deleteManyAdmission);

module.exports = router;
