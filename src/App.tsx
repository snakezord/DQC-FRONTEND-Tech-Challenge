import { FontIcon, initializeIcons, Stack, Text } from "@fluentui/react";
import { SurveyFreeText } from "./components/surveys/survey-free-text";
import { useSurveyResults } from "./hooks/useSurveyResults";
import { useAggregatedData } from "./hooks/useAggregatedData";
initializeIcons();

function App() {
  const { survey, loading } = useSurveyResults();

  const {
    aggregatedOpinionScaleQuestions,
    freeTextQuestions,
    totalSumOfRatings,
    ratingRatioSum,
    potentialMaxRatingSum,
    happinessRatio,
  } = useAggregatedData(survey);

  const happinessScore = happinessRatio * 100;

  console.log({
    aggregatedOpinionScaleQuestions,
    freeTextQuestions,
    totalSumOfRatings,
    potentialMaxRatingSum,
    ratingRatioSum,
    happinessRatio,
  });

  return (
    <Stack style={{ margin: 20 }}>
      <h1>
        <FontIcon iconName="ClipboardList" style={{ marginRight: "5px" }} />
        {survey?.survey_title}
      </h1>

      <h1 data-testid="happinessScore">
        <FontIcon iconName="ChatBot" style={{ marginRight: "5px" }} />
        {happinessScore} / 100
      </h1>
      <Stack>
        <SurveyFreeText />
      </Stack>
    </Stack>
  );
}

export default App;
