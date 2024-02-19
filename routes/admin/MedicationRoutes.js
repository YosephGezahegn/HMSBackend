/**
 * MedicationRoutes.js
 * @description :: CRUD API routes for Medication
 */

const express = require('express');
const router = express.Router();
const MedicationController = require('../../controller/admin/MedicationController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/medication/create').post(auth(PLATFORM.ADMIN),checkRolePermission,MedicationController.addMedication);
router.route('/admin/medication/list').post(auth(PLATFORM.ADMIN),checkRolePermission,MedicationController.findAllMedication);
router.route('/admin/medication/count').post(auth(PLATFORM.ADMIN),checkRolePermission,MedicationController.getMedicationCount);
router.route('/admin/medication/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,MedicationController.getMedication);
router.route('/admin/medication/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,MedicationController.updateMedication);    
router.route('/admin/medication/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,MedicationController.partialUpdateMedication);
router.route('/admin/medication/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,MedicationController.softDeleteMedication);
router.route('/admin/medication/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,MedicationController.softDeleteManyMedication);
router.route('/admin/medication/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,MedicationController.bulkInsertMedication);
router.route('/admin/medication/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,MedicationController.bulkUpdateMedication);
router.route('/admin/medication/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,MedicationController.deleteMedication);
router.route('/admin/medication/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,MedicationController.deleteManyMedication);

module.exports = router;
