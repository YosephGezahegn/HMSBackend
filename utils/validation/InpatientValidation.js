/**
 * InpatientValidation.js
 * @description :: validate each post and put request as per Inpatient model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of Inpatient */
exports.schemaKeys = joi.object({
  AdmissionID: joi.number().integer().allow(0),
  PatientID: joi.number().integer().allow(0),
  RoomID: joi.number().integer().allow(0),
  AdmissionDate: joi.date().options({ convert: true }).allow(null).allow(''),
  DischargeDate: joi.date().options({ convert: true }).allow(null).allow(''),
  ReasonForAdmission: joi.any(),
  ResponsibleStaffID: joi.number().integer().allow(0),
  DailyNotes: joi.any(),
  TreatmentPlan: joi.any(),
  Medications: joi.any(),
  SurgeryDetails: joi.any(),
  DischargeSummary: joi.any(),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of Inpatient for updation */
exports.updateSchemaKeys = joi.object({
  AdmissionID: joi.number().integer().allow(0),
  PatientID: joi.number().integer().allow(0),
  RoomID: joi.number().integer().allow(0),
  AdmissionDate: joi.date().options({ convert: true }).allow(null).allow(''),
  DischargeDate: joi.date().options({ convert: true }).allow(null).allow(''),
  ReasonForAdmission: joi.any(),
  ResponsibleStaffID: joi.number().integer().allow(0),
  DailyNotes: joi.any(),
  TreatmentPlan: joi.any(),
  Medications: joi.any(),
  SurgeryDetails: joi.any(),
  DischargeSummary: joi.any(),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of Inpatient for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      AdmissionID: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      PatientID: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      RoomID: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      AdmissionDate: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      DischargeDate: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      ReasonForAdmission: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      ResponsibleStaffID: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      DailyNotes: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      TreatmentPlan: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      Medications: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      SurgeryDetails: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      DischargeSummary: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
