/**
 * deleteDependent.js
 * @description :: exports deleteDependent service for project.
 */

let Staff = require('../model/Staff');
let Rooms = require('../model/Rooms');
let Medication = require('../model/Medication');
let Inpatient = require('../model/Inpatient');
let FinancialManagement = require('../model/FinancialManagement');
let Department = require('../model/Department');
let Appointment = require('../model/Appointment');
let Patients = require('../model/Patients');
let Admission = require('../model/Admission');
let User = require('../model/user');
let UserAuthSettings = require('../model/userAuthSettings');
let UserTokens = require('../model/userTokens');
let Role = require('../model/role');
let ProjectRoute = require('../model/projectRoute');
let RouteRole = require('../model/routeRole');
let UserRole = require('../model/userRole');
let dbService = require('.//dbService');

const deleteStaff = async (filter) =>{
  try {
    let staff = await dbService.findAll(Staff,filter);
    if (staff && staff.length){
      staff = staff.map((obj) => obj.id);

      const RoomsFilter = { $or: [{ AssignedNurseID : { $in : staff } },{ AssignedDoctorID : { $in : staff } }] };
      const RoomsCnt = await dbService.destroy(Rooms,RoomsFilter);

      const MedicationFilter = { $or: [{ PrescribingDoctorID : { $in : staff } }] };
      const MedicationCnt = await dbService.destroy(Medication,MedicationFilter);

      const InpatientFilter = { $or: [{ ResponsibleStaffID : { $in : staff } }] };
      const InpatientCnt = await dbService.destroy(Inpatient,InpatientFilter);

      const FinancialManagementFilter = { $or: [{ PatientID : { $in : staff } },{ ResponsibleStaffID : { $in : staff } }] };
      const FinancialManagementCnt = await dbService.destroy(FinancialManagement,FinancialManagementFilter);

      const DepartmentFilter = { $or: [{ Head : { $in : staff } }] };
      const DepartmentCnt = await dbService.destroy(Department,DepartmentFilter);

      const AppointmentFilter = { $or: [{ StaffID : { $in : staff } }] };
      const AppointmentCnt = await dbService.destroy(Appointment,AppointmentFilter);

      let deleted  = await dbService.destroy(Staff,filter);
      let response = {
        Rooms :RoomsCnt.length,
        Medication :MedicationCnt.length,
        Inpatient :InpatientCnt.length,
        FinancialManagement :FinancialManagementCnt.length,
        Department :DepartmentCnt.length,
        Appointment :AppointmentCnt.length,
      };
      return response; 
    } else {
      return {  staff : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRooms = async (filter) =>{
  try {
    let rooms = await dbService.findAll(Rooms,filter);
    if (rooms && rooms.length){
      rooms = rooms.map((obj) => obj.id);

      const InpatientFilter = { $or: [{ RoomID : { $in : rooms } }] };
      const InpatientCnt = await dbService.destroy(Inpatient,InpatientFilter);

      let deleted  = await dbService.destroy(Rooms,filter);
      let response = { Inpatient :InpatientCnt.length, };
      return response; 
    } else {
      return {  rooms : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteMedication = async (filter) =>{
  try {
    let response  = await dbService.destroy(Medication,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteInpatient = async (filter) =>{
  try {
    let response  = await dbService.destroy(Inpatient,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteFinancialManagement = async (filter) =>{
  try {
    let response  = await dbService.destroy(FinancialManagement,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteDepartment = async (filter) =>{
  try {
    let department = await dbService.findAll(Department,filter);
    if (department && department.length){
      department = department.map((obj) => obj.id);

      const StaffFilter = { $or: [{ DepartmentID : { $in : department } }] };
      const StaffCnt = await dbService.destroy(Staff,StaffFilter);

      const AppointmentFilter = { $or: [{ DepartmentID : { $in : department } }] };
      const AppointmentCnt = await dbService.destroy(Appointment,AppointmentFilter);

      let deleted  = await dbService.destroy(Department,filter);
      let response = {
        Staff :StaffCnt.length,
        Appointment :AppointmentCnt.length,
      };
      return response; 
    } else {
      return {  department : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteAppointment = async (filter) =>{
  try {
    let response  = await dbService.destroy(Appointment,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deletePatients = async (filter) =>{
  try {
    let patients = await dbService.findAll(Patients,filter);
    if (patients && patients.length){
      patients = patients.map((obj) => obj.id);

      const MedicationFilter = { $or: [{ PatientID : { $in : patients } }] };
      const MedicationCnt = await dbService.destroy(Medication,MedicationFilter);

      const InpatientFilter = { $or: [{ PatientID : { $in : patients } }] };
      const InpatientCnt = await dbService.destroy(Inpatient,InpatientFilter);

      const AppointmentFilter = { $or: [{ PatientID : { $in : patients } }] };
      const AppointmentCnt = await dbService.destroy(Appointment,AppointmentFilter);

      let deleted  = await dbService.destroy(Patients,filter);
      let response = {
        Medication :MedicationCnt.length,
        Inpatient :InpatientCnt.length,
        Appointment :AppointmentCnt.length,
      };
      return response; 
    } else {
      return {  patients : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteAdmission = async (filter) =>{
  try {
    let response  = await dbService.destroy(Admission,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUser = async (filter) =>{
  try {
    let user = await dbService.findAll(User,filter);
    if (user && user.length){
      user = user.map((obj) => obj.id);

      const StaffFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const StaffCnt = await dbService.destroy(Staff,StaffFilter);

      const RoomsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const RoomsCnt = await dbService.destroy(Rooms,RoomsFilter);

      const MedicationFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const MedicationCnt = await dbService.destroy(Medication,MedicationFilter);

      const InpatientFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const InpatientCnt = await dbService.destroy(Inpatient,InpatientFilter);

      const FinancialManagementFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const FinancialManagementCnt = await dbService.destroy(FinancialManagement,FinancialManagementFilter);

      const DepartmentFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const DepartmentCnt = await dbService.destroy(Department,DepartmentFilter);

      const AppointmentFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const AppointmentCnt = await dbService.destroy(Appointment,AppointmentFilter);

      const PatientsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const PatientsCnt = await dbService.destroy(Patients,PatientsFilter);

      const AdmissionFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const AdmissionCnt = await dbService.destroy(Admission,AdmissionFilter);

      const userFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userCnt = await dbService.destroy(User,userFilter);

      const userAuthSettingsFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userAuthSettingsCnt = await dbService.destroy(UserAuthSettings,userAuthSettingsFilter);

      const userTokensFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userTokensCnt = await dbService.destroy(UserTokens,userTokensFilter);

      const userRoleFilter = { $or: [{ userId : { $in : user } }] };
      const userRoleCnt = await dbService.destroy(UserRole,userRoleFilter);

      let deleted  = await dbService.destroy(User,filter);
      let response = {
        Staff :StaffCnt.length,
        Rooms :RoomsCnt.length,
        Medication :MedicationCnt.length,
        Inpatient :InpatientCnt.length,
        FinancialManagement :FinancialManagementCnt.length,
        Department :DepartmentCnt.length,
        Appointment :AppointmentCnt.length,
        Patients :PatientsCnt.length,
        Admission :AdmissionCnt.length,
        user :userCnt.length + deleted.length,
        userAuthSettings :userAuthSettingsCnt.length,
        userTokens :userTokensCnt.length,
        userRole :userRoleCnt.length,
      };
      return response; 
    } else {
      return {  user : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserAuthSettings = async (filter) =>{
  try {
    let response  = await dbService.destroy(UserAuthSettings,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserTokens = async (filter) =>{
  try {
    let response  = await dbService.destroy(UserTokens,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRole = async (filter) =>{
  try {
    let role = await dbService.findAll(Role,filter);
    if (role && role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const routeRoleCnt = await dbService.destroy(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const userRoleCnt = await dbService.destroy(UserRole,userRoleFilter);

      let deleted  = await dbService.destroy(Role,filter);
      let response = {
        routeRole :routeRoleCnt.length,
        userRole :userRoleCnt.length,
      };
      return response; 
    } else {
      return {  role : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteProjectRoute = async (filter) =>{
  try {
    let projectroute = await dbService.findAll(ProjectRoute,filter);
    if (projectroute && projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ routeId : { $in : projectroute } }] };
      const routeRoleCnt = await dbService.destroy(RouteRole,routeRoleFilter);

      let deleted  = await dbService.destroy(ProjectRoute,filter);
      let response = { routeRole :routeRoleCnt.length, };
      return response; 
    } else {
      return {  projectroute : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRouteRole = async (filter) =>{
  try {
    let response  = await dbService.destroy(RouteRole,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserRole = async (filter) =>{
  try {
    let response  = await dbService.destroy(UserRole,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const countStaff = async (filter) =>{
  try {
    let staff = await dbService.findAll(Staff,filter);
    if (staff && staff.length){
      staff = staff.map((obj) => obj.id);

      const RoomsFilter = { $or: [{ AssignedNurseID : { $in : staff } },{ AssignedDoctorID : { $in : staff } }] };
      const RoomsCnt =  await dbService.count(Rooms,RoomsFilter);

      const MedicationFilter = { $or: [{ PrescribingDoctorID : { $in : staff } }] };
      const MedicationCnt =  await dbService.count(Medication,MedicationFilter);

      const InpatientFilter = { $or: [{ ResponsibleStaffID : { $in : staff } }] };
      const InpatientCnt =  await dbService.count(Inpatient,InpatientFilter);

      const FinancialManagementFilter = { $or: [{ PatientID : { $in : staff } },{ ResponsibleStaffID : { $in : staff } }] };
      const FinancialManagementCnt =  await dbService.count(FinancialManagement,FinancialManagementFilter);

      const DepartmentFilter = { $or: [{ Head : { $in : staff } }] };
      const DepartmentCnt =  await dbService.count(Department,DepartmentFilter);

      const AppointmentFilter = { $or: [{ StaffID : { $in : staff } }] };
      const AppointmentCnt =  await dbService.count(Appointment,AppointmentFilter);

      let response = {
        Rooms : RoomsCnt,
        Medication : MedicationCnt,
        Inpatient : InpatientCnt,
        FinancialManagement : FinancialManagementCnt,
        Department : DepartmentCnt,
        Appointment : AppointmentCnt,
      };
      return response; 
    } else {
      return {  staff : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countRooms = async (filter) =>{
  try {
    let rooms = await dbService.findAll(Rooms,filter);
    if (rooms && rooms.length){
      rooms = rooms.map((obj) => obj.id);

      const InpatientFilter = { $or: [{ RoomID : { $in : rooms } }] };
      const InpatientCnt =  await dbService.count(Inpatient,InpatientFilter);

      let response = { Inpatient : InpatientCnt, };
      return response; 
    } else {
      return {  rooms : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countMedication = async (filter) =>{
  try {
    const MedicationCnt =  await dbService.count(Medication,filter);
    return { Medication : MedicationCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countInpatient = async (filter) =>{
  try {
    const InpatientCnt =  await dbService.count(Inpatient,filter);
    return { Inpatient : InpatientCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countFinancialManagement = async (filter) =>{
  try {
    const FinancialManagementCnt =  await dbService.count(FinancialManagement,filter);
    return { FinancialManagement : FinancialManagementCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countDepartment = async (filter) =>{
  try {
    let department = await dbService.findAll(Department,filter);
    if (department && department.length){
      department = department.map((obj) => obj.id);

      const StaffFilter = { $or: [{ DepartmentID : { $in : department } }] };
      const StaffCnt =  await dbService.count(Staff,StaffFilter);

      const AppointmentFilter = { $or: [{ DepartmentID : { $in : department } }] };
      const AppointmentCnt =  await dbService.count(Appointment,AppointmentFilter);

      let response = {
        Staff : StaffCnt,
        Appointment : AppointmentCnt,
      };
      return response; 
    } else {
      return {  department : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countAppointment = async (filter) =>{
  try {
    const AppointmentCnt =  await dbService.count(Appointment,filter);
    return { Appointment : AppointmentCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countPatients = async (filter) =>{
  try {
    let patients = await dbService.findAll(Patients,filter);
    if (patients && patients.length){
      patients = patients.map((obj) => obj.id);

      const MedicationFilter = { $or: [{ PatientID : { $in : patients } }] };
      const MedicationCnt =  await dbService.count(Medication,MedicationFilter);

      const InpatientFilter = { $or: [{ PatientID : { $in : patients } }] };
      const InpatientCnt =  await dbService.count(Inpatient,InpatientFilter);

      const AppointmentFilter = { $or: [{ PatientID : { $in : patients } }] };
      const AppointmentCnt =  await dbService.count(Appointment,AppointmentFilter);

      let response = {
        Medication : MedicationCnt,
        Inpatient : InpatientCnt,
        Appointment : AppointmentCnt,
      };
      return response; 
    } else {
      return {  patients : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countAdmission = async (filter) =>{
  try {
    const AdmissionCnt =  await dbService.count(Admission,filter);
    return { Admission : AdmissionCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUser = async (filter) =>{
  try {
    let user = await dbService.findAll(User,filter);
    if (user && user.length){
      user = user.map((obj) => obj.id);

      const StaffFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const StaffCnt =  await dbService.count(Staff,StaffFilter);

      const RoomsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const RoomsCnt =  await dbService.count(Rooms,RoomsFilter);

      const MedicationFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const MedicationCnt =  await dbService.count(Medication,MedicationFilter);

      const InpatientFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const InpatientCnt =  await dbService.count(Inpatient,InpatientFilter);

      const FinancialManagementFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const FinancialManagementCnt =  await dbService.count(FinancialManagement,FinancialManagementFilter);

      const DepartmentFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const DepartmentCnt =  await dbService.count(Department,DepartmentFilter);

      const AppointmentFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const AppointmentCnt =  await dbService.count(Appointment,AppointmentFilter);

      const PatientsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const PatientsCnt =  await dbService.count(Patients,PatientsFilter);

      const AdmissionFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const AdmissionCnt =  await dbService.count(Admission,AdmissionFilter);

      const userFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userCnt =  await dbService.count(User,userFilter);

      const userAuthSettingsFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userAuthSettingsCnt =  await dbService.count(UserAuthSettings,userAuthSettingsFilter);

      const userTokensFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userTokensCnt =  await dbService.count(UserTokens,userTokensFilter);

      const userRoleFilter = { $or: [{ userId : { $in : user } }] };
      const userRoleCnt =  await dbService.count(UserRole,userRoleFilter);

      let response = {
        Staff : StaffCnt,
        Rooms : RoomsCnt,
        Medication : MedicationCnt,
        Inpatient : InpatientCnt,
        FinancialManagement : FinancialManagementCnt,
        Department : DepartmentCnt,
        Appointment : AppointmentCnt,
        Patients : PatientsCnt,
        Admission : AdmissionCnt,
        user : userCnt,
        userAuthSettings : userAuthSettingsCnt,
        userTokens : userTokensCnt,
        userRole : userRoleCnt,
      };
      return response; 
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserAuthSettings = async (filter) =>{
  try {
    const userAuthSettingsCnt =  await dbService.count(UserAuthSettings,filter);
    return { userAuthSettings : userAuthSettingsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserTokens = async (filter) =>{
  try {
    const userTokensCnt =  await dbService.count(UserTokens,filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countRole = async (filter) =>{
  try {
    let role = await dbService.findAll(Role,filter);
    if (role && role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const userRoleCnt =  await dbService.count(UserRole,userRoleFilter);

      let response = {
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response; 
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countProjectRoute = async (filter) =>{
  try {
    let projectroute = await dbService.findAll(ProjectRoute,filter);
    if (projectroute && projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ routeId : { $in : projectroute } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      let response = { routeRole : routeRoleCnt, };
      return response; 
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countRouteRole = async (filter) =>{
  try {
    const routeRoleCnt =  await dbService.count(RouteRole,filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserRole = async (filter) =>{
  try {
    const userRoleCnt =  await dbService.count(UserRole,filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteStaff = async (filter,updateBody) =>{  
  try {
    let staff = await dbService.findAll(Staff,filter, { id:1 });
    if (staff.length){
      staff = staff.map((obj) => obj.id);

      const RoomsFilter = { '$or': [{ AssignedNurseID : { '$in' : staff } },{ AssignedDoctorID : { '$in' : staff } }] };
      const RoomsCnt = await dbService.update(Rooms,RoomsFilter,updateBody);

      const MedicationFilter = { '$or': [{ PrescribingDoctorID : { '$in' : staff } }] };
      const MedicationCnt = await dbService.update(Medication,MedicationFilter,updateBody);

      const InpatientFilter = { '$or': [{ ResponsibleStaffID : { '$in' : staff } }] };
      const InpatientCnt = await dbService.update(Inpatient,InpatientFilter,updateBody);

      const FinancialManagementFilter = { '$or': [{ PatientID : { '$in' : staff } },{ ResponsibleStaffID : { '$in' : staff } }] };
      const FinancialManagementCnt = await dbService.update(FinancialManagement,FinancialManagementFilter,updateBody);

      const DepartmentFilter = { '$or': [{ Head : { '$in' : staff } }] };
      const DepartmentCnt = await dbService.update(Department,DepartmentFilter,updateBody);

      const AppointmentFilter = { '$or': [{ StaffID : { '$in' : staff } }] };
      const AppointmentCnt = await dbService.update(Appointment,AppointmentFilter,updateBody);
      let updated = await dbService.update(Staff,filter,updateBody);

      let response = {
        Rooms :RoomsCnt.length,
        Medication :MedicationCnt.length,
        Inpatient :InpatientCnt.length,
        FinancialManagement :FinancialManagementCnt.length,
        Department :DepartmentCnt.length,
        Appointment :AppointmentCnt.length,
      };
      return response;
    } else {
      return {  staff : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRooms = async (filter,updateBody) =>{  
  try {
    let rooms = await dbService.findAll(Rooms,filter, { id:1 });
    if (rooms.length){
      rooms = rooms.map((obj) => obj.id);

      const InpatientFilter = { '$or': [{ RoomID : { '$in' : rooms } }] };
      const InpatientCnt = await dbService.update(Inpatient,InpatientFilter,updateBody);
      let updated = await dbService.update(Rooms,filter,updateBody);

      let response = { Inpatient :InpatientCnt.length, };
      return response;
    } else {
      return {  rooms : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteMedication = async (filter,updateBody) =>{  
  try {
    const MedicationCnt =  await dbService.update(Medication,filter);
    return { Medication : MedicationCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteInpatient = async (filter,updateBody) =>{  
  try {
    const InpatientCnt =  await dbService.update(Inpatient,filter);
    return { Inpatient : InpatientCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteFinancialManagement = async (filter,updateBody) =>{  
  try {
    const FinancialManagementCnt =  await dbService.update(FinancialManagement,filter);
    return { FinancialManagement : FinancialManagementCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteDepartment = async (filter,updateBody) =>{  
  try {
    let department = await dbService.findAll(Department,filter, { id:1 });
    if (department.length){
      department = department.map((obj) => obj.id);

      const StaffFilter = { '$or': [{ DepartmentID : { '$in' : department } }] };
      const StaffCnt = await dbService.update(Staff,StaffFilter,updateBody);

      const AppointmentFilter = { '$or': [{ DepartmentID : { '$in' : department } }] };
      const AppointmentCnt = await dbService.update(Appointment,AppointmentFilter,updateBody);
      let updated = await dbService.update(Department,filter,updateBody);

      let response = {
        Staff :StaffCnt.length,
        Appointment :AppointmentCnt.length,
      };
      return response;
    } else {
      return {  department : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteAppointment = async (filter,updateBody) =>{  
  try {
    const AppointmentCnt =  await dbService.update(Appointment,filter);
    return { Appointment : AppointmentCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeletePatients = async (filter,updateBody) =>{  
  try {
    let patients = await dbService.findAll(Patients,filter, { id:1 });
    if (patients.length){
      patients = patients.map((obj) => obj.id);

      const MedicationFilter = { '$or': [{ PatientID : { '$in' : patients } }] };
      const MedicationCnt = await dbService.update(Medication,MedicationFilter,updateBody);

      const InpatientFilter = { '$or': [{ PatientID : { '$in' : patients } }] };
      const InpatientCnt = await dbService.update(Inpatient,InpatientFilter,updateBody);

      const AppointmentFilter = { '$or': [{ PatientID : { '$in' : patients } }] };
      const AppointmentCnt = await dbService.update(Appointment,AppointmentFilter,updateBody);
      let updated = await dbService.update(Patients,filter,updateBody);

      let response = {
        Medication :MedicationCnt.length,
        Inpatient :InpatientCnt.length,
        Appointment :AppointmentCnt.length,
      };
      return response;
    } else {
      return {  patients : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteAdmission = async (filter,updateBody) =>{  
  try {
    const AdmissionCnt =  await dbService.update(Admission,filter);
    return { Admission : AdmissionCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUser = async (filter,updateBody) =>{  
  try {
    let user = await dbService.findAll(User,filter, { id:1 });
    if (user.length){
      user = user.map((obj) => obj.id);

      const StaffFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const StaffCnt = await dbService.update(Staff,StaffFilter,updateBody);

      const RoomsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const RoomsCnt = await dbService.update(Rooms,RoomsFilter,updateBody);

      const MedicationFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const MedicationCnt = await dbService.update(Medication,MedicationFilter,updateBody);

      const InpatientFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const InpatientCnt = await dbService.update(Inpatient,InpatientFilter,updateBody);

      const FinancialManagementFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const FinancialManagementCnt = await dbService.update(FinancialManagement,FinancialManagementFilter,updateBody);

      const DepartmentFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const DepartmentCnt = await dbService.update(Department,DepartmentFilter,updateBody);

      const AppointmentFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const AppointmentCnt = await dbService.update(Appointment,AppointmentFilter,updateBody);

      const PatientsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const PatientsCnt = await dbService.update(Patients,PatientsFilter,updateBody);

      const AdmissionFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const AdmissionCnt = await dbService.update(Admission,AdmissionFilter,updateBody);

      const userFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userCnt = await dbService.update(User,userFilter,updateBody);

      const userAuthSettingsFilter = { '$or': [{ userId : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userAuthSettingsCnt = await dbService.update(UserAuthSettings,userAuthSettingsFilter,updateBody);

      const userTokensFilter = { '$or': [{ userId : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userTokensCnt = await dbService.update(UserTokens,userTokensFilter,updateBody);

      const userRoleFilter = { '$or': [{ userId : { '$in' : user } }] };
      const userRoleCnt = await dbService.update(UserRole,userRoleFilter,updateBody);
      let updated = await dbService.update(User,filter,updateBody);

      let response = {
        Staff :StaffCnt.length,
        Rooms :RoomsCnt.length,
        Medication :MedicationCnt.length,
        Inpatient :InpatientCnt.length,
        FinancialManagement :FinancialManagementCnt.length,
        Department :DepartmentCnt.length,
        Appointment :AppointmentCnt.length,
        Patients :PatientsCnt.length,
        Admission :AdmissionCnt.length,
        user :userCnt.length + updated.length,
        userAuthSettings :userAuthSettingsCnt.length,
        userTokens :userTokensCnt.length,
        userRole :userRoleCnt.length,
      };
      return response;
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserAuthSettings = async (filter,updateBody) =>{  
  try {
    const userAuthSettingsCnt =  await dbService.update(UserAuthSettings,filter);
    return { userAuthSettings : userAuthSettingsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserTokens = async (filter,updateBody) =>{  
  try {
    const userTokensCnt =  await dbService.update(UserTokens,filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRole = async (filter,updateBody) =>{  
  try {
    let role = await dbService.findAll(Role,filter, { id:1 });
    if (role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { '$or': [{ roleId : { '$in' : role } }] };
      const routeRoleCnt = await dbService.update(RouteRole,routeRoleFilter,updateBody);

      const userRoleFilter = { '$or': [{ roleId : { '$in' : role } }] };
      const userRoleCnt = await dbService.update(UserRole,userRoleFilter,updateBody);
      let updated = await dbService.update(Role,filter,updateBody);

      let response = {
        routeRole :routeRoleCnt.length,
        userRole :userRoleCnt.length,
      };
      return response;
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteProjectRoute = async (filter,updateBody) =>{  
  try {
    let projectroute = await dbService.findAll(ProjectRoute,filter, { id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { '$or': [{ routeId : { '$in' : projectroute } }] };
      const routeRoleCnt = await dbService.update(RouteRole,routeRoleFilter,updateBody);
      let updated = await dbService.update(ProjectRoute,filter,updateBody);

      let response = { routeRole :routeRoleCnt.length, };
      return response;
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRouteRole = async (filter,updateBody) =>{  
  try {
    const routeRoleCnt =  await dbService.update(RouteRole,filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserRole = async (filter,updateBody) =>{  
  try {
    const userRoleCnt =  await dbService.update(UserRole,filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

module.exports = {
  deleteStaff,
  deleteRooms,
  deleteMedication,
  deleteInpatient,
  deleteFinancialManagement,
  deleteDepartment,
  deleteAppointment,
  deletePatients,
  deleteAdmission,
  deleteUser,
  deleteUserAuthSettings,
  deleteUserTokens,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countStaff,
  countRooms,
  countMedication,
  countInpatient,
  countFinancialManagement,
  countDepartment,
  countAppointment,
  countPatients,
  countAdmission,
  countUser,
  countUserAuthSettings,
  countUserTokens,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeleteStaff,
  softDeleteRooms,
  softDeleteMedication,
  softDeleteInpatient,
  softDeleteFinancialManagement,
  softDeleteDepartment,
  softDeleteAppointment,
  softDeletePatients,
  softDeleteAdmission,
  softDeleteUser,
  softDeleteUserAuthSettings,
  softDeleteUserTokens,
  softDeleteRole,
  softDeleteProjectRoute,
  softDeleteRouteRole,
  softDeleteUserRole,
};
