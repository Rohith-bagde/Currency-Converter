const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const convertBtn = document.getElementById("convertBtn");
const resultBox = document.getElementById("resultBox");
const amountInput = document.getElementById("amount");

// Populate dropdowns from currencyList.js
Object.keys(currencyList).forEach(code => {
    const option1 = document.createElement("option");
    const option2 = document.createElement("option");

    option1.value = code;
    option2.value = code;

    option1.textContent = `${code} - ${currencyList[code]}`;
    option2.textContent = `${code} - ${currencyList[code]}`;

    fromCurrency.appendChild(option1);
    toCurrency.appendChild(option2);
});

// Set default
fromCurrency.value = "USD";
toCurrency.value = "INR";

// Convert
convertBtn.addEventListener("click", () => {
    const amount = amountInput.value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency.value}`)
        .then(res => res.json())
        .then(data => {
            const rate = data.rates[toCurrency.value];
            const result = (amount * rate).toFixed(2);

            resultBox.textContent = `Result: ${result} ${toCurrency.value}`;
        });
});
