const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const convertBtn = document.getElementById("convertBtn");
const resultBox = document.getElementById("resultBox");

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
