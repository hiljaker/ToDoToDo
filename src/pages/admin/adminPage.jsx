import React, { useEffect, useState } from "react";
import "./styles/adminPage.css"
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined';
import HourglassFullRoundedIcon from '@mui/icons-material/HourglassFullRounded';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import axios from "axios";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const AdminPage = () => {
    const [limit, setlimit] = useState(5)
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [userData, setuserData] = useState([])
    const [page, setpage] = useState(0)
    const [userStatus, setuserStatus] = useState()
    const [totalUser, settotalUser]= useState(0)

    useEffect(() => {
        filterHandler()
    },[page,limit,userStatus])

    const filterHandler = async() => {
        let url = `http://localhost:5000/admin?pages=${page}&limit=${limit}`
        if (userStatus == 1){
            url += `&deactive=${userStatus}`
        }
        if(userStatus == 2){
            url += `&active=${userStatus}`
        }
        try {
            const res = await axios.get(url)
            settotalUser(res.headers["x-total-count"])
            console.log(res.headers["x-total-count"])
            setuserData(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };
    const handleChangePage = (event, index) => {
        setpage(index);
    };
    const handleChangeRowsPerPage = (event) => {
        setlimit(parseInt(event.target.value));
        setpage(0);
    };
    const handleFilterChange = (e) => {
        setuserStatus(e.target.value)
    }
    const deleteHandler = async (index) => {
        let userDel = userData[index]
        if (userDel.is_deleted){
            let res = await axios.patch(`http://localhost:5000/admin/${userDel.id}/${userDel.username}`)
            console.log(res.data.message)
            filterHandler()
        }else {
            let res = await axios.delete(`http://localhost:5000/admin/${userDel.id}/${userDel.username}`)
            console.log(res.data.message)
            filterHandler()
        }
    }
    
    const renderTableBody = () => {
        return userData.map((val,index) => {
            return (
            <TableRow key={index}>
                <TableCell width=''>{val.id}</TableCell>
                <TableCell align='left'>{val.username}</TableCell>
                <TableCell align='left'>{val.email}</TableCell>
                <TableCell align='left'>Confidential</TableCell>
                <TableCell align='left'>{val.is_verified ? 'Verified' : 'Not Verified'}</TableCell>
                <TableCell align='left' className="admin-text" >
                    <Chip 
                        label={val.is_deleted?  'Deactive' : 'Active' } 
                        icon={val.is_deleted ? <CancelOutlinedIcon /> :<CheckCircleOutlinedIcon /> } 
                        color={val.is_deleted?  'error' : 'success'} 
                    />
                </TableCell>
                <TableCell align='center'>{val.is_deleted? 
                    (
                        <Button variant="outlined" color="success"  onClick={() => deleteHandler(index)} >
                            Activate
                        </Button>
                    ) : (
                        <Button variant="outlined" color="error" onClick={() => deleteHandler(index)} >
                            Deactivate
                        </Button>
                    )}
                </TableCell>
            </TableRow>
            )
        })
    }



    return (
        <div >
            <div className="row admin-container m-0" >
                <div className="col-sm-3 d-flex flex-column align-items-center admin-menubox" >
                    <div className="mt-4 admin-uniqfont admin-titlesize" >
                      Todo-App
                    </div>
                    <div className="mt-5 d-flex flex-column align-items-center" >
                    <div>
                        <Avatar className="admin-avatar"
                            alt="Admin Profile"
                            src="https://images.pexels.com/photos/8832755/pexels-photo-8832755.jpeg"
                            sx={{ width: 70, height: 70 }}
                        />
                    </div>
                        <div className="admin-nama mt-4">Nama Admin</div>
                    </div>
                    <div className="mt-5 w-100" >
                        <List component="nav" aria-label="main mailbox folders">
                            <ListItemButton
                            sx={{ borderRadius: 3 }}
                            selected={selectedIndex === 0}
                            onClick={(event) => handleListItemClick(event, 0)}
                            >
                                <ListItemIcon>
                                    <SupervisedUserCircleOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Manage Users" />
                            </ListItemButton>
                            <ListItemButton className="mt-3"
                            sx={{ borderRadius: 3 }}
                            selected={selectedIndex === 1}
                            onClick={(event) => handleListItemClick(event, 1)}
                            >
                                <ListItemIcon>
                                    <HourglassFullRoundedIcon />
                                </ListItemIcon>
                                <ListItemText primary="This can be Anything" />
                            </ListItemButton>
                        </List>
                    </div>
                </div>
                <div className="col-sm-9 mt-4" >
                    <div>
                        <FormControl sx={{minWidth:220}}>
                            <InputLabel id="demo-simple-select-label">Filter By</InputLabel>
                            <Select sx={{borderRadius:3}}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={age}
                            label="Filter By"
                            onChange={handleFilterChange}
                            >
                            <MenuItem value="">None</MenuItem>
                            <MenuItem value={2}>Activated Account</MenuItem>
                            <MenuItem value={1}>Deactivated Account</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="mt-3" >
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
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5,6,7]}
                            component="div"
                            count={totalUser}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={limit}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminPage