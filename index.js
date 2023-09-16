const rootStyles = getComputedStyle(document.documentElement);
const myColor = rootStyles.getPropertyValue('--Cyan');
const days = document.querySelectorAll(".days");
let total = 0;

const calculateChart = (data)=>{
    let i = 0;
    let max = 0;
    let maxDay;
    days.forEach(day => {
        let expense = (data[i].amount / total) * 600;
        if(data[i].amount >= max){
            max = data[i].amount;
            maxDay = day;
        }
        day.firstChild.style.height = `${expense}px`;
        if(i==6) maxDay.firstChild.style.backgroundColor = `${myColor}`;
        i+=1;
    });
}

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    data.forEach(element => {
        total += element.amount;
    });
    calculateChart(data);
  })
  .catch(error => {
    console.error('Error loading JSON file:', error);
  });




