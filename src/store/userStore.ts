import { create } from 'zustand';


export type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  date_joined: string;
  last_login: string;
  is_verified: boolean;
  is_admin: boolean;
  focus_streak: number;
  longest_focus_streak: number;
  total_time: number;
  mins_for_streak: number;
  user_type: string;
}


export interface UserState {
  user: User;
  setUser: (user: User) => void; 
}

export const useUserStore = create<UserState>((set) => ({
  user: {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    date_joined: '',
    last_login: '',
    is_verified: false,
    is_admin: false,
    focus_streak: 0,
    longest_focus_streak: 0,
    total_time: 0,
    mins_for_streak: 0,
    user_type: ''
  },
  setUser: (user) => set({ user })
}));