import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CryptoState } from '../CryptoContext';
import { HistoricalChart } from '../config/api';
import axios from 'axios';
import { CircularProgress } from '@material-ui/core';
import { Line } from "react-chartjs-2";

const useStyles = makeStyles((theme) => ({
    container: {
        width: "70%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 25,
        padding: 25,
        [theme.breakpoints.down("md")]: {
            width: "100%",
            flexDirection: "column",
            alignItems: "center",
        }
    },

    btn: {
        border: "2px solid #e3ab0d",
        background: "none",
        color: "white",
        padding: "10px 40px",
        "&:hover": {
            cursor: "pointer",
            background: "#e3ab0d",
            color: "black",
        },
        [theme.breakpoints.down("sm")]: {
            padding: "10px 20px",
        }
    },

    selected: {
        color: "black",
        background: "#e3ab0d",
    }
}))

function CoinInfo({ coin }) {
    const classes = useStyles();

    const chartDays = [
        {
            label: "24 Hours",
            value: 1,
        },
        {
            label: "30 Days",
            value: 30,
        },
        {
            label: "3 Months",
            value: 90,
        },
        {
            label: "1 Year",
            value: 365,
        }
    ]

    const [historicalData, setHistoricalData] = useState();
    const [days, setDays] = useState(1);

    const { currency, symbol } = CryptoState();

    const fetchData = async () => {
        const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
        setHistoricalData(data.prices);
    }

    useEffect(() => {
        fetchData();
    }, [currency, days])

    return (
        <div className={classes.container}>

            {
                !historicalData ?
                    <CircularProgress
                        style={{ color: "#e3ab0d" }}
                        size={150}
                        thickness={1}
                    />
                    :
                    <>
                    
                        <Line
                            data={{
                                labels: historicalData.map(state => {
                                    let date = new Date(state[0]);
                                    let time = date.getHours > 12 ?
                                        `${date.getHours() - 12}:${date.getHours()} PM`
                                        :
                                        `${date.getHours()}:${date.getHours()} AM`;
                                    return days === 1 ? time : date.toLocaleDateString();
                                }),

                                datasets: [{
                                    data: historicalData.map(state => state[1]),
                                    label: ` ${coin.name} to ${currency} Chart`,
                                    borderColor: "#e3ab0d"
                                }]
                            }}
                            options={{
                                elements: {
                                    point: {
                                        radius: 1
                                    },
                                }
                            }}
                        />

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-around",
                                width: "100%",
                                marginTop: 10,
                            }}
                        >
                            {chartDays.map(e => (
                                <button 
                                value={e.value}
                                onClick={() => setDays(e.value)}
                                className={`${classes.btn} ${e.value === days && classes.selected}`} 
                                >{e.label}</button>
                            ))}
                        </div>
                    </>
            }

        </div>

    )
}

export default CoinInfo