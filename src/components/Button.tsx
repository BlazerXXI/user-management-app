import cx from "classnames";

interface IButton {
	type?: "button" | "submit" | "reset";
	className?: string;
	theme?: "red" | "blue" | "green" | "orange" | "gray" | "white" | "black";
	onClick?: () => void;
	children: React.ReactNode;
}

const Button: React.FC<IButton> = ({
	type = "button",
	className,
	theme = "blue",
	onClick,
	children,
}) => {
	const themeClasses = {
		blue: "bg-blue-500 hover:bg-blue-600 text-white",
		red: "bg-red-500 hover:bg-red-600 text-white",
		green: "bg-green-500 hover:bg-green-600 text-white",
		orange: "bg-orange-500 hover:bg-orange-600 text-white",
		gray: "bg-gray-300 hover:bg-gray-400 text-black",
		white: "bg-white hover:bg-gray-100 text-black",
		black: "bg-black hover:bg-gray-800 text-white",
	};

	return (
		<button
			type={type}
			className={cx(
				"px-4 py-2 rounded transition duration-200 flex items-center justify-center",
				themeClasses[theme],
				className
			)}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default Button;

