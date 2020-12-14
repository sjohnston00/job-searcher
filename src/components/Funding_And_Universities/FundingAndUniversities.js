import React, { useState, useEffect } from "react";
import styles from "./FundingAndUniversities.module.css";

export default function FundingAndUniversities() {
  document.title = "Funding And Universities - UK Job Searcher";

  const [searchBox, setSearchbox] = useState("");
  const [universities, setUniverities] = useState([]);
  const [universitiesData, setUniversitiesData] = useState([]);

  useEffect(() => {
    fetch("http://universities.hipolabs.com/search?country=United%20Kingdom")
      .then((res) => res.json())
      //filter the array to remove duplicates
      .then((json) => {
        setUniversitiesData(
          json.filter((obj, index, self) => {
            return self.findIndex((t) => t.name === obj.name) === index;
          })
        );
        setUniverities(
          json.filter((obj, index, self) => {
            return self.findIndex((t) => t.name === obj.name) === index;
          })
        );
      })
      .catch(() => {
        fetch("UK_Universities.json")
          .then((res) => res.json())
          //filter the array to remove duplicates
          .then((json) => {
            setUniversitiesData(
              json.filter((obj, index, self) => {
                return self.findIndex((t) => t.name === obj.name) === index;
              })
            );
            setUniverities(
              json.filter((obj, index, self) => {
                return self.findIndex((t) => t.name === obj.name) === index;
              })
            );
          });
      });
  }, []);

  const autoComplete = (e) => {
    setSearchbox(e.target.value);

    if (e.target.value === null || e.target.value === "") {
      setUniverities(universitiesData);
      return;
    }

    const NewfilteredData = universitiesData.filter((obj) => {
      return obj.name.toLowerCase().includes(searchBox.toLowerCase());
    });
    setUniverities(NewfilteredData);
  };
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.heading}>Universities and Funding</h1>

        <div className={styles.input_group}>
          <input
            type="text"
            value={searchBox}
            onChange={autoComplete}
            placeholder="Search for a university..."
          ></input>
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z" />
          </svg>
        </div>

        <div className={styles.results}>
          {universities.length === 0 ? (
            <span>No Results</span>
          ) : (
            <span>Results - {universities.length}</span>
          )}

          {universities.map((uni, id) => {
            const webPage = uni.web_pages[0];
            return (
              <a
                href={webPage}
                key={id}
                rel="noreferrer"
                target="_blank"
                className={styles.uni}
              >
                <div className={styles.left}>
                  <p>{uni.name}</p>
                  <p>{webPage}</p>
                </div>
                <div className={styles.right}>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <path d="M15 3L21 3 21 9" />
                    <path d="M10 14L21 3" />
                  </svg>
                </div>
              </a>
            );
          })}
        </div>

        <div className={styles.links_section}>
          <h2 className={styles.heading}>Funding Services</h2>
          <div className={styles.links}>
            <a
              href="https://www.thescholarshiphub.org.uk/"
              target="_blank"
              rel="noreferrer"
            >
              The Scolarship Hub
            </a>
            <a
              href="https://www.gov.uk/browse/education/student-finance"
              target="_blank"
              rel="noreferrer"
            >
              UK Goverment Student Finance
            </a>
            <a
              href="https://www.turn2us.org.uk/"
              target="_blank"
              rel="noreferrer"
            >
              Turn 2 Us
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
