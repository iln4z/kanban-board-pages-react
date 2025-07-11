import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import { ReactComponent as AddCard } from "./add-card.svg";
import { KanbanTask } from "./kanbanData";

interface InProgressProps {
  tasks: KanbanTask[];
  readyTasks: KanbanTask[];
  onMoveToInProgress: (taskId: string) => void;
}

const InProgress: React.FC<InProgressProps> = ({
  tasks,
  readyTasks,
  onMoveToInProgress,
}) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [isBtnVisible, setIsBtnVisible] = useState(true);

  const toggleForm = () => {
    if (readyTasks.length === 0) return;
    setIsFormVisible(!isFormVisible);
    setIsBtnVisible(false);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTaskId(e.target.value);
  };

  const handleSubmit = () => {
    if (selectedTaskId) {
      onMoveToInProgress(selectedTaskId);
      setSelectedTaskId("");
      setIsFormVisible(false);
      setIsBtnVisible(true);
    }
  };

  const isReadyEmpty = readyTasks.length === 0;

  return (
    <div>
      <div className="title">
        <p className="title-name">In Progress</p>
        {tasks.map((task) => (
          <div key={task.id} className="block">
            <Link to={`/tasks/${task.id}`} className="task-link">
              {task.name}
            </Link>
          </div>
        ))}

        {isFormVisible && (
          <div className="submit-card">
            <select
              value={selectedTaskId}
              onChange={handleSelectChange}
              className="input-card"
            >
              <option value="">Выберите задачу из Ready</option>
              {readyTasks.map((task) => (
                <option key={task.id} value={task.id}>
                  {task.name}
                </option>
              ))}
            </select>

            <button
              onClick={handleSubmit}
              className="btn-submit"
              disabled={!selectedTaskId}
            >
              Submit
            </button>
          </div>
        )}

        {isBtnVisible && (
          <button
            className={`btn-add ${isReadyEmpty ? "disabled" : ""}`}
            onClick={toggleForm}
            disabled={isReadyEmpty}
          >
            <AddCard className="add-card" /> Add card
          </button>
        )}
      </div>
    </div>
  );
};

export default InProgress;
