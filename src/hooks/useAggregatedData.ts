import { useMemo } from "react";
import { Survey, Question } from "../@types/data";

interface AggregatedOpinion {
  question: string;
  participants: number;
  sumOfRatings: number;
  potentialMaxRating: number;
  ratingRatio: number;
}

const MAX_RATING = 5;

interface AggregatedData {
  freeTextQuestions: Question<string>[];
  aggregatedOpinionScaleQuestions: AggregatedOpinion[];
  happinessRatio: number;
  potentialMaxRatingSum: number;
  ratingRatioSum: number;
  totalSumOfRatings: number;
  totalParticipants: number;
}

export const useAggregatedData = (survey: Survey | undefined): AggregatedData =>
  useMemo(() => {
    if (!survey)
      return {
        freeTextQuestions: [],
        aggregatedOpinionScaleQuestions: [],
        totalSum: 0,
        happinessRatio: 0,
        potentialMaxRatingSum: 0,
        ratingRatioSum: 0,
        totalSumOfRatings: 0,
        totalParticipants: 0,
      };

    const freeTextQuestions = survey.questions.filter(
      (question) => question.type === "text"
    ) as Question<string>[];

    const opinionScaleQuestions = survey.questions.filter(
      (question) => question.type === "number"
    ) as unknown as Question<number>[];

    const aggregatedOpinionScaleQuestions: AggregatedOpinion[] =
      opinionScaleQuestions.map((question) => {
        const participants = question.responses.length;
        const sumOfRatings = sumAllValues(question.responses);
        const potentialMaxRating = MAX_RATING * participants;
        return {
          question: question.question_text,
          participants,
          sumOfRatings,
          potentialMaxRating,
          ratingRatio: sumOfRatings / potentialMaxRating,
        };
      });

    const potentialMaxRatingSum = sumAllValues(
      aggregatedOpinionScaleQuestions.map((q) => q.potentialMaxRating)
    );

    const totalSumOfRatings = sumAllValues(
      aggregatedOpinionScaleQuestions.map((q) => q.sumOfRatings)
    );

    const ratingRatioSum = sumAllValues(
      aggregatedOpinionScaleQuestions.map((q) => q.ratingRatio)
    );

    const totalParticipants = Math.max(
      ...aggregatedOpinionScaleQuestions.map((q) => q.participants)
    );

    const happinessRatio = totalSumOfRatings / potentialMaxRatingSum;

    return {
      freeTextQuestions,
      aggregatedOpinionScaleQuestions,
      totalSumOfRatings,
      potentialMaxRatingSum,
      ratingRatioSum,
      happinessRatio,
      totalParticipants,
    };
  }, [survey]);

const sumAllValues = (values: number[]) =>
  values.reduce((prev, curr) => prev + curr, 0);
