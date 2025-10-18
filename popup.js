const priceDiv = document.getElementById("price");
const saveBtn = document.getElementById("save");
const symbolInput = document.getElementById("symbol");

// Load saved symbol on open
chrome.storage.sync.get("stockSymbol", ({ stockSymbol }) => {
  if (stockSymbol) {
    symbolInput.value = stockSymbol;
    fetchStock(stockSymbol);
  }
});

// Save stock symbol
saveBtn.addEventListener("click", () => {
  const symbol = symbolInput.value.toUpperCase();
  symbolInput.value = symbol; 
  chrome.storage.sync.set({ stockSymbol: symbol }, () => {
    fetchStock(symbol);
  });
});

// Fetch stock price
async function fetchStock(symbol) {
  try {
    const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    const price = data.c;
    priceDiv.textContent = `${symbol}: $${parseFloat(price).toFixed(2)}`;
  } catch (err) {
    priceDiv.textContent = "Error fetching stock price.";
  }
}

//automatically refreshes price every 60 seconds while popup open
setInterval(() => {
  const symbol = symbolInput.value.toUpperCase();
  if (symbol) {
    fetchStock(symbol);
  }
}, 60000);
