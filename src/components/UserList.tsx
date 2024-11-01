import React, { useLayoutEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import {
	User as UserType,
	removeUser,
	toggleFavoriteUser,
	updateUser,
} from "../store/store";
import User from "./User";

const UserList: React.FC = () => {
	const users = useSelector((state: RootState) => state.users.users);
	const dispatch = useDispatch();

	const [searchQuery, setSearchQuery] = useState("");

	useLayoutEffect(() => {
		console.log("User list updated:", users);
	}, [users]);

	const handleRemoveUser = (userId: number) => {
		dispatch(removeUser({ id: userId }));
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
				<input
					type="text"
					placeholder="Search by name or email"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="border p-2 rounded  text-black w-full h-full"
				/>
				{searchQuery && (
					<i
						onClick={() => setSearchQuery("")}
						className="absolute font-bold top-1/2 transform -translate-y-1/2 right-2 cursor-pointer text-black"
					>
						X
					</i>
				)}
			</div>
			{filteredUsers.length > 0 ? (
				<ul>
					{filteredUsers
						.sort((a, b) => Number(b.isFavorite) - Number(a.isFavorite))
						.map((user: UserType) => (
							<li key={user.id}>
								<User
									user={user}
									onRemove={handleRemoveUser}
									onFavorite={handleFavoriteUser}
									onUpdate={handleUpdateUser}
								/>
							</li>
						))}
				</ul>
			) : (
				<p>No users found.</p>
			)}
		</div>
	);
};

export default UserList;
