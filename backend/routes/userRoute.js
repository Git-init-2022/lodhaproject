const express = require("express");
const { getAllusers, createUser, updateUser, deleteUser, getUser, loginUser, updateProfile } = require("../controllers/userController");
const router = express.Router();
const multer = require('multer');
router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
const storage = multer.diskStorage({ 
  // destination: function(req, file, cb) {
  //     cb(null, 'uploads/')
  // },
  // filename: function(req, file, cb) {
  //     cb(null, file.fieldname + '-' + Date.now())
  // }
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb('invalid image file !', false);
  }
}

const uploads = multer({storage, fileFilter});


router.route("/login").post(loginUser);
// router.route("/me/update").put(isAuthenticatedUser, updateProfile);
router.route('/users').get(getAllusers)
router.route('/register').post(createUser);
router.route('/userupdate').get(updateUser)
router.route('/userdelete').get(deleteUser);
router.route('/singleUser').get(getUser);
router.route('/updateProfile').post(uploads.single('profile'), updateProfile);

module.exports = router