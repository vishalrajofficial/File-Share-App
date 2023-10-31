import './App.css';
import './styles/uploader.css'
import './styles/home.css'
import { Route, Routes } from "react-router-dom"
import Home from "./screens/Home"
import Getfile from './screens/Getfile';

function App() {
  return (
    <div className='App'>
			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
      <Routes>
				<Route path="/:hash" element={<Getfile />} />
			</Routes>
		</div>
  );
}

export default App;
