

export const FetchStock = async (selectedCompanies) => {
    let seriesData = [];
    for (const ticker of selectedCompanies) {
        const apiKey = "InrCQaLzaAmMB7V1xaPDroTlR6BNsVfc";
        const fromDate = "2023-01-01";
        const toDate = "2023-12-31";
        const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${fromDate}/${toDate}?apiKey=${apiKey}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.results) {
                const formattedData = data.results.map(item => ({
                    x: new Date(item.t),
                    y: [item.o, item.h, item.l, item.c].map(val => parseFloat(val.toFixed(2)))
                }));
                seriesData.push({ name: ticker, data: formattedData });
            }
        } catch (error) {
            console.error(`Error fetching data for ${ticker} from Polygon.io:`, error);

        }
    }
    return seriesData;
};


