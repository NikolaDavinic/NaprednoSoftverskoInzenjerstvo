import { useEffect, useState } from "react";
import { Client } from "../../DTO/updateClientDTO";
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
import { api } from "../../utils/api/axios";

export const Clients = () => {
  const [allClients, setAllClients] = useState<Array<Client>>([]);
  const [clientsForTable, setClientsForTable] = useState<Array<Client>>([]);
  const [typeOfClients, setTypeOfClients] = useState<string>("active");

  //input field
  // const [clientsType, setClientsType] = useState<string>("active");
  const [nameFilter, setNameFilter] = useState<string>("");
  const [nameForNewClient, setNameForNewClient] = useState<string>("");

  // const handleChange = (event) => {
  //   setTypeOfClients(event.target.value);
  // };
  // const handleAddClient = () => {
  //   clients.push({
  //     id: clients.length + 1,
  //     fullName: newClientName,
  //     archived: false
  //   })
  // }
  useEffect(() => {
    api
      .get("/clients")
      .then((response) => setAllClients(response.data))
      .catch((err) => console.error(err));

    setClientsForTable(allClients);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeType = () => {
    if (typeOfClients == "active")
      setClientsForTable((prevState) => {
        return prevState.filter((el) => el.archived === false);
      });
    else if (typeOfClients == "archived") {
      setClientsForTable((prevState) => {
        return prevState.filter((el) => el.archived === true);
      });
    } else {
      setClientsForTable(allClients);
    }
  };

  const handleAddClient = () => {
    ap;
  };

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
              onChange={handleChangeType}
            >
              <MenuItem value={"active"}>Show active</MenuItem>
              <MenuItem value={"archived"}>Show archived</MenuItem>
              <MenuItem value={"all"}>Show all</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ flex: "1", maxWidth: 250, minWidth: 150 }}>
            <TextField
              id="clients-search"
              label="Search by name"
              variant="outlined"
              sx={{ margin: "20px" }}
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
        <ClientTable />
      </Box>
    </Box>
  );
};
