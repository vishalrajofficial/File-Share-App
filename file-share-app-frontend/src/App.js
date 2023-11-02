import './App.css';
import './styles/uploader.css'
import './styles/home.css'
import { Route, Routes } from "react-router-dom"
import Home from "./screens/Home"
import Getfile from './screens/Getfile';
import { useEffect } from 'react';
import axios from 'axios';

function App() {

	useEffect(() => {
		setInterval(() => {
			axios.get('https://farmartbackend.fly.dev/api/').then((res) => {
				console.log(res.data)
			}).catch((err) => {
				console.log(err)
			})
		}, 600000)
	}, [])

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
