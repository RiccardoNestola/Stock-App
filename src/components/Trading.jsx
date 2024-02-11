import React, { useState, useEffect } from 'react';
import { Box, Button, MenuItem, Select, TextField, Typography, colors, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


const initialStockPrices = {
    APPLE: 150,
    MICROSOFT: 250,
    GOOGLE: 2700
};

function Trading() {
    const [balance, setBalance] = useState(() => parseFloat(localStorage.getItem('balance')) || 10000);
    const [portfolio, setPortfolio] = useState(() => JSON.parse(localStorage.getItem('portfolio')) || {});
    const [transactions, setTransactions] = useState(() => JSON.parse(localStorage.getItem('transactions')) || []);
    const [selectedStock, setSelectedStock] = useState('APPLE');
    const [quantity, setQuantity] = useState('');
    const [stockPrices, setStockPrices] = useState(initialStockPrices);


    useEffect(() => {
        localStorage.setItem('balance', balance);
        localStorage.setItem('portfolio', JSON.stringify(portfolio));
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }, [balance, portfolio, transactions]);

    const Buy = () => {
        const price = stockPrices[selectedStock];
        const cost = quantity * price;

        if (balance >= cost && quantity > 0) {
            setBalance(prevBalance => prevBalance - cost);
            setPortfolio(prevPortfolio => ({
                ...prevPortfolio,
                [selectedStock]: (prevPortfolio[selectedStock] || 0) + parseInt(quantity),
            }));
            setTransactions(prevTransactions => [...prevTransactions, { stock: selectedStock, quantity, price, type: 'Comprate', date: new Date() }]);
            setQuantity('');
        } else {
            alert('Saldo insufficiente o quantità non valida.');
        }
    };

    const Sell = () => {
        const price = stockPrices[selectedStock];
        const cost = quantity * price;

        if (portfolio[selectedStock] >= quantity && quantity > 0) {
            setBalance(prevBalance => prevBalance + cost);
            setPortfolio(prevPortfolio => ({
                ...prevPortfolio,
                [selectedStock]: prevPortfolio[selectedStock] - parseInt(quantity),
            }));
            setTransactions(prevTransactions => [...prevTransactions, { stock: selectedStock, quantity, price, type: 'Vendute', date: new Date() }]);
            setQuantity('');
        } else {
            alert('Quantità non valida o non possiedi abbastanza azioni.');
        }
    };




    return (
        <div>
            <Paper elevation={3} sx={{ p: 3, mt: 4, mb: 4, borderRadius: 2, maxWidth: 500, mx: 'auto' }}>
                <Typography variant="h4" sx={{ mb: 3, textAlign: 'center' }}>Trading</Typography>
                <Typography sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center' }}>Saldo: €{balance.toFixed(2)}</Typography>

                <Box sx={{ mt: 3, mb: 3, display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
                    <Select
                        value={selectedStock}
                        onChange={(e) => setSelectedStock(e.target.value)}
                        sx={{ width: '100%' }}
                    >
                        {Object.keys(stockPrices).map(stock => (
                            <MenuItem key={stock} value={stock}>{stock}</MenuItem>
                        ))}
                    </Select>

                    <TextField
                        label="Quantità"
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        sx={{ width: '100%' }}
                    />

                    <Button variant="contained" color="success" onClick={Buy} sx={{ width: '100%', py: 1.5 }}>Compra</Button>
                    <Button variant="contained" color="error" onClick={Sell} sx={{ width: '100%', py: 1.5 }}>Vendi</Button>
                </Box>
            </Paper>

            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Portfolio</Typography>

            <TableContainer component={Paper} sx={{ maxHeight: '400px', overflow: 'auto' }}>
                <Table stickyHeader sx={{ minWidth: 200 }} aria-label="transazioni">
                    <TableHead>
                        <TableRow>
                            <TableCell >Azienda</TableCell>
                            <TableCell align='center'>Quantità</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.entries(portfolio).map(([stock, qty]) => (
                            <TableRow key={stock}>
                                <TableCell>{stock}</TableCell>
                                <TableCell align='center'>{qty}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>Transazioni</Typography>

            <TableContainer component={Paper} sx={{ maxHeight: '400px', overflow: 'auto' }}>
                <Table stickyHeader sx={{ minWidth: 650 }} aria-label="transazioni">
                    <TableHead>
                        <TableRow>
                            <TableCell>Data</TableCell>
                            <TableCell>Tipo</TableCell>
                            <TableCell>Azienda</TableCell>
                            <TableCell align="right">Quantità</TableCell>
                            <TableCell align="right">Prezzo (€)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.map((trans, index) => (
                            <TableRow key={index}>
                                <TableCell>{trans.date.toLocaleString()}</TableCell>
                                <TableCell sx={{ color: trans.type === 'Comprate' ? colors.green[500] : colors.red[500] }}>{trans.type}</TableCell>
                                <TableCell>{trans.stock}</TableCell>
                                <TableCell align="right">{trans.quantity}</TableCell>
                                <TableCell align="right">€{trans.price.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>





        </div>
    );

}

export default Trading;
