import { priceformatter, priceformatterDecimal } from "./formatters.js";


const inputCost = document.querySelector('#input-cost')
const inputDownPayment = document.querySelector('#input-downpayment')
const inputTerm = document.querySelector('#input-term');
const form = document.querySelector('#form');
const totalCost =  document.querySelector('#total-cost');
const totalMonthPayment = document.querySelector('#total-month-payment');



const cleavePriceSettings ={
    numeral: true,
    numeralThousandsGroupStyle: 'thousand',
    delimiter: " "
}

const maxPrice = 1000000;

const cleaveCost = new Cleave('#input-cost', cleavePriceSettings );
const cleaveDownPayment = new Cleave('#input-downpayment',cleavePriceSettings );
const cleaveTerm = new Cleave(inputTerm,cleavePriceSettings )

calcMortgage()
form.addEventListener('input', function(){
    calcMortgage()    
});

function calcMortgage(){
    let cost = +cleaveCost.getRawValue()
    if(cost > maxPrice){
        cost = maxPrice
    }
    const totalAmount = +cleaveCost.getRawValue() - cleaveDownPayment.getRawValue();
    totalCost.innerText = priceformatter.format(totalAmount);
    const credirRate = +document.querySelector('input[name="program"]:checked').value;
    const monthReate = credirRate/12
    
    //const mortegageTermYear = +document.querySelector('#input-term').value;
    const years = +cleaveTerm.getRawValue();
    const months = years*12;

    const nomthPaymant = (totalAmount*monthReate)/(1 -(1+monthReate) * (1-months));
    totalMonthPayment.innerHTML = priceformatterDecimal.format(nomthPaymant)

}

const sliderCost = document.getElementById('slider-cost');

noUiSlider.create(sliderCost, {
    start: 1000000,
    step:10,
    tooltips:true,
    connect: 'lower',
    range: {
        'min': 0,
        '50%':[100000, 100],
        'max': 1000000
    }
});

sliderCost.noUiSlider.on('slide', function(){
    const sliderValue = parseInt(sliderCost.noUiSlider.get(true))
    //inputCost.value = sliderValue;
    cleaveCost.setRawValue(sliderValue)
    calcMortgage() 
    
})

const sliderDownpayment = document.getElementById('slider-downpayment');

noUiSlider.create(sliderDownpayment, {
    start: 12000,
    step:10,
    tooltips:true,
    connect: 'lower',
    range: {
        'min': 0,    
        'max': 1000000
    }
});

sliderDownpayment.noUiSlider.on('slide', function(){
    const sliderValue = parseInt(sliderDownpayment.noUiSlider.get(true))
    cleaveDownPayment.setRawValue(sliderValue)
    calcMortgage() 
    
})

const sliderTerm = document.getElementById('slider-term');

noUiSlider.create(sliderTerm, {
    start: 1,
    step:1,
   // tooltips:true,
    connect: 'lower',
    range: {
        'min': 0,        
        'max': 30
    }
});

sliderTerm.noUiSlider.on('slide', function(){
    const sliderValue = parseInt(sliderTerm.noUiSlider.get(true))
    cleaveTerm.setRawValue(sliderValue)
    calcMortgage() 
    
})

inputCost.addEventListener('input', function(){
  const value= +cleaveCost.getRawValue()
    if(+value > maxPrice){
        inputCost.closest('.param__details').classList.add('param__details--error')
                
    }
    if(+value <= maxPrice){
        inputCost.closest('.param__details').classList.remove('param__details--error')
    }

    const percentMin = value * 0.15;
    const percentMax = value * 0.90;

    sliderDownpayment.noUiSlider.updateOptions({
        range:{
            min: percentMin,
            max: percentMax

        }
    })


});

inputCost.addEventListener('change', function(){
    const value= +cleaveCost.getRawValue()
      if(+value > maxPrice){
          inputCost.closest('.param__details').classList.remove('param__details--error');
          cleaveCost.setRawValue(maxPrice);                  
      }
     
  })
