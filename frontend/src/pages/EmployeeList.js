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
        e.preventDefault();
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
        if (window.confirm("Are you sure you want to delete this employee?")) {
            try {
                await axios.delete(`${API_URL}/api/employees/${id}`, {
                    headers: getAuthHeader()
                });
                fetchEmployees();
            } catch (error) {
                console.error('Error deleting employee:', error);
            }
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="container">
            <h1>Employee List</h1>
            <div className="employee-list-header">
                <form onSubmit={handleSearch} className="search-form">
                    <input
                        type="text"
                        placeholder="Search by department or position"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button type="submit">Search</button>
                </form>
                <Link to="/employees/add" className="add-employee-btn">
                    + Add Employee
                </Link>
            </div>
            <div className="table-container">
                <table className="employee-table">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Position</th>
                            <th>Salary</th>
                            <th>Date Joined</th>
                            <th>Department</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((emp) => (
                            <tr key={emp._id || emp.id}>
                                <td>{emp.email}</td>
                                <td>{emp.position}</td>
                                <td>${emp.salary?.toLocaleString()}</td>
                                <td>{formatDate(emp.date_of_joining)}</td>
                                <td>{emp.department}</td>
                                <td className="actions">
                                    <Link to={`/employees/edit/${emp._id || emp.id}`} className="edit-btn">Edit</Link>
                                    <button 
                                        onClick={() => deleteEmployee(emp._id || emp.id)}
                                        className="delete-btn"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button 
                onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/");
                }} 
                className="logout-btn"
            >
                Logout
            </button>
        </div>
    );
}

export default EmployeeList;