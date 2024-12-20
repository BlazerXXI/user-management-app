import React from "react";
import UserList from "./components/UserList";
import AddUserForm from "./components/AddUserForm";
import Header from "./components/Header";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store/store";
import { toggleTheme } from "./store/themeSlice";
import { ToastContainer } from "react-toastify";

const App: React.FC = () => {
	const darkMode = useSelector((state: RootState) => state.theme.darkMode);
	const dispatch = useDispatch();

	return (
		<div
			className={`min-h-screen ${
				darkMode ? "darkmode bg-gray-900" : "lightmode bg-gray-100"
			} transition duration-300`}
		>
			<div className="container mx-auto">
				<Header
					setDarkMode={() => dispatch(toggleTheme())}
					darkMode={darkMode}
				/>
				<main className="p-6">
					<AddUserForm darkMode={darkMode} />
					<UserList darkMode={darkMode} />
				</main>
			</div>
			<ToastContainer
				closeOnClick
				position="top-center"
				limit={1}
				theme={darkMode ? "dark" : "light"}
				autoClose={1500}
				hideProgressBar
			/>
		</div>
	);
};

export default App;
