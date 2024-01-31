const nodemailer = require('nodemailer');
const Student = require('../Models/StudentSchema');
const mongoose = require('mongoose');

//To get a data from student
const studentRegister = async (req, res) => {
  try {
    const { name, email, phone, address, percentage, topClass } = req.body;

    if (!name || !email || !phone || !address || !percentage) {
      return res
        .status(400)
        .json({ status: false, message: 'Please fill out all fields' });
    }

    if (phone.length !== 10) {
      return res.status(400).json({
        status: false,
        message: 'Please enter a valid 10-digit phone number',
      });
    }

    const existUser = await Student.findOne({ email });

    if (existUser) {
      return res
        .status(400)
        .json({ status: false, message: 'Email already exists' });
    } else {
      const userData = await Student.create({
        name,
        email,
        phone,
        address,
        percentage,
        topClass,
      });

      const registeredDate = new Date();
      const interviewDate = new Date(
        registeredDate.getTime() + 3 * 24 * 60 * 60 * 1000
      );
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'gowthampostbox30@gmail.com',
          pass: process.env.MAIL_KEY,
        },
      });

      var mailOptions = {
        from: 'gowthampostbox30@gmail.com',
        to: email, // Use the 'email' variable here
        subject: 'Registration Successful',
        text: `Thanks for your registration! Your interview will be scheduled on ${interviewDate.toDateString()}`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      return res.status(200).json({
        status: true,
        message: 'User Successfully Registered',
        userData,
      });
    }
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({
      status: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

//Show the details of a students
const studentDeatils = async (req, res) => {
  try {
    let data = await Student.find();
    return res.status(200).json({ data });
  } catch (error) {
    res.status(201).json({ status: false, Message: 'Something Went Wrong!' });
  }
};

//To edit the details of details report
const editStudentDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const updateDetails = req.body;

    const updatedStudent = await Student.findByIdAndUpdate(id, updateDetails, {
      new: true,
    });

    if (!updatedStudent) {
      return res
        .status(404)
        .json({ status: false, message: 'Student not found' });
    }

    return res.status(200).json({
      status: true,
      message: 'Student details updated successfully',
      updatedStudent,
    });
  } catch (error) {
    console.error('Error during student update:', error);
    return res.status(500).json({
      status: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

//To Delete the student Details
const studentDelete = async (req, res) => {
  try {
    const studentId = req.params.id;
    const deletedStudent = await Student.findByIdAndDelete(studentId);

    if (!deletedStudent) {
      return res
        .status(404)
        .json({ status: false, message: 'Student not found' });
    }

    return res.status(200).json({
      status: true,
      message: 'Student deleted successfully',
      deletedStudent,
    });
  } catch (error) {
    console.error('Error during student deletion:', error);
    return res.status(500).json({
      status: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

//Lookup Api
const lookupStudent = async (req, res) => {
  try {
    const studentNames = await Student.find({}, 'name');
    res.status(200).json({
      status: true,
      message: 'Student names fetched successfully',
      data: studentNames,
    });
  } catch (error) {
    console.error('Error fetching student names:', error);
    res.status(500).json({
      status: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

//To get all students by a specific teacher
const studentDetails = async (req, res) => {
  try {
    const studentId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({
        status: false,
        message: 'Invalid student ID',
      });
    }

    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({
        status: false,
        message: 'Student not found',
      });
    }

    return res.status(200).json({
      status: true,
      message: 'Student details fetched successfully',
      data: student,
    });
  } catch (error) {
    console.error('Error fetching student details:', error);
    return res.status(500).json({
      status: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

module.exports = {
  studentRegister,
  studentDeatils,
  editStudentDetails,
  studentDelete,
  // selectedStudent,
  // selectedStudentsUpdate,
  lookupStudent,
  studentDetails,
};
