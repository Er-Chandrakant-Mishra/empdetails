// src/store/DataStore.js
import { makeAutoObservable } from "mobx";
import axios from "axios";

class DataStore {
  data = [];
  loading = false;
  error = null;
  page = 1;
  itemsPerPage = 10;

  constructor() {
    makeAutoObservable(this);
  }

  fetchData = async () => {
    this.loading = true;
    this.error = null;
    try {
      const response = await axios.get("https://script.google.com/macros/s/AKfycbzr9AO0edFUa6iEMRbd-kuHxoWofOIt3EfrgJKyoUYhYKkaxVhAlPjjYw6nME9Z0rpQvQ/exec?method=read");
      this.data = response.data.data;
    } catch (error) {
      this.error = "Failed to fetch data";
    } finally {
      this.loading = false;
    }
  };

  setPage = (page) => {
    this.page = page;
  };

  get totalPages() {
    return Math.ceil(this.data.length / this.itemsPerPage);
  }

  createItem = async (newItem) => {
    try {
      await axios.get("https://script.google.com/macros/s/AKfycbzr9AO0edFUa6iEMRbd-kuHxoWofOIt3EfrgJKyoUYhYKkaxVhAlPjjYw6nME9Z0rpQvQ/exec", {
        params: { method: 'create', ...newItem }
      });
      this.fetchData();
    } catch (error) {
      console.error("Failed to create item", error);
    }
  };

  updateItem = async (index, updatedItem) => {
    try {
      await axios.get("https://script.google.com/macros/s/AKfycbzr9AO0edFUa6iEMRbd-kuHxoWofOIt3EfrgJKyoUYhYKkaxVhAlPjjYw6nME9Z0rpQvQ/exec", {
        params: { method: 'update', ...updatedItem }
      });
      this.data[index] = updatedItem;
    } catch (error) {
      console.error("Failed to update item", error);
    }
  };

  deleteItem = async (index) => {
    try {
      const itemToDelete = this.data[index];
      await axios.get("https://script.google.com/macros/s/AKfycbzr9AO0edFUa6iEMRbd-kuHxoWofOIt3EfrgJKyoUYhYKkaxVhAlPjjYw6nME9Z0rpQvQ/exec", {
        params: { method: 'delete', id: itemToDelete.id }
      });
      this.data.splice(index, 1);
    } catch (error) {
      console.error("Failed to delete item", error);
    }
  };
}

const dataStore = new DataStore();
export default dataStore;
