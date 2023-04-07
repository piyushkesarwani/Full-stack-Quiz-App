import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { collection, addDoc, getDocs, query, orderBy, limit, onSnapshot} from "firebase/firestore";
import {db} from '../../Firebase'
import { getDatabase, ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";

export const Quiz = () => {
  const [quizData, setQuizData] = useState({
    quizName: "",
    desc: "",
    timeLimit: "",
    points: "",
  });

  const navigate = useNavigate();

  let name, value;
  const onChangeData = (e) => {
    name = e.target.name;
    value = e.target.value;
    setQuizData({ ...quizData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (
      quizData.quizName &&
      quizData.desc &&
      quizData.timeLimit &&
      quizData.points
    ) {
      // setQuizName("");
      // setDesc("");
      // setTimeLimit("");
      // setPoints("");
      setQuizData({ quizName: "", desc: "", timeLimit: "", points: "" });
      console.log("QuizData =", quizData);
    } else {
      alert("The fields cannot be empty");
    }

    try {
      await set(ref(db, "users/"), {
        quizName: quizData.quizName,
        desc: quizData.desc,
        timeLimit: quizData.timeLimit,
        points: quizData.points,
      });
      alert('The quiz data is saved Successfully!')
      navigate('/quiz/user')
    } catch (error) {
      console.error(error);
    }

    // try {
    //   const docRef = await addDoc(collection(db, "quizData"), {
    //     quizData: quizData,
    //   });
    //   console.log("Document written with ID: ", docRef.id);
    //   alert("The Quiz Data is saved Successfully!");
    // } catch (e) {
    //   console.error("Error adding document: ", e);
    // }
  };

  return (
    <>
      <section className="bg-[#F3F4F6] h-[100vh] flex flex-col justify-center items-center">
        <h2 className="font-bold text-center text-3xl my-2">Create a Quiz</h2>
        <div className="quizForm border rounded-lg bg-white w-[60vh] h-[auto] p-10">
          <div className="quizElements">
            <div className="inputGroup my-4">
              <label className="text-black font-semibold">
                Name of the Quiz
              </label>
              <br />
              <input
                type="text"
                name="quizName"
                value={quizData.quizName}
                onChange={onChangeData}
                className="border w-[100%] rounded-md p-1 my-1 bg-[#E5E7EB]"
              />
            </div>
            <div className="inputGroup my-4">
              <label className="text-black font-semibold">Description</label>
              <br />
              <textarea
                rows="7"
                cols="20"
                name="desc"
                value={quizData.desc}
                onChange={onChangeData}
                className="border w-[100%] rounded-md p-1 my-1 bg-[#E5E7EB]"
              />
            </div>
            <div className="inputGroup my-4">
              <label className="text-black font-semibold">Time Limit (In Seconds)</label>
              <br />
              <input
                type="number"
                name="timeLimit"
                value={quizData.timeLimit}
                onChange={onChangeData}
                className="border w-[100%] rounded-md p-1 my-1 bg-[#E5E7EB]"
              />
            </div>
            <div className="inputGroup my-4">
              <label className="text-black font-semibold">
                Points for each Correct Answer
              </label>
              <br />
              <input
                name="points"
                value={quizData.points}
                onChange={onChangeData}
                type="number"
                className="border w-[100%] rounded-md p-1 my-1 bg-[#E5E7EB]"
              />
            </div>
            {/* <button className="p-2 font-semibold bg-yellow-400 rounded-lg w-[100%]">
              Start Quiz
            </button>
            <p className="text-center">or</p> */}
            <button
              type="submit"
              onClick={onSubmit}
              className="p-2 font-semibold bg-yellow-400 rounded-lg w-[100%]"
            >
              Submit
            </button>
            {/* <Link to="/quiz/user">
              <button
                type="button"
                className="p-2 font-semibold bg-blue-400 rounded-lg w-[100%] mt-3"
              >
                Next Step
              </button>
            </Link> */}
          </div>
        </div>
      </section>
    </>
  );
};
