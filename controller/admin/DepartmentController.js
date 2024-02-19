/**
 * DepartmentController.js
 * @description :: exports action methods for Department.
 */

const Department = require('../../model/Department');
const DepartmentSchemaKey = require('../../utils/validation/DepartmentValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const models = require('../../model');
const deleteDependentService = require('../../utils/deleteDependent');
const utils = require('../../utils/common');

/**
 * @description : create record of Department in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Department. {status, message, data}
 */ 
const addDepartment = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      DepartmentSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdDepartment = await dbService.createOne(Department,dataToCreate);
    return  res.success({ data :createdDepartment });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Department in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Departments. {status, message, data}
 */
const bulkInsertDepartment = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdDepartment = await dbService.createMany(Department,dataToCreate); 
      return  res.success({ data :{ count :createdDepartment.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Department from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Department(s). {status, message, data}
 */
const findAllDepartment = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundDepartment;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      DepartmentSchemaKey.findFilterKeys,
      Department.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundDepartment = await dbService.count(Department, query);
      if (!foundDepartment) {
        return res.recordNotFound();
      } 
      foundDepartment = { totalRecords: foundDepartment };
      return res.success({ data :foundDepartment });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundDepartment = await dbService.paginate( Department,query,options);
    if (!foundDepartment){
      return res.recordNotFound();
    }
    return res.success({ data:foundDepartment }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Department from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Department. {status, message, data}
 */
const getDepartment = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundDepartment = await dbService.findOne(Department,{ id :id });
    if (!foundDepartment){
      return res.recordNotFound();
    }
    return  res.success({ data :foundDepartment });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Department.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getDepartmentCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      DepartmentSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedDepartment = await dbService.count(Department,where);
    if (!countedDepartment){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedDepartment } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Department with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Department.
 * @return {Object} : updated Department. {status, message, data}
 */
const updateDepartment = async (req, res) => {
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
      DepartmentSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedDepartment = await dbService.update(Department,query,dataToUpdate);
    return  res.success({ data :updatedDepartment }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Department with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Departments.
 * @return {Object} : updated Departments. {status, message, data}
 */
const bulkUpdateDepartment = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedDepartment = await dbService.update(Department,filter,dataToUpdate);
    if (!updatedDepartment){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedDepartment.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Department with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Department.
 * @return {Object} : updated Department. {status, message, data}
 */
const partialUpdateDepartment = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      DepartmentSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedDepartment = await dbService.update(Department, query, dataToUpdate);
    if (!updatedDepartment) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedDepartment });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Department from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Department.
 * @return {Object} : deactivated Department. {status, message, data}
 */
const softDeleteDepartment = async (req, res) => {
  try {
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }              
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let updatedDepartment = await deleteDependentService.softDeleteDepartment(query, updateBody);
    if (!updatedDepartment){
      return res.recordNotFound();
    }
    return  res.success({ data :updatedDepartment });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Department from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Department. {status, message, data}
 */
const deleteDepartment = async (req, res) => {
  try {
    let dataToDeleted = req.body;
    let query = { id:req.params.id };
    if (dataToDeleted && dataToDeleted.isWarning) {
      let countedDepartment = await deleteDependentService.countDepartment(query);
      if (!countedDepartment){
        return res.recordNotFound();
      }
      return res.success({ data :countedDepartment });
    }
    let deletedDepartment = await deleteDependentService.deleteUser(query);
    if (!deletedDepartment){
      return res.recordNotFound(); 
    }
    return  res.success({ data :deletedDepartment });    
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }

};

/**
 * @description : delete records of Department in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyDepartment = async (req, res) => {
  try {
    let dataToDelete = req.body;
    let query = {};
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids field is required.' });
    }                              
    query = { id:{ $in:dataToDelete.ids } };
    if (dataToDelete.isWarning){
      let countedDepartment = await deleteDependentService.countDepartment(query);
      if (!countedDepartment) {
        return res.recordNotFound();
      }
      return res.success({ data: countedDepartment });            
    }
    let deletedDepartment = await deleteDependentService.deleteDepartment(query);
    if (!deletedDepartment) {
      return res.recordNotFound();
    }
    return res.success({ data: deletedDepartment });          
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Department from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Department.
 * @return {Object} : number of deactivated documents of Department. {status, message, data}
 */
const softDeleteManyDepartment = async (req, res) => {
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
    let updatedDepartment = await deleteDependentService.softDeleteDepartment(query, updateBody);
    if (!updatedDepartment) {
      return res.recordNotFound();
    }
    return  res.success({ data :updatedDepartment });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addDepartment,
  bulkInsertDepartment,
  findAllDepartment,
  getDepartment,
  getDepartmentCount,
  updateDepartment,
  bulkUpdateDepartment,
  partialUpdateDepartment,
  softDeleteDepartment,
  deleteDepartment,
  deleteManyDepartment,
  softDeleteManyDepartment,
};
