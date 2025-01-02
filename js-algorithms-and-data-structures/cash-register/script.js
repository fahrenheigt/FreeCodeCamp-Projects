let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

const priceInput = document.getElementById('price');
const cashInput = document.getElementById('cash');
const cashDrawerDisplay = document.getElementById('cash-drawer-display');
const purchaseBtn = document.getElementById('purchase-btn');
const changeDue = document.getElementById('change-due');
const errorMessage = document.createElement('div');
errorMessage.id = 'error-message';
document.querySelector('.input-div').appendChild(errorMessage);

const updateUI = change => {
  const currencyNameMap = {
    PENNY: 'Pennies',
    NICKEL: 'Nickels',
    DIME: 'Dimes',
    QUARTER: 'Quarters',
    ONE: 'Ones',
    FIVE: 'Fives',
    TEN: 'Tens',
    TWENTY: 'Twenties',
    'ONE HUNDRED': 'Hundreds'
  };
  // Update cid if change is passed in
  if (change) {
    change.forEach(([changeDenomination, changeAmount]) => {
      const targetArr = cid.find(
        ([denominationName, _]) => denominationName === changeDenomination
      );
      targetArr[1] =
        (Math.round(targetArr[1] * 100) - Math.round(changeAmount * 100)) / 100;
    });
  }

  cashInput.value = '';
  cashDrawerDisplay.innerHTML = `<p><strong>Change in drawer:</strong></p>
    ${cid
      .map(
        ([denominationName, amount]) =>
          `<p>${currencyNameMap[denominationName]}: $${amount}</p>`
      )
      .join('')}
  `;
};

const checkResults = () => {
  const priceValue = parseFloat(priceInput.value);
  const cashValue = parseFloat(cashInput.value);
  if (isNaN(priceValue) || priceValue <= 0) {
    errorMessage.textContent = 'Please enter a valid price.';
    return;
  }
  if (isNaN(cashValue) || cashValue <= 0) {
    errorMessage.textContent = 'Please enter a valid cash amount.';
    return;
  }
  errorMessage.textContent = '';
  const change = cashValue - priceValue;
  if (change < 0) {
    alert('Customer does not have enough money to purchase the item');
    return;
  } else if (change === 0) {
    changeDue.textContent = 'No change due - customer paid with exact cash';
    return;
  }

  const changeArr = getChange(change, cid);
  if (changeArr.status === 'INSUFFICIENT_FUNDS') {
    changeDue.textContent = 'Status: INSUFFICIENT_FUNDS';
  } else if (changeArr.status === 'CLOSED') {
    changeDue.textContent = `Status: CLOSED ${formatChange(changeArr.change)}`;
  } else {
    changeDue.textContent = `Status: OPEN ${formatChange(changeArr.change)}`;
  }
  updateUI(changeArr.change);
};

const getChange = (change, cid) => {
  const currencyUnits = [
    ['PENNY', 0.01],
    ['NICKEL', 0.05],
    ['DIME', 0.1],
    ['QUARTER', 0.25],
    ['ONE', 1],
    ['FIVE', 5],
    ['TEN', 10],
    ['TWENTY', 20],
    ['ONE HUNDRED', 100]
  ];

  let totalCid = cid.reduce((acc, curr) => acc + curr[1], 0);
  totalCid = Math.round(totalCid * 100) / 100;

  if (totalCid < change) {
    return { status: 'INSUFFICIENT_FUNDS', change: [] };
  } else if (totalCid === change) {
    return { status: 'CLOSED', change: cid };
  }

  const changeArr = [];
  for (let i = currencyUnits.length - 1; i >= 0; i--) {
    const [unit, value] = currencyUnits[i];
    const cidUnit = cid.find(([denomination]) => denomination === unit);
    let amount = 0;
    while (change >= value && cidUnit[1] > 0) {
      change -= value;
      change = Math.round(change * 100) / 100;
      cidUnit[1] -= value;
      amount += value;
    }
    if (amount > 0) {
      changeArr.push([unit, amount]);
    }
  }

  if (change > 0) {
    return { status: 'INSUFFICIENT_FUNDS', change: [] };
  }

  return { status: 'OPEN', change: changeArr };
};

const formatChange = changeArr => {
  return changeArr
    .map(([denomination, amount]) => `${denomination}: $${amount}`)
    .join(' ');
};

purchaseBtn.addEventListener('click', checkResults);

cashInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    checkResults();
  }
});

priceInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    checkResults();
  }
});

updateUI();