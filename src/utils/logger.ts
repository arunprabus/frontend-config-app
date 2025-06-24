/**
 * Logger utility for consistent logging across the application
 */

/**
 * Log levels
 */
export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error'
}

/**
 * Current log level from environment variables
 */
const currentLogLevel = import.meta.env.VITE_LOG_LEVEL || 'info';

/**
 * Debug mode flag from environment variables
 */
const isDebugMode = import.meta.env.VITE_DEBUG_MODE === 'true';

/**
 * Log level priority map
 */
const logLevelPriority: Record<LogLevel, number> = {
  [LogLevel.DEBUG]: 0,
  [LogLevel.INFO]: 1,
  [LogLevel.WARN]: 2,
  [LogLevel.ERROR]: 3
};

/**
 * Check if a log level should be displayed based on current log level
 * @param level Log level to check
 * @returns Boolean indicating if log should be displayed
 */
const shouldLog = (level: LogLevel): boolean => {
  const currentPriority = logLevelPriority[currentLogLevel as LogLevel] || 1;
  const levelPriority = logLevelPriority[level];
  return levelPriority >= currentPriority;
};

/**
 * Format log message with timestamp and module name
 * @param message Log message
 * @param module Module name
 * @returns Formatted log message
 */
const formatMessage = (message: string, module?: string): string => {
  const timestamp = new Date().toISOString();
  const modulePrefix = module ? `[${module}] ` : '';
  return `${timestamp} ${modulePrefix}${message}`;
};

/**
 * Logger object with methods for different log levels
 */
export const logger = {
  /**
   * Log debug message
   * @param message Message to log
   * @param module Optional module name
   * @param data Optional data to log
   */
  debug: (message: string, module?: string, data?: any): void => {
    if (isDebugMode && shouldLog(LogLevel.DEBUG)) {
      console.debug(formatMessage(message, module), data || '');
    }
  },

  /**
   * Log info message
   * @param message Message to log
   * @param module Optional module name
   * @param data Optional data to log
   */
  info: (message: string, module?: string, data?: any): void => {
    if (shouldLog(LogLevel.INFO)) {
      console.info(formatMessage(message, module), data || '');
    }
  },

  /**
   * Log warning message
   * @param message Message to log
   * @param module Optional module name
   * @param data Optional data to log
   */
  warn: (message: string, module?: string, data?: any): void => {
    if (shouldLog(LogLevel.WARN)) {
      console.warn(formatMessage(message, module), data || '');
    }
  },

  /**
   * Log error message
   * @param message Message to log
   * @param module Optional module name
   * @param error Optional error object
   */
  error: (message: string, module?: string, error?: any): void => {
    if (shouldLog(LogLevel.ERROR)) {
      console.error(formatMessage(message, module), error || '');
    }
  }
};