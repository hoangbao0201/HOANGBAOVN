import { createSlice } from "@reduxjs/toolkit";

interface ButtonActionProps {
    nameButtonAction: string;
}
const initialState: ButtonActionProps = {
    nameButtonAction: "",
};

export const counterSlice = createSlice({
    name: "buttonAction",
    initialState,
    reducers: {
        setButonLoadingRDHandle: (state, action) => {
            state.nameButtonAction = action.payload;
        },
    },
});

export const { setButonLoadingRDHandle } = counterSlice.actions;

export default counterSlice.reducer;
