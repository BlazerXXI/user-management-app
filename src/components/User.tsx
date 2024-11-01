import React, { useState } from "react";
import { User as UserType } from "../store/store";

interface UserProps {
	user: UserType;
	onRemove: (userId: number) => void;
	onFavorite: (userId: number) => void;
	onUpdate: (user: UserType) => void; // Добавим функцию для обновления
}

const User: React.FC<UserProps> = ({
	user,
	onRemove,
	onFavorite,
	onUpdate,
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editedName, setEditedName] = useState(user.name);
	const [editedEmail, setEditedEmail] = useState(user.email);

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleSaveClick = () => {
		onUpdate({ ...user, name: editedName, email: editedEmail });
		setIsEditing(false);
	};

	return (
		<div className="flex flex-col bg-white rounded-lg shadow-lg p-4 mb-4">
			<div className="flex justify-between border-b-2 border-gray-200 pb-2">
				{isEditing ? (
					<input
						type="text"
						value={editedName}
						onChange={(e) => setEditedName(e.target.value)}
						className="text-xl font-semibold text-gray-800"
					/>
				) : (
					<h3
						onClick={handleEditClick}
						className="text-xl font-semibold text-gray-800 cursor-pointer"
					>
						{user.name}
					</h3>
				)}
				{isEditing ? (
					<input
						type="text"
						value={editedEmail}
						onChange={(e) => setEditedEmail(e.target.value)}
						className="text-gray-600"
					/>
				) : (
					<p onClick={handleEditClick} className="text-gray-600 cursor-pointer">
						{user.email}
					</p>
				)}
			</div>
			<div className="flex justify-between mt-4">
				<button
					type="button"
					onClick={() => onFavorite(user.id)}
					className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition duration-200 flex items-center"
				>
					{user.isFavorite && "⭐"}
					Favorite
				</button>
				{isEditing && (
					<button
						type="button"
						onClick={handleSaveClick}
						className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200 flex items-center"
					>
						💾 Save
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
