const base_urll="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"

const dropdown=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

// for(code in countryList){
//     console.log(code, countryList[code]);
// }

for(let select of dropdown){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        }else if(select.name==="to" && currCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })

};

const updateFlag=(element)=>{
    console.log(element);
    let currCode=element.value;
    console.log(currCode);
    let countrycode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}

btn.addEventListener("click", async(evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtval=amount.value; //this statement will get the data of value="100", it will get the 100 data from the valur attribute
    //console.log(amount);
    if(amtval==="" || amtval<1){
        amtval=1;
        amount.value="1";
    }
    console.log(fromcurr.value,tocurr.value);
    //fromcurr and tocurr will give the whole element we add .value
    
    const url=`${base_urll}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
    let response= await fetch(url);
    let data= await response.json();
    let rate=data[tocurr.value.toLowerCase()];
    console.log(data);
    let finalAmt=amtval * rate;
    msg.innerText=`${amtval} ${" "}${fromcurr.value} = ${finalAmt} ${" "} ${tocurr.value}`;
    //msg.innerText= 1 usd = 80 inr 
    //here 1 is the amount and usd is the amount valur same for 80 and inr from the drop down 


})



