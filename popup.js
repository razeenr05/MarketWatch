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
  chrome.storage.sync.set({ stockSymbol: symbol }, () => {
    fetchStock(symbol);
  });
});

// Fetch stock price
async function fetchStock(symbol) {
  try {
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    const price = data["Global Quote"]["05. price"];
    priceDiv.textContent = `${symbol}: $${parseFloat(price).toFixed(2)}`;
  } catch (err) {
    priceDiv.textContent = "Error fetching stock price.";
  }
}
