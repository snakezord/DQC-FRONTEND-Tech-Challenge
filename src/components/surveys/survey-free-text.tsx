import {
  CheckboxVisibility,
  DetailsList,
  IGroup,
  Stack,
} from "@fluentui/react";
import { FunctionComponent } from "react";

export const SurveyFreeText: FunctionComponent<{
  items: string[];
  groups: IGroup[];
}> = ({ items, groups }) => {
  const _onRenderColumn = (item?: any) => {
    return <div data-is-focusable={true}>{item}</div>;
  };
  return (
    <Stack data-testid="FreeTextTable">
      <DetailsList
        checkboxVisibility={CheckboxVisibility.hidden}
        items={items}
        columns={[{ key: "Free text", name: "Text answers", minWidth: 200 }]}
        groups={groups}
        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
        ariaLabelForSelectionColumn="Toggle selection"
        checkButtonAriaLabel="select row"
        checkButtonGroupAriaLabel="select section"
        groupProps={{
          isAllGroupsCollapsed: true,
          showEmptyGroups: true,
        }}
        onRenderItemColumn={_onRenderColumn}
        compact={true}
      />
    </Stack>
  );
};
