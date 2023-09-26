import React, { Fragment } from 'react'
import quan_huyen from "../data/quan_huyen.json";
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'

export default function Body(props) {

    return (
        <div>
            <Grid container rowSpacing={2} justifyContent='center'>

                {props?.data?.map((value, idx) => {
                    const address = quan_huyen[value.district]
                    return (
                        <Fragment key={idx}>
                            <Grid item xs={12} container justifyContent='center'>

                                <Card style={{ width: 1100 }}>
                                    <Grid item xs={12} container justifyContent='center'>

                                        <Grid item xs={3}>

                                            <CardMedia
                                                style={{}}
                                                component="img"
                                                sx={{ width: 220, height: 220, padding: 1 }}
                                                image={value.thumbnail}
                                                alt="Live from space album cover"
                                            />
                                        </Grid>
                                        <Grid item xs={9}>

                                            <CardContent sx={{ flex: '1 0 auto' }}>
                                                <Typography component="div" variant="h5" color={"red"}>
                                                    {value.title}
                                                </Typography>
                                                <Typography variant="subtitle1" color="green" component="div">
                                                    {Math.round(value.price) / 1000000} triệu/tháng
                                                </Typography>
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    Diện tích: <span style={{ color: 'black' }}><b>{value.area}m2</b></span> &emsp; &emsp; &emsp;  Khu vực: <span style={{ color: 'blue', fontWeight: 'bold' }}>{address.path} </span>
                                                </Typography>
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    {value.content}
                                                </Typography>
                                            </CardContent>
                                        </Grid>
                                    </Grid>
                                </Card>

                            </Grid>
                        </Fragment>
                    )
                })}
            </Grid>
        </div>
    )
}
