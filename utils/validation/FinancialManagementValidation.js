/**
 * FinancialManagementValidation.js
 * @description :: validate each post and put request as per FinancialManagement model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

const { convertObjectToEnum } = require('../common');  
const FinancialManagementDefault = require('../../constants/FinancialManagement');    

/** validation keys and properties of FinancialManagement */
exports.schemaKeys = joi.object({
  TransactionID: joi.number().integer().required(),
  PatientID: joi.number().integer().allow(0),
  TransactionDate: joi.date().options({ convert: true }).allow(null).allow(''),
  Amount: joi.number().allow(0),
  TransactionType: joi.valid(...convertObjectToEnum(FinancialManagementDefault.TransactionType)),
  ResponsibleStaffID: joi.number().integer().allow(0),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of FinancialManagement for updation */
exports.updateSchemaKeys = joi.object({
  TransactionID: joi.number().integer().when({
    is:joi.exist(),
    then:joi.required(),
    otherwise:joi.optional()
  }),
  PatientID: joi.number().integer().allow(0),
  TransactionDate: joi.date().options({ convert: true }).allow(null).allow(''),
  Amount: joi.number().allow(0),
  TransactionType: joi.valid(...convertObjectToEnum(FinancialManagementDefault.TransactionType)),
  ResponsibleStaffID: joi.number().integer().allow(0),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of FinancialManagement for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      TransactionID: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      PatientID: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      TransactionDate: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      Amount: joi.alternatives().try(joi.array().items(),joi.number(),joi.object()),
      ResponsibleStaffID: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
