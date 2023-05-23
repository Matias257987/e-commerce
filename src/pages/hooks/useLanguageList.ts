import useSWR from "swr";
import fetcher from "@/src/utils/fetcher";

const useLanguageList = () => {
  const { data, error, isLoading } = useSWR("/api/languages", fetcher, {
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

export default useLanguageList;
