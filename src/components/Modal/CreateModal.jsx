import React, { useState } from 'react';
import Modal from 'react-modal';
import './Modal.css';

const UserModal = ({ isOpen, onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    phone: '',
    email: '',
    status: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreate = () => {
    if (validateForm()) {
      onCreate(formData);
      setFormData({
        id: '',
        name: '',
        phone: '',
        email: '',
        status: 1, 
      });
    } else {
      alert('Please fill out all required fields.');
    }
  };

  const validateForm = () => {
    return formData.id && formData.name && formData.phone && formData.email && formData.status;
  };

  const renderStatus = () => {
    return formData.status === 1 ? 'Active' : 'Inactive';
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal"
      overlayClassName="modal-overlay"
      aria={{
        labelledby: "modal-title",
        describedby: "modal-description"
      }}
    >
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <div className="modal-header">
          <h2 id="modal-title">Create User</h2>
        </div>
        <div className="modal-body">
          <form>
            <div className="form-group">
              <label>ID User:</label>
              <input type="text" name="id" value={formData.id} onChange={handleChange}/>
            </div>
            <div className="form-group">
              <label>Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange}/>
            </div>
            <div className="form-group">
              <label>Phone:</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange}/>
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input type="text" name="email" value={formData.email} onChange={handleChange}/>
            </div>
            <div className="form-group">
              <label>Status:</label>
              <input type="text" name="status" value={renderStatus()} readOnly/>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button className="create-button" onClick={handleCreate}>
            Create
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UserModal;