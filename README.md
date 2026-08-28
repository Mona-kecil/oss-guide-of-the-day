# OSS Guide of the Day

Learn open source a little at a time. This Raycast extension turns the [Open Source Guides](https://opensource.guide/) into one practical, bite-sized lesson you can act on immediately.

![A guide about choosing an open source license](metadata/legal-guide.jpeg)

## How it works

- **137 concise lessons** cover all 13 English Open Source Guides.
- A deterministic shuffled rotation gives you a different topic each day without repeating the same sequence in source order.
- Press `↵` to continue to another guide. Raycast remembers your position if you close and reopen it.
- Press `⌘ S` to snooze for the day. You can choose **Show Again** whenever you change your mind.
- The guide position and snooze state reset at midnight in your local timezone.
- Every card identifies its parent guide, section, and topic. Press `⌘ O` to read the original section.

![Available actions and keyboard shortcuts](metadata/actions.jpeg)

## Offline and private

The lesson collection and section taxonomy are bundled with the extension, so reading and moving between guides works entirely offline. The two JSON files total about **104 KB uncompressed**.

Only your current daily position and snooze date are stored in Raycast's on-device `LocalStorage`—a few bytes of data. Nothing is sent to an extension server. An internet connection is needed only when you choose to open the original guide.

![A guide snoozed until local midnight](metadata/rest-mode.jpeg)

## Content and attribution

The dataset contains 137 curated adaptations across the 13 English guides published at [opensource.guide](https://opensource.guide/). Every lesson points to the exact source section it is based on. The generated index in `scripts/source-index.json` records the source headings found during the latest validation run.

The original guide content is copyright its authors and available under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). It is based on [github.com/github/opensource.guide](https://github.com/github/opensource.guide) and used under that license. Lessons are transformed summaries rather than copied passages. The extension's MIT license does not grant rights to third-party trademarks or assets. Legal lessons are educational, not legal advice.

## Development

```sh
npm install
npm run dev
```

Validate source pages, section links, coverage, and deduplication:

```sh
npm run check-guides
```

Refresh the source index and section taxonomy with the slow, robots-aware scraper:

```sh
npm run scrape-guides
```
