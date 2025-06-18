import './App.css';
import './styles/uploader.css'
import './styles/home.css'
import './styles/landing.css'
import './styles/auth.css'
import './styles/dashboard.css'
import { Route, Routes } from "react-router-dom"
import Landing from "./screens/Landing"
import Home from "./screens/Home"
import Getfile from './screens/Getfile';
import Login from './screens/Login';
import Register from './screens/Register';
import Dashboard from './screens/Dashboard';
import { useEffect } from 'react';
import axios from 'axios';

function App() {

	useEffect(() => {
		// Keep the backend alive with periodic pings
		setInterval(() => {
			axios.get('https://farmartbackend.fly.dev/api/').then((res) => {
				console.log('Backend keepalive:', res.data)
			}).catch((err) => {
				console.log('Backend keepalive error:', err)
			})
		}, 600000)
	}, [])

  return (
    <div className='App'>
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/upload" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/:hash" element={<Getfile />} />
			</Routes>
		</div>
  );
}

export default App;
