// Load dropdowns with currency codes
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const resultBox = document.getElementById("result");

// Populate dropdowns
for (let code in codes) {
    fromCurrency.innerHTML += `<option value="${code}">${code} - ${codes[code]}</option>`;
    toCurrency.innerHTML += `<option value="${code}">${code} - ${codes[code]}</option>`;
}

// Default values
fromCurrency.value = "USD";
toCurrency.value = "INR";

// Swap Button Logic
document.getElementById("swapBtn").addEventListener("click", () => {
    let temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
});

// Conversion Function
async function convertCurrency() {
    const amount = document.getElementById("amount").value;

    if (!amount || amount <= 0) {
        resultBox.innerHTML = "Enter a valid amount.";
        return;
    }

    const from = fromCurrency.value;
    const to = toCurrency.value;

    const url = `https://api.exchangerate-api.com/v4/latest/${from}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const rate = data.rates[to];
        const converted = (amount * rate).toFixed(2);

        resultBox.innerHTML = `${amount} ${from} = <br><strong>${converted} ${to}</strong>`;

    } catch (error) {
        resultBox.innerHTML = "Error fetching exchange rates.";
    }
}
