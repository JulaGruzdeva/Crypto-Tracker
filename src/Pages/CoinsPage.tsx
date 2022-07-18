import { LinearProgress, makeStyles, Tooltip } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactHtmlParser from 'react-html-parser';
import { useNavigate, useParams } from "react-router-dom";
import { SingleCoin } from "../config/api";


function numberWithCommas(x: string) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const useStyles = makeStyles(() => ({
    container: {
        width: "75%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",


    },
    sideBar: {
        width: "55%",
        marginTop: "40px",
        paddingLeft: "40px",
        borderRight: "2px solid gray",
    },
    img: {
        width: '150px',
        height: '150px',
        marginTop: "20px"
    },
    description: {

        marginTop: "20px"
    },
    backBtn: {
        padding: "8px 15px",
        marginTop: "10px",
        marginLeft: "40px",
        cursor: "pointer",
        border: "2px solid #01C38E",
        borderRadius: "5px",
        background: "none",
        color: "white",
        "&:hover": {
            background: "#01C38E"
        }
    }
}))
interface Coin {
    id: string,
    name: string,
    description: {
        uk: string
    },
    market_cap_rank: number,
    market_data: {
        market_cap: {
            usd: number
        }
    },

    image: {
        large: string
    }
}

const CoinsPage = () => {
    const navigate = useNavigate();

    const [singleCoin, setSingleCoin] = useState<Coin>()

    const { id } = useParams()
    useEffect(() => {
        console.log(id)

    }, [])

    const fetchSingleCoin = async () => {
        if (id) {
            const data = await axios.get(SingleCoin(id.slice(1)))
            console.log(data.data)

            setSingleCoin(data.data)
        }
    }
    useEffect(() => {
        console.log(fetchSingleCoin())
        console.log(singleCoin)
    }, [])

    const classes = useStyles();
    if (!singleCoin) return <LinearProgress style={{ backgroundColor: '#01C38E' }} />
    return (
        <><Tooltip title="Back"><button onClick={() => navigate(`/`)} className={classes.backBtn}>Back</button></Tooltip><div className={classes.container}>
            <div className={classes.sideBar}>
                <img src={singleCoin?.image.large} alt='coin' className={classes.img} />
                <h1 style={{ fontWeight: 500, fontSize: '40px', marginTop: "40px" }}>{singleCoin?.name}</h1>
                <p className={classes.description}>{singleCoin ? ReactHtmlParser(singleCoin?.description.uk.split('. ')[0]) : 'Description'}</p>
                <h1 style={{ fontWeight: 500, marginTop: "20px" }}>Rank: <span style={{ fontWeight: 300 }}>{singleCoin?.market_cap_rank}</span></h1>
                <h1 style={{ fontWeight: 500, marginTop: "20px" }}>Market Cap: <span style={{ fontWeight: 300 }}>{numberWithCommas(singleCoin ? singleCoin.market_data.market_cap.usd?.toString().slice(0, -6) : 'Market Cap')}M</span></h1>

            </div>
        </div></>

    )
}
export default CoinsPage;



