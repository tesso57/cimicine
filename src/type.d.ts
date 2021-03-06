export type StepFormType = "title" | "body" | "url";
export type StepType = {
  title: string;
  body?: string;
  url?: string[];
  uid: string;
};
export type JsonTypes = {
  data: {
    steps: StepType[];
    createdAt: Date;
    star: number;
    title: string;
    description: string;
    uid: string;
  };
  relationships: {
    author: {
      displayName: string;
      id: string;
    };
  };
};

export type StaredList = string[];

export type UserStaredList = { list: StaredList };
export type UserType = {
  createdRoadmaps: JsonTypes[]; //あとから編集できるように
  staredList: {
    roadmap: JsonTypes; // roadmap uid
    progress: number;
  }[];
};
