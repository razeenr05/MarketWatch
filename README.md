<p align="center">
  <img src="icons/banner.png" alt="MarketWatch Banner" width="800">
</p>

## A Chrome Stock Ticker Extension

A lightweight Chrome extension that displays real time stock prices in a popup window using the Alpha Vantage API. 
Users can enter any stock symbol, save it, and instantly fetch the current price.

## Features:
- Enter and save any stock ticker symbol  
- Fetches real time stock prices using Finnhub  
- Uses Chrome Storage API to remember your chosen symbol  
- Clean popup interface with stock price display  
- Custom stock-trend icons  

## Setup:

1. Clone the repo:  
   git clone https://github.com/your-username/Chrome-Stock-Ticker-Extension.git
   cd Chrome-Stock-Ticker-Extension
2. Get a free API key from Finhubb at https://finnhub.io/ 
3. Create a config.js file in the project root:
    const apiKey = "YOUR_API_KEY_HERE";
4. Open Chrome and go to chrome://extensions.
5. Enable Developer mode.
6. Click Load unpacked and select this project folder
7. Pin the extension and test it from the toolbar.

## Future Improvements
- Improve popup.html
- Add a background.js to update the ticker periodically
- Show stock price directly on the toolbar badge
- Support multiple saved stocks
- Add charts for recent price trends

## License

MIT License