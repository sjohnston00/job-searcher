import React, {useState, useEffect, useRef} from 'react'
import {Line} from 'react-chartjs-2';
import axios from 'axios';

export default function JobInformation() {
  //declaring state variables
  const [currentSOC, setCurrentSOC] = useState(2136);
  const [errorMessage, seterrorMessage] = useState('');
  const [chartData, setChartData] = useState({});
  const jobInput = useRef(null);


  useEffect(() => {
    const chart = async () => {
      const req = await axios.get(`http://api.lmiforall.org.uk/api/v1/ashe/estimatePay?soc=${currentSOC}`);
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



      setChartData({
        labels: [...years],
        datasets: [
          {
            label: 'Estimate Yearly Pay',
            data: [...pay],
            backgroundColor: ['rgba(64, 59, 141, 0.7)'],
            borderWidth: 4,
          }
        ]
      })
    }
    chart()
  }, [currentSOC]) //run of start of this component redering


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
    setCurrentSOC(jobdata.soc);



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

      <div>
        <Line data={chartData} options={{
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
    </>
  )
}
