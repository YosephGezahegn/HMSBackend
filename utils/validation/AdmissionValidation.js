/**
 * AdmissionValidation.js
 * @description :: validate each post and put request as per Admission model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

const { convertObjectToEnum } = require('../common');  
const AdmissionStatusDefault = require('../../constants/AdmissionStatus');    

/** validation keys and properties of Admission */
exports.schemaKeys = joi.object({
  AdmissionID: joi.number().integer().allow(0),
  PatientID: joi.number().integer().allow(0),
  RoomNumber: joi.number().integer().allow(0),
  AdmitDate: joi.date().options({ convert: true }).allow(null).allow(''),
  DischargeDate: joi.date().options({ convert: true }).allow(null).allow(''),
  AdmissionStatus: joi.valid(...convertObjectToEnum(AdmissionStatusDefault.Admitted)),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of Admission for updation */
exports.updateSchemaKeys = joi.object({
  AdmissionID: joi.number().integer().allow(0),
  PatientID: joi.number().integer().allow(0),
  RoomNumber: joi.number().integer().allow(0),
  AdmitDate: joi.date().options({ convert: true }).allow(null).allow(''),
  DischargeDate: joi.date().options({ convert: true }).allow(null).allow(''),
  AdmissionStatus: joi.valid(...convertObjectToEnum(AdmissionStatusDefault.Admitted)),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of Admission for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      AdmissionID: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      PatientID: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      RoomNumber: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      AdmitDate: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      DischargeDate: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
