import React, {useState, useEffect, useRef} from 'react'
import {Line} from 'react-chartjs-2';
import axios from 'axios';
import styles from './JobInformation.module.css'

export default function JobInformation() {
  //declaring state variables
  const [currentJob, setCurrentJob] = useState({});
  const [errorMessage, seterrorMessage] = useState('');
  const [estimatePay, setestimatePay] = useState({});
  const [estimateHours, setEstimateHours] = useState(0);
  const [relatedCourses, setRelatedCourses] = useState([]);
  const [unemploymentRate, setUnemploymentRate] = useState({});
  const [averageWage, setAverageWage] = useState(0);
  const [searched, setSearched] = useState(false);
  const jobInput = useRef(null);
  const regionDropdown = useRef(null);


  //once the currentJob has changed search for estimate pay
  useEffect(() => {
    const chart = async () => {
      let url = `https://api.lmiforall.org.uk/api/v1/ashe/estimatePay?soc=${currentJob.soc}`;
      if (regionDropdown.current.value > 0) {
        url = `https://api.lmiforall.org.uk/api/v1/ashe/estimatePay?soc=${currentJob.soc}&filters=region%3A${regionDropdown.current.value}`;
      }

      const req = await axios.get(url);
      const data = await req.data;

      if (!data.series) {
        setestimatePay({
          labels: ['Not Enough Data'],
          datasets: [
            {
              label: 'Not Enough Data',
              data: [],
              backgroundColor: ['rgba(64, 59, 141, 0.7)'],
              borderWidth: 4,
            }
          ]
        })
        return
      }

      data.series.sort((a,b) => {
        if (a.year < b.year) {
          return -1
        }
        if (a.year > b.year) {
          return 1
        }
        return 0;
      });

      data.series.forEach(e => {
        e.estpay = e.estpay * 52;
      });

      const years = data.series.map(obj => {
        return obj.year
      })
      const pay = data.series.map(obj => {
        return obj.estpay
      })

      setestimatePay({
        labels: [...years],
        datasets: [
          {
            label: 'Salary',
            data: [...pay],
            backgroundColor: ['rgba(64, 59, 141, 0.7)'],
            borderWidth: 4,
          }
        ]
      })
    }
    chart()
  }, [currentJob, regionDropdown]) 

  //once the current job state changes get Unemployment History
  useEffect(() => {
    const UnemploymentHistory = async () => {

      let url = `https://api.lmiforall.org.uk/api/v1/lfs/unemployment?soc=${currentJob.soc}`;
      if (regionDropdown.current.value > 0) {
        url = `https://api.lmiforall.org.uk/api/v1/lfs/unemployment?soc=${currentJob.soc}&filterBy=region%3A${regionDropdown.current.value}`;
      }
      //use the SOC in state to get the average unemployment rates from the LMI For ALL API
      const req = await axios.get(url)
      const data = await req.data;

      if (!data.years) {
        setUnemploymentRate({
          labels: ['Not Enough Data'],
          datasets: [
            {
              label: 'Not Enough Data',
              data: [],
              backgroundColor: ['rgba(64, 59, 141, 0.7)'],
              borderWidth: 4,
            }
          ]
        })
        return
      }
  
      data.years.sort((a,b) => {
        if (a.year < b.year) {
          return -1
        }
        if (a.year > b.year) {
          return 1
        }
        return 0;
      });
  
      const years = data.years.map(obj => {
        return obj.year
      })
      const unemploymentRate = data.years.map(obj => {
        return obj.unemprate
      })
  
      setUnemploymentRate({
        labels: [...years],
        datasets: [
          {
            label: 'Rate',
            data: [...unemploymentRate],
            backgroundColor: ['rgba(64, 59, 141, 0.7)'],
            borderWidth: 4,
          }
        ]
      })
    };
    UnemploymentHistory();
  }, [currentJob, regionDropdown]);

  //once the current job state has changed then searched for the working hours
  useEffect(() => {
    const getWorkingHours = async () => {

      let url = `https://api.lmiforall.org.uk/api/v1/ashe/estimateHours?soc=${currentJob.soc}`;
      if (regionDropdown.current.value > 0) {
        url = `https://api.lmiforall.org.uk/api/v1/ashe/estimateHours?soc=${currentJob.soc}&filters=region%3A${regionDropdown.current.value}`;
      }
      
      const workingHoursReq = await axios.get(url);
      const workingHours = await workingHoursReq.data;
  
      if (!workingHours.series) {
        setEstimateHours(0);
        return;
      }
      let sum = 0;
      workingHours.series.forEach(element => {
        sum += parseInt(element.hours, 10);
      });
      setEstimateHours(Math.round(sum/workingHours.series.length));
    };
    getWorkingHours();
  }, [currentJob, regionDropdown]);


  //once the current job state has changed then search for the related course
  useEffect(() => {
    try {
      const getRelatedCourse = async () => {
      const req = await axios.get(`https://api.lmiforall.org.uk/api/v1/hesa/courses/${currentJob.soc}`);
      const data = await req.data;
    
      if (!data.years || data.years.length === 0) {
        setRelatedCourses([{name: 'No related courses to this job'}])
        return 
      }
    
      const relatedCoursesArray = data.years[0].courses.filter(element => {
        return element.percentage > 50; 
      });
      setRelatedCourses(relatedCoursesArray);
      };
      getRelatedCourse();
    } catch (error) {
      setRelatedCourses([]);      
    }
  }, [currentJob]);

  //once the current job state has changed then set the average salary
  useEffect(() => {
    try {
      let sum = 0;
      estimatePay.datasets[0].data.forEach(element => {
        sum += parseInt(element, 10);
      });
      setAverageWage(Math.round(sum/estimatePay.datasets[0].data.length));
    } catch (error) {
      setAverageWage(0);      
    }
  }, [estimatePay, regionDropdown]);



  const searchJob = async () => {
    if (jobInput.current.value === null ||jobInput.current.value === '') {
      seterrorMessage('Please provide an input');
      return;
    }

    const job = await axios.get(`https://api.lmiforall.org.uk/api/v1/soc/search?q=${jobInput.current.value}`);
    if (job.data.length === 0) {
      seterrorMessage('No Results Found');
      return;
    }
    seterrorMessage('');
    const jobdata = await job.data[0];
    await setCurrentJob(jobdata);
    setSearched(true)
  };
  

  return (
    <>
      <h1>Job Information</h1>
      <div>
        <input type='text' ref={jobInput} placeholder='Search for a job...'/>
        <button onClick={searchJob}>Search</button>
        <br/>
        <br/>
        <select id='Region-Filter' ref={regionDropdown} onChange={searchJob}>
          <option value='0'>All Areas</option>
          <option value='1'>London</option>
          <option value='2'>South East (England)</option>
          <option value='3'>East of England</option>
          <option value='4'>South West (England)</option>
          <option value='5'>West Midlands (England)</option>
          <option value='6'>East Midlands (England)</option>
          <option value='7'>Yorkshire and the Humber</option>
          <option value='8'>North West (England)</option>
          <option value='9'>North East (England)</option>
          <option value='10'>Wales</option>
          <option value='11'>Scotland</option>
          <option value='12'>Northern Ireland</option>
        </select>
        {errorMessage.length > 0 && <p>{errorMessage}</p>}
      </div>
      {!searched ? 
        <div>
        <p>Looks like you haven't a job yet</p>
        <p>Click Here to familiarise yourself</p>
        <p>Take a look at an example here</p>
      </div>
      : 
      <>
        <div className={styles.chart_wrapper}>
          <div className={styles.job_info_container}>
            <h1>Title: {currentJob.title}</h1>
            <br/>
            <p>Description: {currentJob.description}</p>
            <br/>
            <p>Tasks: {currentJob.tasks}</p>
            <br/>
            <p>SOC: {currentJob.soc}</p>
            <br/>
            <p>Estimate Hours: {estimateHours ? estimateHours : 'Not Enough Data'}</p>
            <br/>
            <p>Average Salary: £{averageWage}</p>
            <br/>
          </div>  
          <div className={styles.chart_container}>
            <Line data={estimatePay} options={{
              responsive: true,
              tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        var label = data.datasets[tooltipItem.datasetIndex].label || '';

                        if (label) {
                            label += ': £';
                        }
                        label += Math.round(tooltipItem.yLabel * 100) / 100;
                        return label;
                    }
                }
              }
            }}/>
          </div>
        </div>
        <p>Qualifications: {currentJob.qualifications}</p>
        <br/>
        <h3>Related Courses</h3>
        <ul>
          {relatedCourses.map((course, i) => {
            return (
              <li key={i}>{course.name}</li>
            )
          })}
        </ul>

        <h2>Unemployment History</h2>
        <div className={styles.chart_container}>
            <Line data={unemploymentRate} options={{
              responsive: true,
              tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        var label = data.datasets[tooltipItem.datasetIndex].label || '';

                        if (label) {
                            label += ': ';
                        }
                        label += `${Math.round(tooltipItem.yLabel * 100) / 100}%`;
                        return label;
                    }
                }
              }
            }}/>
          </div>
      </>
      }
      
      
    </>
  )
}
