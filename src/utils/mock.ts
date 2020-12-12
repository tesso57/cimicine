import { JsonTypes } from "../type";
import { uid } from "./misc";

export const trendMockData = [
  {
    title: "Frontend Developer Roadmap",
    star: 999999,
    caption:
      "Step by step guide to becoming a modern frontend developer in 2020",
  },
  {
    title: "Frontend Developer Roadmap",
    star: 999999,
    caption:
      "Step by step guide to becoming a modern frontend developer in 2020",
  },
  {
    title: "Frontend Developer Roadmap",
    star: 999999,
    caption:
      "Step by step guide to becoming a modern frontend developer in 2020",
  },
  {
    title: "Frontend Developer Roadmap",
    star: 999999,
    caption:
      "Step by step guide to becoming a modern frontend developer in 2020",
  },
  {
    title: "Frontend Developer Roadmap",
    star: 999999,
    caption:
      "Step by step guide to becoming a modern frontend developer in 2020",
  },
];

export const sampleData: JsonTypes = {
  data: {
    steps: [
      {
        title: "yarn/npmでインスコ",
        body:
          "npm i -save-dev style-loader css-loaderするといいみたい \n よくわからないけどやってみよ",
        url: ["twitter.com", "https://qiita.com"],
        uid: `${uid()}`,
      },
      {
        title: "The Second Step",
        body: "",
        url: [],
        uid: `${uid()}`,
      },
      {
        title: "The Third Step",
        body: "",
        url: [],
        uid: `${uid()}`,
      },
    ],

    createdAt: new Date(),
    star: 0,
    title: "CSS modulesをいれたい",
    caption: "",
  },
  relationships: {
    author: {
      displayName: "displayName",
      id: "23820",
    },
  },
};
