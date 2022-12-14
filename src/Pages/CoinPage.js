import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { makeStyles } from '@material-ui/core/styles';
import CoinInfo from '../Components/CoinInfo';
import { Typography } from "@material-ui/core";
import ReactHtmlParser from 'react-html-parser';
import { numberWithCommas } from '../Components/Banner/Carousel';
import { LinearProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    marginTop: 20,
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    }
  },

  sidebar: {
    display: "flex",
    width: "33%",
    flexDirection: "column",
    alignItems: "start",
    marginTop: 25,
    padding: 25,
    borderRight: "2px solid grey",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      border: 0,
    }
  },

  description: {
    width: "100%",
    marginTop: 20,
    marginBottom: 20,
  },

  heading: {
    fontWeight: "bold"
  }
}))

function CoinPage() {
  const classes = useStyles();

  const { id } = useParams();
  const [coin, setCoin] = useState({});
  
  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  }

  useEffect(() => {
    fetchCoin();
  }, [currency])

  if (Object.keys(coin).length === 0) return <LinearProgress style={{ backgroundColor: "#e3ab0d" }} />

  return (
    <div className={classes.container}>

      <div className={classes.sidebar}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
          <img
            src={coin.image && coin.image.large}
            alt={coin.name}
            height={125}
          />
          <Typography variant="h4" className={classes.heading} style={{ marginTop: 10 }}>{coin.name}</Typography>
        </div>

        <Typography variant="subtitle1" className={classes.description}>{coin.description && ReactHtmlParser(coin.description.en.split(". ")[0])}.</Typography>


        <div className={classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>Rank: </Typography> &nbsp; &nbsp;
            <Typography variant="h5">{coin.market_cap_rank}</Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>Current Price: </Typography> &nbsp; &nbsp;
            <Typography variant="h5">{symbol} {coin.market_data && numberWithCommas(coin.market_data.current_price[currency.toLowerCase()].toFixed(2))}</Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>Market Cap: </Typography> &nbsp; &nbsp;
            <Typography variant="h5">{symbol} {coin.market_data && numberWithCommas(coin.market_data.market_cap[currency.toLowerCase()])}</Typography>
          </span>
        </div>

      </div>

      <CoinInfo coin={coin} />

    </div>
  )
}

export default CoinPage