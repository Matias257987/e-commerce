import useSWR from "swr";
import fetcher from "@/src/utils/fetcher";

const useConsoleList = () => {
  const { data, error, isLoading } = useSWR("/api/consoles", fetcher, {
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

export default useConsoleList;
