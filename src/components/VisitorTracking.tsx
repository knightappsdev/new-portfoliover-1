import React, { useEffect } from 'react';

interface VisitorData {
  timestamp: string;
  page: string;
  referrer: string;
  userAgent: string;
  screenResolution: string;
  timeZone: string;
  language: string;
  sessionDuration?: number;
}

const VisitorTracking: React.FC = () => {
  useEffect(() => {
    const trackVisitor = async () => {
      // Only track with user consent (you should implement a cookie consent banner)
      const hasConsent = localStorage.getItem('analyticsConsent') === 'true';
      if (!hasConsent) return;

      const visitorData: VisitorData = {
        timestamp: new Date().toISOString(),
        page: window.location.pathname + window.location.search,
        referrer: document.referrer || 'Direct',
        userAgent: navigator.userAgent,
        screenResolution: `${screen.width}x${screen.height}`,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        language: navigator.language,
      };

      try {
        await fetch('https://ofemo.uk/api/visitor-tracking', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...visitorData,
            to: 'hello@ofemo.uk'
          }),
        });
      } catch (error) {
        console.error('Error tracking visitor:', error);
      }
    };

    // Track page view
    trackVisitor();

    // Track session duration
    const startTime = Date.now();
    const trackSessionEnd = () => {
      const sessionDuration = Math.round((Date.now() - startTime) / 1000);
      if (sessionDuration > 10) { // Only track if user stayed more than 10 seconds
        fetch('https://ofemo.uk/api/session-tracking', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sessionDuration,
            page: window.location.pathname,
            timestamp: new Date().toISOString(),
            to: 'hello@ofemo.uk'
          }),
        }).catch(console.error);
      }
    };

    window.addEventListener('beforeunload', trackSessionEnd);
    return () => window.removeEventListener('beforeunload', trackSessionEnd);
  }, []);

  return null; // This component doesn't render anything
};

export default VisitorTracking;
