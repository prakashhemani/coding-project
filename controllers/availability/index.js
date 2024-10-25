"use strict";

const express = require("express");
const router = express.Router();

const availabilitySvc = require("../../services/availability");

router.get("/overlap", availabilitySvc.findOverlap);

router.get("/:userId", availabilitySvc.getAvailability);

router.post("/", availabilitySvc.addAvailability);



module.exports = router;
