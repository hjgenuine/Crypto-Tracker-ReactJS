import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Container, Toolbar, Typography, Select, FormControl, InputLabel, MenuItem } from "@material-ui/core";
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';

const useStyles = makeStyles({
    title: {
        flex: 1,
        color: "#e3ab0d",
        cursor: "pointer"
    },

    select: {
        height: 40
    }
})

function Header() {
    const { currency, setCurrency } = CryptoState();
    const classes = useStyles();
    const navigate = useNavigate();

    return (
        <AppBar color="transparent" position="static">
            <Container>
                <Toolbar>
                    <Typography
                        className={classes.title}
                        onClick={() => navigate("/")}
                        variant="h6"
                    >
                        Crypto Tracker</Typography>

                    <FormControl variant="outlined">
                        <InputLabel>Currency</InputLabel>
                        <Select
                            value={currency}
                            onChange={(event) => setCurrency(event.target.value)}
                            label="Currency"
                            className={classes.select}
                        >
                            <MenuItem value={"INR"}>INR</MenuItem>
                            <MenuItem value={"USD"}>USD</MenuItem>
                        </Select>
                    </FormControl>

                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header