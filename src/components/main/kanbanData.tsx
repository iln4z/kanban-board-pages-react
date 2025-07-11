export interface KanbanTask {
  id: string;
  name: string;
  description?: string;
}

export interface KanbanState {
  backlog: KanbanTask[];
  ready: KanbanTask[];
  inProgress: KanbanTask[];
  finished: KanbanTask[];
}

export const loadState = (): KanbanState | null => {
  try {
    const serializedState = localStorage.getItem("kanban-state");
    if (serializedState === null) return null;
    return JSON.parse(serializedState);
  } catch (e) {
    console.error("Failed to load state:", e);
    return null;
  }
};

export const saveState = (state: KanbanState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("kanban-state", serializedState);
  } catch (e) {
    console.error("Failed to save state:", e);
  }
};

export const getInitialState = (): KanbanState => ({
  backlog: [
    {
      id: generateId(),
      name: "Login page – performance issues",
      description:
        "Optimize loading time of login page by reducing image sizes and lazy loading components",
    },
    {
      id: generateId(),
      name: "Sprint bugfix",
      description: "Fix critical bugs reported during last sprint review",
    },
  ],
  ready: [
    {
      id: generateId(),
      name: "Shop page – performance issues",
      description:
        "Improve shop page rendering performance by implementing virtualization",
    },
    {
      id: generateId(),
      name: "Checkout bugfix",
      description: "Resolve issue with payment processing in checkout flow",
    },
  ],
  inProgress: [
    {
      id: generateId(),
      name: "User page – performance issues",
      description: "Optimize database queries for user profile page",
    },
    {
      id: generateId(),
      name: "Auth bugfix",
      description: "Fix authentication token expiration issue",
    },
  ],
  finished: [
    {
      id: generateId(),
      name: "Main page – performance issues",
      description: "Implemented caching for main page content",
    },
    {
      id: generateId(),
      name: "Main page bugfix",
      description: "Fixed layout issues on mobile devices",
    },
  ],
});

export const generateId = () =>
  Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
