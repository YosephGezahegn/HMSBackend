/**
 * FinancialManagementController.js
 * @description :: exports action methods for FinancialManagement.
 */

const FinancialManagement = require('../../../model/FinancialManagement');
const FinancialManagementSchemaKey = require('../../../utils/validation/FinancialManagementValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of FinancialManagement in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created FinancialManagement. {status, message, data}
 */ 
const addFinancialManagement = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      FinancialManagementSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdFinancialManagement = await dbService.createOne(FinancialManagement,dataToCreate);
    return  res.success({ data :createdFinancialManagement });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of FinancialManagement in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created FinancialManagements. {status, message, data}
 */
const bulkInsertFinancialManagement = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdFinancialManagement = await dbService.createMany(FinancialManagement,dataToCreate); 
      return  res.success({ data :{ count :createdFinancialManagement.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of FinancialManagement from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found FinancialManagement(s). {status, message, data}
 */
const findAllFinancialManagement = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundFinancialManagement;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      FinancialManagementSchemaKey.findFilterKeys,
      FinancialManagement.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundFinancialManagement = await dbService.count(FinancialManagement, query);
      if (!foundFinancialManagement) {
        return res.recordNotFound();
      } 
      foundFinancialManagement = { totalRecords: foundFinancialManagement };
      return res.success({ data :foundFinancialManagement });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundFinancialManagement = await dbService.paginate( FinancialManagement,query,options);
    if (!foundFinancialManagement){
      return res.recordNotFound();
    }
    return res.success({ data:foundFinancialManagement }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of FinancialManagement from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found FinancialManagement. {status, message, data}
 */
const getFinancialManagement = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundFinancialManagement = await dbService.findOne(FinancialManagement,{ id :id });
    if (!foundFinancialManagement){
      return res.recordNotFound();
    }
    return  res.success({ data :foundFinancialManagement });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of FinancialManagement.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getFinancialManagementCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      FinancialManagementSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedFinancialManagement = await dbService.count(FinancialManagement,where);
    if (!countedFinancialManagement){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedFinancialManagement } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of FinancialManagement with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated FinancialManagement.
 * @return {Object} : updated FinancialManagement. {status, message, data}
 */
const updateFinancialManagement = async (req, res) => {
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
      FinancialManagementSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedFinancialManagement = await dbService.update(FinancialManagement,query,dataToUpdate);
    return  res.success({ data :updatedFinancialManagement }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of FinancialManagement with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated FinancialManagements.
 * @return {Object} : updated FinancialManagements. {status, message, data}
 */
const bulkUpdateFinancialManagement = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedFinancialManagement = await dbService.update(FinancialManagement,filter,dataToUpdate);
    if (!updatedFinancialManagement){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedFinancialManagement.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of FinancialManagement with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated FinancialManagement.
 * @return {Object} : updated FinancialManagement. {status, message, data}
 */
const partialUpdateFinancialManagement = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      FinancialManagementSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedFinancialManagement = await dbService.update(FinancialManagement, query, dataToUpdate);
    if (!updatedFinancialManagement) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedFinancialManagement });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of FinancialManagement from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of FinancialManagement.
 * @return {Object} : deactivated FinancialManagement. {status, message, data}
 */
const softDeleteFinancialManagement = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(FinancialManagement, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of FinancialManagement from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted FinancialManagement. {status, message, data}
 */
const deleteFinancialManagement = async (req, res) => {
  const result = await dbService.deleteByPk(FinancialManagement, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of FinancialManagement in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyFinancialManagement = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedFinancialManagement = await dbService.destroy(FinancialManagement,query);
    return res.success({ data :{ count :deletedFinancialManagement.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of FinancialManagement from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of FinancialManagement.
 * @return {Object} : number of deactivated documents of FinancialManagement. {status, message, data}
 */
const softDeleteManyFinancialManagement = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids){
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }
    const query = { id:{ $in:ids } };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    const options = {};
    let updatedFinancialManagement = await dbService.update(FinancialManagement,query,updateBody, options);
    if (!updatedFinancialManagement) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedFinancialManagement.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addFinancialManagement,
  bulkInsertFinancialManagement,
  findAllFinancialManagement,
  getFinancialManagement,
  getFinancialManagementCount,
  updateFinancialManagement,
  bulkUpdateFinancialManagement,
  partialUpdateFinancialManagement,
  softDeleteFinancialManagement,
  deleteFinancialManagement,
  deleteManyFinancialManagement,
  softDeleteManyFinancialManagement,
};
