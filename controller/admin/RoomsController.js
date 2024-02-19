/**
 * RoomsController.js
 * @description :: exports action methods for Rooms.
 */

const Rooms = require('../../model/Rooms');
const RoomsSchemaKey = require('../../utils/validation/RoomsValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const models = require('../../model');
const deleteDependentService = require('../../utils/deleteDependent');
const utils = require('../../utils/common');

/**
 * @description : create record of Rooms in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Rooms. {status, message, data}
 */ 
const addRooms = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      RoomsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdRooms = await dbService.createOne(Rooms,dataToCreate);
    return  res.success({ data :createdRooms });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Rooms in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Roomss. {status, message, data}
 */
const bulkInsertRooms = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdRooms = await dbService.createMany(Rooms,dataToCreate); 
      return  res.success({ data :{ count :createdRooms.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Rooms from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Rooms(s). {status, message, data}
 */
const findAllRooms = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundRooms;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      RoomsSchemaKey.findFilterKeys,
      Rooms.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundRooms = await dbService.count(Rooms, query);
      if (!foundRooms) {
        return res.recordNotFound();
      } 
      foundRooms = { totalRecords: foundRooms };
      return res.success({ data :foundRooms });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundRooms = await dbService.paginate( Rooms,query,options);
    if (!foundRooms){
      return res.recordNotFound();
    }
    return res.success({ data:foundRooms }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Rooms from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Rooms. {status, message, data}
 */
const getRooms = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundRooms = await dbService.findOne(Rooms,{ id :id });
    if (!foundRooms){
      return res.recordNotFound();
    }
    return  res.success({ data :foundRooms });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Rooms.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getRoomsCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      RoomsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedRooms = await dbService.count(Rooms,where);
    if (!countedRooms){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedRooms } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Rooms with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Rooms.
 * @return {Object} : updated Rooms. {status, message, data}
 */
const updateRooms = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body || {} };
    let query = {};
    delete dataToUpdate.addedBy;
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }          
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      RoomsSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedRooms = await dbService.update(Rooms,query,dataToUpdate);
    return  res.success({ data :updatedRooms }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Rooms with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Roomss.
 * @return {Object} : updated Roomss. {status, message, data}
 */
const bulkUpdateRooms = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedRooms = await dbService.update(Rooms,filter,dataToUpdate);
    if (!updatedRooms){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedRooms.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Rooms with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Rooms.
 * @return {Object} : updated Rooms. {status, message, data}
 */
const partialUpdateRooms = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      RoomsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedRooms = await dbService.update(Rooms, query, dataToUpdate);
    if (!updatedRooms) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedRooms });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Rooms from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Rooms.
 * @return {Object} : deactivated Rooms. {status, message, data}
 */
const softDeleteRooms = async (req, res) => {
  try {
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }              
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let updatedRooms = await deleteDependentService.softDeleteRooms(query, updateBody);
    if (!updatedRooms){
      return res.recordNotFound();
    }
    return  res.success({ data :updatedRooms });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Rooms from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Rooms. {status, message, data}
 */
const deleteRooms = async (req, res) => {
  try {
    let dataToDeleted = req.body;
    let query = { id:req.params.id };
    if (dataToDeleted && dataToDeleted.isWarning) {
      let countedRooms = await deleteDependentService.countRooms(query);
      if (!countedRooms){
        return res.recordNotFound();
      }
      return res.success({ data :countedRooms });
    }
    let deletedRooms = await deleteDependentService.deleteUser(query);
    if (!deletedRooms){
      return res.recordNotFound(); 
    }
    return  res.success({ data :deletedRooms });    
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }

};

/**
 * @description : delete records of Rooms in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyRooms = async (req, res) => {
  try {
    let dataToDelete = req.body;
    let query = {};
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids field is required.' });
    }                              
    query = { id:{ $in:dataToDelete.ids } };
    if (dataToDelete.isWarning){
      let countedRooms = await deleteDependentService.countRooms(query);
      if (!countedRooms) {
        return res.recordNotFound();
      }
      return res.success({ data: countedRooms });            
    }
    let deletedRooms = await deleteDependentService.deleteRooms(query);
    if (!deletedRooms) {
      return res.recordNotFound();
    }
    return res.success({ data: deletedRooms });          
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Rooms from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Rooms.
 * @return {Object} : number of deactivated documents of Rooms. {status, message, data}
 */
const softDeleteManyRooms = async (req, res) => {
  try {
    let dataToUpdate = req.body;
    let query = {};
    if (!req.params || !req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }            
    query = { id:{ $in:dataToUpdate.ids } };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let updatedRooms = await deleteDependentService.softDeleteRooms(query, updateBody);
    if (!updatedRooms) {
      return res.recordNotFound();
    }
    return  res.success({ data :updatedRooms });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addRooms,
  bulkInsertRooms,
  findAllRooms,
  getRooms,
  getRoomsCount,
  updateRooms,
  bulkUpdateRooms,
  partialUpdateRooms,
  softDeleteRooms,
  deleteRooms,
  deleteManyRooms,
  softDeleteManyRooms,
};
