/**
 * Medication.js
 * @description :: sequelize model of database table Medication
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
const MedicationStatusEnum = require('../constants/MedicationStatus');
let Medication = sequelize.define('Medication',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  MedicationID:{ type:DataTypes.INTEGER },
  MedicationName:{ type:DataTypes.CHAR },
  DosageAmount:{ type:DataTypes.DECIMAL },
  DosageUnit:{ type:DataTypes.CHAR },
  Frequency:{ type:DataTypes.CHAR },
  PrescriptionDetails:{ type:DataTypes.TEXT },
  Manufacturer:{ type:DataTypes.CHAR },
  ExpiryDate:{ type:DataTypes.DATE },
  StorageConditions:{ type:DataTypes.CHAR },
  PrescribingDoctorID:{ type:DataTypes.INTEGER },
  PrescriptionDate:{ type:DataTypes.DATE },
  PatientID:{ type:DataTypes.INTEGER },
  PrescriptionNotes:{ type:DataTypes.TEXT },
  RefillCount:{ type:DataTypes.INTEGER },
  RouteOfAdministration:{ type:DataTypes.CHAR },
  AdministrationTime:{ type:DataTypes.DATE },
        
  MedicationStatus:{
    type:DataTypes.ENUM,
    defaultValue:MedicationStatusEnum.MedicationStatus.Prescribed,
    values:convertObjectToEnum(MedicationStatusEnum.MedicationStatus)
  },
  SideEffects:{ type:DataTypes.TEXT },
  DrugInteractions:{ type:DataTypes.TEXT },
  Allergies:{ type:DataTypes.TEXT },
  isDeleted:{ type:DataTypes.BOOLEAN },
  isActive:{ type:DataTypes.BOOLEAN },
  updatedAt:{ type:DataTypes.DATE },
  addedBy:{ type:DataTypes.INTEGER },
  updatedBy:{ type:DataTypes.INTEGER }
}
,{
  hooks:{
    beforeCreate: [
      async function (Medication,options){
        Medication.isActive = true;
        Medication.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (Medication,options){
        if (Medication !== undefined && Medication.length) { 
          for (let index = 0; index < Medication.length; index++) { 
        
            const element = Medication[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Medication.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Medication);
sequelizePaginate.paginate(Medication);
module.exports = Medication;
