import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Donation {
  type: 'NGO' | 'Farmer';
  amount: number;
  description: string;
}

interface DonationsState {
  donations: Donation[];
}

const initialState: DonationsState = {
  donations: [],
};

const donationsSlice = createSlice({
  name: 'donations',
  initialState,
  reducers: {
    addDonation: (state: { donations: any[]; }, action: PayloadAction<Donation>) => {
      state.donations.push(action.payload);
    },
  },
});

export const { addDonation } = donationsSlice.actions;

export default donationsSlice.reducer;
