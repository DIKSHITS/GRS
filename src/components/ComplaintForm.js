import React, { useState, useEffect } from 'react';
import './ComplaintForm.css';
import { useNavigate } from 'react-router-dom';

function ComplaintForm() {
  const [name, setName] = useState('');
const [collegeId, setCollegeId] = useState('');
const [description, setDescription] = useState('');
const [priority, setPriority] = useState('');
const [date, setDate] = useState('');
const [department, setDepartment] = useState('');
const [person, setPerson] = useState('');
const [poc, setPoc] = useState('');  // Add this line to declare poc state
const [pocContact, setPocContact] = useState('');  // Add this line to declare pocContact state
const [submitted, setSubmitted] = useState(false);
const [complaintType, setComplaintType] = useState('department');
const [departments, setDepartments] = useState([]);
const [persons, setPersons] = useState([]);
const navigate = useNavigate();


  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch('http://localhost:8000/get-departments');
        if (response.ok) {
          const data = await response.json();
          setDepartments(data);
        } else {
          console.error('Error fetching departments');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const fetchPersons = async () => {
      try {
        const response = await fetch('http://localhost:8000/get-persons');
        if (response.ok) {
          const data = await response.json();
          setPersons(data);
        } else {
          console.error('Error fetching persons');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchDepartments();
    fetchPersons();
  }, []);

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleOkClick = () => {
    navigate('/dashboard');
  };

  const handleComplaintTypeChange = (e) => {
    setComplaintType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/submit-complaint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          collegeId,
          description,
          priority,
          date,
          poc: complaintType === 'department' ? poc : '',  // Include POC for department complaints
          pocContact: complaintType === 'department' ? pocContact : '',  // Include POC Contact for department complaints
          department: complaintType === 'department' ? department : '',
          person: complaintType === 'person' ? person : '',
        }),
      });

      if (response.ok) {
        console.log('Complaint saved successfully');
        console.log(name)
        console.log(department)
       
        setSubmitted(true);
      } else {
        console.error('Error saving complaint');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="sik">
      <div className="complaint-box">
        <h1 className="complaint-header">Complaint Form</h1>
        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label> <br></br>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
               
              />
            </div>
            <div className="form-group">
              <label htmlFor="collegeId">College ID:</label> <br></br>
              <input
                type="text"
                id="collegeId"
                value={collegeId}
                onChange={(e) => setCollegeId(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label> <br></br>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="priority">Priority:</label> <br></br>
              <select
                id="priority"
                value={priority}
                onChange={handlePriorityChange}
                required
              >
                <option value="select">select</option>
                <option value="High">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div className="form-group">
              <label>Complaint Type:</label> 
              <div className="complaint-type">
                <label>
                  <input
                    type="radio"
                    value="department"
                    checked={complaintType === 'department'}
                    onChange={handleComplaintTypeChange}
                  />
                  Department
                </label> 
                <label>
                  <input
                    type="radio"
                    value="person"
                    checked={complaintType === 'person'}
                    onChange={handleComplaintTypeChange}
                  />
                  Person
                </label> 
              </div>
            </div>

            {complaintType === 'department' ? (
              <div className="form-group">
                <label htmlFor="department">Department:</label> <br></br>
                <select
                  id="department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select a department
                  </option>
                  {departments.map((dep) => {
                        return (
                    
                            <option key={dep.email} value={`${dep.depName} | ${dep.poc} | ${dep.pocContact}`}>
                              {dep.depName} 
                            </option>
                    
                       );
                       
                         })}  
                         
                </select>
              </div>
            ) : (
              <div className="form-group">
                <label htmlFor="person">Person:</label> <br></br>
                <select
                  id="person"
                  value={person}
                  onChange={(e) => setPerson(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select a person
                  </option>
                  {persons.map((p) => (
                    <option key={p.email} value={p.email}>
                      {p.firstName}
                    </option>
                  ))}
                </select>
              
              </div>
               
            )}
          
            <button type="submit" className="submit-button">
              Submit
             
            </button>
           
          </form>
        ) : (
          <div className="success-message">
            <p>Complaint submitted successfully!</p>
            <button type="button" className="ok-button" onClick={handleOkClick}>
              OK
            </button>
          </div>
        )}
      </div>
    </div>
    
  );
}

export default ComplaintForm;
