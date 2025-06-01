import ReactGA from 'react-ga4';

// Get GA Measurement ID from environment variables
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-V5690YXT75';

// Initialize Google Analytics
export const initGA = () => {
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-V5690YXT75') {
    console.warn('Google Analytics Measurement ID not configured. Please set VITE_GA_MEASUREMENT_ID in your environment variables.');
    return;
  }

  ReactGA.initialize(GA_MEASUREMENT_ID, {
    debug: import.meta.env.DEV,
    titleCase: false,
    gaOptions: {
      send_page_view: false // We'll send page views manually
    }
  });
  
  console.log('Google Analytics initialized with ID:', GA_MEASUREMENT_ID);
};

// Track page views
export const trackPageView = (path, title) => {
  ReactGA.send({
    hitType: 'pageview',
    page: path,
    title: title
  });
};

// Track custom events
export const trackEvent = (action, category, label = null, value = null) => {
  ReactGA.event({
    action,
    category,
    label,
    value
  });
};

// Track user interactions
export const trackUserInteraction = (action, element, additionalData = {}) => {
  ReactGA.event({
    action: action,
    category: 'User Interaction',
    label: element,
    custom_parameters: {
      timestamp: new Date().toISOString(),
      user_agent: navigator.userAgent,
      screen_resolution: `${screen.width}x${screen.height}`,
      viewport_size: `${window.innerWidth}x${window.innerHeight}`,
      ...additionalData
    }
  });
};

// Track project clicks specifically
export const trackProjectClick = (projectName, actionType, projectData = {}) => {
  ReactGA.event({
    action: 'project_interaction',
    category: 'Projects',
    label: projectName,
    custom_parameters: {
      action_type: actionType, // 'github_click', 'demo_click', 'card_view'
      project_name: projectName,
      timestamp: new Date().toISOString(),
      ...projectData
    }
  });
};

// Track button clicks with detailed info
export const trackButtonClick = (buttonName, location, additionalInfo = {}) => {
  ReactGA.event({
    action: 'button_click',
    category: 'UI Interaction',
    label: buttonName,
    custom_parameters: {
      button_location: location,
      page_url: window.location.pathname,
      timestamp: new Date().toISOString(),
      ...additionalInfo
    }
  });
};

// Track navigation
export const trackNavigation = (fromPage, toPage, method = 'click') => {
  ReactGA.event({
    action: 'navigation',
    category: 'Site Navigation',
    label: `${fromPage} -> ${toPage}`,
    custom_parameters: {
      from_page: fromPage,
      to_page: toPage,
      navigation_method: method,
      timestamp: new Date().toISOString()
    }
  });
};

// Track chatbot interactions
export const trackChatbotInteraction = (action, message = null, responseTime = null) => {
  ReactGA.event({
    action: 'chatbot_interaction',
    category: 'AI Assistant',
    label: action,
    custom_parameters: {
      action_type: action, // 'open', 'close', 'message_sent', 'quick_action'
      message_preview: message ? message.substring(0, 50) : null,
      response_time: responseTime,
      timestamp: new Date().toISOString()
    }
  });
};

// Track user session info
export const trackUserSession = () => {
  const sessionData = {
    session_start: new Date().toISOString(),
    user_agent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
    screen_resolution: `${screen.width}x${screen.height}`,
    viewport_size: `${window.innerWidth}x${window.innerHeight}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    referrer: document.referrer || 'direct',
    is_mobile: window.innerWidth <= 768,
    connection_type: navigator.connection?.effectiveType || 'unknown'
  };

  ReactGA.event({
    action: 'session_start',
    category: 'User Session',
    custom_parameters: sessionData
  });

  return sessionData;
};

// Track scroll depth
export const trackScrollDepth = (depth) => {
  ReactGA.event({
    action: 'scroll_depth',
    category: 'User Engagement',
    label: `${depth}%`,
    value: depth
  });
};

// Track time spent on page
export const trackTimeOnPage = (pageName, timeSpent) => {
  ReactGA.event({
    action: 'time_on_page',
    category: 'User Engagement',
    label: pageName,
    value: Math.round(timeSpent / 1000), // Convert to seconds
    custom_parameters: {
      time_spent_ms: timeSpent,
      page_name: pageName
    }
  });
};

// Track errors
export const trackError = (errorMessage, errorLocation, errorStack = null) => {
  ReactGA.event({
    action: 'error_occurred',
    category: 'Errors',
    label: errorMessage,
    custom_parameters: {
      error_location: errorLocation,
      error_stack: errorStack,
      timestamp: new Date().toISOString(),
      user_agent: navigator.userAgent
    }
  });
}; 