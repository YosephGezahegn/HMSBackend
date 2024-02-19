/**
 * PatientsValidation.js
 * @description :: validate each post and put request as per Patients model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

const { convertObjectToEnum } = require('../common');  
const PatientsDefault = require('../../constants/Patients');    

/** validation keys and properties of Patients */
exports.schemaKeys = joi.object({
  PatientID: joi.number().integer().required(),
  FirstName: joi.any(),
  LastName: joi.any(),
  DateOfBirth: joi.date().options({ convert: true }).allow(null).allow(''),
  Gender: joi.any(),
  Address: joi.any(),
  City: joi.any(),
  State: joi.any(),
  ZipCode: joi.any(),
  ContactNumber: joi.any(),
  Email: joi.any(),
  InsuranceDetails: joi.any(),
  EmergencyContactName: joi.any(),
  EmergencyContactNumber: joi.string().allow(null).allow(''),
  Allergies: joi.any(),
  MedicalHistory: joi.any(),
  BloodType: joi.valid(...convertObjectToEnum(PatientsDefault.BloodType)),
  Height: joi.number().allow(0),
  Weight: joi.number().allow(0),
  ChronicConditions: joi.any(),
  CurrentMedications: joi.any(),
  FamilyHistory: joi.any(),
  SurgicalHistory: joi.any(),
  SocialHistory: joi.any(),
  ImmunizationHistory: joi.any(),
  PrimaryCareProvider: joi.any(),
  EmploymentStatus: joi.valid(...convertObjectToEnum(PatientsDefault.EmploymentStatus)),
  Employer: joi.any(),
  MaritalStatus: joi.valid(...convertObjectToEnum(PatientsDefault.MaritalStatus)),
  SpouseName: joi.any(),
  SpouseDOB: joi.date().options({ convert: true }).allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of Patients for updation */
exports.updateSchemaKeys = joi.object({
  PatientID: joi.number().integer().when({
    is:joi.exist(),
    then:joi.required(),
    otherwise:joi.optional()
  }),
  FirstName: joi.any(),
  LastName: joi.any(),
  DateOfBirth: joi.date().options({ convert: true }).allow(null).allow(''),
  Gender: joi.any(),
  Address: joi.any(),
  City: joi.any(),
  State: joi.any(),
  ZipCode: joi.any(),
  ContactNumber: joi.any(),
  Email: joi.any(),
  InsuranceDetails: joi.any(),
  EmergencyContactName: joi.any(),
  EmergencyContactNumber: joi.string().allow(null).allow(''),
  Allergies: joi.any(),
  MedicalHistory: joi.any(),
  BloodType: joi.valid(...convertObjectToEnum(PatientsDefault.BloodType)),
  Height: joi.number().allow(0),
  Weight: joi.number().allow(0),
  ChronicConditions: joi.any(),
  CurrentMedications: joi.any(),
  FamilyHistory: joi.any(),
  SurgicalHistory: joi.any(),
  SocialHistory: joi.any(),
  ImmunizationHistory: joi.any(),
  PrimaryCareProvider: joi.any(),
  EmploymentStatus: joi.valid(...convertObjectToEnum(PatientsDefault.EmploymentStatus)),
  Employer: joi.any(),
  MaritalStatus: joi.valid(...convertObjectToEnum(PatientsDefault.MaritalStatus)),
  SpouseName: joi.any(),
  SpouseDOB: joi.date().options({ convert: true }).allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of Patients for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      PatientID: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      FirstName: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      LastName: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      DateOfBirth: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      Gender: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      Address: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      City: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      State: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      ZipCode: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      ContactNumber: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      Email: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      InsuranceDetails: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      EmergencyContactName: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      EmergencyContactNumber: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      Allergies: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      MedicalHistory: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      Height: joi.alternatives().try(joi.array().items(),joi.number(),joi.object()),
      Weight: joi.alternatives().try(joi.array().items(),joi.number(),joi.object()),
      ChronicConditions: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      CurrentMedications: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      FamilyHistory: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      SurgicalHistory: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      SocialHistory: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      ImmunizationHistory: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      PrimaryCareProvider: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      Employer: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      SpouseName: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      SpouseDOB: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
