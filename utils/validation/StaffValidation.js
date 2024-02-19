/**
 * StaffValidation.js
 * @description :: validate each post and put request as per Staff model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

const { convertObjectToEnum } = require('../common');  
const StaffPositionDefault = require('../../constants/StaffPosition');    

/** validation keys and properties of Staff */
exports.schemaKeys = joi.object({
  StaffID: joi.number().integer().allow(0),
  FirstName: joi.any(),
  LastName: joi.any(),
  Gender: joi.string().allow(null).allow(''),
  JobPosition: joi.valid(...convertObjectToEnum(StaffPositionDefault.JobPosition)),
  DepartmentID: joi.number().integer().allow(0),
  ContactNumber: joi.any(),
  Email: joi.any(),
  Address: joi.any(),
  City: joi.any(),
  State: joi.any(),
  ZipCode: joi.any(),
  Qualifications: joi.any(),
  HireDate: joi.date().options({ convert: true }).allow(null).allow(''),
  Salary: joi.number().integer().allow(0),
  Shift: joi.any(),
  Username: joi.any(),
  PasswordHash: joi.any(),
  LicenseNumber: joi.any(),
  Specialization: joi.any(),
  EmergencyContactName: joi.any(),
  EmergencyContactNumber: joi.any(),
  Certification: joi.any(),
  TrainingProgram: joi.any(),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of Staff for updation */
exports.updateSchemaKeys = joi.object({
  StaffID: joi.number().integer().allow(0),
  FirstName: joi.any(),
  LastName: joi.any(),
  Gender: joi.string().allow(null).allow(''),
  JobPosition: joi.valid(...convertObjectToEnum(StaffPositionDefault.JobPosition)),
  DepartmentID: joi.number().integer().allow(0),
  ContactNumber: joi.any(),
  Email: joi.any(),
  Address: joi.any(),
  City: joi.any(),
  State: joi.any(),
  ZipCode: joi.any(),
  Qualifications: joi.any(),
  HireDate: joi.date().options({ convert: true }).allow(null).allow(''),
  Salary: joi.number().integer().allow(0),
  Shift: joi.any(),
  Username: joi.any(),
  PasswordHash: joi.any(),
  LicenseNumber: joi.any(),
  Specialization: joi.any(),
  EmergencyContactName: joi.any(),
  EmergencyContactNumber: joi.any(),
  Certification: joi.any(),
  TrainingProgram: joi.any(),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of Staff for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      StaffID: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      FirstName: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      LastName: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      Gender: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      DepartmentID: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      ContactNumber: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      Email: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      Address: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      City: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      State: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      ZipCode: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      Qualifications: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      HireDate: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      Salary: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      Shift: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      Username: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      PasswordHash: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      LicenseNumber: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      Specialization: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      EmergencyContactName: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      EmergencyContactNumber: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      Certification: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      TrainingProgram: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
