import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddEmployee() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [position, setPosition] = useState("");
    const [salary, setSalary] = useState("");
    const [department, setDepartment] = useState("");
    const [dateOfJoining, setDateOfJoining] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("first_name", firstName);
        formData.append("last_name", lastName);
        formData.append('email', email);
        formData.append("position", position);
        formData.append('salary', salary);
        formData.append("department", department);
        formData.append("date_of_joining", dateOfJoining);
        
        if (selectedFile) {
            formData.append('picture', selectedFile);
        }
        
        try {
            await axios.post('http://localhost:8084/api/employees', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });
        } catch (error) {
            console.error('Error adding employee:', error);
            throw error;
        }
        

        navigate("/employees");
    };

    return (
        <div className="container">
            <h2>Add Employee</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="First Name"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Salary"
                    required
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Position"
                    required
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Department"
                    required
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                />
                <input
                    type="date"
                    required
                    value={dateOfJoining}
                    onChange={(e) => setDateOfJoining(e.target.value)}
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                />
                <button type="submit">Add Employee</button>
            </form>
        </div>
    );
}

export default AddEmployee;