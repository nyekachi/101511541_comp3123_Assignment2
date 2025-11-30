import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const fetchEmployees = async () => {
        const rest = await axios.get("http://localhost:8000/api/employees", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setEmployees(rest.data);
    };

    useEffect(() => {
        if (!token) navigate("/");
        fetchEmployees();
    }, []);

    const handleSearch = async (e) => {
        const res = await axios.get(`http://localhost:8000/api/employees/search?department=${search}&position=${search}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setEmployees(res.data);
    };

    const deleteEmployee = async (id) => {
        await axios.delete(`http://localhost:8000/api/employees/${id}`, {
            headers: { 
                Authorization: `Bearer ${token}`,
            },
        });
        fetchEmployees();
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
                                  src={`http://localhost:8000/${emp.picture}`} 
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