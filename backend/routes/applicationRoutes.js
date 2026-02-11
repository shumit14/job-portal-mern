const express = require("express");
const {
  applyToJob,
  getJobApplications,
  getUserApplications,
  getCheckApplication,
  updateApplicationStatus,
} = require("../controllers/applicationController");
const upload = require('../middleware/uploadResume')

const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// USER
router.post("/apply/:jobId", protect,upload.single('resume'), applyToJob);
router.get("/user", protect, getUserApplications);
router.get("/check/:jobId", protect, getCheckApplication);

// ADMIN
router.get("/job/:jobId", protect, adminOnly, getJobApplications);
router.put("/:id/status", protect, adminOnly, updateApplicationStatus);

module.exports = router;
