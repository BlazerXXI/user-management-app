// store/themeSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
	darkMode: boolean;
}

const initialState: ThemeState = {
	darkMode:
		localStorage.getItem("darkMode") === null
			? window.matchMedia("(prefers-color-scheme: dark)").matches
			: localStorage.getItem("darkMode") === "true",
};

const themeSlice = createSlice({
	name: "theme",
	initialState,
	reducers: {
		toggleTheme(state) {
			state.darkMode = !state.darkMode;
			localStorage.setItem("darkMode", state.darkMode.toString());
		},
		setTheme(state, action: PayloadAction<boolean>) {
			state.darkMode = action.payload;
			localStorage.setItem("darkMode", state.darkMode.toString());
		},
	},
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
