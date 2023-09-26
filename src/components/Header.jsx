import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import quan_huyen from "../data/quan_huyen.json";
import tinh_tp from "../data/tinh_tp.json";
import data from '../data/data.json'
import khoang_gia from '../data/khoang_gia.json'
import dientich from '../data/dientich.json'
import './style.css'
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import Body from './Body';

export default function Header() {
    const quan = Object.values(quan_huyen)
    const tinh = Object.values(tinh_tp)
    const gia = Object.values(khoang_gia)

    const [city, setCity] = React.useState('')
    const [house, setHouse] = React.useState(data)
    const [district, setDistrict] = React.useState(quan)
    const [cityId, setCityId] = React.useState(undefined)
    const [districtId, setDistrictId] = React.useState(undefined)
    const [minPrice, setMinPrice] = React.useState(0)
    const [maxPrice, setMaxPrice] = React.useState(999999999999999)
    const [minArea, setMinArea] = React.useState(0)
    const [maxArea, setMaxArea] = React.useState(999999999999999)
    const handleChangeCity = (event) => {
        setCity(event.target.value);
    };



    const handleSetDistrict = (code) => {
        setDistrict(quan.filter((val) => val.parent_code === code))
        setCityId(code)
        setDistrictId(undefined)
    }
    const handleSetAddress = (cityCode, districtCode) => {
        setDistrictId(districtCode)
        setCityId(cityCode)
    }
    const handleSetPrice = (minP, maxP) => {
        setMaxPrice(maxP)
        setMinPrice(minP)
    }
    const handleSetArea = (minA, maxA) => {
        setMaxArea(maxA)
        setMinArea(minA)
    }
    const handleFilter = () => {
        setHouse(
            data.filter(val => (
                (!cityId || val.city === cityId) &&
                (!districtId || val.district === districtId) &&
                val.price >= minPrice &&
                val.price <= maxPrice &&
                val.area >= minArea &&
                val.area <= maxArea
            ))
        );
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" class='header-pager'>
                <div className='search-bar'>
                    <Grid container spacing={5}>
                        <Grid xs={2} item>
                            <InputLabel id="demo-simple-select-label" style={{ fontWeight: 'bold' }}>Tỉnh thành</InputLabel>
                            <FormControl fullWidth>
                                <Select
                                    color='primary'
                                    className='dropdown-search'
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={city}
                                    label="Quận huyện"
                                    onChange={handleChangeCity}
                                >
                                    {tinh.map((value) => {
                                        return (
                                            <MenuItem onClick={() => (handleSetDistrict(value.code))} key={value.slug} value={value.code}>{value.name_with_type}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid xs={2} item>
                            <InputLabel id="demo-simple-select-label" style={{ fontWeight: 'bold' }}>Quận huyện</InputLabel>
                            <FormControl fullWidth>
                                <Select
                                    className='dropdown-search'
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Quận huyện"
                                >
                                    {district.map((value) => {
                                        return (
                                            <MenuItem onClick={() => (handleSetAddress(value.parent_code, value.code))} key={value.slug} value={value.code}>{value.name_with_type}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid xs={2} item>
                            <InputLabel id="demo-simple-select-label" style={{ fontWeight: 'bold' }}>Khoảng giá</InputLabel>
                            <FormControl fullWidth>
                                <Select
                                    className='dropdown-search'
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Quận huyện"
                                >
                                    {gia.map((value) => {
                                        return (
                                            <MenuItem onClick={() => (handleSetPrice(value.min_price, value.max_price))} key={value.code} value={value.value}>{value.value}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid xs={2} item>
                            <InputLabel id="demo-simple-select-label" style={{ fontWeight: 'bold' }}>Diện tích</InputLabel>
                            <FormControl fullWidth>
                                <Select
                                    className='dropdown-search'
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Quận huyện"
                                >
                                    {Object.values(dientich).map((value) => {
                                        return (
                                            <MenuItem onClick={() => (handleSetArea(value.min, value.max))} key={value.code} value={value.value}>{value.value}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid xs={2} item >
                            <div style={{ paddingTop: 25 }}>

                                <Button style={{ backgroundColor: 'orange', width: 200, height: 50 }} size='large' variant='string' onClick={handleFilter}>Lọc tin</Button>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </AppBar>
            <div style={{ paddingTop: 20 }}>
                <Body data={house} />
            </div>
        </Box>


    );
}