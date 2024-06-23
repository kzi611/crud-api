import axios from 'axios';

export const handleCreateUser = async (formData, setUsers, handleCloseCreateModal) => {
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

export const handleUpdateUser = async (formData, setUsers, handleCloseUpdateModal) => {
  try {
    const statusValue = formData.status === 'active' ? 1 : 0;
    formData.status = statusValue;
    await axios.put(`http://127.0.0.1:8000/api/people/edit/${formData.id}`, formData);
    alert('User updated successfully!');
    setUsers((prevUsers) => prevUsers.map((user) => (user.id === formData.id ? formData : user)));
    handleCloseUpdateModal();
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

export const handleDeleteUser = async (userId, setUsers) => {
  try {
    await axios.delete(`http://127.0.0.1:8000/api/people/delete/${userId}`);
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};