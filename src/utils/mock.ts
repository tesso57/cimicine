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
        title: "The First Step",
        body: "",
        url: [],
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
    title: "",
    caption: "",
  },
  relationships: {
    author: {
      displayName: "displayName",
      id: "23820",
    },
  },
};
