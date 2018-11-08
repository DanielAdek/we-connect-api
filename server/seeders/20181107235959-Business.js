module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Businesses', [{
    businessName: 'testname',
    description: 'description',
    address: '',
    categories: '',
    contactNumber: '0303004',
    createdAt: '2018-11-07',
    updatedAt: '2018-11-07'
  }]),
  down: queryInterface => queryInterface.bulkDelete('Businesses')
};
