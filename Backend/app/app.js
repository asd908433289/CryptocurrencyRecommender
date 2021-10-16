const express = require("express");
const request = require("request-promise");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const app = express();
const cors = require("cors");

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));


app.get("/blockChain", async (req, res) => {
    puppeteer.launch().then(async (browser)=>{
        const page = await browser.newPage();
        
        await page.goto ('https://exchange.blockchain.com/trade/BTC-USD', {
            waitUntil: 'networkidle0'
          });
         
        await page.waitForSelector ('body');

        let bitcoin = await page.evaluate (() => {
            let sellPriceTable = document.body.querySelector('.cqNwHH');
            let allSellPosts = sellPriceTable.querySelectorAll('.row');
            var sellPrices = [];
            allSellPosts.forEach (item => {
                let price = '';
                try {
                    price = item.querySelector('a').querySelector('span').innerHTML.replace(',','');
                } catch (err) {}
                
                sellPrices.push( parseFloat(price) );
            });

            let buyPriceTable = document.body.querySelector('.jFhahS');
            let allBuyPosts = buyPriceTable.querySelectorAll('.row');
            var buyPrices = [];
            allBuyPosts.forEach (item => {
                let price = '';
                try {
                    price = item.querySelector('a').querySelector('span').innerHTML.replace(',','');
                } catch (err) {}
                
                buyPrices.push( parseFloat(price) );
            });


            let items = {
                "lowestSellPrice": Math.min(...sellPrices),
                "highestBuyPrice": Math.max(...buyPrices)
               
            };
            return items;
        });

        
        const page2 = await browser.newPage();
        
        await page2.goto ('https://exchange.blockchain.com/trade/ETH-USD', {
            waitUntil: 'networkidle0'
          });
         
        await page2.waitForSelector ('body');

        let ethereum = await page2.evaluate (() => {
            let sellPriceTable = document.body.querySelector('.cqNwHH');
            let allSellPosts = sellPriceTable.querySelectorAll('.row');
            var sellPrices = [];
            allSellPosts.forEach (item => {
                let price = '';
                try {
                    price = item.querySelector('a').querySelector('span').innerHTML.replace(',','');
                } catch (err) {}
                
                sellPrices.push( parseFloat(price) );
            });

            let buyPriceTable = document.body.querySelector('.jFhahS');
            let allBuyPosts = buyPriceTable.querySelectorAll('.row');
            var buyPrices = [];
            allBuyPosts.forEach (item => {
                let price = '';
                try {
                    price = item.querySelector('a').querySelector('span').innerHTML.replace(',','');
                } catch (err) {}
                
                buyPrices.push( parseFloat(price) );
            });


            let items = {
                "lowestSellPrice": Math.min(...sellPrices),
                "highestBuyPrice": Math.max(...buyPrices)
               
            };
            return items;
        });

    
        
        res.send({
            bitcoin: bitcoin,
            ethereum: ethereum
        });
        await browser.close();

    }).catch((err)=>{console.error(err);});
});


app.get("/binance", async (req, res) => {
    puppeteer.launch().then(async (browser)=>{
        const page = await browser.newPage();
        
        await page.goto ('https://www.binance.com/en/trade/BTC_USDT?layout=basic', {
            waitUntil: 'networkidle0'
          });
         
        
        await page.waitForSelector ('body');

        let bitcoin = await page.evaluate (() => {
            let allSellTable = document.body.querySelector('.orderbook-ask');
            let allSellPosts = allSellTable.querySelectorAll('.ask-light');
           
            var sellPrices = [];
            allSellPosts.forEach (item => {
                let price = '';
                try {
                    price = item.innerHTML;
                } catch (err) {}
                
                sellPrices.push( parseFloat(price)  );
            });

            
            
            let allBuyPosts = document.body.querySelectorAll('.bid-light');
           
            var buyPrices = [];
            allBuyPosts.forEach (item => {
                let price = '';
                try {
                    price = item.innerHTML;
                } catch (err) {}
                
                buyPrices.push( parseFloat(price)   );
            });


            let items = {
                "lowestSellPrice": Math.min(...sellPrices),
                "highestBuyPrice": Math.max(...buyPrices)
               
               
            };
            return items;
        });

        
        const page2 = await browser.newPage();
        
        await page2.goto ('https://www.binance.com/en/trade/ETH_USDT?layout=basic', {
            waitUntil: 'networkidle0'
          });
         
        
        await page2.waitForSelector ('body');

        let ethereum = await page2.evaluate (() => {
            let allSellTable = document.body.querySelector('.orderbook-ask');
            let allSellPosts = allSellTable.querySelectorAll('.ask-light');
           
            var sellPrices = [];
            allSellPosts.forEach (item => {
                let price = '';
                try {
                    price = item.innerHTML;
                } catch (err) {}
                
                sellPrices.push( parseFloat(price)  );
            });

            
            
            let allBuyPosts = document.body.querySelectorAll('.bid-light');
           
            var buyPrices = [];
            allBuyPosts.forEach (item => {
                let price = '';
                try {
                    price = item.innerHTML;
                } catch (err) {}
                
                buyPrices.push( parseFloat(price)   );
            });


            let items = {
                "lowestSellPrice": Math.min(...sellPrices),
                "highestBuyPrice": Math.max(...buyPrices)
               
               
            };
            return items;
        });



        res.send({
            bitcoin: bitcoin,
            ethereum: ethereum
            
        });
        await browser.close();

    }).catch((err)=>{console.error(err);});
});

app.listen(8081, () => {
  console.log(`Server started at port ${8081}`);
});
