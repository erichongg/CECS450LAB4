import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const UserList = ({ onEdit, refreshTrigger }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:5000/api/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
            setError(error.response?.data?.message || error.message || 'Failed to fetch users');
            alert('Error fetching users: ' + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers, refreshTrigger]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await axios.delete(`http://localhost:5000/api/users/${id}`);
                fetchUsers(); // Refresh the list
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    return (
        <div>
            <h2>All Users</h2>
            <button onClick={fetchUsers} disabled={loading}>
                {loading ? 'Loading...' : 'Display All Records'}
            </button>
            {error && (
                <p style={{ color: 'red', marginTop: '10px' }}>Error: {error}</p>
            )}
            {loading && (
                <p style={{ marginTop: '10px' }}>Loading users...</p>
            )}
            {!loading && !error && users.length === 0 && (
                <p style={{ marginTop: '10px' }}>No users found</p>
            )}
            {!loading && !error && users.length > 0 && (
                <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f2f2f2' }}>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Name</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Email</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.name}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.email}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                    <button 
                                        onClick={() => onEdit(user)}
                                        style={{ marginRight: '10px', padding: '5px 10px' }}
                                    >
                                        Update
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(user._id)}
                                        style={{ padding: '5px 10px', backgroundColor: '#ff4444', color: 'white' }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UserList;

