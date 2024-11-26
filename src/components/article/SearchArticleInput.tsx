"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
const SearchArticleInput = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/article/search?searchText=${searchText}`);
  };
  return (
    <div>
      <form
        className="my-5 w-full md:w-2/3 m-auto  "
        onSubmit={formSubmitHandler}
      >
        <input
          type="search"
          placeholder="Search for article"
          className="w-full border rounded p-3  border-gray-600 outline-none text-xl   text-gray-900"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
      </form>
    </div>
  );
};

export default SearchArticleInput;
