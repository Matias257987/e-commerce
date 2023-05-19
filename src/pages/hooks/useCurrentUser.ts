import useSWR from "swr";
import fetcher from "@/src/utils/fetcher";

//Se hace un llamado al back esto puede devolver 3 estados "error", "cargando" o "listo"
const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/current", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    //retorna el estado de la peticion con su respuesta
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useCurrentUser;
