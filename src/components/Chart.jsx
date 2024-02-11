import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, OutlinedInput } from '@mui/material';
import { FetchStock } from './FetchStock'
import { useQuery } from 'react-query';


function Chart({ selectedCompanies: initialSelectedCompanies }) {

    const [selectedCompanies, setSelectedCompanies] = useState(initialSelectedCompanies);
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    const chartHeight = matchesSM ? 300 : 500;
    const { data: series, isLoading, error } = useQuery(
        ['stockData', selectedCompanies],
        () => FetchStock(selectedCompanies),
        { staleTime: 1000 * 60 * 5 }
    );



    const handleCompanyChange = (event) => {
        setSelectedCompanies(event.target.value);
    };

    const chartOptions = {
        chart: {
            type: 'candlestick',
            height: chartHeight,
            toolbar: {
                show: false,
            }
        },
        title: {
            text: 'Andamento azioni',
            align: 'left',

        },
        xaxis: {
            type: 'datetime',
            labels: {
                style: {
                    colors: '#000',
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#000',
                }
            },
            tooltip: {
                enabled: true
            }
        },
        tooltip: {
            theme: 'dark',

        },
        theme: {
            mode: 'light',
            monochrome: {
                enabled: false,
            },
        },
    };


    return (
        <>
            <FormControl fullWidth sx={{ marginBottom: 5 }}>
                <InputLabel id="checkbox">Aziende</InputLabel>
                <Select
                    labelId="checkbox"
                    id="checkbox"
                    multiple
                    value={selectedCompanies}
                    onChange={handleCompanyChange}
                    input={<OutlinedInput label="Aziende" />}
                    renderValue={(selected) => selected.join(', ')}
                >
                    {['AAPL', 'GOOGL', 'MSFT'].map((company) => (
                        <MenuItem key={company} value={company}>
                            <Checkbox checked={selectedCompanies.indexOf(company) > -1} />
                            <ListItemText primary={company} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {isLoading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error: {error.message}</div>
            ) : (
                <ReactApexChart options={chartOptions} series={series || []} type="candlestick" height={chartHeight} />
            )}


        </>
    );
}

export default Chart;
