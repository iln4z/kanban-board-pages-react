import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  KanbanState,
  KanbanTask,
  loadState,
  saveState,
  getInitialState,
  generateId,
} from "../main/kanbanData";

interface KanbanContextType {
  state: KanbanState;
  moveToReady: (taskId: string) => void;
  moveToInProgress: (taskId: string) => void;
  moveToFinished: (taskId: string) => void;
  addToBacklog: (name: string, description?: string) => void;
  updateTaskDescription: (taskId: string, description: string) => void;
  findTaskById: (taskId: string) => KanbanTask | undefined;
  countActiveTasks: () => number;
  countFinishedTasks: () => number;
}

const KanbanContext = createContext<KanbanContextType | undefined>(undefined);

export const KanbanStateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<KanbanState>(() => {
    const savedState = loadState();
    return savedState || getInitialState();
  });

  useEffect(() => {
    saveState(state);
  }, [state]);

  const moveToReady = useCallback((taskId: string) => {
    setState((prev) => {
      const task = prev.backlog.find((t) => t.id === taskId);
      if (!task) return prev;
      return {
        ...prev,
        backlog: prev.backlog.filter((t) => t.id !== taskId),
        ready: [...prev.ready, task],
      };
    });
  }, []);

  const moveToInProgress = useCallback((taskId: string) => {
    setState((prev) => {
      const task = prev.ready.find((t) => t.id === taskId);
      if (!task) return prev;
      return {
        ...prev,
        ready: prev.ready.filter((t) => t.id !== taskId),
        inProgress: [...prev.inProgress, task],
      };
    });
  }, []);

  const moveToFinished = useCallback((taskId: string) => {
    setState((prev) => {
      const task = prev.inProgress.find((t) => t.id === taskId);
      if (!task) return prev;
      return {
        ...prev,
        inProgress: prev.inProgress.filter((t) => t.id !== taskId),
        finished: [...prev.finished, task],
      };
    });
  }, []);

  const addToBacklog = useCallback((name: string, description?: string) => {
    setState((prev) => ({
      ...prev,
      backlog: [...prev.backlog, { id: generateId(), name, description }],
    }));
  }, []);

  const updateTaskDescription = useCallback(
    (taskId: string, description: string) => {
      setState((prev) => {
        const newState: KanbanState = JSON.parse(JSON.stringify(prev));

        const allTasks = [
          ...newState.backlog,
          ...newState.ready,
          ...newState.inProgress,
          ...newState.finished,
        ];

        const task = allTasks.find((t) => t.id === taskId);
        if (task) {
          task.description = description;
        }

        return newState;
      });
    },
    []
  );

  const findTaskById = useCallback(
    (taskId: string): KanbanTask | undefined => {
      const allTasks = [
        ...state.backlog,
        ...state.ready,
        ...state.inProgress,
        ...state.finished,
      ];
      return allTasks.find((task) => task.id === taskId);
    },
    [state]
  );

  const countActiveTasks = useCallback(() => {
    return state.backlog.length + state.ready.length + state.inProgress.length;
  }, [state]);

  const countFinishedTasks = useCallback(() => {
    return state.finished.length;
  }, [state]);

  const value = {
    state,
    moveToReady,
    moveToInProgress,
    moveToFinished,
    addToBacklog,
    updateTaskDescription,
    findTaskById,
    countActiveTasks,
    countFinishedTasks,
  };

  return (
    <KanbanContext.Provider value={value}>{children}</KanbanContext.Provider>
  );
};

export const useKanban = () => {
  const context = useContext(KanbanContext);
  if (!context) {
    throw new Error(
      "useKanban должен использоваться внутри KanbanStateProvider"
    );
  }
  return context;
};
