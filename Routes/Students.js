const express = require('express');

const {
  studentRegister,
  studentDeatils,
  editStudentDetails,
  studentDelete,
  lookupStudent,
  studentDetails,
  updateSelectedStudent,
  selectedStudentDelete,
} = require('../Controller/StudentForm');

const router = express.Router();

//Student detail report
router.route('/studentRegister').post(studentRegister);
router.route('/studentDetail').get(studentDeatils);
router.route('/studentEdit/:id').put(editStudentDetails);
router.route('/studentDelete/:id').delete(studentDelete);

//Selected student api
router.route('/lookup').get(lookupStudent);
router.route('/student/:id').get(studentDetails);
router.route('/studentUpdate/:id').put(updateSelectedStudent);
router.route('/selectedStudentDelete/:id').delete(selectedStudentDelete);

module.exports = router;
