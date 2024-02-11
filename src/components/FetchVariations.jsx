export const FetchVariations = async (selectedCompany) => {
    const apiKey = "InrCQaLzaAmMB7V1xaPDroTlR6BNsVfc";
    const fromDate = "2023-01-01";
    const toDate = "2023-12-31";
    const url = `https://api.polygon.io/v2/aggs/ticker/${selectedCompany}/range/1/day/${fromDate}/${toDate}?apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("Dati ricevuti dall'API:", data);
        if (data.results) {
            const priceChanges = data.results.map((item, index, arr) => {
                if (index === 0) return { x: new Date(item.t), y: 0 };
                let prevClose = arr[index - 1].c;
                let diff = ((item.c - prevClose) / prevClose) * 100;
                return {
                    x: new Date(item.t),
                    y: parseFloat(diff.toFixed(2))
                };
            });

            return priceChanges;

        }


    } catch (error) {
        console.error("Error fetching data from Polygon.io:", error);
    }
    return [];
};
