import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import { ReactComponent as AddCard } from "./add-card.svg";
import { KanbanTask } from "./kanbanData";

interface FinishedProps {
  tasks: KanbanTask[];
  inProgressTasks: KanbanTask[];
  onMoveToFinished: (taskId: string) => void;
}

const Finished: React.FC<FinishedProps> = ({
  tasks,
  inProgressTasks,
  onMoveToFinished,
}) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [isBtnVisible, setIsBtnVisible] = useState(true);

  const toggleForm = () => {
    if (inProgressTasks.length === 0) return;
    setIsFormVisible(!isFormVisible);
    setIsBtnVisible(false);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTaskId(e.target.value);
  };

  const handleSubmit = () => {
    if (selectedTaskId) {
      onMoveToFinished(selectedTaskId);
      setSelectedTaskId("");
      setIsFormVisible(false);
      setIsBtnVisible(true);
    }
  };

  const isInProgressEmpty = inProgressTasks.length === 0;

  return (
    <div>
      <div className="title">
        <p className="title-name">Finished</p>
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
              <option value="">Выберите задачу из In Progress</option>
              {inProgressTasks.map((task) => (
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
            className={`btn-add ${isInProgressEmpty ? "disabled" : ""}`}
            onClick={toggleForm}
            disabled={isInProgressEmpty}
          >
            <AddCard className="add-card" /> Add card
          </button>
        )}
      </div>
    </div>
  );
};

export default Finished;
