import { createSlice } from "@reduxjs/toolkit";


export const CallStatesProps = {
    CALL_UNAVAILABLE: 'CALL_UNAVAILABLE',
    CALL_AVAILABLE: 'CALL_AVAILABLE',
    CALL_REQUESTED: 'CALL_REQUESTED',
    CALL_IN_PROGRESS: 'CALL_IN_PROGRESS'
};
export interface CommentsBlogDetailSlideProps {
    localStream: MediaStream | null;
    remoteStream: MediaStream | null;
    callState: 'CALL_UNAVAILABLE' | 'CALL_AVAILABLE' | 'CALL_REQUESTED' | 'CALL_IN_PROGRESS'
    message: string
}
const initialState: CommentsBlogDetailSlideProps = {
    localStream: null,
    remoteStream: null,
    callState: 'CALL_AVAILABLE',
    message: ''
};
export const counterSlice = createSlice({
    name: "streamCall",
    initialState,
    reducers: {
        setLocalStreamRDHandle: (state, action) => {
            state.localStream = action.payload;
        },
        setRemoteStreamRDHandle: (state, action) => {
            state.localStream = action.payload;
        },
        setCallStateRDHandle: (state, action) => {
            state.callState = action.payload;
        },
        setMessageRDHandle: (state, action) => {
            state.message = action.payload;
        },
    },
});

export const {
    setLocalStreamRDHandle,
    setRemoteStreamRDHandle,
    setCallStateRDHandle,
    setMessageRDHandle
} = counterSlice.actions;

export default counterSlice.reducer;
