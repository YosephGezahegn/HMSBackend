/**
 * PatientsRoutes.js
 * @description :: CRUD API routes for Patients
 */

const express = require('express');
const router = express.Router();
const PatientsController = require('../../../controller/device/v1/PatientsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/patients/create').post(auth(PLATFORM.DEVICE),checkRolePermission,PatientsController.addPatients);
router.route('/device/api/v1/patients/list').post(auth(PLATFORM.DEVICE),checkRolePermission,PatientsController.findAllPatients);
router.route('/device/api/v1/patients/count').post(auth(PLATFORM.DEVICE),checkRolePermission,PatientsController.getPatientsCount);
router.route('/device/api/v1/patients/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,PatientsController.getPatients);
router.route('/device/api/v1/patients/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,PatientsController.updatePatients);    
router.route('/device/api/v1/patients/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,PatientsController.partialUpdatePatients);
router.route('/device/api/v1/patients/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,PatientsController.softDeletePatients);
router.route('/device/api/v1/patients/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,PatientsController.softDeleteManyPatients);
router.route('/device/api/v1/patients/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,PatientsController.bulkInsertPatients);
router.route('/device/api/v1/patients/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,PatientsController.bulkUpdatePatients);
router.route('/device/api/v1/patients/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,PatientsController.deletePatients);
router.route('/device/api/v1/patients/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,PatientsController.deleteManyPatients);

module.exports = router;
