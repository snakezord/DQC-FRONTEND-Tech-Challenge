interface Survey {
  survey_title: string;
  created_at: Date;
  questions: Question[];
}

interface Question {
  question_text: String;
  type: QuestionType;
  responses: QuestionType[];
}

type QuestionType = "number" | "text";
