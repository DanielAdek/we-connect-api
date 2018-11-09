module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Users', [{
    username: 'testname',
    email: 'mail1@gmail.com',
    password: 'newpassword',
    createdAt: '2018-11-07',
    updatedAt: '2018-11-07'
  },
  {
    username: 'another',
    email: 'mail2@gmail.com',
    password: 'newpassword2',
    createdAt: '2018-11-07',
    updatedAt: '2018-11-07'
  },
{
    username: 'thirdUser',
    email: 'mail3@gmail.com',
    password: 'newpassword3',
    createdAt: '2018-11-07',
    updatedAt: '2018-11-07'
  }]),
  down: queryInterface => queryInterface.bulkDelete('Users')
};
