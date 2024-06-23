import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ButtonSearch from './components/Button/buttonSearch/buttonSearch';
import CreateUserModal from './components/Modal/CreateModal';
import UpdateUserModal from './components/Modal/UpdateModal';
import ButtonCreate from './components/Button/buttonCreate/buttonCreate';
import Table from './components/Table/Table';
import useMemoColumns from './customHook/useMemo';
import { handleCreateUser, handleUpdateUser, handleDeleteUser } from './utils/handleUser';
import useFetchUsers from './customHook/useFetchUser';

const App = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [users, setUsers] = useState([]);

  useFetchUsers(setUsers);

  const handleSearch = useCallback((filteredUsers) => {
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

  const handleCreateUserInternal = (formData) => {
    handleCreateUser(formData, setUsers, handleCloseCreateModal);
  };

  const handleUpdateUserInternal = (formData) => {
    handleUpdateUser(formData, setUsers, handleCloseUpdateModal);
  };

  const handleDeleteUserInternal = useCallback((userId) => {
    handleDeleteUser(userId, setUsers);
  }, []);

  const columns = useMemoColumns(handleDeleteUserInternal, handleOpenUpdateModal, renderStatus);

  return (
    <div className="App">
      <Header />
      <div className="content">
        <ButtonSearch onSearch={handleSearch} />
        <ButtonCreate onClick={handleOpenCreateModal} label="Create User" />
        <Table columns={columns} data={users} />
        <CreateUserModal
          isOpen={isCreateModalOpen}
          onClose={handleCloseCreateModal}
          onCreate={handleCreateUserInternal}
        />
        {editData && (
          <UpdateUserModal
            isOpen={isUpdateModalOpen}
            onClose={handleCloseUpdateModal}
            onUpdate={handleUpdateUserInternal}
            initialData={editData}
          />
        )}
      </div>
    </div>
  );
};

export default App;