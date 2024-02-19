/**
 * DepartmentValidation.js
 * @description :: validate each post and put request as per Department model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

const { convertObjectToEnum } = require('../common');  
const AccreditationStatusDefault = require('../../constants/AccreditationStatus');    

/** validation keys and properties of Department */
exports.schemaKeys = joi.object({
  DepartmentID: joi.number().integer().required(),
  DepartmentName: joi.any(),
  Location: joi.any(),
  Phone: joi.any(),
  Email: joi.any(),
  Head: joi.number().integer().allow(0),
  FloorNumber: joi.number().integer().allow(0),
  ServicesOffered: joi.any(),
  DepartmentInfo: joi.any(),
  NumberOfBeds: joi.number().integer().allow(0),
  IsActive: joi.boolean(),
  EmergencyContactID: joi.number().integer().allow(0),
  AccreditationStatus: joi.valid(...convertObjectToEnum(AccreditationStatusDefault.AccreditationStatus)),
  EstablishedDate: joi.date().options({ convert: true }).allow(null).allow(''),
  LastRenovationDate: joi.date().options({ convert: true }).allow(null).allow(''),
  Budget: joi.number().allow(0),
  NumberOfEmployees: joi.number().integer().allow(0),
  OpeningTime: joi.date().options({ convert: true }).allow(null).allow(''),
  ClosingTime: joi.date().options({ convert: true }).allow(null).allow(''),
  isDeleted: joi.boolean()
}).unknown(true);

/** validation keys and properties of Department for updation */
exports.updateSchemaKeys = joi.object({
  DepartmentID: joi.number().integer().when({
    is:joi.exist(),
    then:joi.required(),
    otherwise:joi.optional()
  }),
  DepartmentName: joi.any(),
  Location: joi.any(),
  Phone: joi.any(),
  Email: joi.any(),
  Head: joi.number().integer().allow(0),
  FloorNumber: joi.number().integer().allow(0),
  ServicesOffered: joi.any(),
  DepartmentInfo: joi.any(),
  NumberOfBeds: joi.number().integer().allow(0),
  IsActive: joi.boolean(),
  EmergencyContactID: joi.number().integer().allow(0),
  AccreditationStatus: joi.valid(...convertObjectToEnum(AccreditationStatusDefault.AccreditationStatus)),
  EstablishedDate: joi.date().options({ convert: true }).allow(null).allow(''),
  LastRenovationDate: joi.date().options({ convert: true }).allow(null).allow(''),
  Budget: joi.number().allow(0),
  NumberOfEmployees: joi.number().integer().allow(0),
  OpeningTime: joi.date().options({ convert: true }).allow(null).allow(''),
  ClosingTime: joi.date().options({ convert: true }).allow(null).allow(''),
  isDeleted: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of Department for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      DepartmentID: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      DepartmentName: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      Location: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      Phone: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      Email: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      Head: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      FloorNumber: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      ServicesOffered: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      DepartmentInfo: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      NumberOfBeds: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      IsActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      EmergencyContactID: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      EstablishedDate: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      LastRenovationDate: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      Budget: joi.alternatives().try(joi.array().items(),joi.number(),joi.object()),
      NumberOfEmployees: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      OpeningTime: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      ClosingTime: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
