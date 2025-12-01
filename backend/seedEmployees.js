const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api/v1/emp';
const employees = [
  {
    first_name: "Karen",
    last_name: "Exe",
    email: "karen.amadi@gmail.com",
    position: "Manager",
    salary: 12000,
    date_of_joining: "2025-03-19T00:00:00.000Z",
    department: "CEO"
  },
  {
    first_name: "Mann",
    last_name: "Aham",
    email: "mann@gmail.com",
    position: "IT",
    salary: 30000,
    date_of_joining: "2027-05-01T00:00:00.000Z",
    department: "Technician"
  },
  {
    first_name: "Fayv",
    last_name: "Oke",
    email: "oke@gmail.com",
    position: "Interior Designer",
    salary: 40000,
    date_of_joining: "2025-07-05T00:00:00.000Z",
    department: "Design"
  }
];

async function createEmployees() {
  try {
    for (const employee of employees) {
      const response = await axios.post(`${API_BASE_URL}/employees`, employee);
      console.log(`Created employee: ${employee.first_name} ${employee.last_name}`, response.data);
    }
    console.log('All employees created successfully!');
  } catch (error) {
    console.error('Error creating employees:', error.response?.data || error.message);
  }
}

createEmployees();
