import cx from "classnames";

interface IButton {
	type?: "button" | "submit" | "reset";
	className?: string;
	bg?: "blue" | "green" | "red" | "orange" | string;
	color?: string;
	onClick?: () => void;
	children: React.ReactNode;
}

const Button = (props: IButton) => {
	const { type, className, bg, color, onClick, children } = props;
	return (
		<button
			type={type || "button"}
			className={cx(
				`bg-${bg || "blue"}-500 text-${
					color || "white"
				} px-4 py-2 rounded hover:bg-${
					bg || "blue"
				}-600 transition duration-200 flex items-center justify-center`,
				className
			)}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default Button;
