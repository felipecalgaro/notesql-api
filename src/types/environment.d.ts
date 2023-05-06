export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      ACCESS_TOKEN_SECRET: string;
    }
  }
}
