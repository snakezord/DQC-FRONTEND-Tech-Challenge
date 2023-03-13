import { useEffect, useState } from "react";
import { Survey } from "../@types/data";
import { Mocked_API_Call } from "../api/mocked";

export const useSurveyResults = () => {
  const [survey, setSurvey] = useState<Survey>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSurvey = async () => {
      const SURVEY_RESULTS = require("../data/survey_results.json");
      const survey = await Mocked_API_Call<Survey>(SURVEY_RESULTS as Survey);
      setSurvey(survey);
    };

    getSurvey()
      .catch(() => setLoading(false))
      .finally(() => setLoading(false));
  }, []);

  return { survey, loading };
};
