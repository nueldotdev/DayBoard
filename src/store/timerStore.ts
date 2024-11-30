import { create } from 'zustand';

interface TimerState {
  minutes: number;
  seconds: number;
  isActive: boolean;
  isWorkSession: boolean;
  hasPreviousSession: boolean; // Indicates a previous active session
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  switchSession: () => void;
  decrementTime: () => void;
  initializeTimer: () => void; // Restore from `localStorage`
  continueSession: () => void; // Resume after reload
}

export const useTimerStore = create<TimerState>((set, get) => {
  let interval: number;

  /**
   * Saves the current state of the timer to `localStorage`.
   * Only saves non-computed properties: `minutes`, `seconds`, `isActive`, and `isWorkSession`.
   * @function
   * @private
   */
  const saveStateToLocalStorage = () => {
    const { minutes, seconds, isActive, isWorkSession, hasPreviousSession } = get();
    const timerState = { minutes, seconds, isActive, isWorkSession, hasPreviousSession };
    localStorage.setItem('timerState', JSON.stringify(timerState));
  };

  const initializeTimer = () => {
    const savedState = localStorage.getItem('timerState');
    if (savedState) {
      const { minutes, seconds, isActive, isWorkSession, hasPreviousSession } = JSON.parse(savedState);
      set({ 
        minutes, 
        seconds, 
        isActive, // Ensure the timer is not running on load
        isWorkSession, 
        hasPreviousSession // Show "Continue" only if the timer was active
      });
    }
  };

  const playSound = () => {
    // const audio = new Audio('/sounds/a_bell.wav');
    // audio.play();
    // audio.
  }

  const getNotif = () => {
    if (Notification.permission === 'granted') {
      new Notification('DayBoard', {
        body: get().isWorkSession ? 'Time for a break!' : 'Back to work!',
        icon: '/favicon.ico',
      });
    } else if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }

  const startTimer = () => {
    playSound()
    getNotif()

    if (get().isActive) return; // Prevent multiple intervals
    set({ isActive: true, hasPreviousSession: false });
    saveStateToLocalStorage();

    interval = window.setInterval(() => {
      const { minutes, seconds, decrementTime, switchSession } = get();
      if (minutes === 0 && seconds === 0) {
        switchSession();
      } else {
        decrementTime();
      }
    }, 1000);
  };

  const continueSession = () => {
    set({ isActive: true, hasPreviousSession: false });
    startTimer(); // Resume the timer
  };

  const pauseTimer = () => {
    playSound()
    getNotif()

    clearInterval(interval);
    set({ isActive: false, hasPreviousSession: true });
    saveStateToLocalStorage();
  };

  const resetTimer = () => {
    playSound()
    getNotif()

    clearInterval(interval);
    set({ minutes: 1, seconds: 0, isActive: false, hasPreviousSession: false });
    localStorage.removeItem('timerState'); // Clear saved state
  };

  const switchSession = () => {
    clearInterval(interval);
    set((state) => ({
      isWorkSession: !state.isWorkSession,
      minutes: state.isWorkSession ? 1 : 1,
      seconds: 0,
      isActive: false,
      hasPreviousSession: false,
    }));

    // const audio = new Audio(soundFile);
    // audio.play();
    playSound()
    getNotif()


    saveStateToLocalStorage();
  };


  const decrementTime = () => {
    const { minutes, seconds } = get();
    if (seconds === 0) {
      set({ minutes: minutes - 1, seconds: 59 });
    } else {
      set({ seconds: seconds - 1 });
    }
    saveStateToLocalStorage();
  };

  return {
    minutes: 1,
    seconds: 0,
    isActive: false,
    isWorkSession: true,
    hasPreviousSession: false,
    startTimer,
    pauseTimer,
    resetTimer,
    switchSession,
    decrementTime,
    initializeTimer,
    continueSession,
  };
});
