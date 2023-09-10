export interface LoginError {
  email: boolean;
  password: boolean;
  attempts: boolean;
  timeTillReset: number;
}

export interface RegisterError {
  username: boolean;
  email: boolean;
}
