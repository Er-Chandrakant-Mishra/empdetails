import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import dataStore from "../store/DataStore";
import '../style/MainContent.css';

const MainContent = observer(() => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dataStore.fetchData();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (dataStore.loading) return <p>Loading...</p>;
  if (dataStore.error) return <p>Error: {dataStore.error}</p>;

  return (
    <main className="main-content">
      <h2>Data from API</h2>
      <button onClick={openModal} className="add-item-button">Add Item</button>
      <Table />
      <Pagination />
      {isModalOpen && (
        <Modal closeModal={closeModal}>
          <CreateItemForm closeModal={closeModal} />
        </Modal>
      )}
    </main>
  );
});

const CreateItemForm = observer(({ closeModal }) => {
  const [newItem, setNewItem] = useState({
    id: '',
    first_name: '',
    last_name: '',
    age: '',
    role: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dataStore.createItem(newItem);
    setNewItem({
      id: '',
      first_name: '',
      last_name: '',
      age: '',
      role: ''
    });
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="id" value={newItem.id} onChange={handleChange} placeholder="ID" required />
      <input name="first_name" value={newItem.first_name} onChange={handleChange} placeholder="First Name" required />
      <input name="last_name" value={newItem.last_name} onChange={handleChange} placeholder="Last Name" required />
      <input name="age" value={newItem.age} onChange={handleChange} placeholder="Age" required />
      <input name="role" value={newItem.role} onChange={handleChange} placeholder="Role" required />
      <button type="submit">Add</button> {/* Changed label */}
    </form>
  );
});


const Table = observer(() => {
  const { data, page, itemsPerPage } = dataStore;
  const [editingIndex, setEditingIndex] = useState(null);
  const [editItem, setEditItem] = useState({});
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditItem({ ...data[index] });
  };

  const handleUpdate = async (index) => {
    await dataStore.updateItem(index, editItem);
    setEditingIndex(null);
  };

  const handleDelete = (index) => {
    setDeleteIndex(index);
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    if (deleteIndex !== null) {
      await dataStore.deleteItem(deleteIndex);
      setShowDeletePopup(false);
      setDeleteIndex(null);
    }
  };

  const cancelDelete = () => {
    setShowDeletePopup(false);
    setDeleteIndex(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditItem({ ...editItem, [name]: value });
  };

  const paginatedData = data.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div>
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item, index) => (
            <tr key={index}>
              {editingIndex === index ? (
                <>
                  <td>{item.id}</td>
                  <td><input name="first_name" value={editItem.first_name} onChange={handleChange} /></td>
                  <td><input name="last_name" value={editItem.last_name} onChange={handleChange} /></td>
                  <td><input name="age" value={editItem.age} onChange={handleChange} /></td>
                  <td><input name="role" value={editItem.role} onChange={handleChange} /></td>
                  <td>
                    <button onClick={() => handleUpdate(index)}>Save</button>
                    <button onClick={() => setEditingIndex(null)}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{item.id}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>{item.age}</td>
                  <td>{item.role}</td>
                  <td>
                    <button onClick={() => handleEdit(index)}>Edit</button>
                    <button onClick={() => handleDelete(index)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {showDeletePopup && (
        <div className="delete-popup">
          <p>Are you sure you want to delete this item?</p>
          <button onClick={confirmDelete}>Yes</button>
          <button onClick={cancelDelete}>No</button>
        </div>
      )}
    </div>
  );
});

const Pagination = observer(() => {
  const { page, totalPages, setPage } = dataStore;

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="pagination">
      <button onClick={handlePrev} disabled={page === 1}>Previous</button>
      <span>Page {page} of {totalPages}</span>
      <button onClick={handleNext} disabled={page === totalPages}>Next</button>
    </div>
  );
});

// Modal Component
const Modal = ({ closeModal, children }) => (
  <div className="modal">
    <div className="modal-content">
      <span className="close-button" onClick={closeModal}>&times;</span>
      {children}
    </div>
  </div>
);

export default MainContent;
