import {
  Box,
  Button,
  Card,
  CardContent,
  Icon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { TimeRecord } from "../../models/timeRecord.model";

const MeasuredTimeCard = (measuredTime: TimeRecord) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleUpdateTotalTime = () => {};

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    handleMenuClose();
    // onDelete();
  };

  const handleDuplicate = () => {
    handleMenuClose();
    // onDuplicate();
  };

  return (
    <Card style={{ margin: 16, display: "flex" }}>
      <CardContent
        sx={{ display: "flex", flexDirection: "column", width: "100%" }}
      >
        <Box
          sx={{
            background: "#A6BB8D",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            border: "1px solid #FBC252",
            borderTopLeftRadius: "5px",
            borderTopRightRadius: "5px",
          }}
        >
          <Typography variant="h6" sx={{ margin: "20px", flex: "1" }}>
            Measured Date
          </Typography>
          {/* <Typography variant="body1">{measuredTime.date}</Typography> */}
          <Typography
            variant="body1"
            sx={{ marginRight: "20px", textAlign: "end", flex: "1" }}
          >
            Total Time: {measuredTime.recordingTime}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            border: "1px solid #FBC252",
            borderTop: "none",
            borderBottomLeftRadius: "5px",
            borderBottomRightRadius: "5px",
            flex: "1",
          }}
        >
          <Box
            style={{ margin: 16 }}
            sx={{
              display: "flex",
              alignItems: "center",
              flex: "1",
              borderRight: "1px solid #FBC252",
            }}
          >
            <Typography variant="h6" sx={{ flex: "1", textAlign: "center" }}>
              Project:
            </Typography>
            <Typography
              variant="body1"
              sx={{ flex: "1", textAlign: "start", fontSize: "25px" }}
            >
              {measuredTime.description}
            </Typography>
          </Box>

          <Box
            style={{ margin: 16 }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flex: "1",
              borderRight: "1px solid #FBC252",
            }}
          >
            <Typography variant="h6" sx={{ flex: "1" }}>
              Tag:
            </Typography>
            <Typography variant="body1" sx={{ flex: "1", fontSize: "25px" }}>
              {measuredTime.tagName}
            </Typography>
          </Box>

          {/*  */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flex: "2",
            }}
          >
            <Box
              sx={{
                flex: "2",
              }}
            >
              <Typography
                sx={{
                  fontSize: "25px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Total time:
              </Typography>
              <Box
                style={{
                  marginLeft: "2vh",
                  marginRight: "2vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "25px",
                }}
              >
                <strong>{measuredTime.recordingTime}</strong>
              </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", flex: "1" }}>
              <Button onClick={(e) => setAnchorEl(e.currentTarget)}>
                <Icon sx={{ fontSize: 35 }}>more_vert</Icon>
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
                <MenuItem onClick={handleDuplicate}>Duplicate</MenuItem>
              </Menu>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MeasuredTimeCard;
