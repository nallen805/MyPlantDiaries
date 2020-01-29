// JS Functions to use with Plant Diaries


window.onload=function()
{
    //Datepicker
    $('#datePicker').datepicker();
    $('#waterDP').datepicker();
}

function repotSelection()
{
    //Selected repot schedule
    let repotOptions = document.getElementsByName('repotOpt');
    let nextRepotCalc = document.getElementById('nextRepotCalc');

    //New date object -- get the month only
    let monthSelected = new Date($('#datePicker').datepicker('getDate')).getMonth();

    //Get the selected day
    let daySelected = new Date($('#datePicker').datepicker('getDate')).getDate();
    
    //Get the year so that when the months are greater than 12, go to the next year
    let newYear = new Date($('#datePicker').datepicker('getDate')).getFullYear();
    
    //Get the selected date
    let thisDate;

    //Calculated repot due date
    let dueDate = new Date();

    for(var i=0; i<repotOptions.length; i++)
    {
        if(repotOptions[i].selected)
        {
            //Get the selected option's value
            thisDate=repotOptions[i].value;
           
            //Verify date selected is valid (before today's date)
            if($('#datePicker').datepicker('getDate') > dueDate)
                {   
                    alert('Choose a date before today\'\s date.');
                    dueDate=null;
                }
            else
            {
                switch(thisDate)
                {
                    case '3 months':
                        dueDate.setMonth(monthSelected+3);
                        dueDate.setDate(daySelected);
                        dueDate.setFullYear(newYear); 
                        dueDate = dueDate.toDateString().split(" ");
                        dueDate = dueDate[1]+" "+dueDate[2]+", "+dueDate[3];
                        break;
                    case '6 months':
                        dueDate.setMonth(monthSelected+6);
                        dueDate.setDate(daySelected);
                        dueDate.setFullYear(newYear); 
                        dueDate = dueDate.toDateString().split(" ");
                        dueDate = dueDate[1]+" "+dueDate[2]+", "+dueDate[3];
                        break;
                    case '9 months':
                        dueDate.setMonth(monthSelected+9);
                        dueDate.setDate(daySelected);
                        dueDate.setFullYear(newYear); 
                        dueDate = dueDate.toDateString().split(" ");
                        dueDate = dueDate[1]+" "+dueDate[2]+", "+dueDate[3];
                        break;  
                    case 'Yearly':
                        dueDate.setMonth(monthSelected);
                        dueDate.setDate(daySelected);
                        dueDate.setFullYear(newYear+1); 
                        dueDate = dueDate.toDateString().split(" ");
                        dueDate = dueDate[1]+" "+dueDate[2]+", "+dueDate[3];
                        break;
                    case '2 years':
                        dueDate.setMonth(monthSelected);
                        dueDate.setDate(daySelected);
                        dueDate.setFullYear(newYear+2); 
                        dueDate = dueDate.toDateString().split(" ");
                        dueDate = dueDate[1]+" "+dueDate[2]+", "+dueDate[3];
                        break;
                }
            }
            nextRepotCalc.innerHTML=dueDate;
        }
    }
}

function waterSelection()
{
    //Water options
    let waterOpts = document.getElementsByName('waterOpt');

    //Display calculated watering date
    let nextWaterCalc = document.getElementById('nextWaterCalc');
    
    //Get the current month only
    let selectedMonth = new Date($('#waterDP').datepicker('getDate')).getMonth();

    //Get the current day only
    let selectedDay = new Date($('#waterDP').datepicker('getDate')).getDate();

    //Get the selected year
    let selectedYear = new Date($('#waterDP').datepicker('getDate')).getFullYear();

    //Get the selected date
    let thisDay;

    //Calculated watering date
    let waterDueDate = new Date();

    for(var i=0; i<waterOpts.length; i++)
    {
        //Get the value of selected option
        if(waterOpts[i].selected)
        {
            thisDay=waterOpts[i].value;

            //Verify date selected is valid (before today's date)
            if($('#waterDP').datepicker('getDate') > waterDueDate)
            {
                alert('Choose a date before today\'\s date.');
                waterDueDate=null;
            }
            else
            {
                switch(thisDay)
                {
                    case 'Daily':
                        waterDueDate.setMonth(selectedMonth);
                        waterDueDate.setDate(selectedDay+1);
                        waterDueDate.setFullYear(selectedYear);
                        waterDueDate=waterDueDate.toDateString().split(" ");
                        waterDueDate=waterDueDate[1]+" "+waterDueDate[2]+", "+waterDueDate[3];
                        break;
                    case 'Weekly'   :
                        waterDueDate.setMonth(selectedMonth);
                        waterDueDate.setDate(selectedDay+7);
                        waterDueDate.setFullYear(selectedYear);
                        waterDueDate=waterDueDate.toDateString().split(" ");
                        waterDueDate=waterDueDate[1]+" "+waterDueDate[2]+", "+waterDueDate[3];
                        break;
                    case 'Bi-weekly':
                        waterDueDate.setMonth(selectedMonth);
                        waterDueDate.setDate(selectedDay+14);
                        waterDueDate.setFullYear(selectedYear);
                        waterDueDate=waterDueDate.toDateString().split(" ");
                        waterDueDate=waterDueDate[1]+" "+waterDueDate[2]+", "+waterDueDate[3];  
                        break; 
                    case 'Monthly':
                        waterDueDate.setMonth(selectedMonth+1);
                        waterDueDate.setDate(selectedDay);
                        waterDueDate.setFullYear(selectedYear);
                        waterDueDate=waterDueDate.toDateString().split(" ");
                        waterDueDate=waterDueDate[1]+" "+waterDueDate[2]+", "+waterDueDate[3]; 
                        break;                     
                }
            }
            nextWaterCalc.innerHTML=waterDueDate;
        }
    }
}