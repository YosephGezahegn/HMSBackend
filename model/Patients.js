/**
 * Patients.js
 * @description :: sequelize model of database table Patients
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
const PatientsEnum = require('../constants/Patients');
let Patients = sequelize.define('Patients',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true,
    unique:true
  },
  PatientID:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    allowNull:false
  },
  FirstName:{ type:DataTypes.CHAR },
  LastName:{ type:DataTypes.CHAR },
  DateOfBirth:{ type:DataTypes.DATE },
  Gender:{ type:DataTypes.CHAR },
  Address:{ type:DataTypes.CHAR },
  City:{ type:DataTypes.CHAR },
  State:{ type:DataTypes.CHAR },
  ZipCode:{ type:DataTypes.CHAR },
  ContactNumber:{ type:DataTypes.CHAR },
  Email:{ type:DataTypes.CHAR },
  InsuranceDetails:{ type:DataTypes.TEXT },
  EmergencyContactName:{ type:DataTypes.CHAR },
  EmergencyContactNumber:{ type:DataTypes.STRING },
  Allergies:{ type:DataTypes.TEXT },
  MedicalHistory:{ type:DataTypes.TEXT },
        
  BloodType:{
    type:DataTypes.ENUM,
    defaultValue:PatientsEnum.BloodType.APOS,
    values:convertObjectToEnum(PatientsEnum.BloodType)
  },
  Height:{ type:DataTypes.DECIMAL },
  Weight:{ type:DataTypes.DECIMAL },
  ChronicConditions:{ type:DataTypes.TEXT },
  CurrentMedications:{ type:DataTypes.TEXT },
  FamilyHistory:{ type:DataTypes.TEXT },
  SurgicalHistory:{ type:DataTypes.TEXT },
  SocialHistory:{ type:DataTypes.TEXT },
  ImmunizationHistory:{ type:DataTypes.TEXT },
  PrimaryCareProvider:{ type:DataTypes.CHAR },
        
  EmploymentStatus:{
    type:DataTypes.ENUM,
    defaultValue:PatientsEnum.EmploymentStatus.Employed,
    values:convertObjectToEnum(PatientsEnum.EmploymentStatus)
  },
  Employer:{ type:DataTypes.CHAR },
        
  MaritalStatus:{
    type:DataTypes.ENUM,
    defaultValue:PatientsEnum.MaritalStatus.Single,
    values:convertObjectToEnum(PatientsEnum.MaritalStatus)
  },
  SpouseName:{ type:DataTypes.CHAR },
  SpouseDOB:{ type:DataTypes.DATE },
  isDeleted:{ type:DataTypes.BOOLEAN },
  isActive:{ type:DataTypes.BOOLEAN },
  updatedAt:{ type:DataTypes.DATE },
  addedBy:{ type:DataTypes.INTEGER },
  updatedBy:{ type:DataTypes.INTEGER }
}
,{
  hooks:{
    beforeCreate: [
      async function (Patients,options){
        Patients.isActive = true;
        Patients.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (Patients,options){
        if (Patients !== undefined && Patients.length) { 
          for (let index = 0; index < Patients.length; index++) { 
        
            const element = Patients[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Patients.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Patients);
sequelizePaginate.paginate(Patients);
module.exports = Patients;
