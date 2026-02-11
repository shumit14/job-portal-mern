import { useEffect, useState } from "react";
import { getUserApplicationApi } from "../features/auth/jobs/jobApi";
import { Link } from "react-router-dom";

export default function AppliedJobs() {
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUserApplicationApi()
            .then(setApps)
            .finally(() => setLoading(false)); 
    }, []);

    if (loading) return <p className="p-6">Loading...</p>;

    if (apps.length === 0)
        return <p className="p-6">No applied jobs yet.</p>;

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">Applied Jobs</h1>

            {apps.map((app) => (
                <div
                    key={app._id}
                    className="border p-4 rounded shadow"
                >
                    <h2 className="text-xl font-semibold">
                        {app.job.title}
                    </h2>
                    <p>{app.job.company}</p>
                    <p className="text-sm text-gray-600">
                        Status: {app.status}
                    </p>

                    <Link
                        to={`/jobs/${app.job._id}`}
                        className="text-blue-600 underline mt-2 inline-block"
                    >
                        View Job
                    </Link>
                </div>
            ))}
        </div>
    );
}
