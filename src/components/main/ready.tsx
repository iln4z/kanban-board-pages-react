import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import { ReactComponent as AddCard } from "./add-card.svg";
import { KanbanTask } from "./kanbanData";

interface ReadyProps {
  tasks: KanbanTask[];
  backlogTasks: KanbanTask[];
  onMoveToReady: (taskId: string) => void;
}

const Ready: React.FC<ReadyProps> = ({
  tasks,
  backlogTasks,
  onMoveToReady,
}) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [isBtnVisible, setIsBtnVisible] = useState(true);

  const toggleForm = () => {
    if (backlogTasks.length === 0) return;
    setIsFormVisible(!isFormVisible);
    setIsBtnVisible(false);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTaskId(e.target.value);
  };

  const handleSubmit = () => {
    if (selectedTaskId) {
      onMoveToReady(selectedTaskId);
      setSelectedTaskId("");
      setIsFormVisible(false);
      setIsBtnVisible(true);
    }
  };

  const isBacklogEmpty = backlogTasks.length === 0;

  return (
    <div>
      <div className="title">
        <p className="title-name">Ready</p>
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
              <option value="">Выберите задачу из Backlog</option>
              {backlogTasks.map((task) => (
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
            className={`btn-add ${isBacklogEmpty ? "disabled" : ""}`}
            onClick={toggleForm}
            disabled={isBacklogEmpty}
          >
            <AddCard className="add-card" /> Add card
          </button>
        )}
      </div>
    </div>
  );
};

export default Ready;
