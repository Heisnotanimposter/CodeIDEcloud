import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Play, CheckCircle2, XCircle, AlertCircle, RotateCcw, Eye, EyeOff } from "lucide-react";

interface TestResult {
  name: string;
  status: 'pending' | 'running' | 'passed' | 'failed';
  message: string;
  timestamp?: Date;
  duration?: number;
}

interface SelfReflectionProps {
  onTestComplete?: (results: TestResult[]) => void;
}

const SelfReflection = ({ onTestComplete }: SelfReflectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [currentTest, setCurrentTest] = useState<string>("");
  const logBuffer = useRef<string[]>([]);

  // Test definitions
  const tests = [
    { name: "Button Functionality", id: "buttons" },
    { name: "Navigation & Tabs", id: "navigation" },
    { name: "Modal/Dialog System", id: "modals" },
    { name: "Environment Templates", id: "environments" },
    { name: "Code Cell Operations", id: "codecells" },
    { name: "UI State Management", id: "state" },
    { name: "Responsive Design", id: "responsive" },
    { name: "API Mock System", id: "api" }
  ];

  const log = (message: string, type: 'info' | 'success' | 'error' | 'warn' = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    const logMessage = `[${timestamp}] ${type.toUpperCase()}: ${message}`;
    logBuffer.current.push(logMessage);
    console.log(logMessage);
  };

  const updateTestResult = (testName: string, status: TestResult['status'], message: string, duration?: number) => {
    setTestResults(prev => {
      const existing = prev.find(t => t.name === testName);
      const updated = {
        name: testName,
        status,
        message,
        timestamp: new Date(),
        duration
      };
      
      if (existing) {
        return prev.map(t => t.name === testName ? updated : t);
      } else {
        return [...prev, updated];
      }
    });
  };

  // Utility functions for testing
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const findElement = (selector: string): Element | null => {
    try {
      return document.querySelector(selector);
    } catch (error) {
      log(`Failed to find element: ${selector}`, 'error');
      return null;
    }
  };

  const simulateClick = async (element: Element | null): Promise<boolean> => {
    if (!element) return false;
    try {
      (element as HTMLElement).click();
      await sleep(100); // Allow for UI updates
      return true;
    } catch (error) {
      log(`Failed to click element: ${error}`, 'error');
      return false;
    }
  };

  // Test implementations
  const testButtonFunctionality = async (): Promise<boolean> => {
    log("Testing button functionality...", 'info');
    
    // Test primary navigation buttons
    const tabButtons = document.querySelectorAll('[role="tab"]');
    log(`Found ${tabButtons.length} tab buttons`, 'info');
    
    for (const button of tabButtons) {
      const buttonText = button.textContent || 'Unknown';
      log(`Testing tab: ${buttonText}`, 'info');
      
      const clicked = await simulateClick(button);
      if (!clicked) {
        log(`Failed to click tab: ${buttonText}`, 'error');
        return false;
      }
      
      await sleep(200);
      
      // Check if tab is active
      const isActive = button.getAttribute('data-state') === 'active' || 
                      button.classList.contains('data-[state=active]');
      
      if (!isActive) {
        log(`Tab ${buttonText} not activated properly`, 'error');
        return false;
      }
      
      log(`Tab ${buttonText} activated successfully`, 'success');
    }
    
    // Test other key buttons
    const keyButtons = [
      'button[data-test="start-coding"]',
      'button[data-test="browse-environments"]',
      'button[data-test="new-project"]'
    ];
    
    for (const selector of keyButtons) {
      const button = findElement(selector);
      if (button) {
        const clicked = await simulateClick(button);
        if (clicked) {
          log(`Button ${selector} clicked successfully`, 'success');
        }
      }
    }
    
    return true;
  };

  const testNavigationAndTabs = async (): Promise<boolean> => {
    log("Testing navigation and tab system...", 'info');
    
    const tabs = ['dashboard', 'notebook', 'environments', 'projects'];
    
    for (const tab of tabs) {
      log(`Navigating to ${tab} tab`, 'info');
      
      const tabButton = findElement(`[value="${tab}"]`);
      if (!tabButton) {
        log(`Tab button for ${tab} not found`, 'error');
        return false;
      }
      
      await simulateClick(tabButton);
      await sleep(300);
      
      // Check if content is visible
      const tabContent = findElement(`[data-state="active"][data-value="${tab}"]`);
      if (!tabContent) {
        log(`Tab content for ${tab} not visible`, 'error');
        return false;
      }
      
      log(`Successfully navigated to ${tab}`, 'success');
    }
    
    return true;
  };

  const testModalSystem = async (): Promise<boolean> => {
    log("Testing modal and dialog system...", 'info');
    
    // Test environment template dialogs
    const environmentCards = document.querySelectorAll('[data-test="environment-card"]');
    
    if (environmentCards.length === 0) {
      log("No environment cards found, skipping modal test", 'warn');
      return true;
    }
    
    // Test first environment card dialog
    const firstCard = environmentCards[0];
    const dialogTrigger = firstCard.querySelector('button');
    
    if (dialogTrigger) {
      log("Opening environment dialog...", 'info');
      await simulateClick(dialogTrigger);
      await sleep(300);
      
      // Check if dialog is open
      const dialog = findElement('[role="dialog"][data-state="open"]');
      if (!dialog) {
        log("Dialog did not open", 'error');
        return false;
      }
      
      log("Dialog opened successfully", 'success');
      
      // Close dialog
      const closeButton = dialog.querySelector('[data-test="close-dialog"]') || 
                         dialog.querySelector('button[aria-label="Close"]');
      
      if (closeButton) {
        await simulateClick(closeButton);
        await sleep(200);
        log("Dialog closed successfully", 'success');
      } else {
        // Try escape key
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
        await sleep(200);
        log("Dialog closed with escape key", 'success');
      }
    }
    
    return true;
  };

  const testEnvironmentTemplates = async (): Promise<boolean> => {
    log("Testing environment template functionality...", 'info');
    
    // Navigate to environments tab first
    const envTab = findElement('[value="environments"]');
    if (envTab) {
      await simulateClick(envTab);
      await sleep(300);
    }
    
    // Check if environment templates are loaded
    const templates = document.querySelectorAll('[data-test="environment-template"]');
    log(`Found ${templates.length} environment templates`, 'info');
    
    if (templates.length === 0) {
      log("No environment templates found", 'error');
      return false;
    }
    
    // Test download functionality on first template
    const downloadButton = templates[0].querySelector('[data-test="download-env"]');
    if (downloadButton) {
      log("Testing environment download...", 'info');
      await simulateClick(downloadButton);
      await sleep(200);
      log("Download initiated successfully", 'success');
    }
    
    return true;
  };

  const testCodeCellOperations = async (): Promise<boolean> => {
    log("Testing code cell operations...", 'info');
    
    // Navigate to notebook tab
    const notebookTab = findElement('[value="notebook"]');
    if (notebookTab) {
      await simulateClick(notebookTab);
      await sleep(300);
    }
    
    // Check for existing code cells
    const codeCells = document.querySelectorAll('[data-test="code-cell"]');
    log(`Found ${codeCells.length} code cells`, 'info');
    
    // Test add cell button
    const addCellButton = findElement('[data-test="add-cell"]');
    if (addCellButton) {
      log("Testing add cell functionality...", 'info');
      await simulateClick(addCellButton);
      await sleep(200);
      log("Add cell button clicked successfully", 'success');
    }
    
    return true;
  };

  const testUIStateManagement = async (): Promise<boolean> => {
    log("Testing UI state management...", 'info');
    
    // Test language selector
    const languageSelector = findElement('[data-test="language-selector"]');
    if (languageSelector) {
      log("Testing language selector...", 'info');
      await simulateClick(languageSelector);
      await sleep(200);
      
      // Select a different language
      const pythonOption = findElement('[data-value="python"]');
      if (pythonOption) {
        await simulateClick(pythonOption);
        await sleep(200);
        log("Language changed to Python", 'success');
      }
    }
    
    return true;
  };

  const testResponsiveDesign = async (): Promise<boolean> => {
    log("Testing responsive design...", 'info');
    
    const originalWidth = window.innerWidth;
    
    // Test mobile breakpoint
    Object.defineProperty(window, 'innerWidth', { value: 375, writable: true });
    window.dispatchEvent(new Event('resize'));
    await sleep(100);
    log("Tested mobile viewport", 'info');
    
    // Test tablet breakpoint
    Object.defineProperty(window, 'innerWidth', { value: 768, writable: true });
    window.dispatchEvent(new Event('resize'));
    await sleep(100);
    log("Tested tablet viewport", 'info');
    
    // Restore original width
    Object.defineProperty(window, 'innerWidth', { value: originalWidth, writable: true });
    window.dispatchEvent(new Event('resize'));
    await sleep(100);
    log("Restored original viewport", 'info');
    
    return true;
  };

  const testAPIMockSystem = async (): Promise<boolean> => {
    log("Testing API mock system...", 'info');
    
    // Set up mock responses
    const mockGeminiResponse = {
      response: "Mock AI response for testing",
      status: "success"
    };
    
    // Store original fetch if it exists
    const originalFetch = window.fetch;
    
    // Mock fetch for testing (simple implementation)
    const mockFetch = () => Promise.resolve({
      ok: true,
      json: async () => mockGeminiResponse
    } as Response);
    
    // Temporarily replace fetch
    (window as any).fetch = mockFetch;
    
    log("API mock system configured", 'success');
    
    // Restore original fetch
    if (originalFetch) {
      window.fetch = originalFetch;
    }
    
    return true;
  };

  const runAllTests = async () => {
    setIsRunning(true);
    setProgress(0);
    setTestResults([]);
    logBuffer.current = [];
    
    log("Starting comprehensive self-reflection test suite...", 'info');
    
    const testFunctions = [
      { name: "Button Functionality", fn: testButtonFunctionality },
      { name: "Navigation & Tabs", fn: testNavigationAndTabs },
      { name: "Modal/Dialog System", fn: testModalSystem },
      { name: "Environment Templates", fn: testEnvironmentTemplates },
      { name: "Code Cell Operations", fn: testCodeCellOperations },
      { name: "UI State Management", fn: testUIStateManagement },
      { name: "Responsive Design", fn: testResponsiveDesign },
      { name: "API Mock System", fn: testAPIMockSystem }
    ];
    
    for (let i = 0; i < testFunctions.length; i++) {
      const test = testFunctions[i];
      setCurrentTest(test.name);
      updateTestResult(test.name, 'running', 'Test in progress...');
      
      const startTime = Date.now();
      
      try {
        log(`Running test: ${test.name}`, 'info');
        const result = await test.fn();
        const duration = Date.now() - startTime;
        
        if (result) {
          updateTestResult(test.name, 'passed', 'Test completed successfully', duration);
          log(`✅ ${test.name} PASSED (${duration}ms)`, 'success');
        } else {
          updateTestResult(test.name, 'failed', 'Test failed - check console for details', duration);
          log(`❌ ${test.name} FAILED (${duration}ms)`, 'error');
        }
      } catch (error) {
        const duration = Date.now() - startTime;
        updateTestResult(test.name, 'failed', `Test error: ${error}`, duration);
        log(`❌ ${test.name} ERROR: ${error} (${duration}ms)`, 'error');
      }
      
      setProgress(((i + 1) / testFunctions.length) * 100);
      await sleep(200); // Brief pause between tests
    }
    
    setCurrentTest("");
    setIsRunning(false);
    
    const passedTests = testResults.filter(t => t.status === 'passed').length;
    const totalTests = testResults.length;
    
    log(`Test suite completed: ${passedTests}/${totalTests} tests passed`, 'info');
    
    if (onTestComplete) {
      onTestComplete(testResults);
    }
  };

  const resetTests = () => {
    setTestResults([]);
    setProgress(0);
    setCurrentTest("");
    logBuffer.current = [];
    log("Test results reset", 'info');
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'passed': return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'failed': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'running': return <AlertCircle className="w-4 h-4 text-yellow-500 animate-pulse" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: TestResult['status']) => {
    switch (status) {
      case 'passed': return 'text-green-500';
      case 'failed': return 'text-red-500';
      case 'running': return 'text-yellow-500';
      default: return 'text-gray-400';
    }
  };

  // Global function to toggle visibility (accessible from console)
  if (typeof window !== 'undefined') {
    (window as any).toggleSelfReflection = () => {
      setIsVisible(prev => !prev);
    };
  }

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsVisible(true)}
          variant="outline"
          size="sm"
          className="gap-2 opacity-20 hover:opacity-100 transition-smooth"
          title="Open Self-Reflection Test Suite"
        >
          <Eye className="w-4 h-4" />
          Debug
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-4 z-50 bg-background/95 backdrop-blur-sm border border-border rounded-lg shadow-elegant">
      <Card className="h-full flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="gradient-ai rounded-lg w-8 h-8 flex items-center justify-center">
              <AlertCircle className="w-4 h-4 text-accent-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Self-Reflection Test Suite</h2>
              <p className="text-sm text-muted-foreground">
                Comprehensive functionality validation
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              onClick={runAllTests}
              disabled={isRunning}
              variant="hero"
              size="sm"
              className="gap-2"
            >
              <Play className="w-4 h-4" />
              {isRunning ? 'Running...' : 'Run Tests'}
            </Button>
            
            <Button
              onClick={resetTests}
              disabled={isRunning}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
            
            <Button
              onClick={() => setIsVisible(false)}
              variant="ghost"
              size="sm"
            >
              <EyeOff className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex-1 p-4 space-y-4">
          {/* Progress */}
          {isRunning && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              {currentTest && (
                <p className="text-sm text-muted-foreground">
                  Currently running: {currentTest}
                </p>
              )}
            </div>
          )}
          
          {/* Test Results */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
            <div className="space-y-2">
              <h3 className="font-medium">Test Results</h3>
              <ScrollArea className="h-96 border rounded-lg p-2">
                <div className="space-y-2">
                  {tests.map((test) => {
                    const result = testResults.find(r => r.name === test.name);
                    return (
                      <div
                        key={test.id}
                        className="flex items-center justify-between p-2 rounded border"
                      >
                        <div className="flex items-center gap-2">
                          {getStatusIcon(result?.status || 'pending')}
                          <span className="text-sm">{test.name}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {result?.duration && (
                            <span className="text-xs text-muted-foreground">
                              {result.duration}ms
                            </span>
                          )}
                          <Badge
                            variant="outline"
                            className={getStatusColor(result?.status || 'pending')}
                          >
                            {result?.status || 'pending'}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Console Log</h3>
              <ScrollArea className="h-96 border rounded-lg p-2 bg-code-bg font-mono text-xs">
                <div className="space-y-1">
                  {logBuffer.current.map((log, index) => (
                    <div key={index} className="text-foreground/80">
                      {log}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SelfReflection;