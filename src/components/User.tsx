import React from "react";
import { User as UserType } from "../store/store";

interface UserProps {
	user: UserType;
	onRemove: (userId: number) => void;
	onFavorite: (userId: number) => void;
}

const User: React.FC<UserProps> = ({ user, onRemove, onFavorite }) => {
	return (
		<div className="flex flex-col bg-white rounded-lg shadow-lg p-4 mb-4">
			<div className="flex justify-between border-b-2 border-gray-200 pb-2">
				<h3 className="text-xl font-semibold text-gray-800">{user.name}</h3>
				<p className="text-gray-600">{user.email}</p>
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
