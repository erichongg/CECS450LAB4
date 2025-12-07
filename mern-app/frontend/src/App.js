import React, { useState } from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

function App() {
    const [editingUser, setEditingUser] = useState(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleEdit = (user) => {
        setEditingUser(user);
    };

    const handleUserSaved = () => {
        setEditingUser(null);
        setRefreshTrigger(prev => prev + 1);
    };

    return (
        <div className="App" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1>User Management System</h1>
            <UserForm 
                editingUser={editingUser} 
                onUserSaved={handleUserSaved}
            />
            <UserList 
                onEdit={handleEdit}
                refreshTrigger={refreshTrigger}
            />
        </div>
    );
}

export default App;
