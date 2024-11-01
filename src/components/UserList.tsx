import React, { useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import {
	User as UserType,
	removeUser,
	toggleFavoriteUser,
} from "../store/store";
import User from "./User";

const UserList: React.FC = () => {
	const users = useSelector((state: RootState) => state.users.users);
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		console.log("User list updated:", users);
	}, [users]);

	const handleRemoveUser = (userId: number) => {
		dispatch(removeUser({ id: userId }));
	};
	const handleFavoriteUser = (userId: number) => {
		dispatch(toggleFavoriteUser({ id: userId }));
	};

	return (
		<div className="flex flex-col gap-4">
			<h2 className="text-2xl font-bold">User List</h2>
			{users.length > 0 ? (
				<ul>
					{[...users]
						.sort((a, b) => Number(b.isFavorite) - Number(a.isFavorite))
						.map((user: UserType) => (
							<li key={user.id}>
								<User
									user={user}
									onRemove={handleRemoveUser}
									onFavorite={handleFavoriteUser}
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
