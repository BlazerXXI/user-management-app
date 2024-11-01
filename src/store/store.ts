import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Используем localStorage для хранения
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Определяем тип пользователя
export interface User {
	id: number;
	name: string;
	email: string;
	isFavorite: boolean;
}

// Определяем начальное состояние
interface UsersState {
	users: User[];
}

// Начальное состояние
const initialState: UsersState = {
	users: [],
};

// Создаём slice
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

// Экспортируем действия
export const { addUser, removeUser, toggleFavoriteUser, updateUser } =
	usersSlice.actions;

// Настраиваем хранилище
const persistConfig = {
	key: "root",
	storage,
};

const persistedReducer = persistReducer(persistConfig, usersSlice.reducer);

// Создаём Redux Store
export const store = configureStore({
	reducer: {
		users: persistedReducer,
	},
});

// Создаём persistor
export const persistor = persistStore(store);

// Определяем тип корневого состояния
export type RootState = ReturnType<typeof store.getState>;

export default store;
