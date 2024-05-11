"use client";

export interface Questions {
  Result: Result[];
}

export interface Result {
  displayname: string;
  description: string;
  truefalse1: string;
}

export const questionsSQL = (
  survey_id: string
) => ` SELECT displayname,description, truefalse1 FROM public.survey WHERE id =  ${survey_id}

`;
