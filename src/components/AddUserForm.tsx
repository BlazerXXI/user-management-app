import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../store/store";
import { toast } from "react-toastify";
import Input from "./Input";

interface IAddUserForm {
	darkMode: boolean;
}

const AddUserForm = (props: IAddUserForm) => {
	const { darkMode } = props;

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const dispatch = useDispatch();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (name && (email || phone)) {
			dispatch(
				addUser({
					name,
					description,
					email,
					phone,
					id: Date.now(),
					isFavorite: false,
				})
			);
			setName("");
			setEmail("");
			setPhone("");
			toast.success("User successfully added!");
		} else {
			toast.error("Please enter a name and at least one contact method");
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className={`mb-6 p-4 bg-white rounded-lg shadow-md   ${
				darkMode
					? "text-white bg-opacity-15"
					: "text-black bg-opacity-100 border"
			}`}
		>
			<h2
				className={`text-2xl font-semibold mb-4 ${
					darkMode ? "text-white" : "text-gray-800"
				}`}
			>
				Add User
			</h2>
			<div className="flex flex-col mb-4">
				<Input
					darkMode={darkMode}
					id="name"
					type="text"
					autoComplete="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="Enter name"
				/>
			</div>
			<div className="flex flex-col mb-4">
				<Input
					className="resize-none"
					textarea
					darkMode={darkMode}
					id="description"
					type="text"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					placeholder="Enter description"
				/>
			</div>
			<div className="flex flex-col mb-4">
				<Input
					darkMode={darkMode}
					autoComplete="on"
					type="email"
					id="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Enter email"
				/>
			</div>
			<div className="flex items-center justify-center mb-4">
				<hr className="w-1/3 border-t-2 border-gray-300" />
				<p
					className={`px-4 text-gray-700 ${
						darkMode ? "text-white" : "text-gray-700"
					}`}
				>
					OR
				</p>
				<hr className="w-1/3 border-t-2 border-gray-300" />
			</div>
			<div className="flex flex-col mb-4">
				<Input
					darkMode={darkMode}
					type="phone"
					id="phone"
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
					placeholder="Enter phone"
				/>
			</div>
			<button
				type="submit"
				className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
			>
				Add User
			</button>
		</form>
	);
};

export default AddUserForm;
