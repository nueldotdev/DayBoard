// import { m } from 'framer-motion';
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
  // continueSession: () => void; // Resume after reload
  setMinutes: (minutes: number) => void;
  setSeconds: (seconds: number) => void; 
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


  let audioInstance: HTMLAudioElement | null = null; // Global audio instance

  const playSound = (file?: string) => {
    const root = file || 'default.mp3';
  
    if (!audioInstance) {
      // Create the global audio instance if it doesn't already exist
      audioInstance = new Audio(`/sounds/timer_sounds/${root}`);
    } else {
      // Update the audio source if needed
      audioInstance.src = `/sounds/timer_sounds/${root}`;
      audioInstance.load();
    }
  
    const stopAll = () => {
      if (audioInstance) {
        audioInstance.pause();
        audioInstance.currentTime = 0;
        audioInstance.loop = false;
      }
    };
  
    const stop = () => {
      if (audioInstance) {
        audioInstance.pause();
      }
    };
  
    const play = () => {
      stopAll();
      if (audioInstance) {
        audioInstance.play();
      }
    };
  
    const playInLoop = () => {
      stopAll();
      if (audioInstance) {
        audioInstance.loop = true;
        audioInstance.play();
      }
    };
  
    return {
      play,
      stop,
      stopAll,
      playInLoop,
    };
  };
  
  const getNotif = (type: string) => {
    if (Notification.permission === 'granted') {
      new Notification('DayBoard', {
        body: type,
        icon: '/dayboard-dark.svg',
      });
    } else if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  };
  
  const startTimer = () => {
    playSound('default.mp3').playInLoop(); // Plays ticking sound in a loop
    getNotif('Time to work!');
  
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
  
  const pauseTimer = () => {
    playSound().stopAll(); // Stops all audio
    playSound('ending_sound.mp3').play(); // Plays pause sound
    getNotif('Timer has been paused');
  
    clearInterval(interval);
    set({ isActive: false, hasPreviousSession: true });
    saveStateToLocalStorage();
  };
  
  const resetTimer = () => {
    playSound().stopAll(); // Stops all audio
    getNotif('Timer has been reset');
  
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
  
    playSound().stopAll(); // Stops ticking sound
    playSound('ending_sound.mp3').play(); // Plays ending sound
    getNotif('Time for a break!');
  
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
    // continueSession,
    setMinutes: (minutes: number) => set({ minutes }),
    setSeconds: (seconds: number) => set({ seconds }),
  };
});
