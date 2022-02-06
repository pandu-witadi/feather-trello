//
//
//
const test = require('./test/test.service.js')
const users = require('./users/users.service.js')

const boards = require('./boards/boards.service.js');

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
    app.configure(test)
    app.configure(users)
    app.configure(boards);
}
