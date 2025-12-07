import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserForm = ({ editingUser, onUserSaved }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (editingUser) {
            setName(editingUser.name);
            setEmail(editingUser.email);
            setIsEditing(true);
        } else {
            setName('');
            setEmail('');
            setIsEditing(false);
        }
    }, [editingUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing && editingUser) {
                // Update existing user
                await axios.put(`http://localhost:5000/api/users/${editingUser._id}`, {
                    name,
                    email,
                });
                alert('User updated successfully!');
            } else {
                // Create new user
                await axios.post('http://localhost:5000/api/users', {
                    name,
                    email,
                });
                alert('User created successfully!');
            }
            setName('');
            setEmail('');
            setIsEditing(false);
            if (onUserSaved) {
                onUserSaved();
            }
        } catch (error) {
            console.error(error);
            alert('Error: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleCancel = () => {
        setName('');
        setEmail('');
        setIsEditing(false);
        if (onUserSaved) {
            onUserSaved();
        }
    };

    return (
        <div style={{ marginBottom: '30px' }}>
            <h2>{isEditing ? 'Update User' : 'Add New User'}</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
                        {isEditing ? 'Update User' : 'Add User'}
                    </button>
                    {isEditing && (
                        <button 
                            type="button" 
                            onClick={handleCancel}
                            style={{ padding: '10px 20px', backgroundColor: '#f44336', color: 'white', border: 'none', cursor: 'pointer' }}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default UserForm;
