const currencyValues = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.1,
    "QUARTER": 0.25,
    "ONE": 1,
    "FIVE": 5,
    "TEN": 10,
    "TWENTY": 20,
    "ONE HUNDRED": 100
  };
  
  let price;
  let cid = [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
  ];
  
  document.getElementById("purchase-btn").addEventListener("click", () => {
    price = parseFloat(document.getElementById("price").value);
    const cash = parseFloat(document.getElementById("cash").value);
    const changeDueElement = document.getElementById("change-due");
  
    if (cash < price) {
      alert("Customer does not have enough money to purchase the item");
      return;
    }
  
    if (cash === price) {
      changeDueElement.textContent = "No change due - customer paid with exact cash";
      return;
    }
  
    const result = checkCashRegister(price, cash, cid);
  
    if (result.status === "INSUFFICIENT_FUNDS") {
      changeDueElement.textContent = "Status: INSUFFICIENT_FUNDS";
    } else if (result.status === "CLOSED") {
      changeDueElement.innerHTML = `Status: CLOSED<br>${formatChange(result.change)}`;
    } else {
      changeDueElement.innerHTML = `Status: OPEN<br>${formatChange(result.change)}`;
    }
  });
  
  function checkCashRegister(price, cash, cid) {
    let changeDue = Math.round((cash - price) * 100);
    let totalInDrawer = Math.round(cid.reduce((sum, [_, amount]) => sum + amount, 0) * 100);
  
    if (totalInDrawer < changeDue) {
      return { status: "INSUFFICIENT_FUNDS", change: [] };
    }
  
    if (totalInDrawer === changeDue) {
      return { status: "CLOSED", change: cid };
    }
  
    const change = [];
    for (let i = cid.length - 1; i >= 0; i--) {
      const [currency, amountAvailable] = cid[i];
      const currencyValue = Math.round(currencyValues[currency] * 100);
      let amountUsed = 0;
  
      while (changeDue >= currencyValue && amountAvailable * 100 >= amountUsed + currencyValue) {
        changeDue -= currencyValue;
        amountUsed += currencyValue;
      }
  
      if (amountUsed > 0) {
        change.push([currency, amountUsed / 100]); // Convert back to dollars
      }
    }
  
    if (changeDue > 0) {
      return { status: "INSUFFICIENT_FUNDS", change: [] };
    }
  
    return { status: "OPEN", change };
  }
  
  function formatChange(change) {
    return change
      .map(([currency, amount]) => `${currency}: $${amount.toFixed(2)}`)
      .join("<br>");
  }