import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api";

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", age: "", profession: "" });
  const [editId, setEditId] = useState(null);

  const fetchUsers = async () => {
    const res = await axios.get(`${API_URL}/getUsers`);
    setUsers(res.data);
  };

  useEffect(() => {
    // define async function inside the effect
    const getUsers = async () => {
      try {
        const res = await axios.get(`${API_URL}/getUsers`);
        setUsers(res.data); // safe, inside async callback
      } catch (err) {
        console.error(err);
      }
    };

    getUsers(); // call the async function
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`${API_URL}/updateUser/${editId}`, form);
      setEditId(null);
    } else {
      await axios.post(`${API_URL}/storeUser`, form);
    }
    setForm({ name: "", age: "", profession: "" });
    fetchUsers();
  };

  const deleteUser = async (id) => {
    await axios.delete(`${API_URL}/deleteUser/${id}`);
    fetchUsers();
  };

  const editUser = (user) => {
    setEditId(user.id);
    setForm({
      name: user.name,
      age: user.age,
      profession: user.profession,
    });
  };

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#f7f9fc",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "40px", color: "#333" }}>
        User Management (React + Express)
      </h1>

      <form
        onSubmit={handleSubmit}
        style={{
          marginBottom: "40px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          maxWidth: "400px",
          margin: "0 auto",
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={form.name}
          onChange={handleChange}
          style={{
            padding: "10px 15px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />
        <input
          type="number"
          name="age"
          placeholder="Enter age"
          value={form.age}
          onChange={handleChange}
          style={{
            padding: "10px 15px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />
        <input
          type="text"
          name="profession"
          placeholder="Profession"
          value={form.profession}
          onChange={handleChange}
          style={{
            padding: "10px 15px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#4caf50",
            color: "#fff",
            fontSize: "16px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "background 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#4caf50")}
        >
          {editId ? "Update User" : "Add User"}
        </button>
      </form>

      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#555",
        }}
      >
        All Users
      </h2>

      {users.length === 0 && (
        <p style={{ textAlign: "center", color: "#777" }}>No users found.</p>
      )}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {users.map((user) => (
          <div
            key={user.id}
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              minWidth: "220px",
            }}
          >
            <h3 style={{ margin: "0 0 10px 0", color: "#333" }}>{user.name}</h3>
            <p style={{ margin: "0 0 10px 0", color: "#555" }}>
              Age: {user.age} <br />
              Profession: {user.profession}
            </p>

            <button
              onClick={() => editUser(user)}
              style={{
                marginRight: "10px",
                padding: "8px 12px",
                borderRadius: "6px",
                border: "none",
                backgroundColor: "#2196f3",
                color: "#fff",
                cursor: "pointer",
                transition: "background 0.3s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#1976d2")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#2196f3")}
            >
              Edit
            </button>

            <button
              onClick={() => deleteUser(user.id)}
              style={{
                padding: "8px 12px",
                borderRadius: "6px",
                border: "none",
                backgroundColor: "#f44336",
                color: "#fff",
                cursor: "pointer",
                transition: "background 0.3s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#d32f2f")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#f44336")}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
