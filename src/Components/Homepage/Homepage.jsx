import React from "react";
import { Link } from "react-router-dom";
import { Footer } from "../Footer/Footer";

export const Homepage = () => {
  return (
    <>
      <section className="flex flex-col justify-center items-center min-h-[100vh] bg-black">
        <div className="w-[60%] h-auto border bg-white p-6 rounded-2xl">
          <h2 className="text-dark font-bold text-xl text-center w-full">
            Welcome to Quizlify - An app where you can create your own Custom
            quiz, edit it, and play as you want. Let's get started
          </h2>
          <div className="flex justify-around items-center mt-4 mb-3">
            <Link to="/quiz">
              <button className="p-2 font-semibold bg-blue-400 rounded-lg">
                Get Started
              </button>
            </Link>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
};
