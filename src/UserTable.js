import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

function UserTable() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({
        id: '',
        firstName: '',
        lastName: '',
        gender: '',
        email: '',
        phone: '',
        city: '',
        state: '',
    });

    useEffect(() => {
        // Fetch user data from the API
        const init = async () => {
            try {
                const response = await axios.get('https://dummyjson.com/users');
                setUsers(response.data.users);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        init();
    }, []);

    function handleDelete(userId) {
        axios.delete(`https://dummyjson.com/users/${userId}`)
            .then((response) => {
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

    function handleEdit(user) {
        setIsEditing(true);
        setEditedUser(user);
    }

    async function handleSaveEdit() {
        try {
            const response = await axios.put(`https://dummyjson.com/users/${editedUser.id}`, editedUser);
            if (response.status === 200) {
                // Update the user data in the state with the edited data
                const updatedUsers = users.map((user) => {
                    if (user.id === editedUser.id) {
                        return editedUser;
                    }
                    return user;
                });
                setUsers(updatedUsers);
                setIsEditing(false);
                setEditedUser({
                    id: '',
                    firstName: '',
                    lastName: '',
                    gender: '',
                    email: '',
                    phone: '',
                    city: '',
                    state: '',
                });
            }
        } catch (error) {
            console.error('Error editing user:', error);
        }
    }

    function handleSaveEdit() {
        // Make an API call to save the edited user data here
        // After saving, update the state with the edited user data
        setIsEditing(false);
    }

    function handleCancelEdit() {
        setIsEditing(false);
        setEditedUser({
            id: '',
            firstName: '',
            lastName: '',
            gender: '',
            email: '',
            phone: '',
            city: '',
            state: '',
        });
    }

    return (
        <div>
            {isEditing ? (
                <div>
                    <h2>Edit User {editedUser} </h2>
                    <form>
                        <div>
                            <label>ID:</label>
                            <input
                                type="text"
                                value={editedUser.id}
                                onChange={(e) => setEditedUser({ ...editedUser, id: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>First Name:</label>
                            <input
                                type="text"
                                value={editedUser.firstName}
                                onChange={(e) => setEditedUser({ ...editedUser, firstName: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Last Name:</label>
                            <input
                                type="text"
                                value={editedUser.lastName}
                                onChange={(e) => setEditedUser({ ...editedUser, lastName: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Gender:</label>
                            <input
                                type="text"
                                value={editedUser.gender}
                                onChange={(e) => setEditedUser({ ...editedUser, gender: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Email:</label>
                            <input
                                type="text"
                                value={editedUser.email}
                                onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Phone:</label>
                            <input
                                type="text"
                                value={editedUser.phone}
                                onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>City:</label>
                            <input
                                type="text"
                                value={editedUser.city}
                                onChange={(e) => setEditedUser({ ...editedUser, city: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>State:</label>
                            <input
                                type="text"
                                value={editedUser.state}
                                onChange={(e) => setEditedUser({ ...editedUser, state: e.target.value })}
                            />
                        </div>

                        <button onClick={handleSaveEdit}>Save</button>
                        <button onClick={handleCancelEdit}>Cancel</button>
                    </form>
                </div>
            ) : (
                <table>
                    <thead>
                        {/* Table headers */}
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
                                    <button onClick={() => handleEdit(user.id, user.name)}>
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
            )}
        </div>
    );
}

export default UserTable;
