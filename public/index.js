async function main() {
  const timeChartCanvas = document.querySelector("#time-chart");
  const highestPriceChartCanvas = document.querySelector(
    "#highest-price-chart"
  );
  const averagePriceChartCanvas = document.querySelector(
    "#average-price-chart"
  );
}

main();

async function main() {
  const timeChartCanvas = document.querySelector("#time-chart");
  const highestPriceChartCanvas = document.querySelector(
    "#highest-price-chart"
  );

  fetch(
    "https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1min&apikey=3b3de57e13cf4dc39199064ae2c3ef2e"
  )
    .then((response) => response.json())
    .then((data) => console.log(data));

  const { GME, MSFT, DIS, BNTX } = mockData;

  const stocks = [GME, MSFT, DIS, BNTX];

  stocks.forEach((stock) => stock.values.reverse());

  // Time Chart
  new Chart(timeChartCanvas.getContext("2d"), {
    type: "line",
    data: {
      labels: stocks[0].values.reverse().map((value) => value.datetime),
      datasets: stocks.map((stock) => ({
        label: stock.meta.symbol,
        data: stock.values.reverse().map((value) => parseFloat(value.high)),
        backgroundColor: getColor(stock.meta.symbol),
        borderColor: getColor(stock.meta.symbol),
      })),
    },
  });

  function findHighest(values) {
    let highest = 0;
    values.forEach((value) => {
      if (parseFloat(value.high) > highest) {
        highest = value.high;
      }
    });
    return highest;
  }

  function getColor(stock) {
    if (stock === "GME") {
      return "rgba(61, 161, 61, 0.7)";
    }
    if (stock === "MSFT") {
      return "rgba(209, 4, 25, 0.7)";
    }
    if (stock === "DIS") {
      return "rgba(18, 4, 209, 0.7)";
    }
    if (stock === "BNTX") {
      return "rgba(166, 43, 158, 0.7)";
    }
  }
}
