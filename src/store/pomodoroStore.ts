import {create} from 'zustand';

interface PomodoroState {
  minutes: number;
  seconds: number;
  isActive: boolean;
  isWorkSession: boolean;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  switchSession: () => void;
  setTimer: (minutes: number, seconds: number) => void;
}

export const usePomodoroStore = create<PomodoroState>((set) => ({
  minutes: 25,
  seconds: 0,
  isActive: false,
  isWorkSession: true,
  startTimer: () => set({ isActive: true }),
  pauseTimer: () => set({ isActive: false }),
  resetTimer: () => set({ isActive: false, minutes: 25, seconds: 0, isWorkSession: true }),
  switchSession: () => set((state) => {
    const nextSession = state.isWorkSession ? 5 : 25; // Short break if work session is active, and vice versa
    return { minutes: nextSession, seconds: 0, isWorkSession: !state.isWorkSession };
  }),
  setTimer: (minutes: number, seconds: number) => set({ minutes, seconds })
}));
