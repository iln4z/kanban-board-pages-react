import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useKanban } from "../context/kanban-context";
import Footer from "../footer/footer";
import "../../App.css";

const TaskDetails: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const { findTaskById, updateTaskDescription } = useKanban();

  const [task, setTask] = useState<ReturnType<typeof findTaskById>>(undefined);
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (taskId) {
      const foundTask = findTaskById(taskId);
      setTask(foundTask);
      setDescription(foundTask?.description || "");
    }
  }, [taskId, findTaskById]);

  const handleSave = () => {
    if (taskId) {
      updateTaskDescription(taskId, description);
      setIsEditing(false);
    }
  };

  return (
    <div className="task-page">
      <div className="task-content">
        <a href="/" className="close-button">
          &times;
        </a>
        <h2 className="name-page-task">{task?.name || "Task not found"}</h2>
        <div className="description-section">
          {isEditing ? (
            <div className="edit-mode">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="description-input"
                rows={10}
                placeholder="Enter task description..."
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "1rem",
                }}
              >
                <button onClick={handleSave} className="save-button">
                  Save Description
                </button>
              </div>
            </div>
          ) : (
            <div className="view-mode">
              <p className="task-input">
                {task?.description || "This task has no description yet."}
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "1rem",
                }}
              >
                <button
                  onClick={() => setIsEditing(true)}
                  className="edit-button"
                >
                  Edit Description
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TaskDetails;
