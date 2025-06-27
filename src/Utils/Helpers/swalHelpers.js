import Swal from "sweetalert2";

export const confirmDialog = async (title, text, confirmButtonText = "Ya") => {
  const result = await Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText,
    cancelButtonText: "Batal",
  });
  return result.isConfirmed;
};

export const successDialog = (title, text) => {
  Swal.fire({
    title,
    text,
    icon: "success",
    timer: 1500,
    showConfirmButton: false,
  });
};

export const errorDialog = (title, text) => {
  Swal.fire({
    title,
    text,
    icon: "error",
    timer: 1500,
    showConfirmButton: false,
  });
};
