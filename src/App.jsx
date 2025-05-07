import React from "react";
import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import JobsPage from "./pages/JobsPage";
import NotFoundPage from "./pages/NotfoundPage";
import JobPage,{jobLoader} from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";

//add job function
const addJob = async (newjob) => {
  const apiUrl = "/api/jobs";
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newjob),
    });
    if (!response.ok) {
      throw new Error("Error adding job");
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding job:", error);
  }
}

//delete job function
const deleteJob = async (jobId) => {
  const apiUrl = `/api/jobs/${jobId}`;
  try {
    const response = await fetch(apiUrl, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error deleting job");
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting job:", error);
  }
}

//update job function
const updateJob = async (updatedJob) => {
  const apiUrl = `/api/jobs/${updatedJob.id}`;
  try {
    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedJob),
    });
    if (!response.ok) {
      throw new Error("Error updating job");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating job:", error);
  }
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout/>}>
      <Route index element={<HomePage/>}/>
      <Route path="/jobs" element={<JobsPage/>}/>
      <Route path="/add-job" element={<AddJobPage addJobSubmit={addJob}/>}/>
      <Route path="/job/:id" element={<JobPage deleteJob={deleteJob}/>} loader={jobLoader}/>
      <Route path="/edit-job/:id" element={<EditJobPage updateJobSubmit={updateJob}/>} loader={jobLoader}/>
      <Route path="*" element={<NotFoundPage/>}/>
    </Route>
  )
);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
