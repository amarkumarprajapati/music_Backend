const express = require("express");
const router = express.Router();
const musicController = require("../controller/myallmusic");

router.get("/getmusic", musicController.getAllMusic);
router.post("/playmusic", musicController.getMusicByName);

module.exports = router;
