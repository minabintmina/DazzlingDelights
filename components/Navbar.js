"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useSession, signOut } from 'next-auth/react';
import Image from "next/image";
import ShoppingCart from "./ShoppingCart";
import { useShoppingCart } from "use-shopping-cart";

function Navbar() {
    const { data } = useSession();
    const router = useRouter();
    const { handleCartClick, cartCount } = useShoppingCart();
    const [onTop, setOnTop] = useState(true);
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    });
    const handleScroll = () => {
        if (window.pageYOffset === 0) {
            setOnTop(true);
        } else {
            setOnTop(false);
        }
    }
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar color={onTop ? 'transparent' : 'default'}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} color="default">
                            Dazzling Delights
                        </Typography>
                        <Button color="inherit" onClick={() => router.push('/')}>Home</Button>
                        <Button color="inherit" onClick={() => router.push('/about')}> About</Button>
                        <Button color="inherit" onClick={() => router.push('/products')}> Products </Button>
                        {data?.user ? (<>
                            <span style={{ marginRight: "15px", color: "yellow" }}>
                                {data?.user?.name}</span>
                            {" "}
                            <Button color="inherit" onClick={() => signOut()}> Logout </Button>
                        </>
                        ) : <Button color="inherit" onClick={() => router.push('/login')}> Login </Button>
                        }
                        <button className="inherit" onClick={() => handleCartClick()}>
                            <Image
                                src="/images/cart.jpg"
                                width={35}
                                height={35}
                                alt="shopping cart icon"
                            />
                            <div className="rounded-full flex justify-center items-center bg-yellow-500 text-xs text-white absolute w-6 h-5 bottom-6 -right-1">
                                {cartCount}
                            </div>
                        </button>
                        <ShoppingCart />
                    </Toolbar>
                </AppBar>
            </Box>
            <Toolbar />
        </>
    );
}
export default Navbar; 
