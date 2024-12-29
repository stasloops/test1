import { enqueueSnackbar } from "notistack";
import { useQuery } from "react-query";
import { useFilter } from "../modal/store";
import { httpGetTable } from "./http-get-table";
import { useDebounce } from "@/src/shared/lib/hooks";
import { useRouter } from "next/navigation";

export const useBloggerPosts = () => {
  const router = useRouter();
  const limit = useFilter((state) => state.limit);
  const offset = useFilter((state) => state.offset);
  const search = useFilter((state) => state.search);

  const debouncedSearch = useDebounce(search, 500);

  const props = useQuery({
    queryKey: [`httpGetTable`, limit, offset, debouncedSearch],
    queryFn: () => {
      return httpGetTable({ limit, offset, search: debouncedSearch });
    },
    onError: (error: Error) => {
      router.push("/login");
      enqueueSnackbar("Ошибка загрузки данных", { variant: "error" });
    },
  });
  return props;
};
