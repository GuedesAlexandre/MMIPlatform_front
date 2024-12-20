import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { QuestionMarkCircledIcon, TrashIcon } from "@radix-ui/react-icons";
import { UserStore } from "@/app/store/Users.store";
import { translateAccess } from "@/app/utils/translateAccess";
import TooltipUI from "@/app/components/ui/TooltipUI";
import LoaderUi from "@/app/components/ui/LoaderUi";
import { deleteUserByMail } from "@/app/users/services/delete-user.service";
import { User } from "@/app/users/models/user.model";
import { PermissionsEnum } from "@/app/models/enums/PermissionsEnum";

function AppTableUser() {
  const { all_user, fetchUsers } = UserStore();
  const [load, setLoad] = useState(true);
  useEffect(() => {
    fetchUsers().then(() => setLoad(false));
    if (!all_user) return;
  }, []);

  return (
    <>
      <Table className="w-5/6 mb-10 mx-auto border-2 border-gray-100">
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Prénom</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Promo</TableHead>
            <TableHead>Rôle</TableHead>
            <TableHead className="text-center">Ressources</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {all_user && all_user.length > 0 ? (
            all_user.map((user) => (
              <TableRow key={user.email}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {[
                    ...new Set(user.modules.map((module) => module.promo)),
                  ].join(" | ")}
                  {user.access === PermissionsEnum.SCOLARITY &&
                    "MMI01 | MMI02 | MMI03"}
                </TableCell>
                <TableCell>{translateAccess(user.access)}</TableCell>
                <TableCell className="text-center">
                  {user.access !== PermissionsEnum.SCOLARITY && (
                    <TooltipUI
                      icon={<QuestionMarkCircledIcon />}
                      message={
                        <div className="ml-3 bg-blue-50 border border-blue-200 p-3 rounded-xl shadow-md">
                          <h4 className="text-sm font-semibold text-blue-600 mb-2">
                            Modules :
                          </h4>
                          <ul className="text-start space-y-1">
                            {user.modules.map((module) => (
                              <li
                                key={module.name}
                                className="text-sm text-gray-800"
                              >
                                {module.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      }
                    />
                  )}
                </TableCell>
                <TableCell>
                  {user.access !== PermissionsEnum.ADMIN &&
                    user.access !== PermissionsEnum.SCOLARITY && (
                      <button
                        onClick={() => deleteUserByMail(user.email, fetchUsers)}
                        className="text-danger border-danger border p-1 rounded-[5px] hover:text-white hover:bg-danger transition-all"
                      >
                        <TrashIcon />
                      </button>
                    )}
                </TableCell>
              </TableRow>
            ))
          ) : load ? (
            <TableRow>
              <TableCell colSpan={7}>
                <LoaderUi />
              </TableCell>
            </TableRow>
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
