import React, { useState, useEffect } from "react";
import { db } from "../../Firebase";
import { getDatabase, ref, set, child, get, onValue } from "firebase/database";
import { Link } from "react-router-dom";

export const EditQuiz = () => {
  const [quizDatas, setQuizDatas] = useState({});
  const [questions, setQuestions] = useState([]);
  const [mcq, setMCQ] = useState([]);
  let data;

  const handleAddQuestion = () => {
    setQuestions((prevState) => [
      ...prevState,
      {
        id: new Date().toString(),
        question: "",
        options: ["", "", "", ""],
        answer: "",
      },
    ]);
  };

  const handleDeleteQuestion = (index) => {
    setQuestions((prevState) => prevState.filter((_, i) => i !== index));
  };

  const handleQuestionChange = (index, value) => {
    setQuestions((prevState) => {
      const updatedQuestions = [...prevState];
      updatedQuestions[index].question = value;
      return updatedQuestions;
    });
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    setQuestions((prevState) => {
      const updatedQuestions = [...prevState];
      updatedQuestions[questionIndex].options[optionIndex] = value;
      return updatedQuestions;
    });
  };

  const handleAnswerChange = (index, value) => {
    setQuestions((prevState) => {
      const updatedQuestions = [...prevState];
      updatedQuestions[index].answer = value;
      return updatedQuestions;
    });
  };

  const fetchQuizData = async () => {
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

  const submitQuestion = async (e) => {
    e.preventDefault();

    try {
      await set(ref(db, "questions/"), {
        questions,
      });
      alert("Your data were saved Successfully! Now you can play the Quiz");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchQuizData();
  }, []);

  return (
    <>
      <section className="container mx-auto pt-12 px-20 border">
        <div className="flex flex-row justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">{quizDatas.quizName}</h1>
            <p className="italic text-[grey] font-semibold text-lg">
              (Here you can add/delete/edit the questions and answers)
            </p>
          </div>
          {questions.length > 0 && (
            <Link to="/quiz/start">
              <button className="bg-green-700 my-5 p-3 rounded-lg mx-5 font-semibold text-white">
                Start the Quiz
              </button>
            </Link>
          )}
        </div>
        <div className="mt-10">
          {/* <h2 className="text-black font-semibold text-2xl">Quiz App</h2> */}
          {questions.map((question, index) => (
            <div key={index} className="bg-red-100 p-3 rounded-lg my-3 border">
              <div className="flex flex-row justify-between items-center">
                <h2 className="font-semibold text-black text-2xl">
                  Question {index + 1}
                </h2>
                <button
                  className="bg-red-500 my-5 p-3 rounded-lg font-semibold text-white"
                  onClick={() => handleDeleteQuestion(index)}
                >
                  Delete Question
                </button>
              </div>
              <br />
              <div className="my-1">
                <label className="text-black font-semibold">Question:</label>
                <br />
                <input
                  className="border w-[50%] rounded-md p-1 my-1 bg-[#FFFFFF]"
                  type="text"
                  value={question.question}
                  placeholder="Enter Question prompt"
                  onChange={(e) => handleQuestionChange(index, e.target.value)}
                />
              </div>
              <br />
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex}>
                  <label className="text-black font-semibold">
                    Option {optionIndex + 1}:
                  </label>
                  <br />
                  <input
                    className="border w-[20%] rounded-md p-1 my-1 bg-[#FFFFFF]"
                    type="text"
                    value={option}
                    onChange={(e) =>
                      handleOptionChange(index, optionIndex, e.target.value)
                    }
                  />
                </div>
              ))}
              <label className="text-black font-semibold">Answer:</label>
              <br />
              <input
                className="border w-[20%] rounded-md p-1 my-1 bg-[#FFFFFF]"
                type="text"
                value={question.answer}
                placeholder="Enter Correct answer"
                onChange={(e) => handleAnswerChange(index, e.target.value)}
              />
              <hr />
            </div>
          ))}
          <button
            className="bg-yellow-500 my-5 p-3 rounded-lg font-semibold text-black"
            onClick={handleAddQuestion}
          >
            Add Question(s)
          </button>
          <button
            onClick={submitQuestion}
            className="bg-green-700 my-5 p-3 rounded-lg mx-5 font-semibold text-white"
          >
            Save
          </button>
        </div>
      </section>
    </>
  );
};
