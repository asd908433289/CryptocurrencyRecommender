import { Fragment } from "react";
import axios from 'axios';
import { useState, useEffect } from "react";

const BitcoinTable = ()=>{

    const [blockchainLowestSelling, setBlockchainLowestSelling] = useState("Loading");
    const [blockchainHighestBuying, setBlockchainHighestBuying] = useState("Loading");
    const [binanceLowestSelling, setBinanceLowestSelling] = useState("Loading");
    const [binanceHighestBuying, setBinanceHighestBuying] = useState("Loading");

    const blockChainRequest = async ()=>{
      try{
        const response = await axios.get('http://localhost:8081/blockChain');
        if(response.data.success === true){
          setBlockchainLowestSelling(response.data.bitcoin.lowestSellPrice);
          setBlockchainHighestBuying(response.data.bitcoin.highestBuyPrice);
        }
        else{
          alert("Try to refresh the page to reload the content of this page. Sometime HTTP request might fail due to large latency.");
        }
        
      }
      catch(e){
        alert("Try to refresh the page to reload the content of this page. Sometime HTTP request might fail due to large latency.");
      }
        
       
   }

   const binanceRequest = async ()=>{
     try{
      const response = await axios.get('http://localhost:8081/binance');
      if(response.data.success === true){
        setBinanceLowestSelling(response.data.bitcoin.lowestSellPrice);
        setBinanceHighestBuying(response.data.bitcoin.highestBuyPrice);
      }
      else{
        alert("Try to refresh the page to reload the content of this page. Sometime HTTP request might fail due to large latency.");
      }
      
     }
     catch(e){
      alert("Try to refresh the page to reload the content of this page. Sometime HTTP request might fail due to large latency.");
     }
    
   
    
}
 
   useEffect(()=>{
        blockChainRequest();
        binanceRequest();
   },[]);
   
    var recomBuyingOn = blockchainLowestSelling !== 'Loading' && binanceLowestSelling !== 'Loading';
    var recomSellingOn = blockchainHighestBuying !== 'Loading' && binanceHighestBuying !== 'Loading';

    return(<Fragment>
        <table className="table">
        <tr>
          
            <th>
              Exchange Platforms
            </th>
            <th>
              Bitcoin Buy Price
            </th>
            <th>
              Bitcoin Sell Price
            </th>
           

        </tr>
        <tr>
            <td> <a href="https://exchange.blockchain.com/trade/BTC-USD">  BlockChain</a></td>
            <td>$ {blockchainLowestSelling}{  recomBuyingOn &&  blockchainLowestSelling <= binanceLowestSelling ? ' (I recommend you buy bitcoins at this exchange since it offers lower price)':'' }</td>
            <td>$ {blockchainHighestBuying}{ recomSellingOn && blockchainHighestBuying >= binanceHighestBuying ? ' (I recommend you sell your bitcoins at this exchange since it offers higher price)':''  }</td>
            
        </tr>
        <tr>
            <td> <a href="https://www.binance.com/en/trade/BTC_USDT?layout=basic"> Binance</a></td>
            <td>$ {binanceLowestSelling}{  recomBuyingOn &&  blockchainLowestSelling > binanceLowestSelling ? ' (I recommend you buy bitcoins at this exchange since it offers lower price)':'' }</td>
            <td>$ {binanceHighestBuying}{ recomSellingOn && blockchainHighestBuying < binanceHighestBuying ? ' (I recommend you sell your bitcoins at this exchange since it offers higher price)':''  }</td>
           
        </tr>
       
       
       
       
      </table>
    </Fragment>);
}

export default BitcoinTable;