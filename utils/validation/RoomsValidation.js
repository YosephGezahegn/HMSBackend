/**
 * RoomsValidation.js
 * @description :: validate each post and put request as per Rooms model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

const { convertObjectToEnum } = require('../common');  
const AccreditationStatusDefault = require('../../constants/AccreditationStatus');    

/** validation keys and properties of Rooms */
exports.schemaKeys = joi.object({
  RoomNumber: joi.number().integer().allow(0),
  RoomType: joi.any(),
  Capacity: joi.number().integer().allow(0),
  AvailabilityStatus: joi.valid(...convertObjectToEnum(AccreditationStatusDefault.AvailabilityStatus)),
  FacilitiesAvailable: joi.any(),
  CleanlinessStatus: joi.string().allow(null).allow(''),
  AssignedNurseID: joi.number().integer().allow(0),
  AssignedDoctorID: joi.number().integer().allow(0),
  AdmitDate: joi.date().options({ convert: true }).allow(null).allow(''),
  DischargeDate: joi.date().options({ convert: true }).allow(null).allow(''),
  LastCleaningDate: joi.date().options({ convert: true }).allow(null).allow(''),
  NextCleaningDate: joi.date().options({ convert: true }).allow(null).allow(''),
  Comments: joi.any(),
  CreatedAt: joi.date().options({ convert: true }).allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of Rooms for updation */
exports.updateSchemaKeys = joi.object({
  RoomNumber: joi.number().integer().allow(0),
  RoomType: joi.any(),
  Capacity: joi.number().integer().allow(0),
  AvailabilityStatus: joi.valid(...convertObjectToEnum(AccreditationStatusDefault.AvailabilityStatus)),
  FacilitiesAvailable: joi.any(),
  CleanlinessStatus: joi.string().allow(null).allow(''),
  AssignedNurseID: joi.number().integer().allow(0),
  AssignedDoctorID: joi.number().integer().allow(0),
  AdmitDate: joi.date().options({ convert: true }).allow(null).allow(''),
  DischargeDate: joi.date().options({ convert: true }).allow(null).allow(''),
  LastCleaningDate: joi.date().options({ convert: true }).allow(null).allow(''),
  NextCleaningDate: joi.date().options({ convert: true }).allow(null).allow(''),
  Comments: joi.any(),
  CreatedAt: joi.date().options({ convert: true }).allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of Rooms for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      RoomNumber: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      RoomType: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      Capacity: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      FacilitiesAvailable: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      CleanlinessStatus: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      AssignedNurseID: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      AssignedDoctorID: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      AdmitDate: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      DischargeDate: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      LastCleaningDate: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      NextCleaningDate: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      Comments: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      CreatedAt: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
