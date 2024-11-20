interface IHeader {
	setDarkMode: (value: boolean) => void;
	darkMode: boolean;
}

const Header = (props: IHeader) => {
	const { setDarkMode, darkMode } = props;
	return (
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
				{darkMode ? (
					<img width={20} className="h-5" src="./sun.svg" alt="sun" />
				) : (
					<img width={20} className="h-5" src="./moon-solid.svg" alt="moon" />
				)}
			</button>
		</header>
	);
};

export default Header;
