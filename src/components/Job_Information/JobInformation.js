import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import styles from "./JobInformation.module.css";
import useDidMountEffect from "../../hooks/useComponentDidMount";

export default function JobInformation() {
  document.title = "Job Information - UK Job Searcher";

  //declaring state variables
  const [currentJob, setCurrentJob] = useState({});
  const [estimatePay, setestimatePay] = useState({});
  const [estimateHours, setEstimateHours] = useState(0);
  const [relatedCourses, setRelatedCourses] = useState([]);
  const [unemploymentRate, setUnemploymentRate] = useState({});
  const [averageWage, setAverageWage] = useState(0);
  const [searched, setSearched] = useState(false);
  const [jobInput, setJobInput] = useState("");
  const [regionDropdown, setRegionDropdown] = useState(0);
  const [jobData, setJobData] = useState([]);

  //custom hook so it doesn't run on first render
  //once the currentJob has changed search for estimate pay
  useDidMountEffect(() => {
    const chart = async () => {
      let url = `https://api.lmiforall.org.uk/api/v1/ashe/estimatePay?soc=${currentJob.soc}`;
      if (regionDropdown > 0) {
        url = `https://api.lmiforall.org.uk/api/v1/ashe/estimatePay?soc=${currentJob.soc}&filters=region%3A${regionDropdown}`;
      }

      try {
        const req = await axios.get(url);
        const data = await req.data;

        if (!data.series) {
          setestimatePay({
            labels: ["Not Enough Data"],
            datasets: [
              {
                label: "Not Enough Data",
                data: [],
                backgroundColor: ["rgba(64, 59, 141, 0.7)"],
                borderWidth: 4,
              },
            ],
          });
          return;
        }

        data.series.sort((a, b) => {
          if (a.year < b.year) {
            return -1;
          }
          if (a.year > b.year) {
            return 1;
          }
          return 0;
        });

        data.series.forEach((e) => {
          e.estpay = e.estpay * 52;
        });

        const years = data.series.map((obj) => {
          return obj.year;
        });
        const pay = data.series.map((obj) => {
          return obj.estpay;
        });

        setestimatePay({
          labels: [...years],
          datasets: [
            {
              label: "Salary",
              data: [...pay],
              backgroundColor: ["rgba(64, 59, 141, 0.7)"],
              borderWidth: 4,
            },
          ],
        });
      } catch (error) {
        setestimatePay({
          labels: ["Not Enough Data"],
          datasets: [
            {
              label: "Not Enough Data",
              data: [],
              backgroundColor: ["rgba(64, 59, 141, 0.7)"],
              borderWidth: 4,
            },
          ],
        });
      }
    };
    chart();
  }, [currentJob, regionDropdown]);

  //once the current job state changes get Unemployment History
  useDidMountEffect(() => {
    const UnemploymentHistory = async () => {
      let url = `https://api.lmiforall.org.uk/api/v1/lfs/unemployment?soc=${currentJob.soc}`;
      if (regionDropdown > 0) {
        url = `https://api.lmiforall.org.uk/api/v1/lfs/unemployment?soc=${currentJob.soc}&filterBy=region%3A${regionDropdown}`;
      }
      //use the SOC in state to get the average unemployment rates from the LMI For ALL API
      const req = await axios.get(url);
      const data = await req.data;

      if (!data.years) {
        setUnemploymentRate({
          labels: ["Not Enough Data"],
          datasets: [
            {
              label: "Not Enough Data",
              data: [],
              backgroundColor: ["rgba(64, 59, 141, 0.7)"],
              borderWidth: 4,
            },
          ],
        });
        return;
      }

      data.years.sort((a, b) => {
        if (a.year < b.year) {
          return -1;
        }
        if (a.year > b.year) {
          return 1;
        }
        return 0;
      });

      const years = data.years.map((obj) => {
        return obj.year;
      });
      const unemploymentRate = data.years.map((obj) => {
        return obj.unemprate;
      });

      setUnemploymentRate({
        labels: [...years],
        datasets: [
          {
            label: "Rate",
            data: [...unemploymentRate],
            backgroundColor: ["rgba(64, 59, 141, 0.7)"],
            borderWidth: 4,
          },
        ],
      });
    };
    UnemploymentHistory();
  }, [currentJob, regionDropdown]);

  //once the current job state has changed then searched for the working hours
  useDidMountEffect(() => {
    const getWorkingHours = async () => {
      let url = `https://api.lmiforall.org.uk/api/v1/ashe/estimateHours?soc=${currentJob.soc}`;
      if (regionDropdown > 0) {
        url = `https://api.lmiforall.org.uk/api/v1/ashe/estimateHours?soc=${currentJob.soc}&filters=region%3A${regionDropdown}`;
      }

      const workingHoursReq = await axios.get(url);
      const workingHours = await workingHoursReq.data;

      if (!workingHours.series) {
        setEstimateHours(0);
        return;
      }
      let sum = 0;
      workingHours.series.forEach((element) => {
        sum += parseInt(element.hours, 10);
      });
      setEstimateHours(Math.round(sum / workingHours.series.length));
    };
    getWorkingHours();
  }, [currentJob, regionDropdown]);

  //once the current job state has changed then search for the related course
  useDidMountEffect(() => {
    try {
      const getRelatedCourse = async () => {
        const req = await axios.get(
          `https://api.lmiforall.org.uk/api/v1/hesa/courses/${currentJob.soc}`
        );
        const data = await req.data;

        if (!data.years || data.years.length === 0) {
          setRelatedCourses([{ name: "No related courses to this job" }]);
          return;
        }

        const relatedCoursesArray = data.years[0].courses.filter((element) => {
          return element.percentage > 5;
        });
        setRelatedCourses(relatedCoursesArray);
      };
      getRelatedCourse();
    } catch (error) {
      setRelatedCourses([]);
    }
  }, [currentJob]);

  //once the current job state has changed then set the average salary
  useDidMountEffect(() => {
    try {
      let sum = 0;
      estimatePay.datasets[0].data.forEach((element) => {
        sum += parseInt(element, 10);
      });
      setAverageWage(Math.round(sum / estimatePay.datasets[0].data.length));
    } catch (error) {
      setAverageWage(0);
    }
  }, [estimatePay, regionDropdown]);

  //autocomplete the search area
  useDidMountEffect(() => {
    const autocomplete = async () => {
      await searchJob();
    };

    autocomplete();
  }, [jobInput]);

  const searchJob = async (job) => {
    if (jobInput === null || jobInput === "") {
      setJobData([]);
      return;
    }

    const req = await axios.get(
      `https://api.lmiforall.org.uk/api/v1/soc/search?q=${job || jobInput}`
    );
    const jobs = await req.data;
    setJobData(jobs);

    if (job) {
      const jobdata = jobs[0];
      await setCurrentJob(jobdata);
      setSearched(true);
      setJobInput("");
    }
  };

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.heading}>Job Information</h1>
        <div className={styles.search_area}>
          <div className={styles.search_box}>
            <input
              type="text"
              value={jobInput}
              onChange={(e) => setJobInput(e.target.value)}
              placeholder="Search for a job..."
            />
            <svg
              height="16px"
              width="16px"
              fill="currentColor"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"
                fillRule="evenodd"
              />
              <path
                d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
                fillRule="evenodd"
              />
            </svg>
          </div>
          {jobData.length > 0 && (
            <div
              className={styles.autoComplete_container}
              id="autoComplete_container"
            >
              {jobData.map((obj) => {
                return (
                  <button key={obj.soc} onClick={() => searchJob(obj.title)}>
                    {obj.title}
                  </button>
                );
              })}
            </div>
          )}
          <div className={styles.dropdown_box}>
            <select
              id="Region-Filter"
              onChange={(e) => {
                setRegionDropdown(e.target.value);
              }}
            >
              <option value="0">All Areas</option>
              <option value="1">London</option>
              <option value="2">South East (England)</option>
              <option value="3">East of England</option>
              <option value="4">South West (England)</option>
              <option value="5">West Midlands (England)</option>
              <option value="6">East Midlands (England)</option>
              <option value="7">Yorkshire and the Humber</option>
              <option value="8">North West (England)</option>
              <option value="9">North East (England)</option>
              <option value="10">Wales</option>
              <option value="11">Scotland</option>
              <option value="12">Northern Ireland</option>
            </select>
            <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
              <path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" />
            </svg>
          </div>
        </div>
        {!searched ? (
          <div className={styles.not_searched}>
            <div className={styles.not_searched_left}>
              <p>Looks like you haven't searched for a job yet</p>
              <p>
                Click the <b className={styles.purple}>help</b> button at the
                top to familiarise yourself
              </p>
            </div>
            <div className={styles.not_searched_right}>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z" />
              </svg>
            </div>
          </div>
        ) : (
          <>
            <div className={styles.chart_wrapper}>
              <div className={styles.job_info_container}>
                <svg
                  height="24px"
                  width="24px"
                  fill="black"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    fillRule="evenodd"
                  />
                </svg>
                <h1>Title: {currentJob.title}</h1>
                <br />
                <p>
                  <b>Description:</b> {currentJob.description}
                </p>
                <br />
                <p>
                  <b>Tasks:</b> {currentJob.tasks}
                </p>
                <br />
                <p>
                  <b>SOC:</b> {currentJob.soc}
                </p>
                <br />
                <svg
                  height="24px"
                  width="24px"
                  fill="black"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    fillRule="evenodd"
                  />
                </svg>
              </div>
              <div className={styles.chart_container}>
                <Line
                  data={estimatePay}
                  options={{
                    maintainAspectRatio: false,
                    responsive: true,
                    tooltips: {
                      callbacks: {
                        label: function (tooltipItem, data) {
                          var label =
                            data.datasets[tooltipItem.datasetIndex].label || "";

                          if (label) {
                            label += ": £";
                          }
                          label += Math.round(tooltipItem.yLabel * 100) / 100;
                          return label;
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>

            <div className={styles.flex_container_1}>
              <div className={styles.qualifications}>
                <h2 className={styles.heading}>Qualifications</h2>
                <p>{currentJob.qualifications}</p>
              </div>

              <div className={styles.estimate_and_salary}>
                <div className={styles.estimateHours}>
                  <h2 className={styles.heading}>Estimate Hours</h2>
                  <p>
                    {estimateHours ? estimateHours : "Not Enough Data"} hrs/wk
                  </p>
                </div>

                <div className={styles.averageSalary}>
                  <h2 className={styles.heading}>Average Salary</h2>
                  <p>£{averageWage}</p>
                </div>
              </div>
            </div>

            <div className={styles.flex_container_2}>
              <div className={styles.relatedCourses}>
                <h2 className={styles.heading}>Related Courses</h2>
                <ul>
                  {relatedCourses.map((course, i) => {
                    return <li key={i}>{course.name}</li>;
                  })}
                </ul>
              </div>

              <div className={styles.UnemploymentHistory}>
                <h2>Unemployment History</h2>
                <div className={styles.unemployment_chart_container}>
                  <Line
                    data={unemploymentRate}
                    options={{
                      maintainAspectRatio: false,
                      responsive: true,
                      scales: {
                        yAxes: [
                          {
                            ticks: {
                              beginAtZero: true,
                            },
                          },
                        ],
                      },
                      tooltips: {
                        callbacks: {
                          label: function (tooltipItem, data) {
                            var label =
                              data.datasets[tooltipItem.datasetIndex].label ||
                              "";
                            label += `: ${
                              Math.round(tooltipItem.yLabel * 100) / 100
                            }%`;
                            return label;
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
