import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles';
import { Container, Typography, TextField, TableContainer, LinearProgress, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import { useNavigate } from 'react-router-dom';
import { numberWithCommas } from './Banner/Carousel';
import { Pagination } from '@material-ui/lab';

const useStyles = makeStyles({
    row: {
        backgroundColor: "black",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "#131111"
        }
    }
})

function CoinTable() {
    const darkTheme = createTheme({
        palette: {
            type: 'dark'
        }
    });

    const classes = useStyles();
    const navigate = useNavigate();
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const { currency, symbol } = CryptoState();

    const fetchCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency));
        setCoins(data);
        setLoading(false);
    }

    useEffect(() => {
        fetchCoins();
    }, [currency]);

    function handleSearch() {
        return coins.filter((coin) => {
            return coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search);
        })
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <Container
                style={{ textAlign: "center", padding: 15 }}
            >

                <Typography
                    variant="h5"
                    style={{ marginTop: 15 }}
                >
                    Today's Cryptocurrency Prices by Market Cap
                </Typography>

                <TextField
                    label="What are you looking for?"
                    variant='outlined'
                    style={{ width: "100%", marginTop: 15 }}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <TableContainer
                    style={{ marginTop: 15 }}
                >
                    {loading ?
                        <LinearProgress
                            style={{ backgroundColor: "#e3ab0d" }}
                        />
                        :
                        (
                            <Table>

                                <TableHead style={{ backgroundColor: "#e3ab0d" }}>
                                    <TableRow>
                                        {["Coins", "Price", "24h Change", "Market Cap"].map(e => (
                                            <TableCell
                                                key={e}
                                                style={{ color: "black" }}
                                                align={e === "Coins" ? "" : "right"}
                                            >
                                                {e}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>


                                <TableBody>
                                    {handleSearch().slice((page - 1) * 10, page * 10).map(e => {
                                        const change = e.price_change_percentage_24h.toFixed(2);

                                        return (
                                            <TableRow
                                                onClick={() => navigate(`/coin/${e.id}`)}
                                                className={classes.row}
                                                key={e.id}
                                            >

                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                    style={{ display: "flex", gap: 15 }}
                                                >

                                                    <img
                                                        src={e.image}
                                                        alt={e.name}
                                                        height={50}
                                                    />

                                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                                        <span style={{ fontSize: 23, textTransform: "uppercase" }}>
                                                            {e.symbol}
                                                        </span>
                                                        <span style={{ color: "darkgrey" }}>
                                                            {e.name}
                                                        </span>
                                                    </div>
                                                </TableCell>

                                                <TableCell align="right" style={{ fontSize: 18 }}>
                                                    {symbol} {numberWithCommas(e.current_price.toFixed(2))}
                                                </TableCell>

                                                <TableCell
                                                    align="right"
                                                    style={{ fontSize: 18, color: change < 0 ? "red" : "green" }}
                                                >
                                                    {change > 0 && "+"}{change}%
                                                </TableCell>

                                                <TableCell align="right" style={{ fontSize: 18 }}>
                                                    {symbol} {numberWithCommas(e.market_cap)}
                                                </TableCell>

                                            </TableRow>
                                        )
                                    })}
                                </TableBody>

                            </Table>
                        )
                    }
                </TableContainer>

                <Pagination
                    style={{
                        marginTop: 25,
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                    }}
                    count={(handleSearch().length / 10).toFixed(0)}
                    onChange={(_, value) => {
                        setPage(value)
                        window.scroll(0, 450)
                    }}
                />

            </Container>
        </ThemeProvider>
    )
}

export default CoinTable