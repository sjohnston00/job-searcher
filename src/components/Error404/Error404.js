import React from "react";
import styles from "./Error404.module.css";

//a component that only renders when a user enters an invalid path
export default function Error404() {
  document.title = "404 Not Found - UK Job Searcher";

  return (
    <div className={styles.four0four}>
      <div className={styles.middle}>
        <div className={styles.heading}>
          <svg
            height="24"
            width="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11.953,2C6.465,2,2,6.486,2,12s4.486,10,10,10s10-4.486,10-10S17.493,2,11.953,2z M13,17h-2v-2h2V17z M13,13h-2V7h2V13z" />
          </svg>
          <h1>404 NOT FOUND</h1>
        </div>
        <p>
          Sorry that location doesn't exist. Want to go back{" "}
          <a href="/" className={styles.purple_link}>
            Home?
          </a>
        </p>
      </div>
    </div>
  );
}
