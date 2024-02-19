/**
 * Staff.js
 * @description :: sequelize model of database table Staff
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
const StaffPositionEnum = require('../constants/StaffPosition');
let Staff = sequelize.define('Staff',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true,
    unique:true
  },
  StaffID:{ type:DataTypes.INTEGER },
  FirstName:{ type:DataTypes.CHAR },
  LastName:{ type:DataTypes.CHAR },
  Gender:{ type:DataTypes.STRING },
        
  JobPosition:{
    type:DataTypes.ENUM,
    defaultValue:StaffPositionEnum.JobPosition.Doctor,
    values:convertObjectToEnum(StaffPositionEnum.JobPosition)
  },
  DepartmentID:{ type:DataTypes.INTEGER },
  ContactNumber:{ type:DataTypes.CHAR },
  Email:{ type:DataTypes.CHAR },
  Address:{ type:DataTypes.CHAR },
  City:{ type:DataTypes.CHAR },
  State:{ type:DataTypes.CHAR },
  ZipCode:{ type:DataTypes.CHAR },
  Qualifications:{ type:DataTypes.CHAR },
  HireDate:{ type:DataTypes.DATE },
  Salary:{ type:DataTypes.INTEGER },
  Shift:{ type:DataTypes.CHAR },
  Username:{ type:DataTypes.CHAR },
  PasswordHash:{ type:DataTypes.CHAR },
  LicenseNumber:{ type:DataTypes.CHAR },
  Specialization:{ type:DataTypes.CHAR },
  EmergencyContactName:{ type:DataTypes.CHAR },
  EmergencyContactNumber:{ type:DataTypes.CHAR },
  Certification:{ type:DataTypes.TEXT },
  TrainingProgram:{ type:DataTypes.CHAR },
  isDeleted:{ type:DataTypes.BOOLEAN },
  isActive:{ type:DataTypes.BOOLEAN },
  updatedAt:{ type:DataTypes.DATE },
  addedBy:{ type:DataTypes.INTEGER },
  updatedBy:{ type:DataTypes.INTEGER }
}
,{
  hooks:{
    beforeCreate: [
      async function (Staff,options){
        Staff.isActive = true;
        Staff.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (Staff,options){
        if (Staff !== undefined && Staff.length) { 
          for (let index = 0; index < Staff.length; index++) { 
        
            const element = Staff[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Staff.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Staff);
sequelizePaginate.paginate(Staff);
module.exports = Staff;
