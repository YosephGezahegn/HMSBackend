/**
 * Department.js
 * @description :: sequelize model of database table Department
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
const AccreditationStatusEnum = require('../constants/AccreditationStatus');
let Department = sequelize.define('Department',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true,
    unique:true
  },
  DepartmentID:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    allowNull:false
  },
  DepartmentName:{ type:DataTypes.CHAR },
  Location:{ type:DataTypes.CHAR },
  Phone:{ type:DataTypes.CHAR },
  Email:{ type:DataTypes.CHAR },
  Head:{ type:DataTypes.INTEGER },
  FloorNumber:{ type:DataTypes.INTEGER },
  ServicesOffered:{ type:DataTypes.TEXT },
  DepartmentInfo:{ type:DataTypes.TEXT },
  NumberOfBeds:{ type:DataTypes.INTEGER },
  IsActive:{ type:DataTypes.BOOLEAN },
  EmergencyContactID:{ type:DataTypes.INTEGER },
        
  AccreditationStatus:{
    type:DataTypes.ENUM,
    defaultValue:AccreditationStatusEnum.AccreditationStatus.Accredited,
    values:convertObjectToEnum(AccreditationStatusEnum.AccreditationStatus)
  },
  EstablishedDate:{ type:DataTypes.DATE },
  LastRenovationDate:{ type:DataTypes.DATE },
  Budget:{ type:DataTypes.DECIMAL },
  NumberOfEmployees:{ type:DataTypes.INTEGER },
  OpeningTime:{ type:DataTypes.DATE },
  ClosingTime:{ type:DataTypes.DATE },
  isDeleted:{ type:DataTypes.BOOLEAN },
  updatedAt:{ type:DataTypes.DATE },
  addedBy:{ type:DataTypes.INTEGER },
  updatedBy:{ type:DataTypes.INTEGER }
}
,{
  hooks:{
    beforeCreate: [
      async function (Department,options){
        Department.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (Department,options){
        if (Department !== undefined && Department.length) { 
          for (let index = 0; index < Department.length; index++) { 
        
            const element = Department[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Department.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Department);
sequelizePaginate.paginate(Department);
module.exports = Department;
