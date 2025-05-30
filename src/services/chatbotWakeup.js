/**
 * Chatbot Wakeup Service
 * Preemptively wakes up the chatbot API when users visit the portfolio
 * to reduce cold start delays when they actually use the chat feature
 */

const CHATBOT_BASE_URL = 'https://personal-chatbot-q2wp.onrender.com';
const WAKEUP_TIMEOUT = 10000; // 10 seconds timeout
const RETRY_DELAY = 5000; // 5 seconds between retries
const MAX_RETRIES = 3;

class ChatbotWakeupService {
  constructor() {
    this.isWakingUp = false;
    this.wakeupPromise = null;
    this.retryCount = 0;
  }

  /**
   * Wake up the chatbot API by hitting the base URL
   * @returns {Promise<boolean>} True if successfully woken up, false otherwise
   */
  async wakeupChatbot() {
    if (this.isWakingUp) {
      return this.wakeupPromise;
    }

    this.isWakingUp = true;
    console.log('🤖 Waking up AI chatbot service...');

    this.wakeupPromise = this.performWakeup();
    
    try {
      const result = await this.wakeupPromise;
      return result;
    } finally {
      this.isWakingUp = false;
      this.wakeupPromise = null;
    }
  }

  /**
   * Perform the actual wakeup request
   * @returns {Promise<boolean>}
   */
  async performWakeup() {
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        console.log(`🔄 Chatbot wakeup attempt ${attempt}/${MAX_RETRIES}`);
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), WAKEUP_TIMEOUT);

        const response = await fetch(CHATBOT_BASE_URL, {
          method: 'GET',
          signal: controller.signal,
          headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'User-Agent': 'Portfolio-Wakeup-Service/1.0'
          }
        });

        clearTimeout(timeoutId);

        if (response.ok || response.status === 404) {
          // 404 is also acceptable - it means the service is up
          console.log('✅ Chatbot service is awake and ready!');
          this.retryCount = 0;
          return true;
        } else {
          console.log(`⚠️ Chatbot wakeup attempt ${attempt} returned status: ${response.status}`);
        }

      } catch (error) {
        if (error.name === 'AbortError') {
          console.log(`⏱️ Chatbot wakeup attempt ${attempt} timed out`);
        } else {
          console.log(`❌ Chatbot wakeup attempt ${attempt} failed:`, error.message);
        }
      }

      // Wait before retrying (except on last attempt)
      if (attempt < MAX_RETRIES) {
        console.log(`⏳ Waiting ${RETRY_DELAY / 1000}s before retry...`);
        await this.delay(RETRY_DELAY);
      }
    }

    console.log('❌ Failed to wake up chatbot after all attempts');
    return false;
  }

  /**
   * Check if chatbot is already awake
   * @returns {Promise<boolean>}
   */
  async checkChatbotStatus() {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000); // Quick check

      const response = await fetch(CHATBOT_BASE_URL, {
        method: 'HEAD', // Lighter request
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      return response.ok || response.status === 404;
    } catch (error) {
      return false;
    }
  }

  /**
   * Wake up chatbot with health check first
   * @returns {Promise<boolean>}
   */
  async smartWakeup() {
    // First, quickly check if it's already awake
    const isAwake = await this.checkChatbotStatus();
    
    if (isAwake) {
      console.log('✅ Chatbot is already awake!');
      return true;
    }

    // If not awake, perform full wakeup
    return this.wakeupChatbot();
  }

  /**
   * Utility function to delay execution
   * @param {number} ms - Milliseconds to delay
   * @returns {Promise}
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Wake up chatbot in background (fire and forget)
   * Good for page load scenarios where you don't want to block
   */
  wakeupInBackground() {
    this.smartWakeup().catch(error => {
      console.log('Background chatbot wakeup failed:', error.message);
    });
  }
}

// Create singleton instance
const chatbotWakeupService = new ChatbotWakeupService();

/**
 * Initialize chatbot wakeup when user visits the site
 * Call this function on page load
 */
export const initChatbotWakeup = () => {
  // Only wake up if user hasn't disabled it (respect user preferences)
  const userDisabledWakeup = localStorage.getItem('disableChatbotWakeup') === 'true';
  
  if (userDisabledWakeup) {
    console.log('🔇 Chatbot wakeup disabled by user preference');
    return;
  }

  // Start wakeup process in background
  console.log('🚀 Initializing chatbot wakeup service...');
  chatbotWakeupService.wakeupInBackground();
};

/**
 * Wake up chatbot immediately (for when user is about to use chat)
 * @returns {Promise<boolean>}
 */
export const wakeupChatbotNow = () => {
  return chatbotWakeupService.smartWakeup();
};

/**
 * Check if chatbot is currently waking up
 * @returns {boolean}
 */
export const isChatbotWakingUp = () => {
  return chatbotWakeupService.isWakingUp;
};

/**
 * Allow users to disable automatic wakeup
 */
export const disableChatbotWakeup = () => {
  localStorage.setItem('disableChatbotWakeup', 'true');
  console.log('🔇 Chatbot auto-wakeup disabled');
};

/**
 * Re-enable automatic wakeup
 */
export const enableChatbotWakeup = () => {
  localStorage.removeItem('disableChatbotWakeup');
  console.log('🔊 Chatbot auto-wakeup enabled');
};

export default chatbotWakeupService; 