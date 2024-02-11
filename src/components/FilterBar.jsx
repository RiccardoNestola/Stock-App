import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function FilterBar({ selectedValue, onFilterChange }) {
    return (
        <Box sx={{ minWidth: 120, marginBottom: 2, marginTop: 2 }}>
            <FormControl fullWidth>
                <InputLabel id="select">Tipo Grafico</InputLabel>
                <Select
                    labelId="select"
                    id="select"
                    value={selectedValue}
                    label="Tipo Grafico"
                    onChange={onFilterChange}
                >
                    <MenuItem value={'candlestick'}>Prezzo</MenuItem>
                    <MenuItem value={'line'}>Variazioni</MenuItem>


                </Select>
            </FormControl>
        </Box>
    );
}

export default FilterBar;
