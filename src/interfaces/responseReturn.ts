interface ErrorReturn {
  status: "error";
  message: string;
}
interface SuccessReturn<T> {
  status: "success";
  message: string;
  data: T;
}

export type ResponseReturn<T = undefined> = ErrorReturn | SuccessReturn<T>;
