import React, { useEffect, useState } from 'react';
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  // Fetch users 
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/v1/get-users', {
          method: 'GET',
          credentials: 'include', 
        });

        if (response.ok) {
          const data = await response.json();
          setUsers(data.users); 
          setError('');
        } else {
          setError('Failed to fetch users.');
        }
      } catch (err) {
        setError('An error occurred while fetching users.');
      }
    };

    fetchUsers(); // Fetch users
  }, []);

  // user status (enable/disable)
  const toggleUserStatus = async (userId, currentStatus) => {
    const endpoint = currentStatus ? 'disable' : 'enable';
    try {
      const response = await fetch(`http://localhost:4000/api/v1/users/${endpoint}/${userId}`, {
        method: 'PUT',
        credentials: 'include', 
      });

      if (response.ok) {
        const data = await response.json();

        // Update the users array with the new status
        const updatedUsers = users.map((user) => {
          if (user._id === userId) {
            user.status = !currentStatus;
          }
          return user;
        });

        setUsers(updatedUsers); 
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to update user status.');
      }
    } catch (err) {
      setError('An error occurred while updating user status.');
    }
  };


    return (
        <div className="user-list-container">
          <h2>All Users</h2>
          {error && <p className="error-message">{error}</p>} 
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.userId}</td>
                  <td>{user.status ? 'Enabled' : 'Disabled'}</td>
                  <td>
                    <button
                      onClick={() => toggleUserStatus(user._id, user.status)}
                    >
                      {user.status ? 'Disable' : 'Enable'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
};

export default UserList;
