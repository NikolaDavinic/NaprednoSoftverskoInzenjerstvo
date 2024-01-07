import { Project } from "./project";
import { ProjectTask } from "./projectTask";
import { Tag } from "./tag";

export type TimeRecord = {
  project: Array<Project>;
  description: string;
  projectTask: ProjectTask;
  dateOfRecord: Date;
  tag: Tag;
  recordingTime: number;
};
