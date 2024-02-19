/**
 * FinancialManagement.js
 * @description :: sequelize model of database table FinancialManagement
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
const FinancialManagementEnum = require('../constants/FinancialManagement');
let FinancialManagement = sequelize.define('FinancialManagement',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  TransactionID:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    allowNull:false
  },
  PatientID:{ type:DataTypes.INTEGER },
  TransactionDate:{ type:DataTypes.DATE },
  Amount:{
    type:DataTypes.DECIMAL,
    primaryKey:false,
    allowNull:true
  },
        
  TransactionType:{
    type:DataTypes.ENUM,
    defaultValue:FinancialManagementEnum.TransactionType.Payment,
    values:convertObjectToEnum(FinancialManagementEnum.TransactionType)
  },
  ResponsibleStaffID:{ type:DataTypes.INTEGER },
  isDeleted:{ type:DataTypes.BOOLEAN },
  isActive:{ type:DataTypes.BOOLEAN },
  createdAt:{ type:DataTypes.DATE },
  updatedAt:{ type:DataTypes.DATE },
  addedBy:{ type:DataTypes.INTEGER },
  updatedBy:{ type:DataTypes.INTEGER }
}
,{
  hooks:{
    beforeCreate: [
      async function (FinancialManagement,options){
        FinancialManagement.isActive = true;
        FinancialManagement.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (FinancialManagement,options){
        if (FinancialManagement !== undefined && FinancialManagement.length) { 
          for (let index = 0; index < FinancialManagement.length; index++) { 
        
            const element = FinancialManagement[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
FinancialManagement.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(FinancialManagement);
sequelizePaginate.paginate(FinancialManagement);
module.exports = FinancialManagement;
