import { useEffect } from 'react';
import axios from 'axios';

const useFetchUsers = (setUsers) => {
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
  }, [setUsers]);
};

export default useFetchUsers;