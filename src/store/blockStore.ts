import {create} from 'zustand'

export interface Block {
  id: number;
  name: string;
  allocated_time: {
    hours: 0, mins: 0, secs: 0
  };
}