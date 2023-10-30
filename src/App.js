import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  // const [coinIndex, setCoinIndex] = useState("BTC");
  const [exchangeRate, setExchangeRate] = useState(0);
  const [money, setMoney] = useState(0);

  const onSelect = (event) => {
    setExchangeRate(parseInt(event.target.value));
  }

  const onChange = (event) => {
    setMoney(event.target.value);
    console.log(money)
  }

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      })
  }, [])

  return (
    <div>
      <h1>The Coins! {(loading ? null : `(${coins.length})`)}</h1>
      {loading ? <strong>Loading..</strong> : (<div>
        <div>
          <select onChange={onSelect}>
            <option value={0}>Select</option>
            {coins.map((coin) => (
              <option value={coin.quotes.USD.price}>
                {coin.name} ({coin.symbol}): {coin.quotes.USD.price} USD
              </option>
            ))}
          </select>
        </div>
        <div>
          USD: <input type="number" value={money} onChange={onChange}></input>
        </div>
        <div>
          Coin: <input type="number" value={money / exchangeRate} readOnly></input>
        </div>
      </div>)}
      {/* <ul>
        {coins.map((coin, index) => <li key={index}>{coin.name} ({coin.symbol}): {coin.quotes.USD.price} USD</li>)}
      </ul> */}
    </div>
  );
}

export default App;
