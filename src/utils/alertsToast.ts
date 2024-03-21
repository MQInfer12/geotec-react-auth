import { toast } from "react-toastify";

export const alertSuccess = (message: string) => {
  toast.success(message);
};
export const alertError = (message: string) => {
  toast.error(message);
};
export const alertWarning = (message: string) => {
  toast.warning(message);
};
