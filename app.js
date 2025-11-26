const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const resultBox = document.getElementById("result");

for (let code in codes) {
    fromCurrency.innerHTML += `<option value="${code}">${code} - ${codes[code]}</option>`;
    toCurrency.innerHTML += `<option value="${code}">${code} - ${codes[code]}</option>`;
}

fromCurrency.value = "USD";
toCurrency.value = "INR";

document.getElementById("swapBtn").addEventListener("click", () => {
    let temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
});

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
        resultBox.innerHtml = "Error fetching exchange rates.";
    }
}
