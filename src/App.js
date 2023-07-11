import { Route } from 'react-router-dom';
import './App.css';
import Homepage from './Pages/Homepage'
import TaskPage from './Pages/TaskPage'
function App() {
  return (
    <div className="App">
      <Route path="/" component={Homepage} exact />
      <Route path="/task" component={TaskPage} />
    </div>
  );
}

export default App;
