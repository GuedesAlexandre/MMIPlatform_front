import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { User } from "@/app/users/models/user.model";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { translateAccess } from "@/app/utils/translateAccess";

interface TabsRecapProps {
  user: User | undefined;
}

const TabsRecap: React.FC<TabsRecapProps> = ({ user: TabsRecapProps }) => {
  const initial: string =
    (TabsRecapProps?.firstName?.slice(0, 1) ?? "").toLocaleUpperCase() +
    (TabsRecapProps?.name?.slice(0, 1) ?? "").toLocaleUpperCase();
  return (
    <>
      <Tabs defaultValue="user" className="w-full">
        <TabsList className="flex gap-4 pl-8">
          <TabsTrigger
            value="user"
            className={"px-4 py-2 bg-gray-200 rounded-md cursor-pointer"}
          >
            Informations personnelles
          </TabsTrigger>
          <TabsTrigger
            value="modules"
            className="px-4 py-2 bg-gray-200 rounded-md cursor-pointer"
          >
            Ressources de l’utilisateur
          </TabsTrigger>
        </TabsList>
        <TabsContent className="pl-8 pt-4" value="user">
          <div className="flex flex-col gap-4 p-6 border rounded-lg shadow-lg max-w-sm">
            <div className="flex justify-center mb-4">
              <Avatar className="size-full rounded-lg">
                <AvatarImage
                  src={`https://api.dicebear.com/9.x/initials/svg?radius=50&backgroundColor=FBBA00&size=96&seed=${initial}`}
                  alt="Avatar"
                />
                <AvatarFallback className="rounded-lg">
                  {initial}
                </AvatarFallback>
              </Avatar>
            </div>
            <div>
              <div className="font-bold">Nom</div>
              <div>{TabsRecapProps?.name}</div>
            </div>
            <div>
              <div className="font-bold">Prénom</div>
              <div>{TabsRecapProps?.firstName}</div>
            </div>
            <div>
              <div className="font-bold">Nom d&apos;utilisateur</div>
              <div>{TabsRecapProps?.username}</div>
            </div>
            <div>
              <div className="font-bold">N° de téléphone</div>
              <div>{TabsRecapProps?.phone}</div>
            </div>
            <div>
              <div className="font-bold">Email</div>
              <div>{TabsRecapProps?.email}</div>
            </div>
            <div>
              <div className="font-bold">Adresse</div>
              <div>
                {TabsRecapProps?.address} {TabsRecapProps?.city}{" "}
                {TabsRecapProps?.country}
              </div>
            </div>
            <div>
              <div className="font-bold">Établissement</div>
              <div>{TabsRecapProps?.establishment}</div>
            </div>
            <div>
              <div className="font-bold">Accès</div>
              <div>{translateAccess(String(TabsRecapProps?.access))}</div>
            </div>
          </div>
        </TabsContent>
        <TabsContent
          className="pl-8 pt-4 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-2 "
          value="modules"
        >
          {TabsRecapProps?.modules.map((module) => (
            <div
              key={module.name}
              className="gap-4 mb-4 mr-6 p-4 border rounded-lg shadow-lg"
            >
              <div>
                <div className="font-bold">Nom du module</div>
                <div>{module.name}</div>
              </div>
              <div>
                <div className="font-bold">Promo</div>
                <div>{module.promo}</div>
              </div>
              <div>
                <div className="font-bold">Semestre</div>
                <div>{module.semester}</div>
              </div>
              <div>
                <div className="font-bold">Coefficient</div>
                <div>{module.coeff}</div>
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </>
  );
};

export default TabsRecap;
