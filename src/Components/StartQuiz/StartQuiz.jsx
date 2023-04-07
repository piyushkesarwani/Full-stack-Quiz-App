import React, { useState, useEffect } from "react";
import { db } from "../../Firebase";
import { getDatabase, ref, child, get, onValue } from "firebase/database";
import { Loading } from "../Loading";
import { useNavigate } from "react-router-dom";

export const StartQuiz = () => {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizDatas, setQuizDatas] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  let intervalId; // time limit of the quiz in seconds
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleQuestion = (ans) => {
    const currentQuestion = quizQuestions[currentQuestionIndex];

    if (currentQuestion.answer === ans) {
      setScore(score + Number(quizDatas.points));
      // setCurrentQuestionIndex((prev) => prev + 1);
    }

    if (currentQuestionIndex === quizQuestions.length) {
      setScore(score);
      return endQuiz();
    }
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const showNextQuestion = () => {
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const showPrevQuestion = () => {
    setCurrentQuestionIndex((prev) => prev - 1);
  };

  const currentQuestion = quizQuestions[currentQuestionIndex];
  // console.log("current Question = ", currentQuestion);
  // setTimeLeft(Number(quizDatas.timeLimit));

  useEffect(() => {
    //fetching data from firebase realtime database using onValue()
    // try {
    //   const starCountRef = ref(db, "questions/");
    //   onValue(starCountRef, (snapshot) => {
    //     if (snapshot.exists()) {
    //       const questionData = snapshot.val(); //returns this data object
    //       setQuizQuestions(() => questionData.questions);
    //       console.log(
    //         "questionData is =>",
    //         questionData.questions,
    //         "QuizQuestion is =",
    //         quizQuestions
    //       );
    //     } else {
    //       console.log("No data!");
    //     }
    //   });
    // } catch (error) {
    //   console.error(error);
    // }

    //fetching data from Firebase realtime database using get() method
    const dbRef = ref(db);
    setLoading(true);
    get(child(dbRef, `questions/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const questionData = snapshot.val();
          setQuizQuestions(questionData.questions);
          console.log(
            "snapshot quiz question data =",
            questionData.questions,
            "quiz Questions =",
            quizQuestions
          );
          setLoading(false);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [currentQuestionIndex]);

  useEffect(() => {
    // try {
    //   const starCountRef = ref(db, "users/");
    //   onValue(starCountRef, (snapshot) => {
    //     const usersData = snapshot.val(); //returns this data object
    //     setQuizDatas(() => usersData);
    //     console.log(
    //       "usersData is =>",
    //       usersData,
    //       "Timelimit is =",
    //       quizDatas.timeLimit
    //     );
    //   });
    // } catch (error) {
    //   console.error(error);
    // }

    //fetching data from firebase realtime database using get() method
    const dbRef = ref(db);
    setLoading(true);
    get(child(dbRef, `users/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const usersData = snapshot.val();
          setQuizDatas(usersData);
          console.log(
            "snapshot users data =",
            usersData,
            "QuizDatas =",
            quizDatas
          );
          setTimeLeft(usersData.timeLimit);
          console.log("TimeLimit = ", quizDatas.timeLimit);
          setLoading(false);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      // End the quiz if time runs out
      return endQuiz();
    }

    intervalId = setInterval(() => {
      setTimeLeft((timeLeft) => timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId)
  }, [timeLeft]);

  const endQuiz = () => {
    clearInterval(intervalId);
    setScore(score);
    // alert(
    //   `Quiz ended! Your score is ${score} out of ${
    //     quizQuestions.length * Number(quizDatas.points)
    //   }.`
    // );
  };

  return (
    <>
      {loading && <Loading />}
      {timeLeft === 0 &&
        <div className="flex flex-col justify-center items-center bg-[#5656e9] min-h-[100vh]">
          <div className="w-[50%] h-[50%] bg-white border rounded-lg p-8 m-10">
            <h1 className="font-bold text-3xl text-center">Time's Over!</h1>
            <p className="text-center font-semibold text-xl my-4">
              Your Score is: {score} out of{" "}
              {quizQuestions.length * Number(quizDatas.points)}
            </p>
            <div className="buttons my-4 text-center">
              <button
                onClick={() => location.reload()}
                className="bg-yellow-500 p-3 rounded-lg font-semibold text-black"
              >
                Restart
              </button>
              <button
                onClick={() => navigate("/")}
                className="bg-red-600 ml-4 p-3 rounded-lg font-semibold text-white"
              >
                End Quiz
              </button>
            </div>
          </div>
        </div>
      }{" "}
      {currentQuestionIndex === quizQuestions.length && (
        <div className="flex flex-col justify-center items-center bg-[#5656e9] min-h-[100vh]">
          <div className="w-[50%] h-[50%] bg-white border rounded-lg p-8 m-10">
            <h1 className="font-bold text-3xl text-center">Quiz is Over!</h1>
            <p className="text-center font-semibold text-xl my-4">
              Your Score is: {score} out of{" "}
              {quizQuestions.length * Number(quizDatas.points)}
            </p>
            <div className="buttons my-4 text-center">
              <button
                onClick={() => location.reload()}
                className="bg-yellow-500 p-3 rounded-lg font-semibold text-black"
              >
                Restart
              </button>
              <button
                onClick={() => navigate("/quiz")}
                className="bg-red-600 ml-4 p-3 rounded-lg font-semibold text-white"
              >
                End Quiz
              </button>
            </div>
          </div>
        </div>
      )}
      <section className="flex flex-col justify-center items-center bg-[#5656e9] min-h-[100vh]">
        {loading ? (
          <Loading />
        ) : (
          <div className="w-[50%] h-[50%] bg-white border rounded-lg p-8 m-10">
            <div className="mb-5 mt-2 flex flex-row justify-between items-center">
              <h2 className="font-semibold text-2xl">{quizDatas.quizName}</h2>
              <p className="font-semibold text-md">
                Time Left: {timeLeft} seconds
              </p>
            </div>
            <hr className="text-blue-700" />
            <div className="singleQuestion ">
              <div className="flex justify-between w-full items-center">
                <h2 className="font-bold text-2xl w-full mt-5 my-4">
                  {currentQuestionIndex + 1}.{" "}
                  {currentQuestion && currentQuestion.question}
                </h2>
                <p className="text-md font-semibold">[{quizDatas.points}]</p>
              </div>
              <div className="optionsContainer mb-4">
                {currentQuestion &&
                  currentQuestion.options.map((option, id) => {
                    return (
                      <button
                        className="bg-blue-700 my-5 w-[100%] p-3 rounded-lg font-semibold text-white hover:bg-blue-400 active:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300"
                        key={id}
                        onClick={() => handleQuestion(option)}
                      >
                        {option}
                      </button>
                    );
                  })}
              </div>
              <hr />
              <div className="mt-4 flex flex-row justify-between items-center">
                <p className="font-semibold text-lg">
                  {currentQuestionIndex + 1} of {quizQuestions.length} Questions
                </p>
                <div className="">
                  {currentQuestionIndex === 0 ? (
                    <>
                      {/* <button
                          onClick={showPrevQuestion}
                          className="bg-yellow-500 mr-6 p-3 rounded-lg font-semibold text-black"
                        >
                          Prev Question
                        </button> */}
                    </>
                  ) : (
                    <>
                      <button
                        onClick={showPrevQuestion}
                        className="bg-yellow-500 mr-6 p-3 rounded-lg font-semibold text-black"
                      >
                        Prev Question
                      </button>
                    </>
                  )}
                  {currentQuestionIndex === quizQuestions.length - 1 ? (
                    <>
                      <button
                        onClick={showNextQuestion}
                        className="bg-green-700 p-3 rounded-lg font-semibold text-white"
                      >
                        Finish Quiz
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={showNextQuestion}
                        className="bg-green-700 p-3 rounded-lg font-semibold text-white"
                      >
                        Next Question
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};
