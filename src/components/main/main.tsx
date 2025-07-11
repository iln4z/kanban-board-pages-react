import React from "react";
import "../../App.css";
import Backlog from "./backlog";
import Ready from "./ready";
import InProgress from "./in-progress";
import Finished from "./finished";
import { useKanban } from "../context/kanban-context";

function Main() {
  const { state, moveToReady, moveToInProgress, moveToFinished, addToBacklog } =
    useKanban();

  return (
    <main className="main">
      <section className="backlog">
        <Backlog tasks={state.backlog} addTask={addToBacklog} />
      </section>

      <section className="ready">
        <Ready
          tasks={state.ready}
          backlogTasks={state.backlog}
          onMoveToReady={moveToReady}
        />
      </section>

      <section className="in-progress">
        <InProgress
          tasks={state.inProgress}
          readyTasks={state.ready}
          onMoveToInProgress={moveToInProgress}
        />
      </section>

      <section className="finished">
        <Finished
          tasks={state.finished}
          inProgressTasks={state.inProgress}
          onMoveToFinished={moveToFinished}
        />
      </section>
    </main>
  );
}

export default Main;
