import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
	id: number;
	name: string;
	email: string;
	isFavorite: boolean;
}

interface UsersState {
	users: User[];
}

const loadFromLocalStorage = (): UsersState => {
	try {
		const serializedState = localStorage.getItem("usersState");
		if (serializedState === null) {
			return { users: [] };
		}
		return JSON.parse(serializedState);
	} catch (e) {
		console.warn("Ошибка при загрузке из localStorage", e);
		return { users: [] };
	}
};

const saveToLocalStorage = (state: UsersState) => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem("usersState", serializedState);
	} catch (e) {
		console.warn("Ошибка при сохранении в localStorage", e);
	}
};

const initialState: UsersState = loadFromLocalStorage();

const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		addUser(state, action: PayloadAction<User>) {
			state.users = [...state.users, action.payload];
			saveToLocalStorage(state);
		},
		removeUser(state, action: PayloadAction<{ id: number }>) {
			state.users = state.users.filter((user) => user.id !== action.payload.id);
			saveToLocalStorage(state);
		},
		toggleFavoriteUser(state, action: PayloadAction<{ id: number }>) {
			const user = state.users.find((user) => user.id === action.payload.id);
			if (user) {
				user.isFavorite = !user.isFavorite;
				saveToLocalStorage(state);
			}
		},
	},
});

export const { addUser, removeUser, toggleFavoriteUser } = usersSlice.actions;

const store = configureStore({
	reducer: {
		users: usersSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
