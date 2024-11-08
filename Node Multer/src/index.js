const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();

// Ensure 'uploads' directory exists
const uploadPath = './uploads';
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath); // Save files to 'uploads/' directory
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`; // Name with timestamp
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Middleware to serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route to handle file upload
app.post('/profile', upload.single('avatar'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  console.log('File received:', req.file);

  res.json({
    message: 'File uploaded successfully',
    filename: req.file.filename,
    path: req.file.path,
  });
});

// Start the server
app.listen(8080, () => {
  console.log(`Server running at http://localhost:8080`);
});















// const express = require('express')
// const app = express()
// const multer  = require('multer')


// const upload = multer({ dest: 'uploads/' })


// app.post('/profile', upload.single('avatar'), function (req, res, next) {
//   // req.fifilele is the `avatar` file
//   // req.body will hold the text fields, if there were any
//   console.log(req.file,"-=-=-=",req.body)
//   res.send('data received')
// })

// app.listen(8080, () => {
//     console.log(`Server Running on local host 8080`)
// })



