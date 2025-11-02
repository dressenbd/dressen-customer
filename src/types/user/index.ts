/* eslint-disable @typescript-eslint/no-explicit-any */
type TUserRoles =
  | 'customer'
  | 'vendor'
  | 'vendor-staff'
  | 'admin'
  | 'admin-staff'
  | 'super-admin';

type TGender = 'male' | 'female' | 'other';

type TUserStatus = 'active' | 'banned';

export interface IUser {
  id?: string;
  _id: string;
  name: string;
  email: string;
  password?: string;
  role?: TUserRoles;
  gender?: TGender;
  contactNo?: string;
  bio?: string;
  status?: TUserStatus;
  walletPoint?: number;
  socials?: string[];
  cardInfo?: any | null;
  image?: string;
}
