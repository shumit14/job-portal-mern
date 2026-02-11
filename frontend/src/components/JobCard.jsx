import { Link } from "react-router-dom"

export default function JobCard({job}){
    return(
       <div className="rounded-lg border p-4 shadow-sm">
        <h3 className="text-lg font-semibold">{job.title}</h3>
        <p className="text-sm text-gray-600">{job.company}</p>
        <p  className="text-sm">{job.location}</p>

        <Link to={`/jobs/${job._id}`}  className="mt-3 inline-block text-blue-600 hover:underline">View Details</Link>

        {/* <Link to="/applied-jobs" className="text-blue-600 underline mb-4 inline-block">View Applied Jobs</Link> */}

        
       </div>
    )
}
