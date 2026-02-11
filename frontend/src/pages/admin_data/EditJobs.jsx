import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchJobApiById } from '../../features/auth/jobs/jobApi'

import { updateJobApi } from '../../features/auth/jobs/adminJobApi'

export default function EditJobs() {
    const {id} = useParams()
    const navigate = useNavigate()
    const [form,setForm] = useState({
         title: "",
    company: "",
    location: "",
    salaryRange: "",
    description: "",
    })
    useEffect(()=>{
        fetchJobApiById(id).then(setForm)
    },[id])

    const handleChange = (e)=>{
        setForm({...form,[e.target.name] : e.target.value})
    }

    const handleSubmit=(async (e)=>{
        e.preventDefault()

        await updateJobApi(id,form)

        navigate('/admin/jobs')
    })
  return (
     <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Edit Job</h1>

      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="border p-2 w-full" />
      <input name="company" value={form.company} onChange={handleChange} placeholder="Company" className="border p-2 w-full" />
      <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="border p-2 w-full" />
      <input name="salaryRange" value={form.salaryRange} onChange={handleChange} placeholder='salaryRange' className='border p-2 w-full' />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-2 w-full" />

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Update Job
      </button>
    </form>
  )
}
