/**
 * AppointmentValidation.js
 * @description :: validate each post and put request as per Appointment model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

const { convertObjectToEnum } = require('../common');  
const AppointmentDefault = require('../../constants/Appointment');    

/** validation keys and properties of Appointment */
exports.schemaKeys = joi.object({
  AppointmentID: joi.number().integer().allow(0),
  PatientID: joi.number().integer().allow(0),
  StaffID: joi.number().integer().allow(0),
  DepartmentID: joi.number().integer().allow(0),
  AppointmentDate: joi.date().options({ convert: true }).allow(null).allow(''),
  AppointmentTime: joi.date().options({ convert: true }).allow(null).allow(''),
  Purpose: joi.any(),
  Status: joi.valid(...convertObjectToEnum(AppointmentDefault.Status)),
  Notes: joi.any(),
  CreationDate: joi.date().options({ convert: true }).allow(null).allow(''),
  LastUpdate: joi.date().options({ convert: true }).allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of Appointment for updation */
exports.updateSchemaKeys = joi.object({
  AppointmentID: joi.number().integer().allow(0),
  PatientID: joi.number().integer().allow(0),
  StaffID: joi.number().integer().allow(0),
  DepartmentID: joi.number().integer().allow(0),
  AppointmentDate: joi.date().options({ convert: true }).allow(null).allow(''),
  AppointmentTime: joi.date().options({ convert: true }).allow(null).allow(''),
  Purpose: joi.any(),
  Status: joi.valid(...convertObjectToEnum(AppointmentDefault.Status)),
  Notes: joi.any(),
  CreationDate: joi.date().options({ convert: true }).allow(null).allow(''),
  LastUpdate: joi.date().options({ convert: true }).allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of Appointment for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      AppointmentID: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      PatientID: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      StaffID: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      DepartmentID: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      AppointmentDate: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      AppointmentTime: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      Purpose: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      Notes: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      CreationDate: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      LastUpdate: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
