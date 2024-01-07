import { Client } from "./updateClientDTO";
import { ProjectTask } from "./projectTask";
import { TimeRecord } from "./timeRecord";
import { User } from "./users";

export type Project = {
  id: number;
  user: User;
  name: string;
  description: string;
  isArchived: boolean;
  client: Client;
  isFavourite: boolean;
  tasks: Array<ProjectTask>;
  isBillable: boolean;
  billablePerHour: number;
  recordingTimes: Array<TimeRecord>;
};
