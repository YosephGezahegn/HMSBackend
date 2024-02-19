/**
 * Rooms.js
 * @description :: sequelize model of database table Rooms
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
const AccreditationStatusEnum = require('../constants/AccreditationStatus');
let Rooms = sequelize.define('Rooms',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true,
    unique:true
  },
  RoomNumber:{ type:DataTypes.INTEGER },
  RoomType:{ type:DataTypes.CHAR },
  Capacity:{ type:DataTypes.INTEGER },
        
  AvailabilityStatus:{
    type:DataTypes.ENUM,
    defaultValue:AccreditationStatusEnum.AvailabilityStatus.Vacant,
    values:convertObjectToEnum(AccreditationStatusEnum.AvailabilityStatus)
  },
  FacilitiesAvailable:{ type:DataTypes.TEXT },
  CleanlinessStatus:{ type:DataTypes.STRING },
  AssignedNurseID:{ type:DataTypes.INTEGER },
  AssignedDoctorID:{ type:DataTypes.INTEGER },
  AdmitDate:{ type:DataTypes.DATE },
  DischargeDate:{ type:DataTypes.DATE },
  LastCleaningDate:{ type:DataTypes.DATE },
  NextCleaningDate:{ type:DataTypes.DATE },
  Comments:{ type:DataTypes.TEXT },
  isDeleted:{ type:DataTypes.BOOLEAN },
  isActive:{ type:DataTypes.BOOLEAN },
  updatedAt:{ type:DataTypes.DATE },
  addedBy:{ type:DataTypes.INTEGER },
  updatedBy:{ type:DataTypes.INTEGER }
}
,{
  hooks:{
    beforeCreate: [
      async function (Rooms,options){
        Rooms.isActive = true;
        Rooms.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (Rooms,options){
        if (Rooms !== undefined && Rooms.length) { 
          for (let index = 0; index < Rooms.length; index++) { 
        
            const element = Rooms[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Rooms.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Rooms);
sequelizePaginate.paginate(Rooms);
module.exports = Rooms;
