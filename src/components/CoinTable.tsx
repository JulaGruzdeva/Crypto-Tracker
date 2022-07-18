import { Container, LinearProgress, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dollar from '../../src/components/Banner/img/dollar-symbol.png';
import Coins from "./store/Coins";

function numberWithCommas(x: string) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const CoinTable = observer(() => {
    const [search, setSearch] = useState<string>('');
    const navigate = useNavigate();
    const darkTheme = createTheme({
        palette: {
            primary: {
                main: '#fff',
            },
            type: 'dark',
        }
    })

    const handleSearch = () => {
        return Coins.trending.filter(
            (coin) =>
                coin.name.toLowerCase().includes(search) ||
                coin.symbol.toLowerCase().includes(search)
        )
    }
    const useStyles = makeStyles({
        row: {
            cursor: "pointer",
            "&:hover": {
                backgroundColor: "#004633",
            },
            fontFamily: "Montserrat",
        },
        pagination: {
            "& .MuiPaginationItem-root": {
                color: "gold",
            },
        },
    });

    const classes = useStyles()


    return (
        <ThemeProvider theme={darkTheme} >
            <Container style={{ textAlign: 'center' }}>
                <Typography
                    variant='h4'
                    style={{ margin: 18 }}
                >
                    Cryptocurrency Prices by Market Cap
                </Typography>

                <TextField
                    label='Search For a Crypto Currency'
                    variant='outlined'
                    style={{ marginBottom: 20, width: '100%' }}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </Container>
            <TableContainer>
                {(Coins.trending.length === 0) ? (
                    <LinearProgress style={{ backgroundColor: '#01C38E' }} />
                ) : (
                    <Table style={{ width: "80%", margin: "0 auto" }}>
                        <TableHead style={{ backgroundColor: "#01C38E" }}>
                            <TableRow>
                                {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                    <TableCell
                                        style={{
                                            color: "black",
                                            fontWeight: "700",
                                            fontFamily: "Montserrat",
                                        }}
                                        key={head}
                                        align={head === "Coin" ? "left" : "right"}
                                    >
                                        {head}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {handleSearch().map((row) => {
                                const profit = row.price_change_percentage_24h > 0;
                                return (
                                    <TableRow
                                        onClick={() => navigate(`/coins:${row.id}`)}
                                        className={classes.row}
                                        key={row.name}
                                    >
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            style={{
                                                display: "flex",
                                                gap: 15,
                                            }}
                                        >
                                            <img
                                                src={row?.image}
                                                alt={row?.name}
                                                height="50"
                                                style={{ marginBottom: 10 }}
                                            />
                                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                                                <span style={{ textTransform: "uppercase", fontSize: 22, marginRight: 7 }}>
                                                    {row.symbol}
                                                </span>
                                                <hr style={{ width: 1, height: 20, color: '#fff' }} />
                                                <span style={{ color: 'darkgray', marginLeft: 7 }}>
                                                    {row.name}
                                                </span>
                                            </div>
                                        </TableCell>

                                        <TableCell align="right" style={{ fontSize: 22, fontWeight: 500 }}>
                                            <span style={{ display: "flex", justifyContent: "right", textAlign: "center", alignItems: "center" }}>
                                                <img src={dollar} alt='dollar' style={{}} />{numberWithCommas(row.current_price.toFixed(2))}
                                            </span>
                                        </TableCell>

                                        <TableCell align="right" style={{
                                            color: row.price_change_percentage_24h > 0 ? '#01C38E' : '#F12525',
                                            fontWeight: 500
                                        }}>
                                            {profit && "+"}{row.price_change_percentage_24h.toFixed(2)}%
                                        </TableCell>

                                        <TableCell align="right" style={{ fontSize: 16, fontWeight: 500 }}>
                                            {numberWithCommas(
                                                row.market_cap.toString().slice(0, -6)
                                            )}
                                            M
                                        </TableCell>

                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                )
                }
            </TableContainer>
        </ThemeProvider>
    )
})

export default CoinTable;