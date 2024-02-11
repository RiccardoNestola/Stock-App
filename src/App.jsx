import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import Chart from './components/Chart';
import Variations from './components/Variations';
import FilterBar from './components/FilterBar';
import { CssBaseline, Container, Grid, createTheme, ThemeProvider, useMediaQuery, Typography } from '@mui/material';
import Trading from './components/Trading';

function App() {
  const [selectedChart, setSelectedChart] = useState('candlestick');

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState(() => localStorage.getItem('theme') || (prefersDarkMode ? 'dark' : 'light'));
  const currentPrice = 100;

  useEffect(() => {
    localStorage.setItem('theme', mode);
  }, [mode]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      setMode(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
        },
      }),
    [mode],
  );

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const handleFilterChange = (event) => {
    setSelectedChart(event.target.value);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar toggleTheme={toggleTheme} isDarkMode={mode === 'dark'} />

        <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
          <Trading currentPrice={currentPrice} />
          <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>Grafico</Typography>
          <FilterBar selectedValue={selectedChart} onFilterChange={handleFilterChange} />
          <Grid container spacing={3} >
            {selectedChart === 'candlestick' && (
              <Grid item xs={12}>
                <Chart selectedCompanies={['AAPL']} />
              </Grid>

            )}
            {selectedChart === 'line' && (
              <Grid item xs={12}>
                <Variations selectedCompanies={['AAPL']} />
              </Grid>
            )}

          </Grid>
        </Container>
      </ThemeProvider>

    </>
  );
}

export default App;

