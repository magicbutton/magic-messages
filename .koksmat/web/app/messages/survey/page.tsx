"use client";

export interface Root {
  totalPages: number;
  totalItems: number;
  currentPage: number;
  items: Item[];
}

export interface Item {
  id: number;
  created_at: string;
  updated_at: string;
  tenant: string;
  name: string;
  description: string;
  url: string;
  key: string;
  displayname: string;
  owner_id: number;
  campaign_id: number;
  question1: string;
  question2: string;
  question3: string;
  question4: string;
  question5: string;
  question6: string;
  question7: string;
  question8: string;
  question9: string;
  truefalse1: string;
  truefalse2: string;
  truefalse3: string;
  datetime1: string;
  datetime2: string;
  datetime3: string;
  number1: string;
  number2: string;
  number3: string;
  questions: any;
}

import { useService } from "@/koksmat/useservice";
import ErrorMessage from "@/koksmat/components/errormessage";
import { useEffect } from "react";
import Link from "next/link";

export default function ResponseSurveys(props: {
  params: { owner_id: string };
}) {
  const { owner_id } = props.params;
  const { data, error, isLoading } = useService<Root>(
    "magic-messages.survey",
    ["search", "%"],
    "",
    600,
    "x"
  );
  if (error) {
    return <ErrorMessage message={error} />;
  }
  const surveys: Item[] = data?.items!;
  return (
    <div>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold  sm:text-4xl md:text-5xl">Surveys</h1>
      </div>
      <div className="mt-6">{!data && <div>Loading...</div>}</div>
      <div className="grid grid-cols-1 gap-4 mt-6">
        {surveys?.map((survey) => (
          <div key={survey.id}>
            <Link href={`/apps/survey/${survey.id}`}>{survey.displayname}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
