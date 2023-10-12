import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import React, { useState, useEffect } from 'react';
import axios from "axios";


function UserTable() {

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    useEffect(() => {
        // Fetch user data from the API
        const init = async () => {
            try {
                const response = await axios.get('https://dummyjson.com/users')
                setUsers(response.data.users);
                console.log("users checking", response.data.users)

            }

            catch (error) {
                console.error('Error fetching user data:', error);
            };
        };
        init();
    }, []);

    function handleDelete(userId) {
        console.log("handle delete called")
        axios.delete(`https://dummyjson.com/users/${userId}`)
            .then((response) => {
                // If the API call is successful, update the user list in the state
                alert(`${userId} deleted`)
                if (response.status === 204) {
                    const updatedUsers = users.filter((user) => user.id !== userId);
                    setUsers(updatedUsers);
                    setSelectedUser(null);
                }
            })
            .catch((error) => {
                console.error('Error deleting user:', error);
            });
    }
    function handleEdit() {
        console.log("handle edit called")
    }
    function handleAdd() {
        console.log("handle add called")
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>User Profile</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Gender</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>City</th>
                    <th>State</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.gender}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{user.address.city}</td>
                        <td>{user.address.state}</td>
                        <td>
                            <button onClick={() => handleEdit(user)}>
                                <i className="fa fa-pencil" aria-hidden="true"></i> Edit
                            </button>
                            <button onClick={() => handleDelete(user.id)}>
                                <i className="fa fa-trash" aria-hidden="true"></i> Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default UserTable;