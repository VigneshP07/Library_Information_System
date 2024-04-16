const express = require('express')
const router = express.Router()

const {newUser,loginUser,getUserProfile,updatePassword,logout, updateProfile,allUsers,getUserDetails, updateUser, deleteUser,reserveBooktoUser,notifyUser,DeleteBookTaken,AvailablenotifyUser,BookTaken,RemoveReserve} = require('../Controllers/UserController');
const {isAuthenticatedUser,authorizedRoles} = require('../middleware/auth')

router.route('/register').post(newUser);
router.route('/login').post(loginUser);

router.route('/logout').get(logout)

router.route('/me/:id').get(getUserProfile)
router.route('/password/update/:id').patch(updatePassword)
router.route('/me/update/:id').patch(updateProfile)
router.route('/me/reserve/:id').patch(reserveBooktoUser)
router.route('/notify/:id').patch(notifyUser)
router.route('/availablenotify/:id').patch(AvailablenotifyUser)
router.route('/DeleteBookTaken/:id').patch(DeleteBookTaken)
router.route('/BookTaken/:id').patch(BookTaken)
router.route('/RemoveReserve/:id').patch(RemoveReserve)

router.route('/admin/users').get(allUsers)
router.route('/admin/users/:id').get(getUserDetails)
router.route('/admin/users/:id').put(updateUser)
router.route('/admin/users/:id').delete(deleteUser)

module.exports = router;