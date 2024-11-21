import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";

export interface User {
	id: number;
	name: string;
	email: string;
	phone: string;
	description: string;
	isFavorite: boolean;
}

interface UsersState {
	users: User[];
}

const initialState: UsersState = {
	users: [],
};

const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		addUser: (state, action: PayloadAction<User>) => {
			state.users.push(action.payload);
		},
		removeUser: (state, action: PayloadAction<{ id: number }>) => {
			state.users = state.users.filter((user) => user.id !== action.payload.id);
		},
		toggleFavoriteUser: (state, action: PayloadAction<{ id: number }>) => {
			const user = state.users.find((user) => user.id === action.payload.id);
			if (user) {
				user.isFavorite = !user.isFavorite;
			}
		},
		updateUser: (state, action: PayloadAction<User>) => {
			const index = state.users.findIndex(
				(user) => user.id === action.payload.id
			);
			if (index !== -1) {
				state.users[index] = action.payload;
			}
		},
	},
});

export const { addUser, removeUser, toggleFavoriteUser, updateUser } =
	usersSlice.actions;

const persistConfig = {
	key: "root",
	storage,
};

const persistedReducer = persistReducer(persistConfig, usersSlice.reducer);

export const store = configureStore({
	reducer: {
		theme: themeReducer,
		users: persistedReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export default store;
