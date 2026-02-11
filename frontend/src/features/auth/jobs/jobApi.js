import axiosInstance from "../../../utils/axiosInstance"

export const fetchJobApi = async({page = 1, keyword = ''})=>{
    const res = await axiosInstance.get(`/jobs?page=${page}&keyword=${keyword}`)
    return res.data
}

export const fetchJobApiById = async(id)=>{
    const res = await axiosInstance.get(`/jobs/${id}`)
    return res.data
}

export const applyJobApi = async(jobId, formData)=>{
    const res = await axiosInstance.post(`/applications/apply/${jobId}`, formData
    )
    return res.data
}

export const checkAppliedApi = async(jobId)=>{
    const res = await axiosInstance.get(`/applications/check/${jobId}`)
    return res.data
}

export const getUserApplicationApi = async()=>{
    const res = await axiosInstance.get('/applications/user')
    return res.data
}