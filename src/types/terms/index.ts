


export interface ITerm  {
  _id: string;
  title: string;
  description: string;
  type: string;
};

export interface ITermsState {
  terms: ITerm[];
  singleTerm: ITerm | null;
};