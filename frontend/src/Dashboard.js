import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [item, setItem] = useState({
    itemName: "",
    description: "",
    type: "",
    location: "",
  });

  const BASE_URL = "https://lost-found-project-w5c2.onrender.com";
  const token = localStorage.getItem("token");

  const fetchItems = async () => {
    const res = await axios.get(`${BASE_URL}/api/items`);
    setItems(res.data);
  };

  const addItem = async () => {
    await axios.post(`${BASE_URL}/api/items`, item, {
      headers: { Authorization: token },
    });
    fetchItems();
  };

  const deleteItem = async (id) => {
    await axios.delete(`${BASE_URL}/api/items/${id}`, {
      headers: { Authorization: token },
    });
    fetchItems();
  };

  const searchItem = async () => {
    const res = await axios.get(`${BASE_URL}/api/items/search?name=${search}`);
    setItems(res.data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Dashboard</h2>

      <button className="btn btn-danger mb-3" onClick={logout}>
        Logout
      </button>

      {/* Add Item */}
      <div className="card p-3 mb-3 shadow">
        <h5>Add Item</h5>
        <input className="form-control mb-2" placeholder="Item Name"
          onChange={(e) => setItem({ ...item, itemName: e.target.value })} />
        <input className="form-control mb-2" placeholder="Description"
          onChange={(e) => setItem({ ...item, description: e.target.value })} />
        <input className="form-control mb-2" placeholder="Type (Lost/Found)"
          onChange={(e) => setItem({ ...item, type: e.target.value })} />
        <input className="form-control mb-2" placeholder="Location"
          onChange={(e) => setItem({ ...item, location: e.target.value })} />

        <button className="btn btn-primary" onClick={addItem}>
          Add Item
        </button>
      </div>

      {/* Search */}
      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Search Item"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-secondary mt-2" onClick={searchItem}>
          Search
        </button>
      </div>

      {/* Items List */}
      {items.map((i) => (
        <div key={i._id} className="card p-3 mb-2 shadow-sm">
          <h5>{i.itemName}</h5>
          <p>{i.description}</p>
          <p><b>{i.type}</b> - {i.location}</p>
          <button className="btn btn-danger btn-sm" onClick={() => deleteItem(i._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
