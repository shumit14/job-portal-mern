import { useParams } from "react-router-dom";
import { getApplicationsByJobApi, updateApplicationStatusApi } from '../../features/auth/jobs/adminJobApi'
import { useEffect, useState } from "react";

export default function JobApplications() {
    const { jobId } = useParams()
    const [apps, setApps] = useState([])
    const [loading, setLoading] = useState(true)

    const statusColor = {
        Applied: "text-gray-600",
        Reviewed: "text-blue-600",
        Rejected: "text-red-600",
    };

    useEffect(() => {
        if (!jobId) return
        getApplicationsByJobApi(jobId)
            .then(setApps)
            .finally(() => setLoading(false))
    }, [jobId])

    const handelStatusChange = async (id, status) => {
        await updateApplicationStatusApi(id, status)
        setApps((prev) =>
            prev.map((app) =>
                app._id === id ? { ...app, status } : app
            )
        )
    }


    if (loading) return <p className="p-6">Loading...</p>;

    if (apps.length === 0)
        return <p className="p-6">No applications yet.</p>;

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">Applications</h1>

            {apps.map((app) => (
                <div key={app._id} className="border p-4 rounded">
                    <p className="font-semibold">
                        {app.applicant.name} ({app.applicant.email})
                    </p>

                    <p className={`font-semibold ${statusColor[app.status]}`}>
                        Status: {app.status}
                    </p>
                    {app.resumeUrl && (
                        <a
                            href={app.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline block mt-2"
                        >
                            View Resume
                        </a>
                    )}
                    <select
                        value={app.status}
                        onChange={(e) =>
                            handelStatusChange(app._id, e.target.value)
                        }
                        disabled={app.status === "Rejected"}
                        className="mt-2 border p-2 rounded"
                    >
                        <option value="Applied" disabled>
                            Applied
                        </option>

                        <option value="Reviewed">
                            Reviewed
                        </option>

                        <option value="Rejected">
                            Rejected
                        </option>
                    </select>

                </div>
            ))}

        </div>
    );

}