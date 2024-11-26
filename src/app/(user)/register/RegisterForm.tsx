"use client";
import SpinnerButtton from "@/components/SpinnerButtton";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "") return toast.error("email is reqiure");
    if (password === "") return toast.error("password is reqiure");
    if (userName === "") return toast.error("userName is reqiure");
    try {
      setLoading(true);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const res = await axios.post(`${DOMAIN}/api/users/register`, {
        userName: userName,
        email: email,
        password: password,
      });

      router.replace("/");
      setLoading(false);
      router.refresh();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div>
      <form className="flex flex-col" onSubmit={formSubmitHandler}>
        <input
          type="text"
          placeholder="Enter your Name"
          className="mb-4 border rounded px-2 py-1 text-xl"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <input
          type="email"
          placeholder="Enter your email"
          className="mb-4 border rounded px-2 py-1 text-xl"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Enter your password"
          className="mb-4 border rounded  px-2 py-1 text-xl"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          type="submit"
          className="text-xl text-white bg-blue-800 p-2  rounded-lg font-bold "
          disabled={loading}
        >
          {loading ? <SpinnerButtton /> : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
