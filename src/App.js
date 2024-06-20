import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import ButtonSearch from './components/Button/buttonSearch/buttonSearch';
import CreateUserModal from './components/Modal/CreateModal';
import UpdateUserModal from './components/Modal/UpdateModal';
import ButtonCreate from './components/Button/buttonCreate/buttonCreate';
import Table from './components/Table/Table';
import useMemoColumns from './components/useMemo';
import axios from 'axios';

const App = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/people');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleCreateUser = async (formData) => {
    try {
      await axios.post('http://127.0.0.1:8000/api/people/create', formData);
      alert('User created successfully!');
      const updatedUsersResponse = await axios.get('http://127.0.0.1:8000/api/people');
      setUsers(updatedUsersResponse.data);
      handleCloseCreateModal();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleUpdateUser = async (formData) => {
    try {
      const statusValue = formData.status === 'active' ? 1 : 0;
      formData.status = statusValue;
      await axios.put(`http://127.0.0.1:8000/api/people/edit/${formData.id}`, formData);
      alert('User updated successfully!');
      setUsers(prevUsers =>
        prevUsers.map(user => (user.id === formData.id ? formData : user))
      );
      handleCloseUpdateModal();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = useCallback(async (userId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/people/delete/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }, [users]);

  const handleSearch = useCallback(async (filteredUsers) => {
    setUsers(filteredUsers);
  }, []);

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleOpenUpdateModal = (dataToEdit) => {
    setIsUpdateModalOpen(true);
    setEditData(dataToEdit);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setEditData(null);
  };

  const renderStatus = (row) => {
    return row.original.status === 1 ? 'Active' : 'Inactive';
  };

  const columns = useMemoColumns(handleDeleteUser, handleOpenUpdateModal, renderStatus);

  return (
    <div className="App">
      <Header />
      <div className="content">
        <ButtonSearch onSearch={handleSearch} />
        <ButtonCreate onClick={handleOpenCreateModal} label="Create User" />
        <Table columns={columns} data={users} />
        <CreateUserModal
          isOpen={isCreateModalOpen} onClose={handleCloseCreateModal} onCreate={handleCreateUser}/>
        {editData && (
          <UpdateUserModal
            isOpen={isUpdateModalOpen} onClose={handleCloseUpdateModal} onUpdate={handleUpdateUser} initialData={editData}/>
        )}
      </div>
    </div>
  );
};

export default App;