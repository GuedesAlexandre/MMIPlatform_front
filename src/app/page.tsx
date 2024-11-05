"use client";
import { useAuthStore } from "./store/AuthRepository";

export default function Home() {
  const { user, fetchAuthToken } = useAuthStore();
  const temp = () => fetchAuthToken();
  return (
    <div>
      <h1 className="text-4xl bg-red-900">Hello World !</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={temp}
      >
        test
      </button>
      <p>{user?.user.id}</p>
      <p>{user?.user.name}</p>
      <p>{user?.user.userName}</p>
      <p>{user?.user.access}</p>
      <p>{user?.user.email}</p>
      <p>{user?.user.establishment}</p>
      <p>{user?.user.phone}</p>
      <p>{user?.user.country}</p>
    </div>
  );
}
