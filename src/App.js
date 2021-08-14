import "./styles.css";
import { useState } from "react";

const flist = {
  1000: 0,
  500: 0,
  100: 0,
  20: 0,
  10: 0,
  5: 0,
  1: 0
};

export default function App() {
  const denomination = [1000, 500, 100, 20, 10, 5, 1];
  const [pv, setPv] = useState();
  const [btn, setBtn] = useState("block");
  const [line2, setLine2] = useState("none");
  const [alarm, setAlarm] = useState();
  const [bill, setBill] = useState();
  const [cash, setCash] = useState();
  const [verdict, setVerdict] = useState();
  var diff;
  var checker;

  function checkHandler(event) {
    event.preventDefault();
    denomination.map((item) => {
      flist[item] = 0;
    });

    if (cash < bill || cash === undefined) {
      setPv("Cash is less than bill amount");
    } else {
      calculator();
    }
  }

  function calculator() {
    diff = cash - bill;
    denomination.map((item) => {
      if (diff >= item) {
        checker = Math.floor(diff / item);
        console.log(checker);
        diff = diff % item;
        flist[item] = checker;
      }
    });
    console.log(flist);
    setVerdict(
      denomination.map((item) => {
        if (flist[item] > 0) {
          return (
            <tr>
              <td> ₹{item}</td>
              <td> {flist[item]}</td>
            </tr>
          );
        }
      })
    );
  }

  function firstClickHandler(event) {
    event.preventDefault();

    if (bill === undefined) {
      setAlarm("enter a valid number");
    } else {
      setAlarm("");
      setBtn("none");
      setLine2("block");
    }
  }

  function billHandler(event) {
    setBill(parseInt(event.target.value));
  }

  function cashHandler(event) {
    setCash(parseInt(event.target.value));
  }

  return (
    <div className="App">
      <div class="container">
        <h1>Cash register</h1>

        <p>
          Enter the bill amount and cash given by the customer and know minimum
          number of notes to return.
        </p>
        <label className="labels">Enter bill amount:</label>
        <input type="number" onChange={billHandler} />

        <button
          className="buttons"
          style={{ display: btn }}
          onClick={firstClickHandler}
        >
          NEXT
        </button>

        <h2> {alarm}</h2>

        <div style={{ display: line2 }}>
          <label className="labels">Enter Cash amount:</label>
          <input type="number" onChange={cashHandler} />
        </div>

        <div style={{ display: line2 }}>
          <button className="buttons" onClick={checkHandler}>
            CHECK
          </button>
        </div>

        <div className="lessbill"> {pv}</div>

        <table className="mainbox">{verdict}</table>
      </div>
    </div>
  );
}
