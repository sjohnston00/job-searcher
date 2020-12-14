import React from "react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const openModal = () => {
    const modal = document.querySelector("#modal");
    modal.style.display = "block";
  };

  const closeModal = () => {
    const modal = document.querySelector("#modal");
    modal.style.display = "none";
  };

  window.onclick = (e) => {
    const modal = document.querySelector("#modal");
    if (e.target === modal) {
      modal.style.display = "none";
    }
  };

  const openSidebar = () => {
    const sidebar = document.querySelector("#sidebar");
    sidebar.style.width = "200px";
  };

  const closeSidebar = () => {
    const sidebar = document.querySelector("#sidebar");
    sidebar.style.width = "0px";
  };

  return (
    <>
      <div id="sidebar" className={styles.sidebar}>
        <h1>UK Job Searcher</h1>
        <a href="/">Job Information</a>
        <a href="/areainformation">Area Information</a>
        <a href="/fundinganduniversities">Funding and Universities</a>
        <a href="/aboutus">About Us</a>
        <a href="/contactus">Contact Us</a>
        <button className={styles.close_button} onClick={closeSidebar}>
          &times;
        </button>
      </div>
      <div className={styles.container}>
        <div className={styles.first_column}>
          <button onClick={openSidebar} className={styles.menu_button}>
            <svg
              height="24"
              width="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4 6H20V8H4zM4 11H20V13H4zM4 16H20V18H4z" />
            </svg>
          </button>
          <h1>UK Job Searcher</h1>
        </div>
        <div className={styles.second_column}>
          <button className={styles.help_button} onClick={openModal}>
            Help
          </button>
          <a
            href="https://github.com/sjohnston00/job-searcher"
            target="_blank"
            rel="noreferrer"
          >
            <svg
              className={styles.github_icon}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.026,2c-5.509,0-9.974,4.465-9.974,9.974c0,4.406,2.857,8.145,6.821,9.465&#x9;c0.499,0.09,0.679-0.217,0.679-0.481c0-0.237-0.008-0.865-0.011-1.696c-2.775,0.602-3.361-1.338-3.361-1.338&#x9;c-0.452-1.152-1.107-1.459-1.107-1.459c-0.905-0.619,0.069-0.605,0.069-0.605c1.002,0.07,1.527,1.028,1.527,1.028&#x9;c0.89,1.524,2.336,1.084,2.902,0.829c0.091-0.645,0.351-1.085,0.635-1.334c-2.214-0.251-4.542-1.107-4.542-4.93&#x9;c0-1.087,0.389-1.979,1.024-2.675c-0.101-0.253-0.446-1.268,0.099-2.64c0,0,0.837-0.269,2.742,1.021&#x9;c0.798-0.221,1.649-0.332,2.496-0.336c0.849,0.004,1.701,0.115,2.496,0.336c1.906-1.291,2.742-1.021,2.742-1.021&#x9;c0.545,1.372,0.203,2.387,0.099,2.64c0.64,0.696,1.024,1.587,1.024,2.675c0,3.833-2.33,4.675-4.552,4.922&#x9;c0.355,0.308,0.675,0.916,0.675,1.846c0,1.334-0.012,2.41-0.012,2.737c0,0.267,0.178,0.577,0.687,0.479&#x9;C19.146,20.115,22,16.379,22,11.974C22,6.465,17.535,2,12.026,2z"
                fillRule="evenodd"
              />
            </svg>
          </a>
        </div>
        <div className={styles.modal} id="modal">
          <div className={styles.modal_content} id="modal-content">
            <h2>Help</h2>
            <p>
              Head to the{" "}
              <a href="/aboutus" className={styles.purple_link}>
                About Us
              </a>{" "}
              section if you want to learn more about us as a company.
            </p>
            <p>
              Using the{" "}
              <a href="/jobinformation" className={styles.purple_link}>
                Job Information
              </a>{" "}
              page is as easy as searching for any type of job you can think of
              and press Enter. You can also filter your search to a specific
              area in the UK by using the dropdown menu beneath the search box.
            </p>
            <p>
              Using the{" "}
              <a href="/areainformation" className={styles.purple_link}>
                Area Information
              </a>{" "}
              page is easier than the{" "}
              <a href="/jobinformation" className={styles.purple_link}>
                Job Information
              </a>{" "}
              page, just use the dropdown menu and look at the results change
              for the area you've chosen.
            </p>
            <p>
              If you looking for Universities around the UK then use our{" "}
              <a href="/fundinganduniversities" className={styles.purple_link}>
                Funding and Universities
              </a>{" "}
              page, just search any city of university you would like to know
              about and the results will apear bellow.
            </p>
            <p>
              If you have any further question please do not hesitate to{" "}
              <a href="/contactus" className={styles.purple_link}>
                Contact Us
              </a>
              .
            </p>
            <button onClick={closeModal}>&times;</button>
          </div>
        </div>
      </div>
    </>
  );
}
