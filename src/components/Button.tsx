import cx from "classnames";

interface IButton {
	type?: "button" | "submit" | "reset";
	className?: string;
	theme?: "red" | "blue" | "green" | "orange" | "gray" | "white" | "black";
	onClick?: () => void;
	children: React.ReactNode;
}

const Button = (props: IButton) => {
	const {
		type = "button",
		className,
		theme = "blue",
		onClick,
		children,
	} = props;
	return (
		<button
			type={type}
			className={cx(
				"px-4 py-2 rounded transition duration-200 flex items-center justify-center",
				{
					"bg-blue-500 hover:bg-blue-600 text-white": theme === "blue",
					"bg-red-500 hover:bg-red-600 text-white": theme === "red",
					"bg-green-500 hover:bg-green-600 text-white": theme === "green",
					"bg-orange-500 hover:bg-orange-600 text-white": theme === "orange",
					"bg-gray-300 hover:bg-gray-400 text-black": theme === "gray",
					"bg-white hover:bg-gray-100 text-black": theme === "white",
					"bg-black hover:bg-gray-800 text-white": theme === "black",
				},
				className
			)}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default Button;
