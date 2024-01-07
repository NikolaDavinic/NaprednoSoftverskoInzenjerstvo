import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { api } from "../../utils/api/axios";
import { TimeRecord } from "../../DTO/timeRecord";

type TrackerProps = {
  listOfMeasurements: Array<TimeRecord>;
  setListOfMeasurements: (e) => void;
  text: string;
  setText: (e) => void;
  selectedProject: string;
  setSelectedProject: (e) => void;
  selectedTag: string;
  setSelectedTag: (e) => void;
  timer: number;
  setTimer: (e) => void;
  isTimerRunning: boolean;
  setIsTimerRunning: (e) => void;
};

const Tracker = (props: TrackerProps) => {
  const [text, setText] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<number | null>(0);
  const [selectedTag, setSelectedTag] = useState<number | null>(0);
  const [timer, setTimer] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const options = ["Option 1", "Option 2", "Option 3"];

  const handleDropdownChange = (selectedValue: string) => {
    console.log("Selected value:", selectedValue);
    setText(selectedValue);
  };

  useEffect(() => {
    api.get("/")
  }, [])


  useEffect(() => {
    let intervalId: number;

    if (isTimerRunning) {
      intervalId = setInterval(() => {
        setTimer((prevTimer: number) => prevTimer + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTimerRunning]);

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

  const handleStartStop = () => {
    setIsTimerRunning(!isTimerRunning);

    if (!isTimerRunning) {
      setTimer(0); // Reset timer when starting
    }
  };

  return (
    <Box sx={{ display: "flex", borderBottom: "1px solid black" }}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          margin: "20px",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid gray",
          borderRadius: "10px",
          padding: "10px",
        }}
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          width="100%"
          flexWrap="wrap"
        >

          <Autocomplete
            freeSolo
            style={{ marginRight: 16, flex: 4 }}
            value={text}
            options={options}
            onChange={(event, value) => handleDropdownChange(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="What are you doing on?"
                variant="outlined"
              />
            )}
          />

          <FormControl variant="outlined" style={{ marginRight: 16, flex: 1 }}>
            <InputLabel id="project-label">Project</InputLabel>
            <Select
              labelId="project-label"
              id="project"
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              label="Project"
            >
              <MenuItem value="project1">Project 1</MenuItem>
              <MenuItem value="project2">Project 2</MenuItem>
              {/* Add more projects as needed */}
            </Select>
          </FormControl>

          <FormControl variant="outlined" style={{ marginRight: 16, flex: 1 }}>
            <InputLabel id="tag-label">Tag</InputLabel>
            <Select
              labelId="tag-label"
              id="tag"
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              label="Tag"
            >
              <MenuItem value="tag1">Tag 1</MenuItem>
              <MenuItem value="tag2">Tag 2</MenuItem>
              {/* Add more tags as needed */}
            </Select>
          </FormControl>

          <Box
            style={{
              marginLeft: "2vh",
              marginRight: "2vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "30px",
            }}
          >
            <strong>{formatTime(timer)}</strong>
          </Box>

          <Button variant="contained" color="primary" onClick={handleStartStop}>
            {isTimerRunning ? "Stop Timer" : "Start Timer"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Tracker;
