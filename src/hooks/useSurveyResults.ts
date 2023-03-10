import { useEffect, useState } from "react";
import { Survey } from "../@types/data";
import { Mocked_API_Call } from "../api/mocked";
import SURVEY_RESULTS from "../data/survey_results.json";

export const useSurveyResults = () => {
  const [survey, setSurvey] = useState<Survey>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getSurvey = async () => {
      const survey = await Mocked_API_Call<Survey>(SURVEY_RESULTS as Survey);
      setSurvey(survey);
    };
    try {
      setLoading(true);
      getSurvey();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, []);

  return { survey, loading };
};
