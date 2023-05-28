"use client";
import React from "react";
import { useRouter } from 'next/navigation';
import "./style.css";
import { Paper, Divider, MenuList, MenuItem, Typography } from '@mui/material';

const AdminSidebar = () => {
    const router = useRouter();

    return (
        <div className="containerst">
            <Paper className="stylepop" >
                <MenuList >
                    <MenuItem>
                        <div onClick={() => router.push('/tableCategories')} className="stylediv">
                            <div><Typography sx={{ color: 'black' }}>Categories</Typography></div>
                        </div>
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                        <div onClick={() => router.push('/tableProducts')} className="stylediv">
                            <div><Typography sx={{ color: 'black' }}>Products</Typography></div>
                        </div>
                    </MenuItem>
                </MenuList>
            </Paper>
        </div>
    );
};
export default AdminSidebar;
