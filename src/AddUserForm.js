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
                onSubmit(data); // You can also pass the response data to a callback if needed
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
            <form onSubmit={handleSubmit}>
                {/* Form fields for user details */}
                <div>
                    <label>User Profile:</label>
                    <input
                        type="text"
                        name="profile"
                        value={user.profile}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="firstName"
                        value={user.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={user.lastName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Gender:</label>
                    <input
                        type="text"
                        name="gender"
                        value={user.gender}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="text"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Phone:</label>
                    <input
                        type="text"
                        name="phone"
                        value={user.phone}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>State:</label>
                    <input
                        type="text"
                        name="state"
                        value={user.state}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Add User</button>
            </form>
        </div>
    );
}

export default AddUserForm;

