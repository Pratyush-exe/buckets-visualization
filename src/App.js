import './App.css';
import Controller from './Components/Controller/Controller';
import { useState } from 'react';

function App() {
  const [visualizationData, setVisualizationData] = useState([])
  return (
    <div className="App">
      <Controller setVisualizationData={setVisualizationData}/>
    </div>
  );
}

export default App;
