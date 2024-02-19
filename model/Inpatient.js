/**
 * Inpatient.js
 * @description :: sequelize model of database table Inpatient
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Inpatient = sequelize.define('Inpatient',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  AdmissionID:{ type:DataTypes.INTEGER },
  PatientID:{ type:DataTypes.INTEGER },
  RoomID:{ type:DataTypes.INTEGER },
  AdmissionDate:{ type:DataTypes.DATE },
  DischargeDate:{ type:DataTypes.DATE },
  ReasonForAdmission:{ type:DataTypes.TEXT },
  ResponsibleStaffID:{ type:DataTypes.INTEGER },
  DailyNotes:{ type:DataTypes.TEXT },
  TreatmentPlan:{ type:DataTypes.TEXT },
  Medications:{ type:DataTypes.TEXT },
  SurgeryDetails:{ type:DataTypes.TEXT },
  DischargeSummary:{ type:DataTypes.TEXT },
  isDeleted:{ type:DataTypes.BOOLEAN },
  isActive:{ type:DataTypes.BOOLEAN },
  updatedAt:{ type:DataTypes.DATE },
  addedBy:{ type:DataTypes.INTEGER },
  updatedBy:{ type:DataTypes.INTEGER }
}
,{
  hooks:{
    beforeCreate: [
      async function (Inpatient,options){
        Inpatient.isActive = true;
        Inpatient.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (Inpatient,options){
        if (Inpatient !== undefined && Inpatient.length) { 
          for (let index = 0; index < Inpatient.length; index++) { 
        
            const element = Inpatient[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Inpatient.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Inpatient);
sequelizePaginate.paginate(Inpatient);
module.exports = Inpatient;
