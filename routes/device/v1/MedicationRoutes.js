/**
 * MedicationRoutes.js
 * @description :: CRUD API routes for Medication
 */

const express = require('express');
const router = express.Router();
const MedicationController = require('../../../controller/device/v1/MedicationController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/medication/create').post(auth(PLATFORM.DEVICE),checkRolePermission,MedicationController.addMedication);
router.route('/device/api/v1/medication/list').post(auth(PLATFORM.DEVICE),checkRolePermission,MedicationController.findAllMedication);
router.route('/device/api/v1/medication/count').post(auth(PLATFORM.DEVICE),checkRolePermission,MedicationController.getMedicationCount);
router.route('/device/api/v1/medication/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,MedicationController.getMedication);
router.route('/device/api/v1/medication/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,MedicationController.updateMedication);    
router.route('/device/api/v1/medication/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,MedicationController.partialUpdateMedication);
router.route('/device/api/v1/medication/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,MedicationController.softDeleteMedication);
router.route('/device/api/v1/medication/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,MedicationController.softDeleteManyMedication);
router.route('/device/api/v1/medication/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,MedicationController.bulkInsertMedication);
router.route('/device/api/v1/medication/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,MedicationController.bulkUpdateMedication);
router.route('/device/api/v1/medication/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,MedicationController.deleteMedication);
router.route('/device/api/v1/medication/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,MedicationController.deleteManyMedication);

module.exports = router;
