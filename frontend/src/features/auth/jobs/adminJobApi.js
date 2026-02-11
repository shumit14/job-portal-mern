import axiosInstance from "../../../utils/axiosInstance";

//ADMIN CREATES JOBS
export const createJobApi = async (jobData) => {
  const res = await axiosInstance.post("/jobs/admin/create", jobData);
  return res.data;
};

// Admin – My Jobs
export const getMyJobsApi = async () => {
  const res = await axiosInstance.get("/jobs/admin/my-jobs");
  return res.data;
};

//Admin - Update Jobs
export const updateJobApi = async (id,data)=>{
  const res = await axiosInstance.put(`/jobs/${id}`,data)
  return res.data;
}

// Admin - Deletes jobs
export const deleteJobApi = async (id)=>{
  const res = await axiosInstance.delete(`/jobs/${id}`)
  return res.data
}

// Admin – Applications per job
export const getApplicationsByJobApi = async (jobId) => {
  const res = await axiosInstance.get(`/applications/job/${jobId}`);
  return res.data;
};

// Admin – Update status
export const updateApplicationStatusApi = async (id, status) => {
  const res = await axiosInstance.put(
    `/applications/${id}/status`,
    { status }
  );
  return res.data;
};
