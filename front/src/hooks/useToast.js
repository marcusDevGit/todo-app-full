import { toast } from "react-toastify";

export const useToast = () => {
  const addToast = (message, type = "success", duration = 3000) => {
    toast[type](message, {
      position: "top-right",
      autoClose: duration,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return { addToast };
};
