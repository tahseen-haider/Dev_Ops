import express from "express";

// Server Stored Memory
export let inMemStorage = [];

const PORT = 5000;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("BACKEND IS RUNNING SUCCESSFULLY!");
});

// GET to fetch all users
app.get("/api/getUsers", async (req, res) => {
  const allUsers = inMemStorage;
  return res.status(200).json(allUsers);
});

// GET to fetch a user
app.get("/api/getUser/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = inMemStorage.find((u) => u.id === userId);
  if (!user) return res.status(404).json({ message: "User not found" });
  return res.status(200).json(user);
});

// POST for storing user
app.post("/api/storeUser", (req, res) => {
  if (!req.body || !req.body.name || !req.body.age || !req.body.profession) {
    return res.status(400).json({
      message: "Please provide name, age, and profession.",
    });
  }

  const { name, age, profession } = req.body;

  const user = {
    id: Date.now(),
    name: name.trim(),
    age: Number(age),
    profession: profession.trim(),
  };

  inMemStorage.push(user);

  return res.status(200).json({
    message: "User Saved!",
    user,
  });
});

// PUT to update a user
app.put("/api/updateUser/:id", (req, res) => {
  const userId = parseInt(req.params.id);

  const index = inMemStorage.findIndex((user) => user.id === userId);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  const newUser = {
    id: inMemStorage[index].id,
    name: req.body.name ?? inMemStorage[index].name,
    age: req.body.age ?? inMemStorage[index].age,
    profession: req.body.profession ?? inMemStorage[index].profession,
  };

  inMemStorage[index] = newUser;

  res.status(200).json({
    message: "User updated successfully",
    user: newUser,
  });
});

// DELETE to delete a specific user
app.delete("/api/deleteUser/:id", async (req, res) => {
  const userId = req.params.id;

  const index = inMemStorage.findIndex((user) => user.id == userId);

  if (index === -1) return res.status(404).json({ message: "User not found" });

  inMemStorage.splice(index, 1);

  return res.status(200).json({
    message: "User removed!",
    inMemStorage,
  });
});

export default app;