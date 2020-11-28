import React, { useState, useEffect} from 'react'
import axios from 'axios';
import styles from './FundingAndUniversities.module.css';

export default function FundingAndUniversities() {

  const [searchBox, setSearchbox] = useState('');
  const [universities, setUniverities] = useState([]);

  useEffect(() => {

    const search = async () => {
      const req = await axios.get(`http://universities.hipolabs.com/search?name=${searchBox}&country=United%20Kingdom`);
      const data = await req.data;


      const filteredData = data.filter((obj, index, self) => {
        return self.findIndex(t => t.name === obj.name) === index;
      });

      setUniverities(filteredData);
    }

    search();
  }, [searchBox])
  return (
    <>
      <h1>
        Funding and Universities
      </h1>
      <a href='https://www.thescholarshiphub.org.uk/'>The Scolarship Hub</a>
      <br/>
      <a href='https://www.gov.uk/browse/education/student-finance'>UK Goverment Student Finance</a>
      <br/>
      <a href='https://www.turn2us.org.uk/'>Turn 2 Us</a>
      <br/>


      <input type='text' value={searchBox} onChange={(e) => setSearchbox(e.target.value)} placeholder='Search for a university...'></input>
      <button>Search</button>

      <div className={styles.results}>
        {universities.map((uni) => {
          const webPage = uni.web_pages[0]; 
          return(
            <div>
              <p>{uni.name}</p>
              <a href={webPage} rel="noreferrer" target="_blank">{webPage}</a>
            </div>
          )
        })}
      </div>
    </>
  )
}
