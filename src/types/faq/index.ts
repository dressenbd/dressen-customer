export interface IFaq  {
  id: string;
  title: string;
  description: string;
  type: string;
  issuedBy: string;
};

export interface IFaqState {
  faqs: IFaq[];
  singleFaq: IFaq | null;
};
