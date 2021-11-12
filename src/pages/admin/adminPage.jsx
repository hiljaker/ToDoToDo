import React, { useState } from "react";
import "./styles/adminPage.css"
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined';
import HourglassFullRoundedIcon from '@mui/icons-material/HourglassFullRounded';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

// FOR Testing Only
function createData(ID, Username, Email, Password, Verified, Status, ActionButton) {
    return { ID, Username, Email, Password, Verified, Status, ActionButton };
}
const rows = [
    createData(1,'Lola', "Test@gmail.com", 123, "verif", "Active"),
    createData(2,'Loli', "Test@gmail.com", 123, "verif", "Active"),
    createData(3,'Lulu', "Test@gmail.com", 123, "verif", "Active"),
    createData(4,'Lala', "Test@gmail.com", 123, "verif", "Active"),
    createData(5,'Lili', "Test@gmail.com", 123, "verif", "Active"),
];


const AdminPage = () => {
    const [selectedIndex, setSelectedIndex] = useState(1);
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const renderTableBody = () => {
        return rows.map((val,index) => {
            return (
            <TableRow key={index}>
                <TableCell width=''>{val.ID}</TableCell>
                <TableCell align='left'>{val.Username}</TableCell>
                <TableCell align='left'>{val.Email}</TableCell>
                <TableCell align='left'>{val.Password}</TableCell>
                <TableCell align='left'>{val.Verified}</TableCell>
                <TableCell align='left'>{val.Status}</TableCell>
                <TableCell align='center'>
                    <Button color='primary'>
                        Activate
                    </Button>
                </TableCell>
            </TableRow>
            )
        })
    }



    return (
        <div >
            <div className="row admin-container m-0" >
                <div className="col-sm-3 d-flex flex-column align-items-center" >
                    <div className="mt-5 admin-avatar" >Nama App</div>
                    <div className="mt-5 d-flex flex-column align-items-center" >
                    <div>
                        <Avatar 
                            alt="Admin Profile"
                            src="https://images.unsplash.com/photo-1631607359300-59830a31c76c"
                            sx={{ width: 70, height: 70 }}
                        />
                    </div>
                        <div className="admin-nama mt-4">Nama Admin</div>
                    </div>
                    <div className="mt-5 w-100" >
                        <List component="nav" aria-label="main mailbox folders">
                            <ListItemButton
                            selected={selectedIndex === 0}
                            onClick={(event) => handleListItemClick(event, 0)}
                            >
                                <ListItemIcon>
                                    <SupervisedUserCircleOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Manage Users" />
                            </ListItemButton>
                            <ListItemButton className="mt-3"
                            selected={selectedIndex === 1}
                            onClick={(event) => handleListItemClick(event, 1)}
                            >
                                <ListItemIcon>
                                    <HourglassFullRoundedIcon />
                                </ListItemIcon>
                                <ListItemText primary="This can be Anything" />
                            </ListItemButton>
                        </List>

                        {/* <div>Menu1</div>
                        <div>Menu2</div> */}
                    </div>
                </div>
                <div className="col-sm-9 mt-4" >
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth:650}} aria-label="custom pagination table">
                            <TableHead>
                            <TableRow style={{backgroundColor:'#003e4d', color:'white'}}>
                                <TableCell component='th' className='text-white'>ID</TableCell>
                                <TableCell align="left" className='text-white'>Username</TableCell>
                                <TableCell align="left" className='text-white'>Email</TableCell>
                                <TableCell align="left" className='text-white'>Password</TableCell>
                                <TableCell align="left" className='text-white'>Verified</TableCell>
                                <TableCell align="left" className='text-white'>User Status</TableCell>
                                <TableCell align="center" className='text-white'>Action</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                {renderTableBody()}
                            </TableBody>
                            {/* <TableFooter>
                                <TableRow>
                                <TablePagination
                                rowsPerPageOptions={[2, { label: 'All', value: -1 }]}
                                colSpan={3}
                                count={this.state.totalProd}
                                rowsPerPage={this.state.limit}
                                page={this.state.page}
                                SelectProps={{
                                inputProps: { 'aria-label': 'rows per page' },
                                native: true,
                                }}
                                onPageChange={this.handleChangePage}
                                onRowsPerPageChange={this.handleChangeRowsPerPage}
                                // ActionsComponent={TablePaginationActions}
                                />
                                </TableRow>
                            </TableFooter> */}
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    )
}

export default AdminPage