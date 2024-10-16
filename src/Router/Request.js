const express = require("express");
const songrequest = require("../Controller/userrequest");
const multer = require("multer");
let router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/reques", upload.single("songFile"), songrequest.requestsong);

module.exports = router;
