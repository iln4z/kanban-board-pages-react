import React, { useState } from "react";
import "../../App.css";
import { ReactComponent as AddCard } from "./add-card.svg";
import { KanbanTask } from "./kanbanData";
import { Link } from "react-router-dom";

interface BacklogProps {
  tasks: KanbanTask[];
  addTask: (name: string, description?: string) => void;
}

const Backlog: React.FC<BacklogProps> = ({ tasks, addTask }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const [isBtnVisible, setIsBtnVisible] = useState(true);

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
    setIsBtnVisible(false);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskName.trim()) {
      addTask(newTaskName, "");
      setNewTaskName("");
      setIsFormVisible(false);
      setIsBtnVisible(true);
    }
  };

  return (
    <div>
      <div className="title">
        <p className="title-name">Backlog</p>
        {tasks.map((task) => (
          <div key={task.id} className="block">
            <Link to={`/tasks/${task.id}`} className="task-link">
              {task.name}
            </Link>
          </div>
        ))}
        {isFormVisible && (
          <form onSubmit={handleSubmit} className="submit-card">
            <input
              type="text"
              className="input-card"
              value={newTaskName}
              onChange={handleNameChange}
              placeholder="Task name"
              autoFocus
              required
            />
            <button type="submit" className="btn-submit">
              Submit
            </button>
          </form>
        )}
        {isBtnVisible && (
          <button className="btn-add" onClick={toggleForm}>
            <AddCard className="add-card" /> Add card
          </button>
        )}
      </div>
    </div>
  );
};

export default Backlog;
