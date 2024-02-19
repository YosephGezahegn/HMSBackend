/**
 * AdmissionRoutes.js
 * @description :: CRUD API routes for Admission
 */

const express = require('express');
const router = express.Router();
const AdmissionController = require('../../controller/admin/AdmissionController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/admission/create').post(auth(PLATFORM.ADMIN),checkRolePermission,AdmissionController.addAdmission);
router.route('/admin/admission/list').post(auth(PLATFORM.ADMIN),checkRolePermission,AdmissionController.findAllAdmission);
router.route('/admin/admission/count').post(auth(PLATFORM.ADMIN),checkRolePermission,AdmissionController.getAdmissionCount);
router.route('/admin/admission/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,AdmissionController.getAdmission);
router.route('/admin/admission/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,AdmissionController.updateAdmission);    
router.route('/admin/admission/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,AdmissionController.partialUpdateAdmission);
router.route('/admin/admission/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,AdmissionController.softDeleteAdmission);
router.route('/admin/admission/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,AdmissionController.softDeleteManyAdmission);
router.route('/admin/admission/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,AdmissionController.bulkInsertAdmission);
router.route('/admin/admission/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,AdmissionController.bulkUpdateAdmission);
router.route('/admin/admission/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,AdmissionController.deleteAdmission);
router.route('/admin/admission/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,AdmissionController.deleteManyAdmission);

module.exports = router;
