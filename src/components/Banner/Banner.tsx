import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from './Carousel';

const useStyles = makeStyles(() => ({
    Banner: {
        backgroundImage: "url(./banner2.jpg)"
    },
    tagLine: {
        display: 'flex',
        flexDirection: 'column',
        height: '40%',
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    }
}))

const Banner = () => {
    const classes = useStyles()
    return (
        <>
            <div className={classes.Banner}>
                <Container style={{
                    height: 400,
                    display: 'flex',
                    flexDirection: 'column',
                    paddingTop: 25,
                    justifyContent: 'space-around'
                }}>

                    <div className={classes.tagLine}>
                        <Typography
                            variant='h2'
                            style={{
                                fontWeight: 'bold',
                                marginBottom: 15,
                            }}
                        >
                            Crypto Tracker
                        </Typography>
                    </div>
                    <Carousel />
                </Container>
            </div>


        </>
    )
}


export default Banner;

