/**
 * PatientsRoutes.js
 * @description :: CRUD API routes for Patients
 */

const express = require('express');
const router = express.Router();
const PatientsController = require('../../controller/admin/PatientsController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/patients/create').post(auth(PLATFORM.ADMIN),checkRolePermission,PatientsController.addPatients);
router.route('/admin/patients/list').post(auth(PLATFORM.ADMIN),checkRolePermission,PatientsController.findAllPatients);
router.route('/admin/patients/count').post(auth(PLATFORM.ADMIN),checkRolePermission,PatientsController.getPatientsCount);
router.route('/admin/patients/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,PatientsController.getPatients);
router.route('/admin/patients/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,PatientsController.updatePatients);    
router.route('/admin/patients/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,PatientsController.partialUpdatePatients);
router.route('/admin/patients/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,PatientsController.softDeletePatients);
router.route('/admin/patients/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,PatientsController.softDeleteManyPatients);
router.route('/admin/patients/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,PatientsController.bulkInsertPatients);
router.route('/admin/patients/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,PatientsController.bulkUpdatePatients);
router.route('/admin/patients/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,PatientsController.deletePatients);
router.route('/admin/patients/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,PatientsController.deleteManyPatients);

module.exports = router;
