import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        targetUserId: null
    },
    reducers: {
        setTargetUserId: (state, action) => {
            state.targetUserId = action.payload
        }
    }
})

export const { setTargetUserId } = chatSlice.actions
export default chatSlice.reducer