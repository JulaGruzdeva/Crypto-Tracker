import { makeStyles } from "@material-ui/core";
import axios from "axios";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { TrendingCoins } from "../../config/api";
import Coins from "../store/Coins";
import dollar from './img/dollar-symbol.png';


export function numberWithCommas(x: string) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const useStyles = makeStyles(() => ({
    carousel: {
        height: '50%',
        display: 'flex',
        alignItems: 'center'
    },
    carouselItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        textTransform: "uppercase",
        color: "white",

    },
}))



const Carousel = observer(() => {
    const classes = useStyles();

    const fetchTrendingCoins = async () => {
        const data = await axios.get(TrendingCoins())
        Coins.saveData(data.data)
    }

    useEffect(() => {
        fetchTrendingCoins()
    }, [])

    const items = Coins.trending.map(coin => {
        let profit = coin.price_change_percentage_24h >= 0;
        return (
            <Link className={classes.carouselItem} to={`/coins:${coin.id}`}>
                <img
                    src={coin.image}
                    alt={coin.name}
                    height='80'
                    style={{ marginBottom: 10 }}
                />
                <span>
                    <span style={{ color: 'gold', padding: 0, margin: 0 }}>{coin.symbol}</span>
                    &nbsp;
                    <span style={{
                        color: coin.price_change_percentage_24h > 0 ? '#01C38E' : '#F12525',
                        fontWeight: 600
                    }}>
                        {profit && "+"}{coin.price_change_percentage_24h.toFixed(2)}%
                    </span>

                </span>
                <span style={{ display: 'flex', alignItems: 'center', textAlign: 'center', fontSize: 22, fontWeight: 500, marginTop: 7, }}>
                    <img src={dollar} alt='dollar' style={{}} />{numberWithCommas(coin.current_price.toFixed(5))}
                </span>
            </Link>
        )
    })

    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 4
        }
    }

    return (
        <>
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
                    items={items} />
            </div>
        </>
    )
})

export default Carousel;