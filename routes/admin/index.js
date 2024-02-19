/**
 * index route file of admin platform.
 * @description: exports all routes of admin platform.
 */
const express =  require('express');
const router =  express.Router();
router.use('/admin/auth',require('./auth'));
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
router.use(require('./roleRoutes'));
router.use(require('./projectRouteRoutes'));
router.use(require('./routeRoleRoutes'));
router.use(require('./userRoleRoutes'));
router.use(require('./uploadRoutes'));

module.exports = router;
