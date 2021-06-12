declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PREFIX: string;
      PORT: number;
      REDIS_HOST: string;
      REDIS_PORT: number;
      CORS_ORIGINS: Array<string>;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export { }