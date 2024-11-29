import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React, { useEffect } from "react";
import { UserStore } from "../store/UserStore";

function AppTableUser() {
  const { all_user, fetchUsers } = UserStore();
  useEffect(() => {
    fetchUsers();
  }, []);
  console.log(all_user);
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
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
      <p className="text-placeholder-color w-fit mx-auto mt-3">
        Aucun utilisateur trouvée.
      </p>
    </>
  );
}

export default AppTableUser;
