import React from "react";
import "../../App.css";
import { useKanban } from "../context/kanban-context";

function Footer() {
  const { countActiveTasks, countFinishedTasks } = useKanban();

  return (
    <footer className="footer">
      <div className="number-tasks">
        <div className="active">
          <span>
            Active tasks: <span className="count">{countActiveTasks()}</span>
          </span>
        </div>
        <div className="finished">
          <span>
            Finished tasks:{" "}
            <span className="count">{countFinishedTasks()}</span>
          </span>
        </div>
      </div>
      <div className="kanban">
        <p>Kanban board by ilnaz, 2025</p>
      </div>
    </footer>
  );
}

export default Footer;
