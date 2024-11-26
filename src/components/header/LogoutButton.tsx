"use client";
import axios from "axios";
import { DOMAIN } from "@/utils/constants";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
const LogoutButton = () => {
  const router = useRouter();
  const logoutHandler = async () => {
    try {
      await axios.get(`${DOMAIN}/api/users/logout`);
      router.replace("/");
      router.refresh();
    } catch (error) {
      toast.warning("Something went wrong");
      console.log(error);
    }
  };
  return (
    <button
      className="bg-gray-700 text-gray-200 px-2 py-1 rounded"
      onClick={logoutHandler}
    >
      Log out
    </button>
  );
};

export default LogoutButton;
