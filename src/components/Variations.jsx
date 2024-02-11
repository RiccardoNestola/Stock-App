import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useQuery } from 'react-query';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { FetchVariations } from './FetchVariations';

function Variations() {
    const [selectedCompany, setSelectedCompany] = useState('AAPL');
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    const chartHeight = matchesSM ? 300 : 500;

    let series = [];

    const { data: seriesData, isLoading, error } = useQuery(
        ['priceVariation', selectedCompany],
        () => FetchVariations(selectedCompany),
        { staleTime: 1000 * 60 * 5 }
    );

    let chartSeries = seriesData ? [{
        name: "Variazione Prezzo",
        data: seriesData
    }] : series;


    console.log("Stato di isLoading:", isLoading);
    console.log("Errori:", error);
    console.log("Grafico:", seriesData);

    const handleCompanyChange = (event) => {
        setSelectedCompany(event.target.value);
        console.log("Azienda selezionata:", event.target.value);

    };

    const chartOptions = {
        chart: {
            type: 'line',
            height: chartHeight,
            toolbar: {
                show: false,
            }
        },
        title: {
            text: 'Variazioni Prezzo',
            align: 'left',
        },
        stroke: {
            curve: 'smooth',
        },
        xaxis: {
            type: 'datetime',
            labels: {
                style: {
                    colors: '#000',
                }
            }
        },
        tooltip: {
            theme: 'dark',
            x: {
                format: 'dd MMM yyyy',
            },
            y: {
                formatter: function (val) {
                    return `${val}%`;
                },
            },
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
            <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel id="company">Azienda</InputLabel>
                <Select
                    labelId="company"
                    id="company"
                    value={selectedCompany}
                    onChange={handleCompanyChange}
                    label="Azienda"
                >
                    {['AAPL', 'GOOGL', 'MSFT'].map((company) => (
                        <MenuItem key={company} value={company}>{company}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            {isLoading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error: {error.message}</div>
            ) : (
                <ReactApexChart options={chartOptions} series={chartSeries} type="line" height={chartHeight} />
            )}
        </>
    );
}

export default Variations;
