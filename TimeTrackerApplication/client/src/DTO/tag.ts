import { TimeRecord } from "./timeRecord";

export type Tag = {
  id: number;
  name: string;
  isArchived: boolean;
  recordingTime: Array<TimeRecord>;
};
