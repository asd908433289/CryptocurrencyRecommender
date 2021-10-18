import { Fragment } from "react";
import axios from 'axios';
import { useState, useEffect } from "react";

const EthereumTable = ()=>{

    const [blockchainLowestSelling, setBlockchainLowestSelling] = useState("Loading");
    const [blockchainHighestBuying, setBlockchainHighestBuying] = useState("Loading");
    const [binanceLowestSelling, setBinanceLowestSelling] = useState("Loading");
    const [binanceHighestBuying, setBinanceHighestBuying] = useState("Loading");

    const blockChainRequest = async ()=>{
      try{
        const response = await axios.get('http://localhost:8081/blockChain');
        setBlockchainLowestSelling(response.data.ethereum.lowestSellPrice);
        setBlockchainHighestBuying(response.data.ethereum.highestBuyPrice);
      }
      catch(e){
        console.log(e.message);
        blockChainRequest();

      }
       
        
        
   }

   const binanceRequest = async ()=>{
     try{
      const response = await axios.get('http://localhost:8081/binance');
      setBinanceLowestSelling(response.data.ethereum.lowestSellPrice);
      setBinanceHighestBuying(response.data.ethereum.highestBuyPrice);
     }
     catch(e){
      console.log(e.message);
      binanceRequest();
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
              Ethereum Buy Price
            </th>
            <th>
              Ethereum Sell Price
            </th>
           

        </tr>
        <tr>
            <td> <a href='https://exchange.blockchain.com/trade/ETH-USD'> BlockChain</a></td>
            <td>$ {blockchainLowestSelling}{  recomBuyingOn &&  blockchainLowestSelling <= binanceLowestSelling ? ' (I recommend you buy ethereums at this exchange since it offers lower price)':'' }</td>
            <td>$ {blockchainHighestBuying}{ recomSellingOn && blockchainHighestBuying >= binanceHighestBuying ? ' (I recommend you sell your ethereums at this exchange since it offers higher price)':''  }</td>
            
        </tr>
        <tr>
            <td><a href="https://www.binance.com/en/trade/ETH_USDT?layout=basic">Binance</a></td>
            <td>$ {binanceLowestSelling}{  recomBuyingOn &&  blockchainLowestSelling > binanceLowestSelling ? ' (I recommend you buy ethereums at this exchange since it offers lower price)':'' }</td>
            <td>$ {binanceHighestBuying}{ recomSellingOn && blockchainHighestBuying < binanceHighestBuying ? ' (I recommend you sell your ethereumss at this exchange since it offers higher price)':''  }</td>
           
        </tr>
       
       
       
       
      </table>
    </Fragment>);
}

export default EthereumTable;