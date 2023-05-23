import useSWR from "swr";
import fetcher from "@/src/utils/fetcher";

const useCategoriesList = () => {
  const { data, error, isLoading } = useSWR("/api/categories", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data,
    error,
    isLoading,
  };
};

export default useCategoriesList;
