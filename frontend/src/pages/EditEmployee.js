import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditEmployee() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
        first_name: "",
        last_name: "",
        email: "",
        position: "",
        salary: "",
        department: "",
        date_of_joining: ""
    });
    const [selectedFile, setSelectedFile] = useState(null);

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:8084/api/employees/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // Format date to YYYY-MM-DD for the date input
                const employeeData = {
                    ...response.data,
                    date_of_joining: response.data.date_of_joining ? 
                        new Date(response.data.date_of_joining).toISOString().split('T')[0] : ''
                };
                setEmployee(employeeData);
            } catch (error) {
                console.error('Error fetching employee:', error);
            }
        };
        
        fetchEmployee();
    }, [id, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("first_name", employee.first_name);
        formData.append("last_name", employee.last_name);
        formData.append("email", employee.email);
        formData.append("position", employee.position);
        formData.append("salary", employee.salary);
        formData.append("department", employee.department);
        formData.append("date_of_joining", employee.date_of_joining);
        
        if (selectedFile) {
            formData.append('picture', selectedFile);
        }

        try {
            await axios.put(`http://localhost:8084/api/employees/${id}`, formData, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });
            navigate("/employees");
        } catch (error) {
            console.error('Error updating employee:', error);
            // You might want to add error handling UI here
        }
    };

    return (
        <div className="container">
            <h2>Edit Employee</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="First Name"
                    required
                    value={employee.first_name}
                    onChange={(e) => setEmployee({...employee, first_name: e.target.value})}
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    required
                    value={employee.last_name}
                    onChange={(e) => setEmployee({...employee, last_name: e.target.value})}
                />
                <input
                    type="email"
                    placeholder="Email"
                    required
                    value={employee.email}
                    onChange={(e) => setEmployee({...employee, email: e.target.value})}
                />
                <input
                    type="text"
                    placeholder="Position"
                    required
                    value={employee.position}
                    onChange={(e) => setEmployee({...employee, position: e.target.value})}
                />
                <input
                    type="number"
                    placeholder="Salary"
                    required
                    value={employee.salary}
                    onChange={(e) => setEmployee({...employee, salary: e.target.value})}
                />
                <input
                    type="text"
                    placeholder="Department"
                    required
                    value={employee.department}
                    onChange={(e) => setEmployee({...employee, department: e.target.value})}
                />
                <input
                    type="date"
                    required
                    value={employee.date_of_joining}
                    onChange={(e) => setEmployee({...employee, date_of_joining: e.target.value})}
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                />
                <button type="submit">Update Employee</button>
            </form>
        </div>
    );
}

export default EditEmployee;