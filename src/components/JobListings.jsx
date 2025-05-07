import React, { use } from 'react'
import { useState, useEffect } from 'react';
import JobListing from './JobListing';
import Spinner from './Spinner';

const JobListings = ({isHome = false}) => {
  const [jobs,setJobs]=useState([]);
  const [loading, setLoader]=useState(true);

  useEffect(()=>{
    const fetchJobs=async()=>{
    const apiUrl=isHome? '/api/jobs?_limit=3': '/api/jobs';
      try{
        const response=await fetch(apiUrl);
        if(!response.ok){
          throw new Error('Error fetching jobs');
        }
        const data=await response.json(); 
        setJobs(data);
      }
      catch(error){
        console.error('Error fetching jobs:', error);
      }
      finally{
        setLoader(false);
      } 
    }
    fetchJobs();
  },[]);
  return (
    <section className="bg-blue-50 px-4 py-10">
    <div className="container-xl lg:container m-auto">
      <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
        {isHome? 'Browse Jobs': 'All Jobs'}
      </h2>
     
        {loading ? <Spinner loading={loading}/>:( <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{jobs.map((job)=>(
          <JobListing key={job.id} job={job}/>     
        ))}</div>)}
      
    </div>
  </section>
  );
};

export default JobListings