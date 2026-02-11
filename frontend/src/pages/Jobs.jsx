import {useDispatch, useSelector} from 'react-redux'
import { useEffect, useState } from 'react'
import {fetchJob} from '../features/auth/jobs/jobSlice'
import JobCard from '../components/JobCard'

export default function Jobs() {
  const dispatch = useDispatch()
  const {list,page,totalPages,loading} = useSelector((state)=>state.jobs)

  const [keyword, setKeyword] = useState('')

  useEffect(()=>{
    dispatch(fetchJob({page : 1, keyword}))
  },[dispatch,keyword]
  )

  return (
    <div className='p-6'>
      <h3 className='mb-4 text-2xl font-bold'>Jobs</h3>

      {/* SEARCH */}
      <input type="text" placeholder='Search jobs...' className='mb-6 w-full rounded border px-3 py-2' 
      value={keyword} onChange={(e)=>setKeyword(e.target.value)} />

      {/* LOADING */}
      {loading && <p>loading...</p>}

      {/* JOB LIST */}
       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {list.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>

      {/* PAGINATION */}
       <div className="mt-6 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => dispatch(fetchJob({ page: i + 1, keyword }))}
            className={`rounded px-1 py-0.2 border ${
              page === i + 1 ? 'bg-blue-600 text-white' : ''
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  )
}
