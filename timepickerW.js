function inittimepicker(){
    var timepickerHTML = "<div class='timepicker' style='display: none' onmouseover='this.active=true' onmouseout='this.active=false'>\
                                <div class='hcontainer' class='centered'>\
                                    <div class='cursor hours' onmousedown='increase(this)'>&and;</div>\
                                    <div class='hours'>01</div>\
                                    <div class='cursor hours' onmousedown='decrease(this)'>&or;</div>\
                                </div>\
                                <div class='column'> : </div>\
                                <div class='mcontainer' class='centered'>\
                                    <div class='cursor minutes' onmousedown='increase(this)'>&and;</div>\
                                    <div class='minutes'>01</div>\
                                    <div class='cursor minutes' onmousedown='decrease(this)'>&or;</div>\
                                </div>\
                                <br>\
                                <button type='button' onclick='this.parentElement.previousElementSibling.value=\"\"; readnumber(this.parentElement)'>clear</button>\
                            </div>";
    for(input of document.querySelectorAll('[type="time"]')){
        input.insertAdjacentHTML('afterend', timepickerHTML);
        var timepicker = input.nextElementSibling;
        var wrapper = document.createElement('div');
        wrapper.setAttribute("style", "display: inline-block");
        input.parentNode.insertBefore(wrapper, input);
        wrapper.appendChild(input);
        wrapper.appendChild(timepicker);
        input.setAttribute('onblur', 'opentimepicker(this)');
        input.setAttribute('onfocus', 'opentimepicker(this)');
        input.setAttribute('onkeyup', 'readnumber(this.nextElementSibling)');
        input.setAttribute('pattern', '(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9])');
    }
    document.addEventListener('click', function(){hidepickers()});
}

function opentimepicker(input){
    var timepicker = input.nextElementSibling;
    if(timepicker.style.display == "none" && input === document.activeElement){
        timepicker.style.display = "block";
    }else if(!timepicker.active && input !== document.activeElement){
        timepicker.style.display = "none";
    }
    readnumber(timepicker);
}

function hidepickers(){
    var pickers = document.getElementsByClassName('timepicker');
    for(picker of pickers){
        var input = picker.previousElementSibling;
        if(picker.style.display == "block" && !picker.active && input !== document.activeElement){
            picker.style.display = "none";
        }
    }
}

function increase(spinner){
    var number = spinner.nextElementSibling;
    var old = parseInt(number.innerHTML + old);
    if(isNaN(old)){
        old = 0;
    }
    if(old == 59 && number.className.indexOf("minutes") > -1){
        number.innerHTML = "00";
    }else if(old == 23 && number.className.indexOf("hours") > -1){
        number.innerHTML = "00";
    }else{
        var newnumber = old+1;
        if(newnumber < 10){
            newnumber = "0"+newnumber;
        }
        number.innerHTML = newnumber;
    }
    writenumber(spinner.parentElement.parentElement);
}

function decrease(spinner){
    var number = spinner.previousElementSibling;
    var old = parseInt(number.innerHTML);
    if(isNaN(old)){
        old = 0;
    }
    if(old == 0 && number.className.indexOf("minutes") > -1){
        number.innerHTML = "59";
    }else if(old == 0 && number.className.indexOf("hours") > -1){
        number.innerHTML = "23";
    }else{
        var newnumber = old-1;
        if(newnumber < 10){
            newnumber = "0"+newnumber;
        }
        number.innerHTML = newnumber;
    }
    writenumber(spinner.parentElement.parentElement);
}

function writenumber(timepicker){
    var input = timepicker.previousElementSibling;
    var minutes = timepicker.getElementsByClassName("minutes")[1].innerHTML;
    var hours = timepicker.getElementsByClassName("hours")[1].innerHTML;
    if(hours == ""){
        hours = "00";
    }else if(minutes == ""){
        minutes = "00";
    }
    var value = hours + ":" + minutes;
    input.value = value;
}

function readnumber(timepicker){
    var input = timepicker.previousElementSibling;
    var value = input.value;
    var minutes = timepicker.getElementsByClassName("minutes")[1];
    var hours = timepicker.getElementsByClassName("hours")[1];
    minutes.innerHTML = value.slice(3);
    hours.innerHTML = value.slice(0,2);
}