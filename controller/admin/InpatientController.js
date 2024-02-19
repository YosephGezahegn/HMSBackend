/**
 * InpatientController.js
 * @description :: exports action methods for Inpatient.
 */

const Inpatient = require('../../model/Inpatient');
const InpatientSchemaKey = require('../../utils/validation/InpatientValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const models = require('../../model');
const utils = require('../../utils/common');

/**
 * @description : create record of Inpatient in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Inpatient. {status, message, data}
 */ 
const addInpatient = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      InpatientSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdInpatient = await dbService.createOne(Inpatient,dataToCreate);
    return  res.success({ data :createdInpatient });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Inpatient in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Inpatients. {status, message, data}
 */
const bulkInsertInpatient = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdInpatient = await dbService.createMany(Inpatient,dataToCreate); 
      return  res.success({ data :{ count :createdInpatient.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Inpatient from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Inpatient(s). {status, message, data}
 */
const findAllInpatient = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundInpatient;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      InpatientSchemaKey.findFilterKeys,
      Inpatient.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundInpatient = await dbService.count(Inpatient, query);
      if (!foundInpatient) {
        return res.recordNotFound();
      } 
      foundInpatient = { totalRecords: foundInpatient };
      return res.success({ data :foundInpatient });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundInpatient = await dbService.paginate( Inpatient,query,options);
    if (!foundInpatient){
      return res.recordNotFound();
    }
    return res.success({ data:foundInpatient }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Inpatient from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Inpatient. {status, message, data}
 */
const getInpatient = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundInpatient = await dbService.findOne(Inpatient,{ id :id });
    if (!foundInpatient){
      return res.recordNotFound();
    }
    return  res.success({ data :foundInpatient });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Inpatient.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getInpatientCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      InpatientSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedInpatient = await dbService.count(Inpatient,where);
    if (!countedInpatient){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedInpatient } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Inpatient with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Inpatient.
 * @return {Object} : updated Inpatient. {status, message, data}
 */
const updateInpatient = async (req, res) => {
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
      InpatientSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedInpatient = await dbService.update(Inpatient,query,dataToUpdate);
    return  res.success({ data :updatedInpatient }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Inpatient with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Inpatients.
 * @return {Object} : updated Inpatients. {status, message, data}
 */
const bulkUpdateInpatient = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedInpatient = await dbService.update(Inpatient,filter,dataToUpdate);
    if (!updatedInpatient){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedInpatient.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Inpatient with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Inpatient.
 * @return {Object} : updated Inpatient. {status, message, data}
 */
const partialUpdateInpatient = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      InpatientSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedInpatient = await dbService.update(Inpatient, query, dataToUpdate);
    if (!updatedInpatient) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedInpatient });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Inpatient from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Inpatient.
 * @return {Object} : deactivated Inpatient. {status, message, data}
 */
const softDeleteInpatient = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Inpatient, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Inpatient from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Inpatient. {status, message, data}
 */
const deleteInpatient = async (req, res) => {
  const result = await dbService.deleteByPk(Inpatient, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Inpatient in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyInpatient = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedInpatient = await dbService.destroy(Inpatient,query);
    return res.success({ data :{ count :deletedInpatient.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Inpatient from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Inpatient.
 * @return {Object} : number of deactivated documents of Inpatient. {status, message, data}
 */
const softDeleteManyInpatient = async (req, res) => {
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
    let updatedInpatient = await dbService.update(Inpatient,query,updateBody, options);
    if (!updatedInpatient) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedInpatient.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addInpatient,
  bulkInsertInpatient,
  findAllInpatient,
  getInpatient,
  getInpatientCount,
  updateInpatient,
  bulkUpdateInpatient,
  partialUpdateInpatient,
  softDeleteInpatient,
  deleteInpatient,
  deleteManyInpatient,
  softDeleteManyInpatient,
};
