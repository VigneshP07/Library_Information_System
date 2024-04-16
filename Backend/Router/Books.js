const express = require('express')
const router = express.Router();

const { getBooks, newBook,getSingleBook,getAdminBooks,updateBook,deleteBook,addUsertoBook,reserveUsertoBook,updateAvailability} = require('../Controllers/BooksControllers')
const {isAuthenticatedUser,authorizedRoles} = require('../middleware/auth')

router.route('/Books').get(getBooks);
router.route('/Books/:id').get(getSingleBook);
router.route('/Books/:id').patch(reserveUsertoBook);

router.route('/TakenBook/:id').patch(addUsertoBook);
router.route('/UpdateAvailbility/:id').patch(updateAvailability);
router.route('/admin/Books/:id').put(updateBook).delete(deleteBook);
router.route('/admin/Books').get(getAdminBooks);
router.route('/admin/Books/New').post(newBook);

module.exports = router;