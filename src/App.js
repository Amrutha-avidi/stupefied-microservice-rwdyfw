import { useState } from "react";
import "./styles.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newDate, setNewDate] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    date: "",
  });

  const validateInputs = () => {
    const newErrors = { title: "", description: "", date: "" };
    let isValid = true;

    if (!newTitle) {
      newErrors.title = "Title is required.";
      isValid = false;
    }
    if (!newDescription) {
      newErrors.description = "Description is required.";
      isValid = false;
    }
    if (!newDate) {
      newErrors.date = "Date is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!validateInputs()) return; // If inputs are invalid, stop here

    if (editIndex !== null) {
      // Update existing task
      const updatedTasks = tasks.map((task, index) =>
        index === editIndex
          ? { title: newTitle, description: newDescription, date: newDate }
          : task
      );
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      // Add new task
      setTasks([
        ...tasks,
        {
          title: newTitle,
          description: newDescription,
          date: newDate,
        },
      ]);
    }
    // Reset inputs and errors
    setNewTitle("");
    setNewDescription("");
    setNewDate("");
    setErrors({ title: "", description: "", date: "" });
  };

  const handleEdit = (index) => {
    setNewTitle(tasks[index].title);
    setNewDescription(tasks[index].description);
    setNewDate(tasks[index].date);
    setEditIndex(index);
    // Clear errors when editing
    setErrors({ title: "", description: "", date: "" });
  };

  const handleDelete = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
    // Reset editing if the deleted task was the one being edited
    if (editIndex === index) {
      setEditIndex(null);
      setNewTitle("");
      setNewDescription("");
      setNewDate("");
      setErrors({ title: "", description: "", date: "" });
    }
  };

  return (
    <form>
      <h2>{editIndex !== null ? "Edit Task" : "Add New Task"}</h2>
      <div className="input-cons">
        <label htmlFor="title">Add Title: </label>
        <input
          type="text"
          id="title"
          placeholder="Task Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        {errors.title && <span className="error">{errors.title}</span>}
      </div>
      <div className="input-cons">
        <label htmlFor="description">Add Description: </label>
        <textarea
          placeholder="Description"
          id="description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        {errors.description && (
          <span className="error">{errors.description}</span>
        )}
      </div>
      <div className="input-cons">
        <label htmlFor="date">Add Date: </label>
        <input
          id="date"
          type="date"
          value={newDate}
          onChange={(event) => setNewDate(event.target.value)}
        />
        {errors.date && <span className="error">{errors.date}</span>}
      </div>
      <button onClick={handleAddTask}>
        {editIndex !== null ? "Update Task" : "Add Task"}
      </button>

      <h3>Tasks: </h3>
      <p>Number of tasks: {tasks.length}</p>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <p>
              <strong>{task.title}</strong> - {task.description}
            </p>
            <p>
              <strong>Due date:</strong> {task.date}
            </p>
            <div>
              <button type="button" onClick={() => handleEdit(index)}>
                Edit
              </button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </form>
  );
}
