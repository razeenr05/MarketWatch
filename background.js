importScripts("config.js");

//create update badge func
async function updateBadge() {
    //fetch stockSymbol
    chrome.storage.sync.get(["stockSymbol", "lastPrice"], async ({ stockSymbol, lastPrice }) => {
        if (!stockSymbol) {
            chrome.action.setBadgeText({ text: "" });
            return;
        }

    try {
        const url = `https://finnhub.io/api/v1/quote?symbol=${stockSymbol}&token=${apiKey}`;
        const res = await fetch(url);
        const data = await res.json();
        const price = data.c;

    if (price) {
        //badge initial settings
        let badgeText = "";
        let badgeColor = "#808080";

        if (lastPrice !== null && lastPrice !== undefined) {
            // price went up, show green
            if (price > lastPrice) {
            badgeText = "↑"; 
            badgeColor = "#4CAF50"; 
            //price went down, show red
            } 
            else if (price < lastPrice) {
            badgeText = "↓"; 
            badgeColor = "#F44336"; 
            } 
            //price unchanged, show gray
            else {
            badgeText = "→"; 
            badgeColor = "#808080"; 
            }
        }

        chrome.action.setBadgeText({ text: badgeText });
        chrome.action.setBadgeBackgroundColor({ color: badgeColor });

        //save the last price for next comparison
        chrome.storage.sync.set({ lastPrice: price });

    } else {
        chrome.action.setBadgeText({ text: "?" });
        chrome.action.setBadgeBackgroundColor({ color: "#9E9E9E" });
    }
    } catch (error) {
        chrome.action.setBadgeText({ text: "ERR" });
        chrome.action.setBadgeBackgroundColor({ color: "#FF0000" });
    }
  });
}

updateBadge();

//run on startup, install, and every minute
chrome.runtime.onStartup.addListener(updateBadge);
chrome.runtime.onInstalled.addListener(updateBadge);

chrome.alarms.create("updateStock", { periodInMinutes: 1 });
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "updateStock") updateBadge();
});
