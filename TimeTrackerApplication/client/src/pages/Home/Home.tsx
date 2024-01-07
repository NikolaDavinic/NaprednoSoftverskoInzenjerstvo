import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Tracker from "../../components/Tracker/Tracker";
import MeasuredTimeCard from "../../components/TimeList/TimeList";
import { TimeRecord } from "../../models/timeRecord.model";
import UseSignalR from "../../hooks/singlarR.hook";
import { HubConnectionState } from "@microsoft/signalr";

const hubUrl = "https://localhost:7164/timeTrackerHub";
const method = "ReceiveTimeRecord";

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

const Home = () => {
  const [text, setText] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const [listOfMeasurements, setListOfMeasurements] = useState<
    Array<TimeRecord>
  >([
    {
      id: 1,
      description: "Hello there",
      tagName: "Tag1",
      recordingTime: formatTime(5),
    },
    {
      id: 2,
      description: "Hello there2",
      tagName: "Tag2",
      recordingTime: formatTime(5),
    },
    {
      id: 3,
      description: "Hello there3",
      tagName: "Tag3",
      recordingTime: formatTime(5),
    },
    {
      id: 3,
      description: "Hello there3",
      tagName: "Tag3",
      recordingTime: formatTime(5),
    },
    {
      id: 3,
      description: "Hello there3",
      tagName: "Tag3",
      recordingTime: formatTime(5),
    },
  ]);

  return (
    <Box sx={{ height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          position: "relative",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Tracker
            listOfMeasurements={listOfMeasurements}
            setListOfMeasurements={setListOfMeasurements}
            text={text}
            setText={setText}
            isTimerRunning={isTimerRunning}
            setIsTimerRunning={setIsTimerRunning}
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
            timer={timer}
            setTimer={setTimer}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {listOfMeasurements.map((el: TimeRecord) => {
            return (
              <MeasuredTimeCard
                key={el.id}
                id={el.id}
                dateOfRecord={el.dateOfRecord}
                tagName={el.tagName}
                recordingTime={el.recordingTime}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
