import React, { useState } from "react";
import { User as UserType } from "../store/store";
import { toast } from "react-toastify";

interface UserProps {
	user: UserType;
	darkMode: boolean;
	onRemove: (userId: number) => void;
	onFavorite: (userId: number) => void;
	onUpdate: (user: UserType) => void;
}

const User: React.FC<UserProps> = ({
	user,
	darkMode,
	onRemove,
	onFavorite,
	onUpdate,
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editedName, setEditedName] = useState(user.name);
	const [editedEmail, setEditedEmail] = useState(user.email);
	const [editedPhone, setEditedPhone] = useState(user.phone);
	const [update, setUpdate] = useState(false);

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleSaveClick = () => {
		onUpdate({
			...user,
			name: editedName,
			email: editedEmail,
			phone: editedPhone,
		});
		setUpdate(true);
		setTimeout(() => {
			setIsEditing(false);
			setUpdate(false);
		}, 1500);
	};

	const handleBlur = (e: React.FocusEvent) => {
		if (!e.currentTarget.contains(e.relatedTarget)) {
			handleSaveClick();
		}
	};

	return (
		<div
			onBlur={handleBlur}
			onKeyDown={(e) => e.key === "Enter" && handleSaveClick()}
			className={`flex flex-col rounded-lg shadow-lg p-4 mb-4 bg-white  ${
				darkMode ? "text-white bg-opacity-15" : "text-gray-800 bg-opacity-100"
			}`}
		>
			<div className="flex justify-between border-b-2 border-gray-200 pb-2">
				<form onSubmit={handleSaveClick} className="flex flex-col gap-4">
					{isEditing ? (
						<input
							type="text"
							value={editedName}
							onChange={(e) => setEditedName(e.target.value)}
							className={`text-xl bg-white  ${
								darkMode ? "text-white bg-opacity-15" : "text-gray-800"
							}`}
						/>
					) : (
						<h3
							onClick={handleEditClick}
							className="text-xl font-semibold cursor-pointer"
						>
							{user.name}
						</h3>
					)}
					{isEditing ? (
						<input
							className={`text-xl bg-white  ${
								darkMode ? "text-white bg-opacity-15" : "text-gray-800"
							}`}
							type="email"
							value={editedEmail}
							onChange={(e) => setEditedEmail(e.target.value)}
						/>
					) : (
						<p onClick={handleEditClick} className=" cursor-pointer">
							{user.email}
						</p>
					)}
					{isEditing ? (
						<input
							className={`text-xl bg-white  ${
								darkMode ? "text-white bg-opacity-15" : "text-gray-800"
							}`}
							type="tel"
							value={editedPhone}
							onChange={(e) => setEditedPhone(e.target.value)}
						/>
					) : (
						<p onClick={handleEditClick} className=" cursor-pointer">
							{user.phone}
						</p>
					)}
				</form>
				<div>
					<p>
						{new Date(user.id).toLocaleDateString()}{" "}
						<span>
							{new Date(user.id).toLocaleTimeString([], {
								hour: "2-digit",
								minute: "2-digit",
							})}
						</span>
					</p>
				</div>
			</div>
			<div className="flex justify-between mt-4">
				<button
					type="button"
					onClick={() => onFavorite(user.id)}
					className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition duration-200 flex items-center"
				>
					{user.isFavorite ? "⭐ Unfavorite" : "Favorite"}
				</button>
				{isEditing && (
					<button
						type="button"
						onClick={handleSaveClick}
						className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200 flex items-center"
					>
						{update ? (
							<>
								💾 Updating...
								<span className="animate-spin h-5 w-5 border-b-2 border-white rounded-full mx-2"></span>
							</>
						) : (
							"💾 Save"
						)}
					</button>
				)}
				<button
					type="button"
					onClick={() => onRemove(user.id)}
					className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200 flex items-center"
				>
					🗑 Remove
				</button>
			</div>
		</div>
	);
};

export default User;
