import { Box } from "@mui/material";
import CalendarTable from "../../components/CalendarTable/CalendarTable";
import { TimeModel } from "../../models/time.model";
import { useState } from "react";

const Calendar = () => {
  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((time % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const [listOfMeasurements, setListOfMeasurements] = useState<
    Array<TimeModel>
  >([
    {
      id: 1,
      projectName: "Hello there",
      tag: "Tag1",
      time: formatTime(5),
    },
    {
      id: 2,
      projectName: "Hello there2",
      tag: "Tag2",
      time: formatTime(5),
    },
    {
      id: 3,
      projectName: "Hello there3",
      tag: "Tag3",
      time: formatTime(5),
    },
    {
      id: 3,
      projectName: "Hello there3",
      tag: "Tag3",
      time: formatTime(5),
    },
    {
      id: 3,
      projectName: "Hello there3",
      tag: "Tag3",
      time: formatTime(5),
    },
  ]);

  return (
    <Box>
      {/* <CalendarTable listOfData={listOfMeasurements} /> */}
    </Box>
  );
};

export default Calendar;
