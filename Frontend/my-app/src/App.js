import logo from './logo.svg';
import './App.css';
import {Fragment} from 'react';
import axios from 'axios';
import BitcoinTable from './Components/BitcoinTable';
import EthereumTable from './Components/Ethereum';



function App() {
  

  
  

  return (
    <div className="App" >
      <BitcoinTable/>
      <EthereumTable/>
    </div>
  );
}

export default App;
