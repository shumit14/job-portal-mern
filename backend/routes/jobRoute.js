const express = require('express')
const {createJob,getJobs,getJobById,getMyJobs,updateJobs,deleteJobs} = require('../controllers/jobController')
const {protect,adminOnly} = require('../middleware/authMiddleware')

const router = express.Router();

router.get("/", getJobs);

// ADMIN
router.post("/admin/create", protect, adminOnly, createJob);
router.get("/admin/my-jobs", protect, adminOnly, getMyJobs);

//UPDATE
router.put("/:id",protect,adminOnly,updateJobs);

//DELETE
router.delete("/:id",protect,adminOnly,deleteJobs);

// PUBLIC (keep LAST)
router.get("/:id", getJobById);

module.exports = router