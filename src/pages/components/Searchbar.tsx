// import axios from "axios";
// import { useCallback, useState } from "react";

// const Searchbar = () => {
//   const [searchGame, setSearchGame] = useState("");

//   const handleInput = (e: any) => {
//     setSearchGame(e.target.value);
//   };

//   const handleSubmit = useCallback(
//     async (e: React.FormEvent) => {
//       e.preventDefault();

//       if (searchGame) {
//         try {
//           const response = await axios.get("/api/games", {
//             params: { name: searchGame },
//           });
//           console.log(response);

//           setSearchGame("");
//         } catch (error) {
//           console.log(error + "Hola");
//           alert("No se encontro el juego");
//         }
//       }
//     },
//     [searchGame]
//   );

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Buscar..."
//           value={searchGame}
//           onChange={handleInput}
//         />
//         <button type="submit">Buscar</button>
//       </form>
//     </div>
//   );
// };

// export default Searchbar;
