import { useState } from "react";
import axios from "axios";

function AddUserForm({ onSubmit }) {
    const [user, setUser] = useState({
        profile: '',
        firstName: '',
        lastName: '',
        gender: '',
        email: '',
        phone: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://dummyjson.com/users', user);

            if (response.status === 200) {
                const data = response.data;
                console.log('User added:', data);
                onSubmit(data);
                setUser({
                    profile: '',
                    firstName: '',
                    lastName: '',
                    gender: '',
                    email: '',
                    phone: '',
                });
            } else {
                console.error('Failed to add user');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Add User</h2>
            <form onSubmit={handleSubmit} style={formStyles}>
                <div style={inputGroupStyles}>
                    <label>User Profile:</label>
                    <input
                        type="text"
                        name="profile"
                        value={user.profile}
                        onChange={handleChange}
                        style={inputStyles}
                    />
                </div>
                <div style={inputGroupStyles}>
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="firstName"
                        value={user.firstName}
                        onChange={handleChange}
                        style={inputStyles}
                    />
                </div>
                <div style={inputGroupStyles}>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={user.lastName}
                        onChange={handleChange}
                        style={inputStyles}
                    />
                </div>
                <div style={inputGroupStyles}>
                    <label>Gender:</label>
                    <input
                        type="text"
                        name="gender"
                        value={user.gender}
                        onChange={handleChange}
                        style={inputStyles}
                    />
                </div>
                <div style={inputGroupStyles}>
                    <label>Email:</label>
                    <input
                        type="text"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        style={inputStyles}
                    />
                </div>
                <div style={inputGroupStyles}>
                    <label>Phone:</label>
                    <input
                        type="text"
                        name="phone"
                        value={user.phone}
                        onChange={handleChange}
                        style={inputStyles}
                    />
                </div>
                <button type="submit" style={submitButtonStyles}>Add User</button>
            </form>
        </div>
    );
}

const formStyles = {
    maxWidth: '400px',
    margin: '0 auto',
};

const inputGroupStyles = {
    marginBottom: '15px',
};

const inputStyles = {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
};

const submitButtonStyles = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
};

export default AddUserForm;
