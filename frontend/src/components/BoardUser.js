import React, { useState, useEffect } from "react";

import { getQuestions, postScore } from "../services/user.service";

import '../styles/quiz.css';

const BoardUser = () => {
  const [data, setData] = useState()
  const [goodAnswearsCount, setGoodAnswearsCount] = useState(false)
  useEffect(async () => {
    const data = await getQuestions();
    setData(data)
    console.log(data)
  }, []);

  const setUserAnswear = (index, answearIndex) => (e) => {
    const { checked } = e.target;
    const newData = data;
    newData[index].answears[answearIndex].userAnswear = checked;
  }

  const checkAnswears = () => {
    let count = 0;
    data.forEach(question => {
      question.answears.forEach(ans => {
        if(ans.userAnswear !== undefined && ans.userAnswear === ans.isCorrect && ans.isCorrect === true){
          count++;
        }
      })
    })
    postScore(count)
    setGoodAnswearsCount(count)
  }

  return (
    <div>Data:
      {data && data.map((question, index) => {
        let data = '';
        if (question.img.data) {
          data = Buffer.from(question.img.data.data).toString()
        }

        return (<div>
          <h2>Pytanie nr {index + 1}</h2>
          <p>{question.question}</p>
          <img src={data} />
          {
            question.answears.map((ans, answearIndex) => {
              return (<div>
                <p>{ans.answear}</p>
                <input type="checkbox" onClick={setUserAnswear(index, answearIndex)} />
                </div>)
            })
          }
        </div>)

      })}

      <button onClick={checkAnswears}>Sprawdz wynik</button>

      {goodAnswearsCount != false && (
        <div>Twoj wynik to: {goodAnswearsCount}</div>
      )}
    </div>

  );
};

export default BoardUser;