import { Project } from "./project";
import { TimeRecord } from "./timeRecord";

export type ProjectTask = {
  id: number;
  title: string;
  isDone: boolean;
  project: Project;
  recordingTimes: Array<TimeRecord>;
};
