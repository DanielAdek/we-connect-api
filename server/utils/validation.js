/**
 * @desc REQUEST SCHEMA
 */
export default {
  login: {
    formType: 'authenticate',
    a: { field: 'email', required: true },
    b: { field: 'password', required: true }
  },
  singup: {
    formType: 'onboard',
    a: { field: 'firstName', required: true, isName: true },
    b: { field: 'lastName', required: true, isName: true },
    c: { field: 'email', required: true, isEmail: true },
    h: { field: 'username', required: true, isName: true },
    k: {
      field: 'password', required: true, min: 8, max: 15
    }
  },
  business: {
    formType: 'create_business',
    a: { field: 'businessName', required: true, isName: true },
    b: { field: 'description', required: true },
    c: { field: 'category', required: true, isName: true },
    d: { field: 'businessLocation', required: true },
    e: { field: 'contactNumber', isPhoneNumber: true }
  },
  edit: {
    formType: 'edit_business',
    a: { field: 'businessName', isName: true },
    b: { field: 'description' },
    c: { field: 'category', isName: true },
    d: { field: 'businessLocation' },
    e: { field: 'contactNumber', isPhoneNumber: true }
  },
  chat: {
    formType: 'create_chat',
    a: { field: 'userId', isInteger: true }
  },
};
