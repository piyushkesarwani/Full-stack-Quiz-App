import React, { useState, useEffect } from "react";
// import { collection, getDocs, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { db } from "../../Firebase";
import { getDatabase, ref, child, get, onValue } from "firebase/database";
import { Link } from "react-router-dom";

export const User = () => {
  const [quizDatas, setQuizDatas] = useState({});
  const [questions, setQuestions] = useState({
    id: new Date().toString(),
    question: "",
    options: ["", "", "", ""],
    answer: "",
  });
  let data;

  const fetchPost = async () => {
    // await getDocs(collection(db, "quizData")).then((querySnapshot) => {
    //     const newData = querySnapshot.docs.map((doc) => ({
    //       ...doc.data(),
    //       id: doc.id,
    //     }));
    //   setQuizDatas(newData);
    //   console.log("Quiz Datas is ->", quizDatas, "NewData is ", newData);
    // });

    try {
      const starCountRef = await ref(db, "users/");
      onValue(starCountRef, (snapshot) => {
        data = snapshot.val();
        setQuizDatas(data);
        console.log("data is =>", data, "QuizDatas is =", quizDatas);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <>
      <section className="container mx-auto flex flex-col justify-center items-center min-h-[90vh]">
        <div className="mainForm border rounded-lg bg-white w-[60vh] h-[auto] p-6">
          <div className="formElements">
            <div className="flex flex-row justify-between items-center">
              <h2 className="font-bold text-3xl">Quiz Details</h2>
              <Link to="/quiz">
                <button className="bg-yellow-500 border p-2 rounded-md font-semibold">
                  Back
                </button>
              </Link>
            </div>
            <div className="my-6">
              <label className="font-bold">Name of the Quiz</label>
              <h2 className="font-regular text-md">{quizDatas.quizName}</h2>
            </div>
            <div className="my-6">
              <label className="font-bold">Description of the Quiz</label>
              <h2 className="font-regular text-md">{quizDatas.desc}</h2>
            </div>
            <div className="my-6">
              <label className="font-bold">Time Limit</label>
              <h2 className="font-regular text-md">
                {quizDatas.timeLimit} mins
              </h2>
            </div>
            <div className="my-6">
              <label className="font-bold">Points/Grading System</label>
              <h2 className="font-regular text-md">
                {quizDatas.points} points for each correct answer
              </h2>
            </div>
            {/* <Link to="/quiz/start">
              <button className=" bg-green-700 text-md p-2 text-white rounded-lg font-semibold">
                Start Quiz
              </button>
            </Link> */}
            <Link to="/quiz/edit">
              <button className="bg-orange-500 text-md p-2 rounded-lg font-semibold">
                Edit Quiz
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
