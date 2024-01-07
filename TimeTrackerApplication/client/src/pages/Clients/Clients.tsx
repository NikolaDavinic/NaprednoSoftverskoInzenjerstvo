import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import ClientTable from "../../components/TagTable/TagsTable";

const Clients = () => {
  const [typeOfClients, setTypeOfClients] = useState<string>("all");
  const [filter, setFilter] = useState<string>("");
  const [nameForNewClient, setNameForNewClient] = useState<string>("");
  const [addClient, setAddClient] = useState<boolean>(false);

  const handleChangeType = (newType: string) => {
    setTypeOfClients(newType);
  };

  const handleAddClient = () => {
    if(nameForNewClient.length !== 0 && nameForNewClient !== undefined) {
      setAddClient(true);
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ flex: "1", width: "100%" }}>
        <Typography
          sx={{ fontSize: "25px", marginLeft: "20px", marginTop: "20px" }}
        >
          Clients
        </Typography>
      </Box>
      <Box sx={{ display: "flex", margin: "10px" }}>
        <Box sx={{ minWidth: 120, display: "flex", flex: "1" }}>
          <FormControl sx={{ margin: "20px", maxWidth: 200, flex: "1" }}>
            <InputLabel id="demo-simple-select-helper-label">State</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={typeOfClients}
              label="Age"
              onChange={(e) => handleChangeType(e.target.value)}
            >
              <MenuItem value={"active"}>Show active</MenuItem>
              <MenuItem value={"all"}>Show all</MenuItem>
              <MenuItem value={"archived"}>Show archived</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ flex: "1", maxWidth: 250, minWidth: 150 }}>
            <TextField
              id="clients-search"
              label="Search by name"
              variant="outlined"
              value={filter}
              sx={{ margin: "20px" }}
              onChange={(e) => setFilter(e.target.value)}
            />
          </Box>
          <Box
            sx={{
              flex: "1",
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <TextField
              id="add-new-client"
              label="Add new client"
              variant="outlined"
              value={nameForNewClient}
              sx={{ margin: "20px", flex: "1", maxWidth: "50%", minWidth: 150 }}
              onChange={(e) => setNameForNewClient(e.target.value)}
            />
            <Box>
              <Button
                variant="contained"
                size="large"
                onClick={handleAddClient}
              >
                ADD
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ maxWidth: "70%", display: "flex", justifyContent: "center" }}>
        <ClientTable 
          typeOfClient={typeOfClients} 
          newClientName={nameForNewClient} 
          addClient={addClient} 
          setAddClient={setAddClient} filter={filter}
          />
      </Box>
    </Box>
  );
};

export default Clients;
