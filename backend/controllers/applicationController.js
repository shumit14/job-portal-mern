const Application = require("../models/Application");

/* ===========================
   USER CONTROLLERS
=========================== */

// APPLY TO JOB
exports.applyToJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.user._id;

    const alreadyApplied = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (alreadyApplied) {
      return res.status(400).json({
        message: "You have already applied for this job",
      });
    }

    if(!req.file){
      return res.status(400).json({message: "Resume is Required"})
    }

    const application = await Application.create({
      job: jobId,
      applicant: userId,
      resumeUrl : `/uploads/resumes/${req.file.filename}`
    });

    res.status(201).json({
      success: true,
      application,
    });
  } catch (error) {
    console.error("Apply Job Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// USER – MY APPLICATIONS
exports.getUserApplications = async (req, res) => {
  try {
    const apps = await Application.find({
      applicant: req.user._id,
    }).populate("job");

    res.json(apps);
  } catch (error) {
    console.error("Get User Applications Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// CHECK IF USER APPLIED
exports.getCheckApplication = async (req, res) => {
  try {
    const app = await Application.findOne({
      job: req.params.jobId,
      applicant: req.user._id,
    });

    res.json({ applied: !!app });
  } catch (error) {
    console.error("Check Application Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/* ===========================
   ADMIN CONTROLLERS
=========================== */

// ADMIN – APPLICATIONS FOR A JOB
exports.getJobApplications = async (req, res) => {
  try {
    const apps = await Application.find({
      job: req.params.jobId,
    })
      .populate("applicant", "name email")
      .populate("job", "title");

    res.json(apps);
  } catch (error) {
    console.error("Get Job Applications Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ADMIN – GET ALL APPLICATIONS
exports.getAllApplications = async (req, res) => {
  try {
    const apps = await Application.find()
      .populate("job", "title")
      .populate("applicant", "name email");

    res.json(apps);
  } catch (error) {
    console.error("Get All Applications Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ADMIN – UPDATE APPLICATION STATUS
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Applied", "Reviewed", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const app = await Application.findById(req.params.id);

    if (!app) {
      return res.status(404).json({ message: "Application not found" });
    }

    if(app.status === "Rejected") {
      return res.status(400).json({
        message: "Rejected application cannot be updated",
      });
    }

    const allowedStatuses = ["Reviewed", "Rejected"];
    if (!allowedStatuses.includes(req.body.status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    app.status = status;
    await app.save();

    res.json({
      success: true,
      application: app,
    });
  } catch (error) {
    console.error("Update Status Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


