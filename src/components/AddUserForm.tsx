import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../store/store";

const AddUserForm: React.FC = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const dispatch = useDispatch();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (name && email) {
			dispatch(
				addUser({
					name,
					email,
					id: Date.now(),
					isFavorite: false,
				})
			);
			setName("");
			setEmail("");
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="mb-6 p-4 bg-white rounded-lg shadow-md"
		>
			<h2 className="text-2xl font-semibold mb-4 text-black">Add User</h2>
			<div className="flex flex-col mb-4">
				<label className="text-gray-700 mb-2" htmlFor="name">
					Name
				</label>
				<input
					type="text"
					id="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="p-2 border border-gray-300 rounded text-black"
					placeholder="Enter name"
					required
				/>
			</div>
			<div className="flex flex-col mb-4">
				<label className="text-gray-700 mb-2" htmlFor="email">
					Email
				</label>
				<input
					type="email"
					id="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="p-2 border border-gray-300 rounded text-black"
					placeholder="Enter email"
					required
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
