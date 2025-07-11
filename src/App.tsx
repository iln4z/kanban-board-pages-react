import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import Main from "./components/main/main";
import TaskDetails from "./components/task-details/task-details";
import { KanbanStateProvider } from "./components/context/kanban-context";

function App() {
  return (
    <KanbanStateProvider>
      <Router basename="/kanban-board-pages-react">
        <div>
          <header>
            <Header />
          </header>
          <main>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/tasks/:taskId" element={<TaskDetails />} />
            </Routes>
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
      </Router>
    </KanbanStateProvider>
  );
}

export default App;