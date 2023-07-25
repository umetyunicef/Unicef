import React from 'react';
import {firebase} from './DataManager';


export default function Form() {

  const handleSubmit = () => {
    const sample = {
      name: "Faisal",
      score: "0",
      grade: "Graduated",
      age: "35",
      gender: "Male",
      country:"India",
      created_on: Math.floor(Date.now() / 1000)

    }
    firebase.setData(sample);
    firebase.getData();
  }

  return (
    <div>
      <button onClick={handleSubmit}>Send Data</button>
    </div>
  )
}
