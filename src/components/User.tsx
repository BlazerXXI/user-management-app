import React, { useState } from "react";
import { User as UserType } from "../store/store";
import Input from "./Input";
import EmptyData from "./EmptyData";

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
	const [editedDescription, setEditedDescription] = useState(user.description);
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
			description: editedDescription,
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
			<div className="flex max-md:flex-col gap-4 justify-between border-b-2 border-gray-200 pb-2">
				<form onSubmit={handleSaveClick} className="flex flex-col gap-4">
					{isEditing ? (
						<Input
							placeholder="Fill Name..."
							darkMode={darkMode}
							type="text"
							autoComplete="name"
							value={editedName}
							onChange={(e) => setEditedName(e.target.value)}
							id="name"
						/>
					) : (
						<h3
							onClick={handleEditClick}
							className="text-xl font-semibold cursor-pointer"
						>
							{user.name || <EmptyData>Fill Name...</EmptyData>}
						</h3>
					)}
					{isEditing ? (
						<Input
							placeholder="Fill Email..."
							darkMode={darkMode}
							type="email"
							autoComplete="email"
							onChange={(e) => setEditedEmail(e.target.value)}
							value={editedEmail}
							id={"email"}
						/>
					) : (
						<p onClick={handleEditClick} className=" cursor-pointer">
							{user.email || <EmptyData>Fill Email...</EmptyData>}
						</p>
					)}
					{isEditing ? (
						<Input
							placeholder="Fill Phone Number..."
							darkMode={darkMode}
							type="tel"
							value={editedPhone}
							onChange={(e) => setEditedPhone(e.target.value)}
							id={"tel"}
						/>
					) : (
						<p onClick={handleEditClick} className=" cursor-pointer">
							{user.phone || <EmptyData>Fill Phone Number...</EmptyData>}
						</p>
					)}
				</form>
				<div className="md:w-1/2">
					{isEditing ? (
						<Input
							textarea
							placeholder="Fill Description..."
							darkMode={darkMode}
							type="richtext"
							className="w-full h-full max-md:h-80"
							value={editedDescription}
							onChange={(e) => setEditedDescription(e.target.value)}
							id={"description"}
						/>
					) : (
						<p onClick={handleEditClick} className="cursor-pointer">
							{user.description || <EmptyData>Fill Description...</EmptyData>}
						</p>
					)}
				</div>
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
			<div className="flex justify-between gap-1 mt-4 text-sm">
				<button
					type="button"
					onClick={() => onFavorite(user.id)}
					className="bg-orange-500 text-white max-md:w-1/3 px-2 py-2 rounded hover:bg-orange-600 transition duration-200 flex items-center"
				>
					{user.isFavorite ? "⭐ Unfavorite" : "Favorite"}
				</button>
				{isEditing && (
					<button
						type="button"
						onClick={handleSaveClick}
						className="bg-green-500 text-white max-md:w-1/3 px-2 py-2 rounded hover:bg-green-600 transition duration-200 flex items-center"
					>
						{update ? (
							<>
								<span className="max-md:hidden">💾 Updating...</span>
								<span className="animate-spin h-2 w-2 md:h-5 md:w-5 border-b-2 border-white rounded-full mx-2"></span>
							</>
						) : (
							"💾 Save"
						)}
					</button>
				)}
				<button
					type="button"
					onClick={() => onRemove(user.id)}
					className="bg-red-500 text-white max-md:w-1/3 px-2 py-2 rounded hover:bg-red-600 transition duration-200 flex items-center"
				>
					🗑 Remove
				</button>
			</div>
		</div>
	);
};

export default User;
