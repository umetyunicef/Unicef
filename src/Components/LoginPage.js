import React, { useEffect, useState } from 'react'
import VideoManager from './VideoManager';

export default function LoginPage() {

  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    age: '',
    grade: '',
    country: '',
  });
  const [ageError, setAgeError] = useState('');
  const [countryError, setCountryError] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormdata) => ({ ...prevFormdata, [name]: value }));
  };

  const handleAge = (event) => {
    const { name, value } = event.target;

    // Check if the entered age is within the range of 5 to 50
    const ageValue = parseInt(value, 10);
    if (name === 'age' && (ageValue < 5 || ageValue > 80)) {
      setAgeError('Age must be between 5 and 80');
    } else {
      setAgeError('');
    }
    setFormData((prevFormdata) => ({ ...prevFormdata, [name]: value }));
  }

  const handleCountry = (event) => {
    const { name, value } = event.target;

    // Check if the entered value is not a number and has at least two characters
    if (name === 'country' && (!isNaN(value) || value.length < 2)) {
      setCountryError('Country must be at least 2 characters and cannot be a number');
    } else {
      setCountryError('');
    }
    setFormData((prevFormdata) => ({ ...prevFormdata, [name]: value }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData); // Replace this with your login logic

    if (formData != null) {
      setIsSubmit(true);
    }
  };

  useEffect(() => {
    if (formData.name && formData.gender && formData.age && formData.grade && formData.country && !ageError && !countryError) {
      setDisableSubmit(false); // Enable the submit button
    } else {
      setDisableSubmit(true); // Disable the submit button
    }
  }, [formData, ageError, countryError]);

  return (
    <>
      {isSubmit ? (<VideoManager />) : (<div className='loginParentDiv'>

        <div className='loginPageDiv'>
          <img className='logoImg' src="https://umety-dev.s3.amazonaws.com/logo/umety_logo.svg" alt="" />
          <form className='form' onSubmit={handleSubmit}>
            <div className='nameDiv looInput'>
              <input
                className="inputField90"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className='genderDiv looInput'>

              <select
                className="inputField"
                type="text"
                name="gender"
                placeholder='Gender'
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className='ageDiv looInput'>

              <input
                className="inputField90"
                type="number"
                name="age"
                placeholder='Age'
                value={formData.age}
                onChange={handleAge}
                required
              />
              {ageError && <p style={{ color: "red" }}>{ageError}</p>}
            </div>
            <div className='gradeDiv looInput'>

              <select
                className="inputField"
                type="text"
                name="grade"
                placeholder='Grade'
                value={formData.grade}
                onChange={handleChange}
                required
              >
                <option value="">Select Grade</option>
                <option value="3">Grade 3</option>
                <option value="4">Grade 4</option>
                <option value="5">Grade 5</option>
                <option value="6">Grade 6</option>
                <option value="7">Grade 7</option>
                <option value="8">Grade 8</option>
                <option value="9">Grade 9</option>
                <option value="10">Grade 10</option>
                <option value="11">Grade 11</option>
                <option value="12">Grade 12</option>
              </select>
            </div>
            <div className='countryDiv looInput'>
              <input
                className="inputField90"
                type="text"
                name="country"
                placeholder='Country'
                value={formData.country}
                onChange={handleCountry}
                required
              />
              {countryError && <p style={{ color: "red" }}>{countryError}</p>}
            </div>
            <div className='looInputBtn'><button type="submit" className='enterBtn' disabled={disableSubmit} >Enter</button></div>
          </form>
        </div>
      </div>)}
    </>
  )
}
