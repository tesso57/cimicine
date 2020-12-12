export type StepFormType='title'|'body'|'url'
export type StepType ={
    title: string;
    body?: string;
    url?: string[];
    uid: string;
  }
export type JsonTypes= {
    data: {
      steps: StepType[];
      createdAt: Date;
    };
    relationships: {
      author: {
        displayName: string;
        id: string;
      };
    };
  }