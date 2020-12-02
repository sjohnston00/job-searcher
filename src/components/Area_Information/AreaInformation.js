import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { HorizontalBar } from 'react-chartjs-2';
import styles from './AreaInformation.module.css'


export default function AreaInformation() {

  const [regionDropdown, setRegionDropdown] = useState(1);
  const [barChartData, setBarChartData] = useState({});
  const [errorMessage, setErrorMessage] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const requestData = async () => {
      try {
        setLoading(true)
        const req = await axios.get(`https://api.lmiforall.org.uk/api/v1/ess/regions/ranksocs/${regionDropdown}`);
        const data = await req.data;

        //have to use the FOR method for looping as the default js array methods like map are sync and will return promises
        let chartData = [];
        for (const element of data) {
          if (element.soc === -1) {
            break; 
          }
          const soc_request = await axios.get(`https://api.lmiforall.org.uk/api/v1/soc/code/${element.soc}`);
          const soc_data = await soc_request.data;

          chartData.push({...element, name: soc_data.title});
        }

        const filterChartData = chartData.filter((obj, index, self) => {
          return self.findIndex(t => t.soc === obj.soc) === index;
        }).slice(0,10);

        const titles = filterChartData.map(element => {
          return element.name;
        });

        const percentages = filterChartData.map(element => {
          return element.percentHTF;
        });

        setBarChartData({
          labels: [...titles],
          datasets: [
            {
              label: 'Hard to Fill %',
              data: [...percentages],
              backgroundColor: 'rgba(64, 59, 141, 0.4)',
              borderWidth: 2,
              borderColor: 'rgba(64, 59, 141, 0.6)'
            }
          ]
        });
        setLoading(false)
      } catch (error) {
        setBarChartData({
          labels: ['Not enough data'],
          datasets: [
            {
              label: 'Not enough data',
              data: [],
              backgroundColor: ['rgba(64, 59, 141, 0.7)'],
              borderWidth: 4,
            }
          ]
        });
        setErrorMessage('Couldn\' get data');
      }
    }
    requestData();
  }, [regionDropdown])

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.heading}>Area Information</h1>
        <div className={styles.dropdown}>
        <select id='Region-Filter' onChange={e => setRegionDropdown(e.target.value)}>
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
          <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
            <path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"/>
          </svg>
        </div>
          <p className={styles.subheading}>Top {!loading ? barChartData.labels.length : 0} hardest jobs to fill in chossen area</p>
          {errorMessage.length > 0 && <p>{errorMessage}</p>}
          {loading && <p>Loading...</p>}
          <div className={styles.chart_container}>
          <HorizontalBar data={barChartData} options={{
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                  ticks: {
                    beginAtZero: true,
                  }
                }],
                yAxes: [{
                  ticks: {
                    mirror: true,
                    fontSize: 12,
                    fontColor: '#000',
                    padding: -5,
                  }
                }]
              },
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        var label = data.datasets[tooltipItem.datasetIndex].label || '';

                        if (label) {
                            label += ': ';
                        }
                        label += `${Math.round(tooltipItem.xLabel * 100) / 100}%`;
                        return label;
                    }
                }
              }

            
            }}/>
          </div>
        </div>
    </>
  )
}
