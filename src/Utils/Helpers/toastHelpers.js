import { toast } from "react-toastify";

export const showToast = (message, type = "success") => {
  toast[type](message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const toastSuccess = (message) => showToast(message, "success");
export const toastError = (message) => showToast(message, "error");
