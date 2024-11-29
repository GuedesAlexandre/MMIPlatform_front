import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect } from "react";
import { UserStore } from "../store/UserStore";
import { Permissions } from "../auth/models/enums/PermissionsEnum";
import { translateAccess } from "../utils/translateAccess";

function AppTableUser() {
  const { all_user, fetchUsers } = UserStore();
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <>
      <Table className="w-5/6 mx-auto">
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Prénom</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Promo</TableHead>
            <TableHead>Rôle</TableHead>
            <TableHead>Ressources</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {all_user && all_user.length > 0 ? (
            all_user.map(
              (user) =>
                user.access !== Permissions.ADMIN && (
                  <TableRow key={user.email}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{}</TableCell>
                    <TableCell>{translateAccess(user.access)}</TableCell>
                    <TableCell>{}</TableCell>
                    <TableCell>icon des actions</TableCell>
                  </TableRow>
                )
            )
          ) : (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center text-placeholder-color"
              >
                Aucun utilisateur trouvée.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}

export default AppTableUser;
