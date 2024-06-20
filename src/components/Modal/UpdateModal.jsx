import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './Modal.css';

const UpdateUserModal = ({ isOpen, onClose, onUpdate, initialData }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    phone: '',
    email: '',
    status: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id,
        name: initialData.name,
        phone: initialData.phone,
        email: initialData.email,
        status: initialData.status === 1 ? 'active' : 'inactive',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = () => {
    if (validateForm()) {
      onUpdate(formData); 
      onClose();
    } else {
      alert('Please fill out all required fields.');
    }
  };

  const validateForm = () => {
    return formData.id && formData.name && formData.phone && formData.email && formData.status;
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
          <h2 id="modal-title">Update User</h2>
        </div>
        <div className="modal-body">
          <form>
            <div className="form-group">
              <label>ID User:</label>
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
                disabled
              />
            </div>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Status:</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button className="create-button" onClick={handleUpdate}>
            Update
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UpdateUserModal;