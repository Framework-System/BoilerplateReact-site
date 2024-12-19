export const log = {
  debug: (message: string, ...args: Array<string>) => {
    console.debug(`[DEBUG] ${message}`, ...args);
  },
  info: (message: string, ...args: Array<string>) => {
    console.info(`[INFO] ${message}`, ...args);
  },
  warn: (message: string, ...args: Array<string>) => {
    console.warn(`[WARN] ${message}`, ...args);
  },
  error: (message: string, ...args: Array<string>) => {
    console.error(`[ERROR] ${message}`, ...args);
  },
};
