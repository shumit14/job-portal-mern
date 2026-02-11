const Job = require('../models/Job')
const mongoose = require("mongoose");


// CREATE JOB (ADMIN)

exports.createJob = async (req,res)=>{

    try {
        const job = await Job.create({
            ...req.body,
            createdBy : req.user.id
        })
        res.status(201).json(job);

    } catch (error) {
           console.error("CREATE JOB ERROR:", error);
  res.status(500).json({ message: error.message });
    }

}

// GET ALL JOBS (PUBLIC)

exports.getJobs = async (req, res) => {
  try {
    // Query params
    const page = Number(req.query.page) || 1;
    const limit = 1;
    const skip = (page - 1) * limit;

    // Search query (safe)
    let searchQuery = {};
    if (req.query.keyword && req.query.keyword.trim() !== '') {
      searchQuery = {
        title: { $regex: req.query.keyword, $options: 'i' },
      };
    }

    // Fetch jobs
    const jobs = await Job.find(searchQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Count for pagination
    const totalJobs = await Job.countDocuments(searchQuery);
    const totalPages = Math.ceil(totalJobs / limit);

    // Proper JSON response
    res.status(200).json({
      jobs,
      page,
      totalPages,
      totalJobs,
    });
  } catch (error) {
    console.error('GET JOBS ERROR:', error);
    res.status(500).json({ message: 'Job not found' });
  }
};


// FIND JOB BY ID

exports.getJobById = async (req,res)=>{
   try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Job ID" });
    }

    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

//GET MY JOB 
exports.getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      createdBy: req.user.id  
    }).sort({ createdAt: -1 });

    res.status(200).json(jobs);
  } catch (error) {
    console.log("GET MY JOB ERROR", error);
    res.status(500).json({ message: "failed to fetch admin jobs" });
  }
};


// UPDATE JOBS

exports.updateJobs = async (req,res)=>{
  try {
    const job = await Job.findById(req.params.id)

    if(!job){
      res.status(404).json({message : "Job not Found"})
    }

    if(job.createdBy.toString() !== req.user._id.toString()){
      return res.status(403).json({message : "Not Authorized"})
    }
    const updateJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new : true}
    )

    res.json(updateJob)
  } catch (error) {
    return res.status(500).json({message : error.message})
  }
}

//DELETE JOBS
exports.deleteJobs = async (req,res)=>{
  try {
    const jobs = await Job.findById(req.params.id)

    if(!jobs){
      return res.status(404).json({message : "Job not found"})
    }

    if(jobs.createdBy.toString() !== req.user._id.toString()){
      return res.status(403).json({message : "Not Authorized"})
    }

    await Job.deleteOne()
    res.json({message : "Job deleted successfully"})

  } catch (error) {
    return res.status(500).json({message : error.message})
  }
}