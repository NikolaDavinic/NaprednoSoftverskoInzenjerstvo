import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { TimeModel } from "../../models/time.model";

type CalendarProps = {
  listOfData: Array<TimeModel>;
};

const useStyles = makeStyles({
  tableContainer: {
    marginTop: '20px',
  },
  tableHeaderCell: {
    fontWeight: 'bold',
  },
  tableCell: {
    textAlign: 'center',
  },
});

const CalendarTable = (listOfData: CalendarProps) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    // setSelectedDate(date);
  };
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

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

  const list = {
    "2018-05-01": [{
      id: 1,
      projectName: "Hello there",
      tag: "Tag1",
      time: formatTime(5),
      date: "2018-05-01"
    },
    {
      id: 2,
      projectName: "Hello there2",
      tag: "Tag2",
      time: formatTime(5),
      date: "2018-05-01"
    },
    {
      id: 3,
      projectName: "Hello there3",
      tag: "Tag3",
      time: formatTime(5),
      date: "2018-05-01"
    },
    {
      id: 3,
      projectName: "Hello there3",
      tag: "Tag3",
      time: formatTime(5),
      date: "2018-05-01"
    },
    {
      id: 3,
      projectName: "Hello there3",
      tag: "Tag3",
      time: formatTime(5),
      date: "2018-05-01"
    }],
  }

  const classes = useStyles();

  // Assuming data is an object with days as keys and an array of time recorded for each day
  // Example: { '2023-12-01': [2, 3, 1], '2023-12-02': [4, 2, 5], ... }

  const days = Object.keys(data);
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Weekly Time Recorded
      </Typography>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeaderCell}>Date</TableCell>
              {weekdays.map((day, index) => (
                <TableCell key={index} className={classes.tableHeaderCell}>
                  {day}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {days.map((date) => (
              <TableRow key={date}>
                <TableCell>{date}</TableCell>
                {list[date].map((time, index) => (
                  <TableCell key={index} className={classes.tableCell}>
                    {time}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default CalendarTable;
