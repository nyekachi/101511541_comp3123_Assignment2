import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { API_URL, getAuthHeader } from "../api/config";

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const fetchEmployees = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/employees`, {
                headers: getAuthHeader()
            });
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    useEffect(() => {
        if (!token) navigate("/");
        fetchEmployees();
    }, []);

    const handleSearch = async (e) => {
        try {
            const res = await axios.get(`${API_URL}/api/employees/search?department=${search}&position=${search}`, {
                headers: getAuthHeader()
            });
            setEmployees(res.data);
        } catch (error) {
            console.error('Error searching employees:', error);
        }
    };

    const deleteEmployee = async (id) => {
        try {
            await axios.delete(`${API_URL}/api/employees/${id}`, {
                headers: getAuthHeader()
            });
            fetchEmployees();
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="container">
            <h1>Employee List</h1>

            <div style={{display:"flex", gap: "15px", marginBottom: "20px"}}>
                <input 
                    type="text" 
                    placeholder="Search by department or position"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
                <button onClick={() => navigate("/employees/add")}>Add Employee</button>
                <button className="logout-btn" on onClick={logout}>Logout</button>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>first_name</th>
                        <th>last_name</th>
                        <th>email</th>
                        <th>position</th>
                        <th>department</th>
                        <th>date_of_joining</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {employees.map((emp) => (
                        <tr key={emp.id}>
                        //Display employee picture
                        <td>
                            {emp.picture && (
                           <img 
                                  src={`${API_URL}/${emp.picture}`} 
                                  alt={`${emp.first_name} ${emp.last_name}`}
                                  style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                              />
                            )}
                        </td>
                            <td>{emp.first_name}</td>
                            <td>{emp.last_name}</td>
                            <td>{emp.email}</td>
                            <td>{emp.position}</td>
                            <td>{emp.department}</td>
                            <td>{emp.date_of_joining}</td>
                            <td>
                                <Link to={`/employees/${emp.id}`}>View</Link> |{" "}
                                <Link to={`/employees/edit/${emp.id}`}>Edit</Link> |{" "}
                                <button onClick={() => deleteEmployee(emp.id)}
                                    style={{background: "none", border:"none",color:"red"}}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                </table>
        </div>
    );
}

export default EmployeeList;