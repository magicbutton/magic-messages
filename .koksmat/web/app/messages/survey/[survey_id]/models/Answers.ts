"use client";

export interface Answers {
  Result: Result[];
}

export interface Result {
  truefalse1: boolean;
  count: number;
}

export const answersSQL = (
  survey_id: string
) => ` SELECT truefalse1, count(truefalse1) FROM
(SELECT truefalse1 FROM public.surveyresponse WHERE survey_id =  ${survey_id} AND truefalse1 IS NOT NULL) AS virtual_table 
GROUP BY truefalse1
`;
