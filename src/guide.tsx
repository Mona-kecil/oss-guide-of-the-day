import { Action, ActionPanel, Detail, Icon, LocalStorage, popToRoot } from "@raycast/api";
import { useEffect, useState } from "react";
import { guides } from "./data/guides";

const DISMISSED_DATE_KEY = "dismissed-date";
const DAY_IN_MILLISECONDS = 86_400_000;

function localDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function greatestCommonDivisor(left: number, right: number): number {
  return right === 0 ? left : greatestCommonDivisor(right, left % right);
}

function rotationStep(length: number) {
  let step = Math.max(1, Math.floor(length * 0.382));
  while (greatestCommonDivisor(step, length) !== 1) step += 1;
  return step;
}

function guideFor(dateKey: string) {
  const dayNumber = Math.floor(new Date(`${dateKey}T00:00:00Z`).getTime() / DAY_IN_MILLISECONDS);
  // Walk every entry once per cycle while keeping adjacent days far apart in the source dataset.
  const index = (((dayNumber * rotationStep(guides.length)) % guides.length) + guides.length) % guides.length;
  return guides[index];
}

export default function Command() {
  const today = localDateKey();
  const [dismissed, setDismissed] = useState<boolean>();

  useEffect(() => {
    LocalStorage.getItem<string>(DISMISSED_DATE_KEY).then((date) => setDismissed(date === today));
  }, [today]);

  async function dismiss() {
    await LocalStorage.setItem(DISMISSED_DATE_KEY, today);
    setDismissed(true);
    await popToRoot();
  }

  if (dismissed === undefined) {
    return <Detail isLoading />;
  }

  if (dismissed) {
    return (
      <Detail
        markdown="# You are all caught up

Today's guide has been dismissed. A new one arrives at **00:00 in your local time**."
      />
    );
  }

  const guide = guideFor(today);
  const markdown = `# ${guide.title}

${guide.fact}

---

### Try this today

${guide.action}

[Source: Open Source Guides](${guide.source}) · Adapted under [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/).`;

  return (
    <Detail
      markdown={markdown}
      actions={
        <ActionPanel>
          <Action title="Done for Today" icon={Icon.Checkmark} onAction={dismiss} />
          <Action.OpenInBrowser title="Read the Source Section" url={guide.source} />
          <Action.CopyToClipboard
            title="Copy Guide"
            content={`${guide.title}\n\n${guide.fact}\n\nTry this today: ${guide.action}\n\nSource: ${guide.source}`}
          />
        </ActionPanel>
      }
    />
  );
}
