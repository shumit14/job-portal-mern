import { Navigate, Route, Router, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Jobs from "./pages/Jobs";
import AdminJobs from "./pages/admin_data/Adminjobs";
import JobApplications from "./pages/admin_data/JobApplications";
import JobDetails from './pages/JobDetails'
import AppliedJobs from "./pages/AppliedJobs";
import CreateJob from "./pages/admin_data/CreateJob"
import Register from "./pages/Register"
import EditJobs from "./pages/admin_data/EditJobs";
import Layout from "./components/Layout"


function App() {
  return (
    <>
     
      <Layout>
        <Routes>
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<Navigate to='/login' />} />
          <Route path="/login" element={<Login />} />
          <Route path='/jobs' element={
            <ProtectedRoutes>
              <Jobs />
            </ProtectedRoutes>
          } />

          <Route
            path="/jobs/:id"
            element={
              <ProtectedRoutes>
                <JobDetails />
              </ProtectedRoutes>
            }
          />
          <Route path="/applied-jobs" element={
            <ProtectedRoutes>
              <AppliedJobs />
            </ProtectedRoutes>
          } />

          <Route
            path="/admin"
            element={
              <ProtectedRoutes role="ADMIN">
                <Navigate to="/admin/jobs" />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/admin/create-job"
            element={
              <ProtectedRoutes role="ADMIN">
                <CreateJob />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/admin/jobs"
            element={
              <ProtectedRoutes role="ADMIN">
                <AdminJobs />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/admin/jobs/:jobId"
            element={
              <ProtectedRoutes role="ADMIN">
                <JobApplications />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/admin/edit-job/:id"
            element={
              <ProtectedRoutes role="ADMIN">
                <EditJobs />
              </ProtectedRoutes>
            }
          />



        </Routes>
      </Layout>
    </>
  );
}

export default App;
