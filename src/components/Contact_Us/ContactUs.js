import React from 'react'
import styles from './ContactUs.module.css'

export default function ContactUs() {
  return (
    <div className={styles.flex_container}>
      <div className={styles.form_container}>
        <h1 className={styles.heading}>Contact Us</h1>
        <p className={styles.heading}>Any Questions? Don't hesitate to contact us.</p>

          <form action="/" method="post">
            <div className={styles.input_group}>
              <label htmlFor="first-name" required>First Name</label>
              <input type="text" id="first-name"/>
            </div>

            <div className={styles.input_group}>
              <label htmlFor="last-name" required>Last Name</label>
              <input type="text" id="last-name"/>
            </div>

            <div className={styles.input_group}>
              <label htmlFor="email" required>Email</label>
              <input type="email" id="email"/>
            </div>

            <div className={styles.input_group}>
              <label htmlFor="phone-number" required>Phone Number</label>
              <input type="tel" id="phone-number"/>
            </div>

            <div className={styles.message_group}>
              <label htmlFor="message" required>Message</label>
              <textarea id="message"></textarea>
            </div>

            <button className={styles.submit_button}>Send Message</button>
          </form>
      </div>

        <div className={styles.contact_info}>
          <div>
            <h1 className={styles.contact_info_heading}>Contact Information</h1>
            <p className={styles.contact_info_subheading}>Fill out the form we'll get back to you within 48hrs</p>
          </div>
          <div className={styles.contact_info_section}>
            <svg height="24px" width="24px" fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.267.98a1.636 1.636 0 0 1 2.448.152l1.681 2.162c.309.396.418.913.296 1.4l-.513 2.053a.636.636 0 0 0 .167.604L8.65 9.654a.636.636 0 0 0 .604.167l2.052-.513a1.636 1.636 0 0 1 1.401.296l2.162 1.681c.777.604.849 1.753.153 2.448l-.97.97c-.693.693-1.73.998-2.697.658a17.47 17.47 0 0 1-6.571-4.144A17.47 17.47 0 0 1 .639 4.646c-.34-.967-.035-2.004.658-2.698l.97-.969z" fillRule="evenodd"/>
            </svg>
            <span>+44 (0)123 456 7890 </span>
          </div>

          <div className={styles.contact_info_section}>
            <svg height="24px" width="24px" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
            </svg>
            <span>job_searcher@gmail.com</span>
          </div>

          <div className={styles.contact_info_section}>
            <svg height="24px" width="24px" fill="currentColor" viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg">
              <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"/>
            </svg>
            <span>123 Glasgow Street, Glasgow, GX 0XX, United Kingdom</span>
          </div>

          <div className={styles.contact_info_socials}>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <svg height="24" width="24" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.633,7.997c0.013,0.175,0.013,0.349,0.013,0.523c0,5.325-4.053,11.461-11.46,11.461c-2.282,0-4.402-0.661-6.186-1.809&#x9;c0.324,0.037,0.636,0.05,0.973,0.05c1.883,0,3.616-0.636,5.001-1.721c-1.771-0.037-3.255-1.197-3.767-2.793&#x9;c0.249,0.037,0.499,0.062,0.761,0.062c0.361,0,0.724-0.05,1.061-0.137c-1.847-0.374-3.23-1.995-3.23-3.953v-0.05&#x9;c0.537,0.299,1.16,0.486,1.82,0.511C3.534,9.419,2.823,8.184,2.823,6.787c0-0.748,0.199-1.434,0.548-2.032&#x9;c1.983,2.443,4.964,4.04,8.306,4.215c-0.062-0.3-0.1-0.611-0.1-0.923c0-2.22,1.796-4.028,4.028-4.028&#x9;c1.16,0,2.207,0.486,2.943,1.272c0.91-0.175,1.782-0.512,2.556-0.973c-0.299,0.935-0.936,1.721-1.771,2.22&#x9;c0.811-0.088,1.597-0.312,2.319-0.624C21.104,6.712,20.419,7.423,19.633,7.997z"/>
              </svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <svg height="24" width="24" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20,3H4C3.447,3,3,3.448,3,4v16c0,0.552,0.447,1,1,1h8.615v-6.96h-2.338v-2.725h2.338v-2c0-2.325,1.42-3.592,3.5-3.592&#x9;c0.699-0.002,1.399,0.034,2.095,0.107v2.42h-1.435c-1.128,0-1.348,0.538-1.348,1.325v1.735h2.697l-0.35,2.725h-2.348V21H20&#x9;c0.553,0,1-0.448,1-1V4C21,3.448,20.553,3,20,3z"/>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <svg height="24" width="24" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.999,7.377c-2.554,0-4.623,2.07-4.623,4.623c0,2.554,2.069,4.624,4.623,4.624c2.552,0,4.623-2.07,4.623-4.624&#x9;C16.622,9.447,14.551,7.377,11.999,7.377L11.999,7.377z M11.999,15.004c-1.659,0-3.004-1.345-3.004-3.003&#x9;c0-1.659,1.345-3.003,3.004-3.003s3.002,1.344,3.002,3.003C15.001,13.659,13.658,15.004,11.999,15.004L11.999,15.004z"/>
                <path d="M20.533,6.111c-0.469-1.209-1.424-2.165-2.633-2.632c-0.699-0.263-1.438-0.404-2.186-0.42&#x9;c-0.963-0.042-1.268-0.054-3.71-0.054s-2.755,0-3.71,0.054C7.548,3.074,6.809,3.215,6.11,3.479C4.9,3.946,3.945,4.902,3.477,6.111&#x9;c-0.263,0.7-0.404,1.438-0.419,2.186c-0.043,0.962-0.056,1.267-0.056,3.71c0,2.442,0,2.753,0.056,3.71&#x9;c0.015,0.748,0.156,1.486,0.419,2.187c0.469,1.208,1.424,2.164,2.634,2.632c0.696,0.272,1.435,0.426,2.185,0.45&#x9;c0.963,0.042,1.268,0.055,3.71,0.055s2.755,0,3.71-0.055c0.747-0.015,1.486-0.157,2.186-0.419c1.209-0.469,2.164-1.424,2.633-2.633&#x9;c0.263-0.7,0.404-1.438,0.419-2.186c0.043-0.962,0.056-1.267,0.056-3.71s0-2.753-0.056-3.71C20.941,7.57,20.801,6.819,20.533,6.111z M19.315,15.643c-0.007,0.576-0.111,1.147-0.311,1.688c-0.305,0.787-0.926,1.409-1.712,1.711c-0.535,0.199-1.099,0.303-1.67,0.311&#x9;c-0.95,0.044-1.218,0.055-3.654,0.055c-2.438,0-2.687,0-3.655-0.055c-0.569-0.007-1.135-0.112-1.669-0.311&#x9;c-0.789-0.301-1.414-0.923-1.719-1.711c-0.196-0.534-0.302-1.099-0.311-1.669c-0.043-0.95-0.053-1.218-0.053-3.654&#x9;c0-2.437,0-2.686,0.053-3.655c0.007-0.576,0.111-1.146,0.311-1.687c0.305-0.789,0.93-1.41,1.719-1.712&#x9;c0.534-0.198,1.1-0.303,1.669-0.311c0.951-0.043,1.218-0.055,3.655-0.055c2.437,0,2.687,0,3.654,0.055&#x9;c0.571,0.007,1.135,0.112,1.67,0.311c0.786,0.303,1.407,0.925,1.712,1.712c0.196,0.534,0.302,1.099,0.311,1.669&#x9;c0.043,0.951,0.054,1.218,0.054,3.655c0,2.436,0,2.698-0.043,3.654H19.315z"/>
                <circle cx="16.806" cy="7.207" r="1.078"/>
              </svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer">
              <svg height="24" width="24" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.593,7.203c-0.23-0.858-0.905-1.535-1.762-1.766C18.265,5.007,12,5,12,5S5.736,4.993,4.169,5.404&#x9;c-0.84,0.229-1.534,0.921-1.766,1.778c-0.413,1.566-0.417,4.814-0.417,4.814s-0.004,3.264,0.406,4.814&#x9;c0.23,0.857,0.905,1.534,1.763,1.765c1.582,0.43,7.83,0.437,7.83,0.437s6.265,0.007,7.831-0.403c0.856-0.23,1.534-0.906,1.767-1.763&#x9;C21.997,15.281,22,12.034,22,12.034S22.02,8.769,21.593,7.203z M9.996,15.005l0.005-6l5.207,3.005L9.996,15.005z"/>
              </svg>
            </a>
          </div>
        </div>
    </div>
  )
}
