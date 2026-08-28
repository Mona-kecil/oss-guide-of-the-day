# OSS Guide of the Day

A Raycast extension that turns the [Open Source Guides](https://opensource.guide/) into one practical, bite-sized lesson each day.

## Usage

1. Open **Guide of the Day** in Raycast.
2. Read the lesson and try the suggested action.
3. Press `↵` for another guide, or `⌘ S` to snooze until tomorrow.
4. Reopen the command and choose **Show Again** if you change your mind.

Snoozed guides reset after midnight in your local timezone. You can also open the original source section or copy a lesson from the Actions menu.

## Content and attribution

The current dataset contains 137 concise, human-written adaptations across the 13 English guides published at [opensource.guide](https://opensource.guide/). Each lesson links to the source section it is based on. The source index in `scripts/source-index.json` records the headings found during the last scrape.

The source content is copyright its authors and is available under [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/). Content is based on [github.com/github/opensource.guide](https://github.com/github/opensource.guide) and used under that license. This extension credits and links to the source, and the lessons are transformed summaries rather than copied passages. The extension's MIT license does not grant rights to third-party trademarks or assets. The legal material is educational, not legal advice.

## Development

```sh
npm install
npm run dev
```

To check the source pages, headings, links, and deduplication without changing files:

```sh
npm run check-guides
```

To refresh the compact source index, run the same slow, robots-aware scraper with:

```sh
npm run scrape-guides
```
