import React, { useEffect, useState } from "react";
import UserList from "./components/UserList";
import AddUserForm from "./components/AddUserForm";

const App: React.FC = () => {
	const [darkMode, setDarkMode] = useState(
		localStorage.getItem("darkMode") === null
			? window.matchMedia("(prefers-color-scheme: dark)").matches
			: localStorage.getItem("darkMode") === "true"
	);

	useEffect(() => {
		localStorage.setItem("darkMode", darkMode.toString());
	}, [darkMode]);

	return (
		<div
			className={`min-h-screen ${
				darkMode ? "darkmode bg-gray-900" : "lightmode bg-gray-100"
			} transition duration-300`}
		>
			<header className="flex justify-between items-center p-6">
				<h1
					className={`text-3xl font-bold ${
						darkMode ? "text-white" : "text-gray-800"
					}`}
				>
					User Management
				</h1>
				<button
					onClick={() => setDarkMode(!darkMode)}
					className={`px-4 py-2 rounded ${
						darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-800"
					}`}
				>
					Toggle Theme
				</button>
			</header>
			<main className="p-6">
				<AddUserForm />
				<UserList />
			</main>
		</div>
	);
};

export default App;
