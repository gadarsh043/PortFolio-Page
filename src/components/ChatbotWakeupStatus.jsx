import { useChatbotWakeup } from '@/hooks/useChatbotWakeup';
import './scss/chatbotWakeupStatus.scss';

const ChatbotWakeupStatus = () => {
  const { isWakingUp, isRecentlyWokenUp } = useChatbotWakeup();

  if (!isWakingUp && !isRecentlyWokenUp) {
    return null;
  }

  return (
    <div className="wakeup-status">
      {isWakingUp && (
        <div className="wakeup-indicator waking">
          <div className="wakeup-spinner"></div>
          <span>Waking up AI assistant...</span>
        </div>
      )}
      
      {isRecentlyWokenUp && !isWakingUp && (
        <div className="wakeup-indicator ready">
          <div className="ready-icon">✅</div>
          <span>AI assistant is ready!</span>
        </div>
      )}
    </div>
  );
};

export default ChatbotWakeupStatus; 