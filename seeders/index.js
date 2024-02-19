/**
 * seeder.js
 * @description :: functions that seeds mock data to run the application
 */
const model = require('../model');
const dbService = require('../utils/dbService');
const bcrypt = require('bcrypt');
const authConstant = require('../constants/authConstant');
const { replaceAll } = require('../utils/common');

/* seeds default users */
async function seedUser () {
  try {
    let userToBeInserted = {};
    userToBeInserted = await dbService.findOne(model.user,{ 'username':'Vinnie_Roberts7' });
    if (!userToBeInserted) {  
      userToBeInserted = {
        'password':'uxxbw9VnofYtOTk',
        'isDeleted':false,
        'username':'Vinnie_Roberts7',
        'email':'Rene_Moore32@gmail.com',
        'isActive':true,
        'userType':authConstant.USER_TYPES.User
      };
      await dbService.createOne(model.user,userToBeInserted);
    } else {
      userToBeInserted = {
        'password':'uxxbw9VnofYtOTk',
        'isDeleted':false,
        'username':'Vinnie_Roberts7',
        'email':'Rene_Moore32@gmail.com',
        'isActive':true,
        'userType':authConstant.USER_TYPES.User
      };
      userToBeInserted.password = await bcrypt.hash(userToBeInserted.password, 8);
      await dbService.update(model.user, { 'username':'Vinnie_Roberts7' }, userToBeInserted);
    }
    userToBeInserted = await dbService.findOne(model.user,{ 'username':'Karianne.Hane' });
    if (!userToBeInserted) {  
      userToBeInserted = {
        'password':'YxnEzmG7zZmfKvr',
        'isDeleted':false,
        'username':'Karianne.Hane',
        'email':'Orpha.Brakus@gmail.com',
        'isActive':true,
        'userType':authConstant.USER_TYPES.Admin
      };
      await dbService.createOne(model.user,userToBeInserted);
    } else {
      userToBeInserted = {
        'password':'YxnEzmG7zZmfKvr',
        'isDeleted':false,
        'username':'Karianne.Hane',
        'email':'Orpha.Brakus@gmail.com',
        'isActive':true,
        'userType':authConstant.USER_TYPES.Admin
      };
      userToBeInserted.password = await bcrypt.hash(userToBeInserted.password, 8);
      await dbService.update(model.user, { 'username':'Karianne.Hane' }, userToBeInserted);
    }
    console.info('User model seeded 🍺');
  } catch (error){
    console.log('User seeder failed due to ', error.message);
  }
}
  
/* seeds roles */
async function seedRole () {
  try {
    const roles = [ 'User', 'Admin', 'System_User' ];
    const insertedRoles = await dbService.findAll(model.role, { code: { $in: roles.map(role => role.toUpperCase()) } });
    const rolesToInsert = [];
    roles.forEach(role => {
      if (!insertedRoles.find(insertedRole => insertedRole.code === role.toUpperCase())) {
        rolesToInsert.push({
          name: role,
          code: role.toUpperCase(),
          weight: 1
        });
      }
    });
    if (rolesToInsert.length) {
      const result = await dbService.createMany(model.role, rolesToInsert);
      if (result) console.log('Role seeded 🍺');
      else console.log('Role seeder failed!');
    } else {
      console.log('Role is upto date 🍺');
    }
  } catch (error) {
    console.log('Role seeder failed due to ', error.message);
  }
}

/* seeds routes of project */
async function seedProjectRoutes (routes) {
  try {
    if (routes) {
      let routeName = '';
      const dbRoutes = await dbService.findAll(model.projectRoute, {});
      let routeArr = [];
      let routeObj = {};
      routes.forEach(route => {
        routeName = `${replaceAll((route.path).toLowerCase(), '/', '_')}`;
        route.methods.forEach(method => {
          routeObj = dbRoutes.find(dbRoute => dbRoute.route_name === routeName && dbRoute.method === method);
          if (!routeObj) {
            routeArr.push({
              'uri': route.path.toLowerCase(),
              'method': method,
              'route_name': routeName,
            });
          }
        });
      });
      if (routeArr.length) {
        const result = await dbService.createMany(model.projectRoute, routeArr);
        if (result) console.info('ProjectRoute model seeded 🍺');
        else console.info('ProjectRoute seeder failed.');
      } else {
        console.info('ProjectRoute is upto date 🍺');
      }
    }
  } catch (error) {
    console.log('ProjectRoute seeder failed due to ', error.message);
  }
}

/* seeds role for routes */
async function seedRouteRole () {
  try {
    const routeRoles = [ 
      {
        route: '/admin/admission/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/admission/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/admission/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/admission/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/admission/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/admission/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/admission/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/admission/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/admission/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/admission/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/admission/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/admission/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/admission/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/admission/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/admission/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/admission/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/admission/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/admission/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/admission/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/admission/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/admission/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/admission/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/admission/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/admission/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/admission/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/admission/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/admission/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/admission/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/admission/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/admission/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/admission/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/admin/admission/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/admission/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/admission/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/admission/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/admission/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/appointment/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/appointment/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/appointment/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/appointment/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/appointment/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/appointment/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/appointment/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/appointment/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/appointment/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/appointment/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/appointment/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/appointment/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/appointment/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/appointment/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/appointment/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/appointment/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/appointment/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/appointment/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/appointment/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/appointment/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/appointment/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/appointment/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/appointment/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/appointment/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/appointment/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/appointment/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/appointment/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/appointment/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/appointment/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/appointment/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/appointment/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/admin/appointment/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/appointment/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/appointment/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/admin/appointment/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/appointment/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/department/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/department/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/department/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/department/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/department/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/department/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/department/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/department/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/department/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/department/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/department/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/department/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/department/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/department/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/department/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/department/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/department/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/department/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/department/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/department/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/department/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/department/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/department/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/department/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/department/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/department/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/department/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/department/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/department/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/department/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/department/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/admin/department/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/department/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/department/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/department/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/department/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/financialmanagement/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/admin/financialmanagement/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/financialmanagement/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/financialmanagement/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/admin/financialmanagement/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/financialmanagement/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/financialmanagement/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/admin/financialmanagement/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/financialmanagement/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/financialmanagement/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/admin/financialmanagement/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/admin/financialmanagement/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/financialmanagement/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/admin/financialmanagement/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/financialmanagement/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/financialmanagement/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/financialmanagement/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/financialmanagement/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/financialmanagement/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/financialmanagement/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/financialmanagement/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/financialmanagement/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/financialmanagement/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/financialmanagement/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/financialmanagement/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/financialmanagement/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/financialmanagement/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/financialmanagement/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/financialmanagement/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/financialmanagement/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/financialmanagement/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/admin/financialmanagement/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/financialmanagement/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/financialmanagement/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/admin/financialmanagement/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/financialmanagement/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/inpatient/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/inpatient/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/inpatient/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/inpatient/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/inpatient/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/inpatient/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/inpatient/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/inpatient/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/inpatient/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/inpatient/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/inpatient/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/inpatient/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/inpatient/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/inpatient/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/inpatient/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/inpatient/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/inpatient/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/inpatient/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/inpatient/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/inpatient/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/inpatient/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/inpatient/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/inpatient/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/inpatient/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/inpatient/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/inpatient/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/inpatient/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/inpatient/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/inpatient/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/inpatient/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/inpatient/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/admin/inpatient/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/inpatient/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/inpatient/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/inpatient/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/inpatient/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/medication/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/medication/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/medication/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/medication/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/medication/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/medication/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/medication/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/medication/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/medication/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/medication/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/medication/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/medication/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/medication/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/medication/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/medication/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/medication/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/medication/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/medication/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/medication/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/medication/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/medication/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/medication/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/medication/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/medication/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/medication/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/medication/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/medication/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/medication/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/medication/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/medication/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/medication/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/admin/medication/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/medication/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/medication/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/medication/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/medication/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/patients/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/patients/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/patients/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/patients/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/patients/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/patients/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/patients/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/patients/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/patients/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/patients/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/patients/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/patients/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/patients/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/patients/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/patients/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/patients/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/patients/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/patients/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/patients/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/patients/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/patients/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/patients/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/patients/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/patients/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/patients/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/patients/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/patients/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/patients/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/patients/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/patients/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/patients/delete/:id',
        role: 'User',
        method: 'DELETE' 
      },
      {
        route: '/admin/patients/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/patients/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/patients/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/patients/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/patients/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/rooms/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/rooms/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/rooms/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/rooms/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/rooms/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/rooms/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/rooms/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/rooms/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/rooms/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/rooms/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/rooms/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/rooms/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/rooms/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/rooms/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/rooms/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/rooms/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/rooms/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/rooms/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/rooms/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/rooms/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/rooms/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/rooms/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/rooms/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/rooms/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/rooms/softdelete/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/rooms/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/rooms/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/rooms/softdeletemany',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/rooms/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/rooms/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/rooms/delete/:id',
        role: 'User',
        method: 'DELETE' 
      },
      {
        route: '/admin/rooms/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/rooms/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/rooms/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/rooms/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/rooms/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/staff/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/staff/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/staff/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/staff/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/staff/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/staff/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/staff/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/staff/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/staff/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/staff/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/staff/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/staff/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/staff/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/staff/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/staff/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/staff/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/staff/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/staff/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/staff/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/staff/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/staff/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/staff/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/staff/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/staff/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/staff/softdelete/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/staff/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/staff/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/staff/softdeletemany',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/staff/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/staff/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/staff/delete/:id',
        role: 'User',
        method: 'DELETE' 
      },
      {
        route: '/admin/staff/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/staff/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/staff/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/staff/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/staff/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/user/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/user/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/user/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/user/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/delete/:id',
        role: 'User',
        method: 'DELETE' 
      },
      {
        route: '/admin/user/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/user/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userauthsettings/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userauthsettings/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userauthsettings/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userauthsettings/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/userauthsettings/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userauthsettings/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userauthsettings/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userauthsettings/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userauthsettings/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userauthsettings/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userauthsettings/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/userauthsettings/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/role/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/role/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/routerole/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/userrole/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/userrole/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admission/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admission/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admission/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admission/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admission/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admission/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admission/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admission/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admission/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admission/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/admission/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/admission/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/admission/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admission/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admission/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admission/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admission/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admission/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admission/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admission/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admission/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admission/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admission/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admission/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admission/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admission/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admission/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admission/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admission/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admission/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admission/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/admission/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/admission/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/admission/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admission/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admission/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/appointment/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/appointment/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/appointment/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/appointment/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/appointment/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/appointment/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/appointment/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/appointment/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/appointment/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/appointment/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/appointment/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/appointment/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/appointment/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/appointment/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/appointment/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/appointment/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/appointment/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/appointment/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/appointment/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/appointment/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/appointment/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/appointment/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/appointment/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/appointment/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/appointment/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/appointment/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/appointment/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/appointment/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/appointment/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/appointment/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/appointment/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/appointment/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/appointment/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/appointment/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/appointment/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/appointment/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/department/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/department/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/department/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/department/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/department/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/department/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/department/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/department/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/department/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/department/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/department/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/department/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/department/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/department/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/department/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/department/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/department/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/department/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/department/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/department/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/department/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/department/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/department/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/department/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/department/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/department/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/department/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/department/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/department/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/department/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/department/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/department/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/department/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/department/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/department/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/department/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/financialmanagement/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/financialmanagement/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/financialmanagement/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/financialmanagement/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/financialmanagement/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/financialmanagement/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/financialmanagement/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/financialmanagement/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/financialmanagement/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/financialmanagement/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/financialmanagement/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/financialmanagement/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/financialmanagement/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/financialmanagement/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/financialmanagement/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/financialmanagement/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/financialmanagement/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/financialmanagement/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/financialmanagement/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/financialmanagement/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/financialmanagement/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/financialmanagement/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/financialmanagement/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/financialmanagement/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/financialmanagement/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/financialmanagement/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/financialmanagement/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/financialmanagement/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/financialmanagement/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/financialmanagement/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/financialmanagement/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/financialmanagement/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/financialmanagement/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/financialmanagement/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/financialmanagement/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/financialmanagement/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/inpatient/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/inpatient/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/inpatient/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/inpatient/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/inpatient/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/inpatient/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/inpatient/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/inpatient/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/inpatient/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/inpatient/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/inpatient/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/inpatient/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/inpatient/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/inpatient/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/inpatient/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/inpatient/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/inpatient/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/inpatient/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/inpatient/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/inpatient/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/inpatient/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/inpatient/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/inpatient/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/inpatient/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/inpatient/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/inpatient/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/inpatient/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/inpatient/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/inpatient/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/inpatient/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/inpatient/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/inpatient/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/inpatient/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/inpatient/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/inpatient/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/inpatient/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/medication/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/medication/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/medication/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/medication/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/medication/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/medication/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/medication/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/medication/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/medication/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/medication/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/medication/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/medication/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/medication/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/medication/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/medication/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/medication/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/medication/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/medication/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/medication/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/medication/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/medication/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/medication/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/medication/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/medication/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/medication/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/medication/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/medication/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/medication/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/medication/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/medication/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/medication/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/medication/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/medication/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/medication/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/medication/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/medication/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patients/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patients/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patients/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patients/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patients/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patients/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patients/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/patients/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patients/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patients/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/patients/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/patients/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/patients/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patients/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patients/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patients/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patients/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patients/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patients/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patients/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patients/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patients/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patients/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patients/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patients/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patients/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patients/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patients/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patients/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patients/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patients/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/patients/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/patients/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/patients/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patients/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patients/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/rooms/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/rooms/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/rooms/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/rooms/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/rooms/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/rooms/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/rooms/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/rooms/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/rooms/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/rooms/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/rooms/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/rooms/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/rooms/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/rooms/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/rooms/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/rooms/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/rooms/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/rooms/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/rooms/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/rooms/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/rooms/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/rooms/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/rooms/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/rooms/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/rooms/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/rooms/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/rooms/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/rooms/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/rooms/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/rooms/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/rooms/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/rooms/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/rooms/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/rooms/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/rooms/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/rooms/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/staff/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/staff/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/staff/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/staff/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/staff/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/staff/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/staff/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/staff/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/staff/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/staff/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/staff/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/staff/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/staff/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/staff/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/staff/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/staff/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/staff/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/staff/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/staff/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/staff/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/staff/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/staff/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/staff/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/staff/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/staff/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/staff/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/staff/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/staff/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/staff/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/staff/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/staff/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/staff/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/staff/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/staff/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/staff/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/staff/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/user/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userauthsettings/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userauthsettings/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userauthsettings/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userauthsettings/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/userauthsettings/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userauthsettings/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userauthsettings/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userauthsettings/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userauthsettings/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userauthsettings/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userauthsettings/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/userauthsettings/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/role/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/userrole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },

    ];
    if (routeRoles && routeRoles.length) {
      const routes = [...new Set(routeRoles.map(routeRole => routeRole.route.toLowerCase()))];
      const routeMethods = [...new Set(routeRoles.map(routeRole => routeRole.method))];
      const roles = [ 'User', 'Admin', 'System_User' ];
      const insertedProjectRoute = await dbService.findAll(model.projectRoute, {
        uri: { $in: routes },
        method: { $in: routeMethods },
        'isActive': true,
        'isDeleted': false
      });
      const insertedRoles = await dbService.findAll(model.role, {
        code: { $in: roles.map(role => role.toUpperCase()) },
        'isActive': true,
        'isDeleted': false
      });
      let projectRouteId = '';
      let roleId = '';
      let createRouteRoles = routeRoles.map(routeRole => {
        projectRouteId = insertedProjectRoute.find(pr => pr.uri === routeRole.route.toLowerCase() && pr.method === routeRole.method);
        roleId = insertedRoles.find(r => r.code === routeRole.role.toUpperCase());
        if (projectRouteId && roleId) {
          return {
            roleId: roleId.id,
            routeId: projectRouteId.id
          };
        }
      });
      createRouteRoles = createRouteRoles.filter(Boolean);
      const routeRolesToBeInserted = [];
      let routeRoleObj = {};
    
      await Promise.all(
        createRouteRoles.map(async routeRole => {
          routeRoleObj = await dbService.findOne(model.routeRole, {
            routeId: routeRole.routeId,
            roleId: routeRole.roleId,
          });
          if (!routeRoleObj) {
            routeRolesToBeInserted.push({
              routeId: routeRole.routeId,
              roleId: routeRole.roleId,
            });
          }
        })
      );
      if (routeRolesToBeInserted.length) {
        const result = await dbService.createMany(model.routeRole, routeRolesToBeInserted);
        if (result) console.log('RouteRole seeded 🍺');
        else console.log('RouteRole seeder failed!');
      } else {
        console.log('RouteRole is upto date 🍺');
      }
    }
  } catch (error){
    console.log('RouteRole seeder failed due to ', error.message);
  }
}

/* seeds roles for users */
async function seedUserRole (){
  try {
    const userRoles = [{
      'username':'Vinnie_Roberts7',
      'password':'uxxbw9VnofYtOTk'
    },{
      'username':'Karianne.Hane',
      'password':'YxnEzmG7zZmfKvr'
    }];
    const defaultRoles = await dbService.findAll(model.role);
    const insertedUsers = await dbService.findAll(model.user, { username: { $in: userRoles.map(userRole => userRole.username) } });
    let user = {};
    const userRolesArr = [];
    userRoles.map(userRole => {
      user = insertedUsers.find(user => user.username === userRole.username && user.isPasswordMatch(userRole.password) && user.isActive && !user.isDeleted);
      if (user) {
        if (user.userType === authConstant.USER_TYPES.Admin){
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d)=>d.code === 'ADMIN').id
          });
        } else if (user.userType === authConstant.USER_TYPES.User){
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d)=>d.code === 'USER').id
          });
        } else {
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d)=>d.code === 'SYSTEM_USER').id
          });
        }  
      }
    });
    let userRoleObj = {};
    const userRolesToBeInserted = [];
    if (userRolesArr.length) {
      await Promise.all(
        userRolesArr.map(async userRole => {
          userRoleObj = await dbService.findOne(model.userRole, {
            userId: userRole.userId,
            roleId: userRole.roleId
          });
          if (!userRoleObj) {
            userRolesToBeInserted.push({
              userId: userRole.userId,
              roleId: userRole.roleId
            });
          }
        })
      );
      if (userRolesToBeInserted.length) {
        const result = await dbService.createMany(model.userRole, userRolesToBeInserted);
        if (result) console.log('UserRole seeded 🍺');
        else console.log('UserRole seeder failed');
      } else {
        console.log('UserRole is upto date 🍺');
      }
    }
  } catch (error){
    console.log('UserRole seeder failed due to ', error.message);
  }
}

/* calls of functions to seed mock data into multiple collections */
async function seedData (allRegisterRoutes){
  await seedUser();
  await seedRole();
  await seedProjectRoutes(allRegisterRoutes);
  await seedRouteRole();
  await seedUserRole();
};
module.exports = seedData;