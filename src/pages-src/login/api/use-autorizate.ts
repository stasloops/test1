import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useMutation, useQueryClient } from "react-query";
import { httpPostAutorizate, Schema } from "./http-post-autorizate";

export const useAutorizate = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationKey: [`httpPostAutorizate`],
    mutationFn: (value: Schema["payload"]) => httpPostAutorizate(value),
    onSuccess: (res, variables) => {
      if (!res) return;

      if (variables.rememberMe) {
        localStorage.setItem("token", res.access_token);
      } else {
        sessionStorage.setItem("token", res.access_token);
      }

      enqueueSnackbar("Вы вошли!", { variant: "success" });
      setTimeout(() => {
        router.push("/");
      }, 200);
      setTimeout(() => {
        queryClient.refetchQueries();
      }, 1000);
    },
    onError: (error: AxiosError<{ error?: string }>) => {
      const detail = error.response?.data?.error || "Ошибка сервера";
      enqueueSnackbar(detail, { variant: "error" });
    },
  });
  return { mutate, isLoading };
};
