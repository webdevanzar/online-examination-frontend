// Electron Integration Utility
export class ElectronIntegration {
  private static readonly ELECTRON_PROTOCOL = 'examlockdown://';
  
  /**
   * Check if user is in regular browser (not Electron)
   */
  static isRegularBrowser(): boolean {
    // Check if we're running in Electron
    const userAgent = navigator.userAgent.toLowerCase();
    const isElectron = userAgent.includes('electron');
    
    return !isElectron;
  }

  /**
   * Check if Electron app is installed (simplified version)
   */
  static async isElectronAppInstalled(): Promise<boolean> {
    // For now, assume it's installed and try direct redirection
    // The protocol will handle the actual installation check
    return true;
  }

  /**
   * Redirect to Electron app with exam data
   */
  static redirectToElectron(examData: {
    examId: string;
    attemptId: string;
    token: string;
    frontendUrl: string;
  }): void {
    const { examId, attemptId, token, frontendUrl } = examData;
    
    // Create the deep link URL
    const electronUrl = `${this.ELECTRON_PROTOCOL}start-exam?examId=${examId}&attemptId=${attemptId}&token=${encodeURIComponent(token)}&frontendUrl=${encodeURIComponent(frontendUrl)}`;
    
    console.log('Attempting to redirect to Electron app:', electronUrl);
    
    try {
      // Try to open the Electron app
      window.location.href = electronUrl;
      
      // Show a brief loading message, then fallback to download instructions
      setTimeout(() => {
        // Check if we're still on the same page (redirection failed)
        if (window.location.href.includes('exam') || window.location.href.includes('start')) {
          console.log('Redirection to Electron app may have succeeded');
          return;
        }
        
        console.log('Redirection to Electron app failed, showing download instructions');
        this.showDownloadInstructions();
      }, 2000); // Reduced timeout to 2 seconds
    } catch (error) {
      console.error('Error redirecting to Electron app:', error);
      this.showDownloadInstructions();
    }
  }

  /**
   * Show download instructions for Electron app (Windows only, non-closable modal)
   */
  static showDownloadInstructions(): void {
    // Only show on Windows
    if (!navigator.platform.includes('Win')) {
      return;
    }

    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.id = 'exam-browser-modal';
    modalOverlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.9);
      z-index: 999999;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `;

    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 40px;
      border-radius: 20px;
      max-width: 600px;
      width: 90%;
      text-align: center;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      border: 2px solid rgba(255, 255, 255, 0.1);
    `;

    modalContent.innerHTML = `
      <div style="font-size: 48px; margin-bottom: 20px;">🔒</div>
      <h1 style="margin: 0 0 20px 0; font-size: 28px; font-weight: 700;">
        SECURE EXAM BROWSER REQUIRED
      </h1>
      <div style="background: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 10px; margin: 20px 0;">
        <p style="margin: 0 0 15px 0; font-size: 16px; line-height: 1.5;">
          This exam requires the secure lockdown browser for security reasons.
        </p>
        <div style="background: rgba(255, 255, 255, 0.2); padding: 15px; border-radius: 8px; margin: 15px 0;">
          <h3 style="margin: 0 0 10px 0; font-size: 18px;">📥 DOWNLOAD INSTRUCTIONS:</h3>
          <ol style="text-align: left; margin: 0; padding-left: 20px; line-height: 1.8;">
            <li style="margin-bottom: 8px;">Download the ExamLockdown Browser from your institution</li>
            <li style="margin-bottom: 8px;">Install the application (Windows only)</li>
            <li style="margin-bottom: 8px;">Return to this page and click "Start Exam" again</li>
          </ol>
        </div>
        <div style="background: #ff6b6b; padding: 12px; border-radius: 8px; margin-top: 15px;">
          <p style="margin: 0; font-weight: 600; font-size: 14px;">
            ⚠️ The exam cannot be taken in regular browsers for security reasons.
          </p>
        </div>
      </div>
      <div style="margin-top: 25px; font-size: 14px; opacity: 0.8;">
        <p style="margin: 0;">This window cannot be closed. Install the ExamLockdown Browser to continue.</p>
      </div>
    `;

    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);

    // Prevent closing with Escape key
    const preventEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    document.addEventListener('keydown', preventEscape);

    // Prevent right-click
    const preventContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    modalOverlay.addEventListener('contextmenu', preventContextMenu);

    // Make modal non-closable by removing close methods
    modalOverlay.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    // Store reference to allow cleanup later if needed
    (window as any).__examBrowserModal = {
      overlay: modalOverlay,
      cleanup: () => {
        document.removeEventListener('keydown', preventEscape);
        if (document.body.contains(modalOverlay)) {
          document.body.removeChild(modalOverlay);
        }
        delete (window as any).__examBrowserModal;
      }
    };
  }

  /**
   * Get exam data for Electron app
   */
  static getExamDataForElectron(examId: string, attemptId: string, token: string): {
    examId: string;
    attemptId: string;
    token: string;
    frontendUrl: string;
  } {
    return {
      examId,
      attemptId,
      token,
      frontendUrl: window.location.origin // This will be http://localhost:5174
    };
  }
}

// Custom hook for React components
export const useElectronIntegration = () => {
  const checkAndRedirect = async (examId: string, attemptId: string, token: string) => {
    if (ElectronIntegration.isRegularBrowser()) {
      const isInstalled = await ElectronIntegration.isElectronAppInstalled();
      
      if (!isInstalled) {
        ElectronIntegration.showDownloadInstructions();
        return false;
      }
      
      const examData = ElectronIntegration.getExamDataForElectron(examId, attemptId, token);
      ElectronIntegration.redirectToElectron(examData);
      return false; // Don't proceed with web exam
    }
    
    return true; // Continue with web exam (already in Electron)
  };

  return { checkAndRedirect };
};
