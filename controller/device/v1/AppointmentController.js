/**
 * AppointmentController.js
 * @description :: exports action methods for Appointment.
 */

const Appointment = require('../../../model/Appointment');
const AppointmentSchemaKey = require('../../../utils/validation/AppointmentValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Appointment in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Appointment. {status, message, data}
 */ 
const addAppointment = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      AppointmentSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdAppointment = await dbService.createOne(Appointment,dataToCreate);
    return  res.success({ data :createdAppointment });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Appointment in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Appointments. {status, message, data}
 */
const bulkInsertAppointment = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdAppointment = await dbService.createMany(Appointment,dataToCreate); 
      return  res.success({ data :{ count :createdAppointment.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Appointment from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Appointment(s). {status, message, data}
 */
const findAllAppointment = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundAppointment;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      AppointmentSchemaKey.findFilterKeys,
      Appointment.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundAppointment = await dbService.count(Appointment, query);
      if (!foundAppointment) {
        return res.recordNotFound();
      } 
      foundAppointment = { totalRecords: foundAppointment };
      return res.success({ data :foundAppointment });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundAppointment = await dbService.paginate( Appointment,query,options);
    if (!foundAppointment){
      return res.recordNotFound();
    }
    return res.success({ data:foundAppointment }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Appointment from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Appointment. {status, message, data}
 */
const getAppointment = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundAppointment = await dbService.findOne(Appointment,{ id :id });
    if (!foundAppointment){
      return res.recordNotFound();
    }
    return  res.success({ data :foundAppointment });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Appointment.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getAppointmentCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      AppointmentSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedAppointment = await dbService.count(Appointment,where);
    if (!countedAppointment){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedAppointment } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Appointment with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Appointment.
 * @return {Object} : updated Appointment. {status, message, data}
 */
const updateAppointment = async (req, res) => {
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
      AppointmentSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedAppointment = await dbService.update(Appointment,query,dataToUpdate);
    return  res.success({ data :updatedAppointment }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Appointment with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Appointments.
 * @return {Object} : updated Appointments. {status, message, data}
 */
const bulkUpdateAppointment = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedAppointment = await dbService.update(Appointment,filter,dataToUpdate);
    if (!updatedAppointment){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedAppointment.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Appointment with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Appointment.
 * @return {Object} : updated Appointment. {status, message, data}
 */
const partialUpdateAppointment = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      AppointmentSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedAppointment = await dbService.update(Appointment, query, dataToUpdate);
    if (!updatedAppointment) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedAppointment });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Appointment from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Appointment.
 * @return {Object} : deactivated Appointment. {status, message, data}
 */
const softDeleteAppointment = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Appointment, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Appointment from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Appointment. {status, message, data}
 */
const deleteAppointment = async (req, res) => {
  const result = await dbService.deleteByPk(Appointment, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Appointment in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyAppointment = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedAppointment = await dbService.destroy(Appointment,query);
    return res.success({ data :{ count :deletedAppointment.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Appointment from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Appointment.
 * @return {Object} : number of deactivated documents of Appointment. {status, message, data}
 */
const softDeleteManyAppointment = async (req, res) => {
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
    let updatedAppointment = await dbService.update(Appointment,query,updateBody, options);
    if (!updatedAppointment) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedAppointment.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addAppointment,
  bulkInsertAppointment,
  findAllAppointment,
  getAppointment,
  getAppointmentCount,
  updateAppointment,
  bulkUpdateAppointment,
  partialUpdateAppointment,
  softDeleteAppointment,
  deleteAppointment,
  deleteManyAppointment,
  softDeleteManyAppointment,
};
