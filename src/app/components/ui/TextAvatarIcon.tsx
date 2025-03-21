export default function TextAvatarIcon({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}) {
  return (
    <div className="flex flex-row text-left text-sm leading-tight w-full ml-1">
      <p className="mr-1">{firstName}</p>
      <p>{lastName}</p>
    </div>
  );
}
