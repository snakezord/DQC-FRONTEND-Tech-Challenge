export interface Survey {
  survey_title: string;
  created_at: string;
  questions: Question<QuestionType>[];
}

export interface Question<T> {
  question_text: string;
  type: T;
  responses: T[];
}

type QuestionType = "number" | "text";
export type QuestionTypeCasted = number | string;
