import axios from "axios";
import Cookies from "js-cookie";
import { User } from "@/app/users/models/user.model";

export const deleteUserByMail = async (
  email: string,
  fetchUsers: () => Promise<User[] | undefined>
) => {
  const bearer = Cookies.get("bearer");
  try {
    if (!process.env.NEXT_PUBLIC_API_PATH) return;
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_PATH}/auth/user/${email}`,
      {
        headers: {
          Authorization: `Bearer ${bearer?.toString()}`,
        },
      }
    );
    fetchUsers();
    return response;
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur :", error);
    return error;
  }
};
