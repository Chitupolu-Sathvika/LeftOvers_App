"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDonation = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    donations: [],
};
const donationsSlice = (0, toolkit_1.createSlice)({
    name: 'donations',
    initialState,
    reducers: {
        addDonation: (state, action) => {
            state.donations.push(action.payload);
        },
    },
});
exports.addDonation = donationsSlice.actions.addDonation;
exports.default = donationsSlice.reducer;
