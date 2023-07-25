import React, { useState } from 'react'
import VideoManager from './VideoManager';

export default function LoginPage() {

  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    age: '',
    grade: '',
    country: '',
  });

  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormdata) => ({ ...prevFormdata, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData); // Replace this with your login logic

    if (formData != null) {
      setIsSubmit(true);
    }
  };

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
                onChange={handleChange}
                required
              />
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
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>
            <div className='countryDiv looInput'>
              <input
                className="inputField90"
                type="text"
                name="country"
                placeholder='Country'
                value={formData.country}
                onChange={handleChange}
                required
              />
            </div>
            <div className='looInputBtn'><button type="submit" className='enterBtn'>Enter</button></div>
          </form>
        </div>
      </div>)}
    </>
  )
}
