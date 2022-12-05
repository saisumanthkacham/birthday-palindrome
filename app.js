const dateInput = document.querySelector(".date-input");
const checkBtn = document.querySelector(".check-btn");
const outPut = document.querySelector(".output");


let  IsreverseStringPalindrome= dateStr =>
{
    let allChars = dateStr.split('');
    let reverseAllChars = allChars.reverse();
    let reversedString = reverseAllChars.join('');

    return  reversedString===dateStr;

}

let  dateToString = date=>
{
    let dateArr = { day:'',month:'',year:''}
        dateArr.day= date.day<10 ? "0"+date.day :date.day.toString();
        dateArr.month= date.month<10 ? "0"+date.month :date.month.toString();
    dateArr.year=date.year.toString();
    return dateArr;
}

let allPosibilities= date =>
{
    const dateArr = dateToString(date);
    const ddmmyyyy = dateArr.day+dateArr.month+dateArr.year;
    const mmddyyyy = dateArr.month+dateArr.day+dateArr.year;
    const yyyymmdd = dateArr.year+dateArr.month+dateArr.day;
    const ddmmyy = dateArr.day+dateArr.month+dateArr.year.slice(-2);
    const mmddyy = dateArr.month+dateArr.day+dateArr.year.slice(-2);
    const yymmdd = dateArr.year.slice(-2)+dateArr.month+dateArr.day;
    formatsArr =[ddmmyyyy , mmddyyyy,yyyymmdd,ddmmyy, mmddyy,yymmdd ];
    return formatsArr;
}

let  isPosibilitiesPalindrome = date =>
{
    formatArr = allPosibilities(date);
    let sol=false;

     for(i=0;i<formatArr.length;i++)
     {
         sol=IsreverseStringPalindrome(formatArr[i]);
         if(sol)
         {
             return sol ;
             break;
         }
         
     }
     return sol;
}

let  leapYear = year=>
{
    if(year%400===0){
        return true;
    }
    if(year%100===0){
        return false;
    }
    if(year%4===0){
        return true;
    }

    return false;
}

 let  getNextDate= date=>
 {
     let day =date.day+1;
     let month =date.month;
     let year =date.year;
    let totalDaysArr=[31,28,31,30,31,30,31,31,30,31,30,31];
    if(month==2)
    {
        if(leapYear(year))
        {
            if(day>29)
            {
                day=1;
                month++
            }
        }
        else 
        {
            if(day>totalDaysArr[month-1])
            {
                day=1;
                month++;

            }
        }
    }
    else if(day>totalDaysArr[month-1])
    {
        day=1;
        month++;
    }

    if(month>12)
    {
        month=1;
        year++;
    }
    return {
        day:day, month:month,year:year
    };
 }
//  function getNextPalindromeOccurance(date)
//  {
//      var count=0;
//      do
//      {
//           count++;
//     var  nextDate=getNextDate(date);
//     var sol=isPosibilitiesPalindrome(nextDate);

        
//      }while(!sol);

//      return [count,nextDate];
//  }

let  getNextPalindromeOccurance = date=>{
    let count = 0;
    let nextDate = getNextDate(date);
  
    while(1){
      count++;
      let isPalindrome =isPosibilitiesPalindrome(nextDate); ;
      if(isPalindrome){
        break;
      }
      nextDate = getNextDate(nextDate);
    }
    return [count, nextDate];
  }

let  clickEvent = () => {
let bdaydate = dateInput.value;
  if(bdaydate!== '')
  {
    datearr = bdaydate.split('-');
    var date ={
     day : Number(datearr[2]),
     month: Number(datearr[1]),
     year: Number(datearr[0]),
    }
  }
  else 
  {
    outPut.innerText = "Please enter some valid input😥"
  }
 let sol = isPosibilitiesPalindrome(date);
     if(sol)
      {
         outPut.innerText = "Yahh!! your birthday is palindrome, band bajao!!🥁🥳";
        }
    else{
         var [count,nextDate] = getNextPalindromeOccurance(date);
         outPut.innerText= `The next palindrome is at ${nextDate.day}-
         ${nextDate.month}-${nextDate.year},oh!oh! u missed palindrome by ${count} days!😞`
    
        } 


}







checkBtn.addEventListener('click',clickEvent);