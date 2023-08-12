import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "./components/NavBar";

export default function Dashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Realizar una solicitud para obtener la lista de usuarios
    axios
      .get("/api/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleToggleAdminStatus = async (userId: string, isAdmin: boolean) => {
    try {
      // Realizar una solicitud para cambiar el estado de administrador
      const response = await axios.put(`/api/users?id=${userId}`, {
        isAdmin: !isAdmin, // Cambio el valor del isAdmin aquí
      });

      // Actualizar el estado solo después de confirmar el cambio en el servidor
      setUsers((prevUsers: any) =>
        prevUsers.map((user: any) =>
          user.id === userId ? { ...user, isAdmin: !isAdmin } : user
        )
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error toggling admin status:", error);
    }
  };

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <h1>User List</h1>
      <div>
        {users.map((user: any) => (
          <label key={user.id}>
            <div>
              <strong>Nombre: </strong> {user.name}
            </div>
            <div>
              <strong>Email: </strong> {user.email}
            </div>
            <div>
              <strong>Tipo de Usuario: </strong>
              {user.isAdmin ? "Admin" : "User"}
            </div>
            <div>
              <strong>Registered Date:</strong>{" "}
              {new Date(user.createdAt).toLocaleDateString()}
            </div>
            <div>
              <strong>Image:</strong>{" "}
              {user.image ? (
                <img src={user.image} alt={`Profile of ${user.name}`} />
              ) : (
                "No image available"
              )}
            </div>
            <button
              onClick={() => handleToggleAdminStatus(user.id, user.isAdmin)}
            >
              {user.isAdmin ? "Revoke Admin" : "Make Admin"}
            </button>
          </label>
        ))}
      </div>
    </div>
  );
}
