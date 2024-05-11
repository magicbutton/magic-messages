export interface Unanswered {
  Result: Result[];
}

export interface Result {
  unanswered: number;
}

export const unansweredSQL = (survey_id: string) => `
SELECT count(*) AS unanswered FROM public.surveyresponse WHERE survey_id = ${survey_id} AND truefalse1 IS NULL
`;
