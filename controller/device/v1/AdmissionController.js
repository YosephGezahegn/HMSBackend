/**
 * AdmissionController.js
 * @description :: exports action methods for Admission.
 */

const Admission = require('../../../model/Admission');
const AdmissionSchemaKey = require('../../../utils/validation/AdmissionValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Admission in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Admission. {status, message, data}
 */ 
const addAdmission = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      AdmissionSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdAdmission = await dbService.createOne(Admission,dataToCreate);
    return  res.success({ data :createdAdmission });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Admission in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Admissions. {status, message, data}
 */
const bulkInsertAdmission = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdAdmission = await dbService.createMany(Admission,dataToCreate); 
      return  res.success({ data :{ count :createdAdmission.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Admission from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Admission(s). {status, message, data}
 */
const findAllAdmission = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundAdmission;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      AdmissionSchemaKey.findFilterKeys,
      Admission.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundAdmission = await dbService.count(Admission, query);
      if (!foundAdmission) {
        return res.recordNotFound();
      } 
      foundAdmission = { totalRecords: foundAdmission };
      return res.success({ data :foundAdmission });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundAdmission = await dbService.paginate( Admission,query,options);
    if (!foundAdmission){
      return res.recordNotFound();
    }
    return res.success({ data:foundAdmission }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Admission from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Admission. {status, message, data}
 */
const getAdmission = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundAdmission = await dbService.findOne(Admission,{ id :id });
    if (!foundAdmission){
      return res.recordNotFound();
    }
    return  res.success({ data :foundAdmission });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Admission.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getAdmissionCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      AdmissionSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedAdmission = await dbService.count(Admission,where);
    if (!countedAdmission){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedAdmission } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Admission with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Admission.
 * @return {Object} : updated Admission. {status, message, data}
 */
const updateAdmission = async (req, res) => {
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
      AdmissionSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedAdmission = await dbService.update(Admission,query,dataToUpdate);
    return  res.success({ data :updatedAdmission }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Admission with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Admissions.
 * @return {Object} : updated Admissions. {status, message, data}
 */
const bulkUpdateAdmission = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedAdmission = await dbService.update(Admission,filter,dataToUpdate);
    if (!updatedAdmission){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedAdmission.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Admission with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Admission.
 * @return {Object} : updated Admission. {status, message, data}
 */
const partialUpdateAdmission = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      AdmissionSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedAdmission = await dbService.update(Admission, query, dataToUpdate);
    if (!updatedAdmission) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedAdmission });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Admission from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Admission.
 * @return {Object} : deactivated Admission. {status, message, data}
 */
const softDeleteAdmission = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Admission, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Admission from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Admission. {status, message, data}
 */
const deleteAdmission = async (req, res) => {
  const result = await dbService.deleteByPk(Admission, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Admission in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyAdmission = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedAdmission = await dbService.destroy(Admission,query);
    return res.success({ data :{ count :deletedAdmission.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Admission from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Admission.
 * @return {Object} : number of deactivated documents of Admission. {status, message, data}
 */
const softDeleteManyAdmission = async (req, res) => {
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
    let updatedAdmission = await dbService.update(Admission,query,updateBody, options);
    if (!updatedAdmission) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedAdmission.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addAdmission,
  bulkInsertAdmission,
  findAllAdmission,
  getAdmission,
  getAdmissionCount,
  updateAdmission,
  bulkUpdateAdmission,
  partialUpdateAdmission,
  softDeleteAdmission,
  deleteAdmission,
  deleteManyAdmission,
  softDeleteManyAdmission,
};
