import React, { useEffect, useState } from 'react'

export default function LoginPage({ setIsLogin, setSceneManager, setFormData }) {

  const [myFormData, setMYFormData] = useState({
    name: '',
    gender: '',
    age: '',
    grade: 0,
    country: '',
  });
  const [ageError, setAgeError] = useState('');
  const [countryError, setCountryError] = useState('');
  const [disableSubmit, setDisableSubmit] = useState(true);

  const handleChange = (event) => {

    let { name, value } = event.target;
    if (name === "grade") {
      if (value == '') {
        value = 0
        console.log("if grade value", value)
      } else {

        value = parseInt(value);
        console.log("else grade value", value)
      }
    }

    setMYFormData((prevFormdata) => ({ ...prevFormdata, [name]: value }));
  };

  const handleAge = (event) => {
    const { name, value } = event.target;

    // Check if the entered age is within the range of 5 to 50
    const ageValue = parseInt(value, 10);
    if (name === 'age' && (ageValue < 8 || ageValue > 80)) {
      setAgeError('Age must be between 8 and 80');
    } else {
      setAgeError('');
    }
    setMYFormData((prevFormdata) => ({ ...prevFormdata, [name]: value }));
  }

  const handleCountry = (event) => {
    const { name, value } = event.target;

    // Check if the entered value is not a number and has at least two characters
    if (name === 'country' && (!isNaN(value) || value.length < 2)) {
      setCountryError('Country must be at least 2 characters and cannot be a number');
    } else {
      setCountryError('');
    }
    setMYFormData((prevFormdata) => ({ ...prevFormdata, [name]: value }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(myFormData); // Replace this with your login logic
    setFormData(myFormData);

    if (myFormData != null) {
      setIsLogin(false);
      setSceneManager(true);
    }
  };

  useEffect(() => {
    if (myFormData.name && myFormData.gender && myFormData.age && myFormData.country && !ageError && !countryError) {
      setDisableSubmit(false); // Enable the submit button
    } else {
      setDisableSubmit(true); // Disable the submit button
    }
  }, [myFormData, ageError, countryError]);

  return (
    <>
      {/* (<VideoManager formData={myFormData} />) */}

      <div className='loginParentDiv'>

        <div className='loginPageDiv'>
          <img className='logoImg' src="https://umety-dev.s3.amazonaws.com/logo/umety_logo.svg" alt="" />
          <form className='form' onSubmit={handleSubmit}>
            <div className='nameDiv looInput'>
              <input
                className="inputField90"
                type="text"
                name="name"
                value={myFormData.name}
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
                value={myFormData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div className='ageDiv looInput'>

              <input
                className="inputField90"
                type="number"
                name="age"
                placeholder='Age'
                value={myFormData.age}
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
                value={myFormData.grade}
                onChange={handleChange}
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
                <option value="13">Above 12</option>
              </select>
            </div>
            <div className='countryDiv looInput'>
              <input
                className="inputField90"
                type="text"
                name="country"
                placeholder='Country'
                value={myFormData.country}
                onChange={handleCountry}
                required
              />
              {countryError && <p style={{ color: "red" }}>{countryError}</p>}
            </div>
            <div className='looInputBtn'><button type="submit" className='enterBtn' disabled={disableSubmit} >Enter</button></div>
          </form>
        </div>
      </div>


    </>
  )
}
