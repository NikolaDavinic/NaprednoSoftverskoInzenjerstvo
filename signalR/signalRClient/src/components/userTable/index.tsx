import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { User } from '@/types/User'
import { HubConnectionState } from '@microsoft/signalr'
import UseSignalRHook from '@/hooks/UseSignalRHook'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'

const START_USER_UPDATE = 'StartUserUpdates';

const UserTable = () => {
    const [users, setUsers] = useState<Array<User>>([])
    const hubUrl = "https://localhost:7192/userHub"
    const method = "ReceiveUser";

    const { connection } = UseSignalRHook(hubUrl, method, (newUser: User) => {
        setUsers((prevUsers) => [...prevUsers, newUser])
    })

    useEffect(() => {
        axios.get("/api/users").then((response) => {
            setUsers(response.data);
        })
    }, [])

    useEffect(() => {
        if (connection != null && connection.state === HubConnectionState.Disconnected) {
            connection?.start().then(() => {
                console.log("New user added!");
                connection?.invoke(START_USER_UPDATE);
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [users])

    const columns = [
        { field: "firstName", headerName: "First Name", flex: 1 },
        { field: "lastName", headerName: "Last Name", flex: 1 },
        { field: "age", headerName: "Age", flex: 1 },
        { field: "occupation", headerName: "Occupation", flex: 1 },
        { field: "status", headerName: "Status", flex: 1 },
    ];

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Firstname</TableCell>
                        <TableCell>Lastname</TableCell>
                        <TableCell>Age</TableCell>
                        <TableCell>Occupation</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : users
                    ).map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.firstName}</TableCell>
                            <TableCell>{user.lastName}</TableCell>
                            <TableCell>{user.age}</TableCell>
                            <TableCell>{user.occupation}</TableCell>
                            <TableCell>{user.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    )
}

export default UserTable