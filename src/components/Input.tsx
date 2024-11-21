import cx from "classnames";
import React from "react";

interface IInput {
	value: string;
	type: string;
	id: string;
	onChange?: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
	darkMode?: boolean;
	className?: string;
	placeholder?: string;
	required?: boolean;
	label?: string;
	autoComplete?: string;
	textarea?: boolean;
	name?: string;
}

const Input = (props: IInput) => {
	const {
		value,
		type,
		id,
		onChange,
		darkMode,
		className,
		placeholder,
		required,
		label,
		autoComplete,
		textarea,
		name,
	} = props;
	return (
		<>
			{label && (
				<label
					className={`${darkMode ? "text-white" : "text-gray-700 "} mb-2`}
					htmlFor={id}
				>
					{label}
				</label>
			)}
			{textarea ? (
				<textarea
					id={id}
					value={value}
					onChange={(e) =>
						onChange?.(e as React.ChangeEvent<HTMLTextAreaElement>)
					}
					autoComplete={autoComplete || "on"}
					className={cx(
						`p-2 rounded bg-white ${
							darkMode
								? "text-white bg-opacity-15"
								: "text-black bg-opacity-100 border"
						}`,
						className
					)}
					placeholder={placeholder}
					required={required}
					name={name}
				></textarea>
			) : (
				<input
					type={type}
					id={id}
					value={value}
					onChange={(e) => onChange?.(e as React.ChangeEvent<HTMLInputElement>)}
					autoComplete={autoComplete || "on"}
					className={cx(
						`p-2 rounded bg-white  ${
							darkMode
								? "text-white bg-opacity-15"
								: "text-black bg-opacity-100 border"
						}`,
						className
					)}
					placeholder={placeholder}
					required={required}
				/>
			)}
		</>
	);
};

export default Input;
