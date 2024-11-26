import React from "react";
import RegisterForm from "./RegisterForm";

const RegisterPage = () => {
  return (
    <section className="m-auto container px-7 flex items-center justify-center fix-height">
      <div className="m-auto bg-white rounded-lg p-5 w-full md:w-2/3">
        <h1 className="text-3xl font-bold text-gray-800 mb-5">
          Create New Account
        </h1>
        <RegisterForm />
      </div>
    </section>
  );
};

export default RegisterPage;
