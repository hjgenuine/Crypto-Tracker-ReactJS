import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { TrendingCoins } from '../../config/api';
import { CryptoState } from '../../CryptoContext';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    carousel: {
        height: "50%",
        display: "flex",
        alignItems: "center",
    },

    carouselItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        cursor: "pointer",
    }
})

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function Carousel() {
    const [ trending, setTrending ] = useState([]);
    const { currency, symbol } = CryptoState();

    const classes = useStyles();

    const fetchCoins = async () => {
        const { data } = await axios.get(TrendingCoins(currency));
        setTrending(data);
    }

    useEffect(() => {
        fetchCoins();
    }, [currency]);

    const items = trending.map(coin => {
        const change = coin.price_change_percentage_24h.toFixed(2);

        return (
            <Link
                className={classes.carouselItem}
                to={`/coin/${coin.id}`}
            >
                <img
                    src={coin.image}
                    alt={coin.name}
                    height={85}
                    style={{ marginBottom: "5px" }}
                />

                <span>
                    {coin.symbol.toUpperCase()}
                    <span
                        style={{color: change < 0 ? "red" : "green" }}
                    >
                        &nbsp;
                        {change > 0 && "+"}{change}%
                    </span>
                </span>
                
                <span style={{ fontSize: 22 }}>
                    {symbol} {numberWithCommas(coin.current_price.toFixed(2))}
                </span>
            </Link>
        )
    })

    const responsive = {
        550: {
            items: 4
        },
        0: {
            items: 2
        }
    }

    return (
        <div className={classes.carousel}>

            <AliceCarousel
                mouseTracking
                infinite
                autoPlayInterval={1000}
                animationDuration={1500}
                disableDotsControls
                disableButtonsControls
                responsive={responsive}
                autoPlay
                items={items}
                alignItems
            />

        </div>
    )
}

export default Carousel