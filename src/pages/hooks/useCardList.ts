import useSWR from "swr";
import fetcher from "@/src/utils/fetcher";

//Se hace un llamado al back esto puede devolver 3 estados "error", "cargando" o "listo"
const useCardList = () => {
  const { data, error, isLoading } = useSWR("/api/games", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    //retorna el estado de la peticion con su respuesta
    data,
    error,
    isLoading,
  };
};

export default useCardList;
