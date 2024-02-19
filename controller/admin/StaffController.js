/**
 * StaffController.js
 * @description :: exports action methods for Staff.
 */

const Staff = require('../../model/Staff');
const StaffSchemaKey = require('../../utils/validation/StaffValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const models = require('../../model');
const deleteDependentService = require('../../utils/deleteDependent');
const utils = require('../../utils/common');

/**
 * @description : create record of Staff in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Staff. {status, message, data}
 */ 
const addStaff = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      StaffSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdStaff = await dbService.createOne(Staff,dataToCreate);
    return  res.success({ data :createdStaff });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Staff in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Staffs. {status, message, data}
 */
const bulkInsertStaff = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdStaff = await dbService.createMany(Staff,dataToCreate); 
      return  res.success({ data :{ count :createdStaff.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Staff from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Staff(s). {status, message, data}
 */
const findAllStaff = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundStaff;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      StaffSchemaKey.findFilterKeys,
      Staff.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundStaff = await dbService.count(Staff, query);
      if (!foundStaff) {
        return res.recordNotFound();
      } 
      foundStaff = { totalRecords: foundStaff };
      return res.success({ data :foundStaff });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundStaff = await dbService.paginate( Staff,query,options);
    if (!foundStaff){
      return res.recordNotFound();
    }
    return res.success({ data:foundStaff }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Staff from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Staff. {status, message, data}
 */
const getStaff = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundStaff = await dbService.findOne(Staff,{ id :id });
    if (!foundStaff){
      return res.recordNotFound();
    }
    return  res.success({ data :foundStaff });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Staff.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getStaffCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      StaffSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedStaff = await dbService.count(Staff,where);
    if (!countedStaff){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedStaff } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Staff with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Staff.
 * @return {Object} : updated Staff. {status, message, data}
 */
const updateStaff = async (req, res) => {
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
      StaffSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedStaff = await dbService.update(Staff,query,dataToUpdate);
    return  res.success({ data :updatedStaff }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Staff with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Staffs.
 * @return {Object} : updated Staffs. {status, message, data}
 */
const bulkUpdateStaff = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedStaff = await dbService.update(Staff,filter,dataToUpdate);
    if (!updatedStaff){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedStaff.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Staff with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Staff.
 * @return {Object} : updated Staff. {status, message, data}
 */
const partialUpdateStaff = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      StaffSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedStaff = await dbService.update(Staff, query, dataToUpdate);
    if (!updatedStaff) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedStaff });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Staff from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Staff.
 * @return {Object} : deactivated Staff. {status, message, data}
 */
const softDeleteStaff = async (req, res) => {
  try {
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }              
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let updatedStaff = await deleteDependentService.softDeleteStaff(query, updateBody);
    if (!updatedStaff){
      return res.recordNotFound();
    }
    return  res.success({ data :updatedStaff });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Staff from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Staff. {status, message, data}
 */
const deleteStaff = async (req, res) => {
  try {
    let dataToDeleted = req.body;
    let query = { id:req.params.id };
    if (dataToDeleted && dataToDeleted.isWarning) {
      let countedStaff = await deleteDependentService.countStaff(query);
      if (!countedStaff){
        return res.recordNotFound();
      }
      return res.success({ data :countedStaff });
    }
    let deletedStaff = await deleteDependentService.deleteUser(query);
    if (!deletedStaff){
      return res.recordNotFound(); 
    }
    return  res.success({ data :deletedStaff });    
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }

};

/**
 * @description : delete records of Staff in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyStaff = async (req, res) => {
  try {
    let dataToDelete = req.body;
    let query = {};
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids field is required.' });
    }                              
    query = { id:{ $in:dataToDelete.ids } };
    if (dataToDelete.isWarning){
      let countedStaff = await deleteDependentService.countStaff(query);
      if (!countedStaff) {
        return res.recordNotFound();
      }
      return res.success({ data: countedStaff });            
    }
    let deletedStaff = await deleteDependentService.deleteStaff(query);
    if (!deletedStaff) {
      return res.recordNotFound();
    }
    return res.success({ data: deletedStaff });          
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Staff from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Staff.
 * @return {Object} : number of deactivated documents of Staff. {status, message, data}
 */
const softDeleteManyStaff = async (req, res) => {
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
    let updatedStaff = await deleteDependentService.softDeleteStaff(query, updateBody);
    if (!updatedStaff) {
      return res.recordNotFound();
    }
    return  res.success({ data :updatedStaff });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addStaff,
  bulkInsertStaff,
  findAllStaff,
  getStaff,
  getStaffCount,
  updateStaff,
  bulkUpdateStaff,
  partialUpdateStaff,
  softDeleteStaff,
  deleteStaff,
  deleteManyStaff,
  softDeleteManyStaff,
};
