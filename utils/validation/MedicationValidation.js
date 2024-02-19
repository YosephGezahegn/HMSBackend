/**
 * MedicationValidation.js
 * @description :: validate each post and put request as per Medication model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

const { convertObjectToEnum } = require('../common');  
const MedicationStatusDefault = require('../../constants/MedicationStatus');    

/** validation keys and properties of Medication */
exports.schemaKeys = joi.object({
  MedicationID: joi.number().integer().allow(0),
  MedicationName: joi.any(),
  DosageAmount: joi.number().allow(0),
  DosageUnit: joi.any(),
  Frequency: joi.any(),
  PrescriptionDetails: joi.any(),
  Manufacturer: joi.any(),
  ExpiryDate: joi.date().options({ convert: true }).allow(null).allow(''),
  StorageConditions: joi.any(),
  PrescribingDoctorID: joi.number().integer().allow(0),
  PrescriptionDate: joi.date().options({ convert: true }).allow(null).allow(''),
  PatientID: joi.number().integer().allow(0),
  PrescriptionNotes: joi.any(),
  RefillCount: joi.number().integer().allow(0),
  RouteOfAdministration: joi.any(),
  AdministrationTime: joi.date().options({ convert: true }).allow(null).allow(''),
  MedicationStatus: joi.valid(...convertObjectToEnum(MedicationStatusDefault.MedicationStatus)),
  SideEffects: joi.any(),
  DrugInteractions: joi.any(),
  Allergies: joi.any(),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of Medication for updation */
exports.updateSchemaKeys = joi.object({
  MedicationID: joi.number().integer().allow(0),
  MedicationName: joi.any(),
  DosageAmount: joi.number().allow(0),
  DosageUnit: joi.any(),
  Frequency: joi.any(),
  PrescriptionDetails: joi.any(),
  Manufacturer: joi.any(),
  ExpiryDate: joi.date().options({ convert: true }).allow(null).allow(''),
  StorageConditions: joi.any(),
  PrescribingDoctorID: joi.number().integer().allow(0),
  PrescriptionDate: joi.date().options({ convert: true }).allow(null).allow(''),
  PatientID: joi.number().integer().allow(0),
  PrescriptionNotes: joi.any(),
  RefillCount: joi.number().integer().allow(0),
  RouteOfAdministration: joi.any(),
  AdministrationTime: joi.date().options({ convert: true }).allow(null).allow(''),
  MedicationStatus: joi.valid(...convertObjectToEnum(MedicationStatusDefault.MedicationStatus)),
  SideEffects: joi.any(),
  DrugInteractions: joi.any(),
  Allergies: joi.any(),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of Medication for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      MedicationID: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      MedicationName: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      DosageAmount: joi.alternatives().try(joi.array().items(),joi.number(),joi.object()),
      DosageUnit: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      Frequency: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      PrescriptionDetails: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      Manufacturer: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      ExpiryDate: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      StorageConditions: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      PrescribingDoctorID: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      PrescriptionDate: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      PatientID: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      PrescriptionNotes: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      RefillCount: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      RouteOfAdministration: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      AdministrationTime: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      SideEffects: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      DrugInteractions: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      Allergies: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
