import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import {
	User as UserType,
	removeUser,
	toggleFavoriteUser,
	updateUser,
} from "../store/store";
import User from "./User";
import ReactModal from "react-modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "./Input";
import Button from "./Button";

ReactModal.setAppElement("#root");

interface IUserList {
	darkMode: boolean;
}

const UserList = (props: IUserList) => {
	const { darkMode } = props;

	const users = useSelector((state: RootState) => state.users.users);
	const dispatch = useDispatch();

	const [searchQuery, setSearchQuery] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [userToDelete, setUserToDelete] = useState<number | null>(null);

	const handleRemoveUser = (userId: number) => {
		setIsModalOpen(true);
		setUserToDelete(userId);
	};

	const confirmRemoveUser = () => {
		if (userToDelete !== null) {
			dispatch(removeUser({ id: userToDelete }));
			toast.success("User successfully removed!");
		}
		setIsModalOpen(false);
		setUserToDelete(null);
	};

	const handleFavoriteUser = (userId: number) => {
		dispatch(toggleFavoriteUser({ id: userId }));
	};

	const handleUpdateUser = (user: UserType) => {
		dispatch(updateUser(user));
	};

	const filteredUsers = users.filter((user) => {
		const fullName = user.name.toLowerCase();
		const email = user.email.toLowerCase();
		return (
			fullName.includes(searchQuery.toLowerCase()) ||
			email.includes(searchQuery.toLowerCase())
		);
	});

	return (
		<div className="flex flex-col gap-4">
			<h2 className="text-2xl font-bold">User List</h2>
			<div className="w-full relative mb-4">
				<Input
					type="text"
					placeholder="Search by name or email"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					id={"search"}
					autoComplete="searchQuery"
					className="w-full"
					darkMode={darkMode}
				/>
				{searchQuery && (
					<i
						onClick={() => setSearchQuery("")}
						className={`absolute font-bold top-1/2 transform -translate-y-1/2 right-2 cursor-pointer ${
							darkMode ? "text-white" : "text-black"
						}`}
					>
						X
					</i>
				)}
			</div>
			{filteredUsers.length > 0 ? (
				<ul>
					{filteredUsers
						.sort(
							(a, b) =>
								Number(b.isFavorite) - Number(a.isFavorite) ||
								a.name.localeCompare(b.name)
						)
						.map((user: UserType) => (
							<li key={user.id}>
								<User
									darkMode={darkMode}
									user={user}
									onRemove={handleRemoveUser}
									onFavorite={handleFavoriteUser}
									onUpdate={handleUpdateUser}
								/>
							</li>
						))}
				</ul>
			) : (
				<div className="flex flex-col justify-center items-center">
					<p>No users found.</p>
				</div>
			)}
			<ReactModal
				isOpen={isModalOpen}
				onRequestClose={() => setIsModalOpen(false)}
				className="bg-white p-6 rounded shadow-md max-w-md mx-auto mt-20 "
				overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
			>
				<h3 className="text-xl font-semibold mb-4">
					Are you sure you want to delete this user?
				</h3>
				<div className="flex justify-end gap-4">
					<Button
						type="button"
						onClick={() => setIsModalOpen(false)}
						className=" bg-gray-300 hover:bg-gray-400"
						color="black"
					>
						Cancel
					</Button>
					<Button type="button" onClick={confirmRemoveUser} bg="red">
						Delete
					</Button>
				</div>
			</ReactModal>
		</div>
	);
};

export default UserList;
