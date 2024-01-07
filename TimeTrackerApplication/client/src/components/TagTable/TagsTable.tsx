import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { api } from "../../utils/api/axios";
import { Client } from "../../models/client.model";
import { updateClientDTO } from "../../DTO/updateClientDTO";
import { addClientDTO } from "../../DTO/addNewClientDTO";

type ClientTableProps = {
  typeOfClient: string;
  newClientName: string;
  addClient: boolean;
  setAddClient: (value: boolean) => void;
  filter: string;
};

const ClientTable = ({
  typeOfClient,
  newClientName,
  addClient,
  setAddClient,
  filter,
}: ClientTableProps) => {
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [clientsForTable, setClientsForTable] = useState<Array<Client>>([]);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [selectedClient, setSelectedClient] = useState<number>();
  const [newName, setNewName] = useState("");

  useEffect(() => {
    api
      .get("/clients")
      .then((response) => setClientsForTable(response.data))
      .catch((err) => console.error(err));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(clientsForTable);
    if (typeOfClient == "active") {
      api
        .get("/clients/active")
        .then((response) => setClientsForTable(response.data))
        .catch((err) => console.error(err));
    } else if (typeOfClient == "archived") {
      api
        .get("/clients/archived")
        .then((response) => setClientsForTable(response.data))
        .catch((err) => console.error(err));
    } else {
      api
        .get("/clients")
        .then((response) => setClientsForTable(response.data))
        .catch((err) => console.error(err));
    }
  }, [typeOfClient]);

  useEffect(() => {
    if (addClient) {
      const newClient: addClientDTO = {
        name: newClientName,
      };

      api
        .post("/clients", newClient)
        .then((response) => {
          setClientsForTable([...clientsForTable, response.data]);
        })
        .catch((err) => console.error(err));

      setAddClient(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addClient]);

  useEffect(() => {
    if (filter.length !== 0 && filter !== undefined) {
      console.log(filter)
      api
        .get(`/clients/filteredByName/${filter}`)
        .then((response) => setClientsForTable(response.data))
        .catch((err) => console.error(err));
    } else {
      api
        .get("/clients")
        .then((response) => setClientsForTable(response.data))
        .catch((err) => console.error(err));
    }
  }, [filter]);

  const handleEditOpen = (clientId: number) => {
    const client = clientsForTable.find((el) => el.id === clientId);
    if (client == null) return;
    setNewName(client.name);
    setSelectedClient(client.id);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleDeleteOpen = (clientId: number) => {
    setSelectedClient(clientId);
    console.log(clientId);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleEditSave = () => {
    const client = clientsForTable.find((el) => el.id == selectedClient);
    if (client == null) return;

    const newClient: updateClientDTO = {
      name: newName,
      id: client.id,
    };

    api.put("/clients", newClient).then((response) => {
      const updatedClients = [...clientsForTable];
      console.log({ updatedClients });
      console.log({ client });

      const clientIndex = updatedClients.findIndex((c) => c.id === client.id);
      console.log({ clientIndex });

      updatedClients[clientIndex] = {
        ...updatedClients[clientIndex],
        ...response.data,
      };

      console.log({ updatedClients });

      setClientsForTable(updatedClients);
    });

    handleEditClose();
  };

  const handleDeleteConfirm = () => {
    console.log(`Deleting client: ${selectedClient}`);
    const newClients = [...clientsForTable];
    setClientsForTable(newClients.filter((el) => el.id !== selectedClient));
    handleDeleteClose();
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ display: "flex" }}>
        <Table
          sx={{ width: "500vh", maxWidth: "100%" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientsForTable ? (
              clientsForTable.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">
                    <Button onClick={() => handleEditOpen(row.id)}>
                      <Icon sx={{ fontSize: 35 }}>edit</Icon>
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <Button onClick={() => handleDeleteOpen(row.id)}>
                      <Icon sx={{ fontSize: 35 }}>delete</Icon>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <h1>NO DATA</h1>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Modal */}
      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Client Name</DialogTitle>
        <DialogContent>
          <TextField
            label="New Name"
            fullWidth
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleEditSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteOpen} onClose={handleDeleteClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete the client "{selectedClient}"?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ClientTable;
