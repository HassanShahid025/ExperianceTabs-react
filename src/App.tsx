import { useEffect, useState } from 'react';
import './App.css';
import { FaAngleDoubleRight } from 'react-icons/fa'
const url = 'https://course-api.com/react-tabs-project'

function App() {

  interface JobType{
    id:string;
    order:number
    company:string;
    dates:string;
    duties:string[];
    title:string
  }

  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<JobType[]>([]);
  const [value, setValue] = useState(0);

  const FetchData = async () => {
    const response = await fetch(url);
    const newJobs = await response.json();
    setJobs(newJobs);
    setLoading(false);
  } 

  useEffect(()=>{
    FetchData();
  },[])

  if(loading){
    return(
      <h1>Loading...</h1>
    )
  }

  const {company, dates, duties, title} = jobs[value]
  console.log(duties)
  return (
    <div className="main-container">
      <div className="title">
          <h1>Experience</h1>
          <div className="underline"></div>
      </div>

      <div className="company-job">

        <div className="btn-container">
          {jobs.map((job, index) => {
            return(
              <button 
              onClick={()=>{setValue(index)}}
              className={`${index===value && 'active-btn'}`}>
                {job.company}</button>
            )
          })}
        </div>
        
        <div className="job-section">
          <h3>{title}</h3>
          <h4>{company}</h4>
          <h6>{dates}</h6>
          {duties.map((duty) => {
            return(
              <div className="role">
                <i><FaAngleDoubleRight/></i>
                <p>{duty}</p>
              </div>
            )
            
          })}
        </div>

      </div>
      
    </div>
  );
}

export default App;
