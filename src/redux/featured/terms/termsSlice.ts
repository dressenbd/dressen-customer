import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import { ITerm, ITermsState } from '@/types/terms';



const initialState: ITermsState = {
  terms: [],
  singleTerm: null,
};

const termsSlice = createSlice({
  name: 'terms',
  initialState,
  reducers: {
    setTerms: (state, action: PayloadAction<ITerm[]>) => {
      state.terms = action.payload;
    },
    setSingleTerm: (state, action: PayloadAction<ITerm>) => {
      state.singleTerm = action.payload;
    }
  },
});


export const { setTerms, setSingleTerm } = termsSlice.actions;


export const selectAllTerms = (state: RootState) => state.terms.terms;
export const selectSingleTerm = (state: RootState) => state.terms.singleTerm;


export default termsSlice.reducer;
