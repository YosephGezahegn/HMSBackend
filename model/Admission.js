/**
 * Admission.js
 * @description :: sequelize model of database table Admission
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
const AdmissionStatusEnum = require('../constants/AdmissionStatus');
let Admission = sequelize.define('Admission',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  AdmissionID:{ type:DataTypes.INTEGER },
  PatientID:{ type:DataTypes.INTEGER },
  RoomNumber:{ type:DataTypes.INTEGER },
  AdmitDate:{ type:DataTypes.DATE },
  DischargeDate:{ type:DataTypes.DATE },
        
  AdmissionStatus:{
    type:DataTypes.ENUM,
    defaultValue:AdmissionStatusEnum.Admitted.Admitted,
    values:convertObjectToEnum(AdmissionStatusEnum.Admitted)
  },
  isDeleted:{ type:DataTypes.BOOLEAN },
  isActive:{ type:DataTypes.BOOLEAN },
  updatedAt:{ type:DataTypes.DATE },
  addedBy:{ type:DataTypes.INTEGER },
  updatedBy:{ type:DataTypes.INTEGER }
}
,{
  hooks:{
    beforeCreate: [
      async function (Admission,options){
        Admission.isActive = true;
        Admission.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (Admission,options){
        if (Admission !== undefined && Admission.length) { 
          for (let index = 0; index < Admission.length; index++) { 
        
            const element = Admission[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Admission.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Admission);
sequelizePaginate.paginate(Admission);
module.exports = Admission;
