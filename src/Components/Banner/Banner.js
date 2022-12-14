import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from "@material-ui/core";
import Carousel from './Carousel';

const useStyles = makeStyles({
    banner: {
        backgroundImage: "url(./banner.jpg)",
        backgroundPosition: "top",
    },

    bannerContent: {
        height: 400,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        padding: "20px"
    },

    tagLineHead: {
        fontWeight: "bold",
        textOverflow: "wrap"
    },

    tagLineFoot: {
        fontWeight: "light",
        color: "#848484"
    }

})

function Banner() {
    const classes = useStyles();

    return (
        <div className={classes.banner}>
            <Container className={classes.bannerContent}>
                
                <div>
                    <Typography 
                        className={classes.tagLineHead}
                        variant="h2"
                        align="center"
                    >
                        Crypto Tracker
                    </Typography>
                    <Typography 
                        className={classes.tagLineFoot}
                        variant="subtitle2"
                        align="center"
                    >
                        Get all the info regarding your favourite Cryptocurrency
                    </Typography>
                </div>

                <Carousel />
            </Container>
        </div>
    )
}

export default Banner