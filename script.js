"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2023-03-25T09:15:04.904Z",
    "2023-03-26T10:17:24.185Z",
    "2023-03-27T14:11:59.604Z",
    "2023-03-28T17:01:17.194Z",
    "2023-03-29T23:36:17.929Z",
    "2023-03-31T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  currency: "USD",
  locale: "en-US",
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  currency: "YEN",
  locale: "pt-PT",
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2023-03-25T09:15:04.904Z",
    "2023-03-26T10:17:24.185Z",
    "2023-03-27T14:11:59.604Z",
    "2023-03-28T17:01:17.194Z",
    "2023-03-29T23:36:17.929Z",
    "2023-03-31T10:51:36.790Z",
  ],
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
let inputTransferTo = document.querySelector(".form__input--to");
let inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

///////////////////////////////////////////////

// const currencies = new Map([
//   ["USD", "United States dollar"],
//   ["EUR", "Euro"],
//   ["GBP", "Pound sterling"],
// ]);

/////////////////////////////////////////////////

// const displaymovements = function (movement) {
//   containerMovements.innerHTML = "";

//   movement.forEach((ele, i) => {
//     const type = ele > 0 ? "deposit" : "withdrawal";
//     const value = ele * 1.1;
//     const display = `<div class="movements__row">
//     <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
//     <div class="movements__value">${value.toFixed(0)} $</div>
//     </div>`;
//     containerMovements.insertAdjacentHTML("afterbegin", display);
//   });
// };

// displaymovements(account1.movements);

let Accounts = [account1, account2, account3, account4];
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//generate the sort username
const generate_userName = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(" ")
      .map(function (name) {
        return name[0];
      })
      .join("");
  });
};
generate_userName(Accounts);

//display the movements

const formateDate = function (date) {
  const countDays = (date1, date2) => {
    return Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 60));
  };

  const daypassed = countDays(new Date().getTime(), date.getTime());

  if (daypassed === 0) return "today";
  if (daypassed === 1) return "yesterday";

  if (daypassed <= 7) return `${daypassed} Days ago`;

  const day = `${date.getDay()}`.padStart(2, 0);
  const month = `${date.getMonth() + 1}`.padStart(2, 0);
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

const NumberFormat = function (mov, local, curr) {
  const options = {
    style: "currency",
    currency: `${curr}`,
  };

  const intnumber = new Intl.NumberFormat(local, options).format(mov);

  return intnumber;
};

const displaymovements = function (acc) {
  containerMovements.innerHTML = " ";

  acc.movements.forEach(function (mov, i) {
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formateDate(date);

    const intnumber_format = NumberFormat(
      acc.movements[i],
      acc.locale,
      acc.currency
    );
    const type = mov > 0 ? "deposit" : "withdrawal";
    const value = mov > 0 ? mov * 1.1 : mov;
    const display = `<div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${intnumber_format}</div>
        </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", display);
  });
};

//display the total_balance
const displayTotal_balance = function (account) {
  const total_bal = account.movements.reduce((acc, mov) => acc + mov, 0);

  const intnumber = NumberFormat(total_bal, account.local, account.currency);

  labelBalance.textContent = `${intnumber}`;
};

//display the summary
const display_summary = function (acc) {
  const deposit = acc.movements.reduce((acc, curr) => acc + curr, 0);

  const depositFormate = NumberFormat(deposit, acc.local, acc.currency);

  labelSumIn.textContent = `${depositFormate}`;

  const withdrawal = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, curr) => acc + curr, 0);

  const withdrawalFormat = NumberFormat(withdrawal, acc.local, acc.currency);

  labelSumOut.textContent = `${withdrawalFormat}`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((mov) => (mov * acc.interestRate) / 100)
    .filter((mov) => mov >= 1)
    .reduce((acc, curr) => acc + curr, 0);

  const interestFormat = NumberFormat(interest, acc.local, acc.currency);
  labelSumInterest.textContent = `${interestFormat}`;
};

const loan = function (acc) {
  const loan_value = Number(inputLoanAmount.value);
  acc.movements.push(loan_value);
  const date = new Date();
  const isostring = date.toISOString();

  acc.movementsDates.push(isostring);
};

const transfer_money = function (acc1, acc2) {
  const transfer_mon = Number(inputTransferAmount.value);
  acc1.movements.push(transfer_mon);
  acc2.movements.push(transfer_mon * -1);
  const date = new Date();
  const isostring = date.toISOString();
  acc1.movementsDates.push(isostring);
  acc2.movementsDates.push(isostring);
};

function setupUI(user) {
  labelWelcome.textContent = `welcome to ${user.owner.split(" ")[0]}`;
  containerApp.style.opacity = 100;

  inputLoginUsername.value = inputLoginPin.value = "";

  inputLoginPin.blur();

  updateUI(user);
}

function updateUI(user) {
  //display the movements
  displaymovements(currentuser);

  //display the summary
  display_summary(currentuser);

  //display the total;
  displayTotal_balance(currentuser);
}

//login implementation
let currentuser;
let transferuser;
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();

  currentuser = Accounts.find(function (acc) {
    return acc.userName === inputLoginUsername.value;
  });

  if (currentuser && currentuser.pin === Number(inputLoginPin.value)) {
    setupUI(currentuser);

    const options = {
      hour: "numeric",
      minute: "numeric",
      year: "numeric",
      day: "numeric",
      month: "numeric",
    };

    const date = new Date();

    const int = new Intl.DateTimeFormat(currentuser.locale, options).format(
      date
    );

    // const day = `${date.getDay()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();

    // const hours = `${date.getHours()}`.padStart(2, 0);
    // const second = `${date.getSeconds()}`.padStart(2, 0);

    // labelDate.textContent = `As Of ${day}/${month}/${year}  ${hours}:${second}`;
    labelDate.textContent = `${int}`;

    //based on intl

    //load
    btnLoan.addEventListener("click", function (e) {
      e.preventDefault();

      loan(currentuser);

      updateUI(currentuser);

      inputLoanAmount.value = "";
    });

    btnTransfer.addEventListener("click", function (e) {
      e.preventDefault();

      if (currentuser.userName === inputTransferTo.value) {
        inputTransferTo.value = " ";
        inputTransferAmount.value = " ";
      } else {
        transferuser = Accounts.find(function (acc) {
          return acc.userName === inputTransferTo.value;
        });

        if (transferuser) {
          transfer_money(transferuser, currentuser);
          updateUI(currentuser);
        }

        updateUI(currentuser);

        inputTransferTo.value = "";
        inputTransferAmount.value = "";
      }
    });

    btnClose.addEventListener("click", function (e) {
      e.preventDefault();

      if (
        currentuser.userName === inputCloseUsername.value &&
        currentuser.pin === Number(inputClosePin.value)
      ) {
        var index = Accounts.findIndex(function (acc) {
          return acc.userName === inputCloseUsername.value;
        });
        Accounts.splice(index, 1);

        containerApp.style.opacity = 0;
      } else {
        console.log("Wrong Password");
      }
      inputCloseUsername.value = inputClosePin.value = "";
    });

    btnSort.addEventListener("click", function (e) {
      e.preventDefault();

      currentuser.movements.sort((a, b) => a - b);

      updateUI(currentuser);
    });
  }
});

const movements_arr = Accounts.map((acc, i) => {
  return Accounts[i].movements;
});

//1 exercise
const total_deposite_amount = Accounts.map((acc) => {
  return acc.movements;
})
  .flat()
  .filter((mov) => mov > 0)
  .reduce((acc, cur) => acc + cur, 0);

console.log(total_deposite_amount);

//2 exercise

const totalNumber = Accounts.flatMap((acc) => acc.movements).reduce(
  (acc, cur) => {
    if (cur >= 1000) {
      return acc + 1;
    } else {
      return acc;
    }
  },
  0
);

console.log(totalNumber);

//3 exercise
const sums = Accounts.flatMap((acc) => acc.movements).reduce(
  (sum, curr) => {
    // var type = curr > 0 ? "deposite" : "withdrawal";
    curr > 0 ? (sum.deposit += curr) : (sum.withdrawal += curr);
    return sum;
  },
  { deposit: 0, withdrawal: 0 }
);

console.log(sums);

//4 exercise

const [deposit, withdrawal] = Accounts.flatMap((acc) => acc.movements).reduce(
  (s, curr) => {
    curr > 0 ? (s[0] += curr) : (s[1] += curr);
    return s;
  },
  [0, 0]
);

console.log(deposit, withdrawal);

//5 exercise

//this is a nice title;

const changeTitleCase = function (title) {
  const exe = ["is", "a", "with", "the"];

  const capit = (str) => str[0].toUpperCase() + str.slice(1);

  const str = title
    .toLowerCase()
    .split(" ")
    .map((word) => (exe.includes(word) ? word : capit(word)))
    .join(" ");

  return capit(str);
};

console.log(changeTitleCase("this is jonash He is very excellent teacher"));
console.log(changeTitleCase("Have a Nice Day with you"));
console.log(changeTitleCase("the main MOTIVATE is THAT leaning"));

// setInterval(() => {
//   const now = new Date();
//   const hr = `${now.getHours()}`.padStart(2, 0);
//   const min = `${now.getMinutes()}`.padStart(2, 0);
//   const sc = `${now.getSeconds()}`.padStart(2, 0);

//   console.log(`${hr}:${min}:${sc}`);
// }, 1000);

let counter = 10;

const close = setInterval(() => {
  counter--;

  if (counter == 0) {
    clearInterval(close);
  }

  console.log(counter);
}, 1000);
