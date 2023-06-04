const express = require("express");
const router = express.Router();

const weatherApi = require("../controllers/weather");

router.get("/weatherDetails/:city", weatherApi.details);

console.log("router loaded");

module.exports = router;