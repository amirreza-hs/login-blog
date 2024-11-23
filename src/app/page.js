"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuthStore from "../stores/useAuthStore"; 

export default function Login() {
  const { login } = useAuthStore();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { data: userData, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await fetch("/user.json");
      if (!response.ok) throw new Error("Failed to fetch data");
      return response.json();
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (isLoading) return;
    if (userData?.username === username && userData?.password === password) {
      login(); 
      router.push("/blog");
    } else {
      console.log("error");
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 mt-60">
      <h2 className="text-xl font-bold">Login</h2>
      <form className="flex flex-col gap-4" onSubmit={handleLogin}>
        <div className="flex flex-col gap-1">
          <span>username</span>
          <input
            className="text-black"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span>password</span>
          <input
            className="text-black"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="p-2">
          login
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
