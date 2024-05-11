"use client";

import { Overview } from "../../components/stats";

import { Answers, answersSQL } from "./models/Answers";
import { Unanswered, unansweredSQL } from "./models/Unanswered";
import { useEffect, useState } from "react";
import { Questions, questionsSQL } from "./models/Questions";
import { useSQLSelect } from "@/koksmat/usesqlselect";

export default function SurveyDetails(props: {
  params: { survey_id: string };
}) {
  const { survey_id } = props.params;
  const [data, setdata] = useState<any>();
  const [loaded, setloaded] = useState(false);
  const answers = useSQLSelect<Answers>(
    "magic-messages.app",
    answersSQL(survey_id)
  );

  const unanswered = useSQLSelect<Unanswered>(
    "magic-messages.app",
    unansweredSQL(survey_id)
  );
  const questions = useSQLSelect<Questions>(
    "magic-messages.app",
    questionsSQL(survey_id)
  );
  useEffect(() => {
    if (loaded) return;

    if (answers?.data == undefined) {
      return;
    }
    if (unanswered?.data == undefined) {
      return;
    }
    if (questions?.data == undefined) {
      return;
    }

    const yes = answers.data?.Result.find((r) => r.truefalse1 === true)?.count;
    const no = answers.data?.Result.find((r) => r.truefalse1 === false)?.count;
    const unansweredCount = unanswered.data?.Result[0].unanswered;

    setdata([
      {
        name: "Yes",

        Answers: yes,
        amt: 2400,
      },
      {
        name: "No",

        Answers: no,
        amt: 2210,
      },
      {
        name: "n.a",

        Answers: unansweredCount,
        amt: 2210,
      },
    ]);
    setloaded(true);
  }, [answers, unanswered, questions]);

  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div>
        {questions.data?.Result.map((q, key) => (
          <div key={key}>
            <div className="text-2xl">{q.displayname}</div>
            <div className="text-2xl">{q.description}</div>
            <div className="text-4xl text-center p-6">{q.truefalse1}</div>
          </div>
        ))}
      </div>
      <Overview data={data} datakey="Answers" />
      {/* 
      <pre>
        {JSON.stringify(
          {
            survey_id,
            questions,
            answers,
            unanswered,
          },
          null,
          2
        )}
      </pre> */}
    </div>
  );
}
