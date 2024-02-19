/**
 * index route file of device platform.
 * @description: exports all routes of device platform.
 */
const express =  require('express');
const router =  express.Router();
router.use('/device/auth',require('./auth'));
router.use(require('./StaffRoutes'));
router.use(require('./RoomsRoutes'));
router.use(require('./MedicationRoutes'));
router.use(require('./InpatientRoutes'));
router.use(require('./FinancialManagementRoutes'));
router.use(require('./DepartmentRoutes'));
router.use(require('./AppointmentRoutes'));
router.use(require('./PatientsRoutes'));
router.use(require('./AdmissionRoutes'));
router.use(require('./userRoutes'));
router.use(require('./uploadRoutes'));

module.exports = router;
