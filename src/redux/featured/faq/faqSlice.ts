import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import { IFaq, IFaqState } from '@/types/faq';



const initialState: IFaqState = {
  faqs: [],
  singleFaq: null,
};

const faqSlice = createSlice({
  name: 'faqs',
  initialState,
  reducers: {
    setFaqs: (state, action: PayloadAction<IFaq[]>) => {
      state.faqs = action.payload;
    },
    setSingleFaq: (state, action: PayloadAction<IFaq>) => {
      state.singleFaq = action.payload;
    }
  },
});

export const { setFaqs, setSingleFaq } = faqSlice.actions;

// selectors
export const selectAllFaqs = (state: RootState) => state.faqs.faqs;
export const selectSingleFaq = (state: RootState) => state.faqs.singleFaq;

export default faqSlice.reducer;
