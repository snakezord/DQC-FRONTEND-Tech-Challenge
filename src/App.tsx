import {
  FontIcon,
  initializeIcons,
  Stack,
  Text,
  IGroup,
} from "@fluentui/react";
import moment from "moment";

import { SurveyFreeText } from "./components/surveys/survey-free-text";
import { useSurveyResults } from "./hooks/useSurveyResults";
import { useAggregatedData } from "./hooks/useAggregatedData";
initializeIcons();

function App() {
  const { survey, loading } = useSurveyResults();

  const {
    freeTextQuestions,
    // aggregatedOpinionScaleQuestions,
    // totalSumOfRatings,
    // ratingRatioSum,
    // potentialMaxRatingSum,
    happinessRatio,
    totalParticipants,
  } = useAggregatedData(survey);

  const happinessScore = happinessRatio * 100;

  const surveyDate = survey
    ? moment(new Date(survey.created_at)).format("DD.MM.yyyy")
    : "--:--:----";

  return (
    <Stack style={{ margin: 20 }}>
      <h1>
        <FontIcon iconName="ClipboardList" style={{ marginRight: "5px" }} />
        {survey?.survey_title || "---------"}
      </h1>

      <Text>
        This survey was started on {surveyDate}. Overall, {totalParticipants}{" "}
        people participated in the survey.
      </Text>

      <h1 data-testid="happinessScore">
        <FontIcon iconName="ChatBot" style={{ marginRight: "5px" }} />
        {happinessScore} / 100
      </h1>
      <Stack>
        <SurveyFreeText
          items={freeTextQuestions.map((q) => q.responses).flat()}
          groups={
            loading
              ? [{ name: "Loading...", startIndex: 0, count: 0 } as IGroup]
              : freeTextQuestions.map(
                  (q, i) =>
                    ({
                      name: q.question_text,
                      startIndex: i,
                      count: q.responses.length,
                    } as IGroup)
                )
          }
        />
      </Stack>
    </Stack>
  );
}

export default App;
