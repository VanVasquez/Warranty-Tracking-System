import { authInstance } from "./axios";

export function register(account) {
  return authInstance.post("/register", account);
}

export function authenticate(account) {
  return authInstance.post("/authenticate", account);
}
