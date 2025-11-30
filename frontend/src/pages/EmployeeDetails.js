import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

// Style
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const EmployeeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const BackLink = styled(Link)`
  color: #007bff;
  text-decoration: none;
  font-size: 1rem;
  &:hover {
    text-decoration: underline;
  }
`;

const EmployeeDetailsContainer = styled.div`
  display: flex;
  gap: 2rem;
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const EmployeePhoto = styled.div`
  flex: 0 0 200px;
`;

const ProfileImage = styled.img`
  width: 100%;
  border-radius: 8px;
  aspect-ratio: 1;
  object-fit: cover;
`;

const ProfilePlaceholder = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 8px;
  background: #e9ecef;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: #6c757d;
`;

const EmployeeInfo = styled.div`
  flex: 1;
`;

const EmployeeName = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.75rem;
  color: #333;
`;

const Position = styled.p`
  color: #6c757d;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
`;

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const DetailItem = styled.div`
  margin-bottom: 0.5rem;
`;

const DetailLabel = styled.span`
  font-weight: 600;
  color: #495057;
  margin-right: 0.5rem;
`;

const DetailValue = styled.span`
  color: #212529;
`;

const ActionButtons = styled.div`
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
`;

const Button = styled(Link)`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s;
  background-color: #007bff;
  color: white;
  border: 1px solid #007bff;
  
  &:hover {
    background-color: #0069d9;
    border-color: #0062cc;
    color: white;
  }
`;

const LoadingContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;

const ErrorContainer = styled(Container)`
  color: #dc3545;
  text-align: center;
  padding: 2rem;
`;

function EmployeeDetails() {
    const { id } = useParams();
    const [employee, setEmployee] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:8084/api/employees/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setEmployee(response.data);
            } catch (err) {
                console.error('Error fetching employee details:', err);
                setError('Failed to load employee details');
            } finally {
                setLoading(false);
            }
        };

        fetchEmployee();
    }, [id, token]);

    if (loading) return <LoadingContainer>Loading...</LoadingContainer>;
    if (error) return <ErrorContainer>{error}</ErrorContainer>;

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <Container>
            <EmployeeHeader>
                <h2>Employee Details</h2>
                <BackLink to="/employees">← Back to Employees</BackLink>
            </EmployeeHeader>

            <EmployeeDetailsContainer>
                <EmployeePhoto>
                    {employee.picture ? (
                        <ProfileImage
                            src={`http://localhost:8084/${employee.picture}`}
                            alt={`${employee.first_name} ${employee.last_name}`}
                        />
                    ) : (
                        <ProfilePlaceholder>
                            {employee.first_name?.charAt(0)}{employee.last_name?.charAt(0)}
                        </ProfilePlaceholder>
                    )}
                </EmployeePhoto>

                <EmployeeInfo>
                    <EmployeeName>{employee.first_name} {employee.last_name}</EmployeeName>
                    <Position>{employee.position}</Position>
                    
                    <DetailsGrid>
                        <DetailItem>
                            <DetailLabel>Email:</DetailLabel>
                            <DetailValue>{employee.email || 'N/A'}</DetailValue>
                        </DetailItem>
                        <DetailItem>
                            <DetailLabel>Department:</DetailLabel>
                            <DetailValue>{employee.department || 'N/A'}</DetailValue>
                        </DetailItem>
                        <DetailItem>
                            <DetailLabel>Position:</DetailLabel>
                            <DetailValue>{employee.position || 'N/A'}</DetailValue>
                        </DetailItem>
                        <DetailItem>
                            <DetailLabel>Salary:</DetailLabel>
                            <DetailValue>
                                {employee.salary ? `$${employee.salary.toLocaleString()}` : 'N/A'}
                            </DetailValue>
                        </DetailItem>
                        <DetailItem>
                            <DetailLabel>Date of Joining:</DetailLabel>
                            <DetailValue>
                                {formatDate(employee.date_of_joining)}
                            </DetailValue>
                        </DetailItem>
                    </DetailsGrid>

                    <ActionButtons>
                        <Button to={`/employees/edit/${id}`}>
                            Edit Employee
                        </Button>
                    </ActionButtons>
                </EmployeeInfo>
            </EmployeeDetailsContainer>
        </Container>
    );
}

export default EmployeeDetails;