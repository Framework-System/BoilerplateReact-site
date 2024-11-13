export const log = {
  debug: (message: string, ...args: Array<string>) => {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.debug(`[DEBUG] ${message}`, ...args);
  },
  info: (message: string, ...args: Array<string>) => {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.info(`[INFO] ${message}`, ...args);
  },
  warn: (message: string, ...args: Array<string>) => {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.warn(`[WARN] ${message}`, ...args);
  },
  error: (message: string, ...args: Array<string>) => {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.error(`[ERROR] ${message}`, ...args);
  },
};
