import express from "express";
import cors from "cors";
import swaggerRoute from "./routes/swagger.js";
import User from "./models/User.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api-docs", swaggerRoute);

// Health Check
app.get("/", (req, res) => {
  res.status(200).send("BACKEND IS RUNNING SUCCESSFULLY!");
});



// GET all users
app.get("/api/getUsers", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err.message });
  }
});

// GET single user by ID
app.get("/api/getUser/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user", error: err.message });
  }
});

// POST to create a new user
app.post("/api/storeUser", async (req, res) => {
  try {
    const { name, age, profession } = req.body;
    if (!name || !age || !profession)
      return res.status(400).json({ message: "Please provide name, age, and profession." });

    const newUser = await User.create({ name, age, profession });
    res.status(200).json({ message: "User Saved!", user: newUser });
  } catch (err) {
    res.status(500).json({ message: "Error saving user", error: err.message });
  }
});

// PUT to update a user
app.put("/api/updateUser/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Error updating user", error: err.message });
  }
});

// DELETE a user
app.delete("/api/deleteUser/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User removed!", user: deletedUser });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user", error: err.message });
  }
});

export default app;
