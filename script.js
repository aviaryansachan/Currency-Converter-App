const Baseurl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";


let dropdowns = document.querySelectorAll(".dropdown select");
//  console.log(dropdowns);
const btn = document.querySelector("button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for (const select of dropdowns) {
    for (const code in countryList) {
        //  console.log(code,countryList[code]);
        let newoption = document.createElement("option");
        newoption.innerText = code;
        newoption.value = code;
        if (select.name === "countryfrom" && code === "USD") {
            newoption.selected = "selected"
        } else if (select.name === "countryto" && code === "INR") {
            newoption.selected = "selected"
        };
        select.append(newoption);
    };
    select.addEventListener("change", function (e) {
        updateflag(e.target);
    });
};

const updateflag = (element) => {
    let code = element.value;
    let countrycode = countryList[code];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
};

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if (amtval === " " || amtval <0.1) {
        amtval = 1;
        amount.value = "1";
    }
    const URL = `${Baseurl}/${fromcurr.value.toLowerCase()}.json`;

    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
    let finalAmount = amtval * rate;
    msg.innerText = `${amtval} ${fromcurr.value} = ${finalAmount} ${tocurr.value}`
};

let flag = 0;

btn.addEventListener("click", function (e) {
    e.preventDefault();
    updateExchangeRate();
    if (flag== 0) {
        btn.style.backgroundColor="darkgreen"
        btn.style.border="darkgreen"
        flag = 1 ;
    }else{
        btn.style.backgroundColor="#af4d98"
        btn.style.border="#af4f98"
        flag = 0 ;
    }
});


