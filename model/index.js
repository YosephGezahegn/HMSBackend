/**
 * index.js
 * @description :: exports all the models and its relationships among other models
 */

const dbConnection = require('../config/dbConnection');
const db = {};
db.sequelize = dbConnection;

db.Staff = require('./Staff');
db.Rooms = require('./Rooms');
db.Medication = require('./Medication');
db.Inpatient = require('./Inpatient');
db.FinancialManagement = require('./FinancialManagement');
db.Department = require('./Department');
db.Appointment = require('./Appointment');
db.Patients = require('./Patients');
db.Admission = require('./Admission');
db.user = require('./user');
db.userAuthSettings = require('./userAuthSettings');
db.userTokens = require('./userTokens');
db.role = require('./role');
db.projectRoute = require('./projectRoute');
db.routeRole = require('./routeRole');
db.userRole = require('./userRole');

db.Rooms.belongsTo(db.Staff, {
  foreignKey: 'AssignedNurseID',
  as: '_AssignedNurseID',
  targetKey: 'id' 
});
db.Staff.hasMany(db.Rooms, {
  foreignKey: 'AssignedNurseID',
  sourceKey: 'id' 
});
db.Rooms.belongsTo(db.Staff, {
  foreignKey: 'AssignedDoctorID',
  as: '_AssignedDoctorID',
  targetKey: 'id' 
});
db.Staff.hasMany(db.Rooms, {
  foreignKey: 'AssignedDoctorID',
  sourceKey: 'id' 
});
db.Medication.belongsTo(db.Staff, {
  foreignKey: 'PrescribingDoctorID',
  as: '_PrescribingDoctorID',
  targetKey: 'id' 
});
db.Staff.hasMany(db.Medication, {
  foreignKey: 'PrescribingDoctorID',
  sourceKey: 'id' 
});
db.Inpatient.belongsTo(db.Staff, {
  foreignKey: 'ResponsibleStaffID',
  as: '_ResponsibleStaffID',
  targetKey: 'id' 
});
db.Staff.hasMany(db.Inpatient, {
  foreignKey: 'ResponsibleStaffID',
  sourceKey: 'id' 
});
db.FinancialManagement.belongsTo(db.Staff, {
  foreignKey: 'PatientID',
  as: '_PatientID',
  targetKey: 'id' 
});
db.Staff.hasMany(db.FinancialManagement, {
  foreignKey: 'PatientID',
  sourceKey: 'id' 
});
db.FinancialManagement.belongsTo(db.Staff, {
  foreignKey: 'ResponsibleStaffID',
  as: '_ResponsibleStaffID',
  targetKey: 'id' 
});
db.Staff.hasMany(db.FinancialManagement, {
  foreignKey: 'ResponsibleStaffID',
  sourceKey: 'id' 
});
db.Department.belongsTo(db.Staff, {
  foreignKey: 'Head',
  as: '_Head',
  targetKey: 'id' 
});
db.Staff.hasMany(db.Department, {
  foreignKey: 'Head',
  sourceKey: 'id' 
});
db.Appointment.belongsTo(db.Staff, {
  foreignKey: 'StaffID',
  as: '_StaffID',
  targetKey: 'id' 
});
db.Staff.hasMany(db.Appointment, {
  foreignKey: 'StaffID',
  sourceKey: 'id' 
});
db.Inpatient.belongsTo(db.Rooms, {
  foreignKey: 'RoomID',
  as: '_RoomID',
  targetKey: 'id' 
});
db.Rooms.hasMany(db.Inpatient, {
  foreignKey: 'RoomID',
  sourceKey: 'id' 
});
db.Staff.belongsTo(db.Department, {
  foreignKey: 'DepartmentID',
  as: '_DepartmentID',
  targetKey: 'id' 
});
db.Department.hasMany(db.Staff, {
  foreignKey: 'DepartmentID',
  sourceKey: 'id' 
});
db.Appointment.belongsTo(db.Department, {
  foreignKey: 'DepartmentID',
  as: '_DepartmentID',
  targetKey: 'id' 
});
db.Department.hasMany(db.Appointment, {
  foreignKey: 'DepartmentID',
  sourceKey: 'id' 
});
db.Medication.belongsTo(db.Patients, {
  foreignKey: 'PatientID',
  as: '_PatientID',
  targetKey: 'id' 
});
db.Patients.hasMany(db.Medication, {
  foreignKey: 'PatientID',
  sourceKey: 'id' 
});
db.Inpatient.belongsTo(db.Patients, {
  foreignKey: 'PatientID',
  as: '_PatientID',
  targetKey: 'id' 
});
db.Patients.hasMany(db.Inpatient, {
  foreignKey: 'PatientID',
  sourceKey: 'id' 
});
db.Appointment.belongsTo(db.Patients, {
  foreignKey: 'PatientID',
  as: '_PatientID',
  targetKey: 'id' 
});
db.Patients.hasMany(db.Appointment, {
  foreignKey: 'PatientID',
  sourceKey: 'id' 
});
db.Staff.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.Staff, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.Staff.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.Staff, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.Rooms.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.Rooms, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.Rooms.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.Rooms, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.Medication.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.Medication, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.Medication.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.Medication, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.Inpatient.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.Inpatient, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.Inpatient.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.Inpatient, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.FinancialManagement.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.FinancialManagement, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.FinancialManagement.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.FinancialManagement, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.Department.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.Department, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.Department.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.Department, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.Appointment.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.Appointment, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.Appointment.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.Appointment, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.Patients.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.Patients, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.Patients.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.Patients, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.Admission.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.Admission, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.Admission.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.Admission, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.user.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.user, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.user.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.user, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.userAuthSettings.belongsTo(db.user, {
  foreignKey: 'userId',
  as: '_userId',
  targetKey: 'id' 
});
db.user.hasMany(db.userAuthSettings, {
  foreignKey: 'userId',
  sourceKey: 'id' 
});
db.userAuthSettings.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.userAuthSettings, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.userAuthSettings.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.userAuthSettings, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.userTokens.belongsTo(db.user, {
  foreignKey: 'userId',
  as: '_userId',
  targetKey: 'id' 
});
db.user.hasMany(db.userTokens, {
  foreignKey: 'userId',
  sourceKey: 'id' 
});
db.userTokens.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.userTokens, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.userTokens.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.userTokens, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.userRole.belongsTo(db.user, {
  foreignKey: 'userId',
  as: '_userId',
  targetKey: 'id' 
});
db.user.hasMany(db.userRole, {
  foreignKey: 'userId',
  sourceKey: 'id' 
});
db.routeRole.belongsTo(db.role, {
  foreignKey: 'roleId',
  as: '_roleId',
  targetKey: 'id' 
});
db.role.hasMany(db.routeRole, {
  foreignKey: 'roleId',
  sourceKey: 'id' 
});
db.userRole.belongsTo(db.role, {
  foreignKey: 'roleId',
  as: '_roleId',
  targetKey: 'id' 
});
db.role.hasMany(db.userRole, {
  foreignKey: 'roleId',
  sourceKey: 'id' 
});
db.routeRole.belongsTo(db.projectRoute, {
  foreignKey: 'routeId',
  as: '_routeId',
  targetKey: 'id' 
});
db.projectRoute.hasMany(db.routeRole, {
  foreignKey: 'routeId',
  sourceKey: 'id' 
});

module.exports = db;