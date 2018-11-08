module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Businesses', [{
    businessName: 'testname',
    description: 'description',
    address: '',
    categories: 'software development',
    contactNumber: '0303004',
    createdAt: '2018-11-07',
    updatedAt: '2018-11-07'
  },
  {
    businessName: 'fakeBiz',
    description: 'fake_description',
    address: 'wrong-fake',
    categories: 'fake',
    contactNumber: '419',
    createdAt: '2018-11-07',
    updatedAt: '2018-11-07'
  }]),
  down: queryInterface => queryInterface.bulkDelete('Businesses')
};
