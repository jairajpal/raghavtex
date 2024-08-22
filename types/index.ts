// types/index.ts
export interface User {
  id: number;
  name: string;
  email: string;
}

export interface ApiResponse<T> {
  data: T;
}

export interface ErrorResponse {
  error: string;
}
