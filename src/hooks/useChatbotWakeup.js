import { useState, useEffect } from 'react';
import { isChatbotWakingUp } from '@/services/chatbotWakeup';

/**
 * Custom hook to monitor chatbot wakeup status
 * Provides real-time status updates for better UX
 */
export const useChatbotWakeup = () => {
  const [isWakingUp, setIsWakingUp] = useState(false);
  const [lastWakeupTime, setLastWakeupTime] = useState(null);

  useEffect(() => {
    // Check wakeup status every second when actively waking up
    let interval;
    
    const checkStatus = () => {
      const currentlyWakingUp = isChatbotWakingUp();
      
      if (currentlyWakingUp !== isWakingUp) {
        setIsWakingUp(currentlyWakingUp);
        
        if (!currentlyWakingUp && isWakingUp) {
          // Wakeup just finished
          setLastWakeupTime(new Date());
        }
      }
    };

    if (isWakingUp) {
      interval = setInterval(checkStatus, 1000);
    } else {
      // Check less frequently when not waking up
      interval = setInterval(checkStatus, 5000);
    }

    // Initial check
    checkStatus();

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isWakingUp]);

  return {
    isWakingUp,
    lastWakeupTime,
    isRecentlyWokenUp: lastWakeupTime && (Date.now() - lastWakeupTime.getTime()) < 60000 // Within last minute
  };
}; 