import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};
const Aboutpage = () => {
  return (
    <section className="container m-auto">
      <h1 className="text-3xl p-5 font-bold text-gray-800">About This App</h1>
      <p className="px-5 text-gray-600 text-xl ">
        The bes web hosting solution for your online success
      </p>
    </section>
  );
};

export default Aboutpage;
