import React, {useState, useEffect, useRef} from 'react'
import {Line} from 'react-chartjs-2';
import axios from 'axios';
import styles from './JobInformation.module.css'

export default function JobInformation() {
  //declaring state variables


  
  //consider currentJob for state instead of SOC so we can then use this state for populate the description section of the job
  const [currentJob, setCurrentJob] = useState({});
  const [errorMessage, seterrorMessage] = useState('');
  const [estimatePay, setestimatePay] = useState({});
  const [searched, setSearched] = useState(false);
  const jobInput = useRef(null);


  useEffect(() => {
    const chart = async () => {
      const req = await axios.get(`http://api.lmiforall.org.uk/api/v1/ashe/estimatePay?soc=${currentJob.soc}`);
      const data = await req.data;

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
  }, [currentJob]) //run of start of this component redering


  const searchJob = async () => {
    if (jobInput.current.value === null ||jobInput.current.value === '') {
      seterrorMessage('Please provide an input');
      return;
    }

    const job = await axios.get(`http://api.lmiforall.org.uk/api/v1/soc/search?q=${jobInput.current.value}`);
    if (job.data.length === 0) {
      seterrorMessage('Not Results Found');
      return;
    }
    seterrorMessage('');
    const jobdata = await job.data[0];
    setCurrentJob(jobdata);
    setSearched(true)
  };

  const getUnemploymentHistory = async () => {
    //use the SOC in state to get the average unemployment rates from the LMI For ALL API
  };

  const getWorkingHours = async () => {
    //use the SOC in state to get the average working hours from the LMI For ALL API
    //then set the data to the chart
  };

  const getRelatedCourse = async () => {
    //use the SOC in state to get the related courses from the LMI For ALL API
  }

  const averageYearWage = (weeklywage) => {
    //this will be an array of the weekly salaries for each year the job has
    //e.g SOC 2136 
    // 2013 = estpay = £534
    // 2015 = estpay = £235
    // 2018 = estpay = £611

    //calculate the yearly wage for each year then add them up and divide them by the number in the array
    //return average
  };

  return (
    <>
      <div>
        Job Information
      </div>

      <div>
        <input type='text' ref={jobInput} placeholder='Search for a job...'/>
        <button onClick={searchJob}>Search</button>
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
      </>
      }
      
      
    </>
  )
}
