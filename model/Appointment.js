/**
 * Appointment.js
 * @description :: sequelize model of database table Appointment
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
const AppointmentEnum = require('../constants/Appointment');
let Appointment = sequelize.define('Appointment',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  AppointmentID:{ type:DataTypes.INTEGER },
  PatientID:{ type:DataTypes.INTEGER },
  StaffID:{ type:DataTypes.INTEGER },
  DepartmentID:{ type:DataTypes.INTEGER },
  AppointmentDate:{ type:DataTypes.DATE },
  AppointmentTime:{ type:DataTypes.DATE },
  Purpose:{ type:DataTypes.CHAR },
        
  Status:{
    type:DataTypes.ENUM,
    defaultValue:AppointmentEnum.Status.Scheduled,
    values:convertObjectToEnum(AppointmentEnum.Status)
  },
  Notes:{ type:DataTypes.TEXT },
  CreationDate:{ type:DataTypes.DATE },
  LastUpdate:{ type:DataTypes.DATE },
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
      async function (Appointment,options){
        Appointment.isActive = true;
        Appointment.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (Appointment,options){
        if (Appointment !== undefined && Appointment.length) { 
          for (let index = 0; index < Appointment.length; index++) { 
        
            const element = Appointment[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Appointment.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Appointment);
sequelizePaginate.paginate(Appointment);
module.exports = Appointment;
