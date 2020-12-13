/* Global Variables */
const apiKey = '495a01fe84ab7a388bb1a0740d64313f';
const apiLink = `http://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric&zip=`;
//  [FUN]   GETting data from API... returns the temperature... 
const callApi = async (url = '', zip = '') => {
    let apiUrl = url + zip + ',us';
    const res = await fetch(apiUrl);
    try {
        const data = await res.json();
        // check if the received data is correct [response status = 200]
        if (data.cod == 200) {
            console.log(data);
            return {
                error: false, //we check then for this error, if true alert the user and stop exexution..
                temp: data.main.temp,
                city:data.name,
            };
        }
        //  if status !==200 return "E"
        else {
            return {
                error: true,
                temp: undefined,
                errorMessage:data.message
            };

        }
        // console.log(newDate);
    } catch (e) {
        console.log('ERROR', e);
    }
}
//  [FUN]   POST data_ to the server... 
const postReq = async function (url_, data_) {
    try {
        const serverData = await fetch(url_, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            //Sending payload [data]...
            body: JSON.stringify(data_),
        });
        return "server POST req DONE!";
    } catch (e) {
        console.log(e);
    }
}
//  [FUN]   GET REQ data from server... 
const getData = async (url) => {
    const res = await fetch('/getData');
    try {
        return res.json();
    } catch (e) {
        console.log(e);
    }
}
// [FUN]    Update UI.. 
const updateUI = (serverData_) => {
    //selecting elements to update... 
    //console.log('updateUI', temp, feeling, date);
    const tempDIV = document.getElementById('temp');
    const feelingDIV = document.getElementById('content');
    const dateDIV = document.getElementById('date');
    const cityDIV = document.getElementById('city');
    tempDIV.textContent = 'Temp:    ' + serverData_.temp;
    feelingDIV.innerText = `Feelings:    ${serverData_.feeling}`;
    dateDIV.innerText = `Date:     ${serverData_.date}`;
    cityDIV.innerText = `City:     ${serverData_.city}`;
}
//  [FUN]   embed all functions that call server or API in order... 
const externalCallingFun = function (apiLink_, zip_, feeling_, date_) {
    //  1-   call API ..
    callApi(apiLink_, zip_).then((r) => {
        //console.log(r);
        if(!r.error){
           // console.log('no error in response...');
        postReq('/setData', {
            //  2.  update server data... 
            temp: r.temp,
            feeling: feeling_,
            city: r.city,
        }).then(() => {
            //  3.  get updated data from server... 
            getData('/getData').then((res) => {
                //  4.  update UI... 
                console.log('res',res);
                updateUI({temp:res.temp,feeling: res.feeling,date: date_,city:res.city});
            })

        });
    }
    else{
        alert(r.errorMessage);
    }
    });
}

///////////////////////////////////////////////////////////////////
//////////////     RUNNING EVENTLISTENER ON BUTTON      ///////////
///////////////////////////////////////////////////////////////////
const btn = document.getElementById('generate');
btn.addEventListener('click', () => {
    const zipInput = document.getElementById('zip');
    const feelingInput = document.getElementById('feelings');
    // create a data instance.. 
    let d = new Date();
    let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
    //     CHECK the values of user inputs .. if they are empty >> alert, or continue execution.. 
    const zip = zipInput.value;
    const feeling = feelingInput.value;
    if (zip, feeling) {
        externalCallingFun(apiLink, zip, feeling, newDate);
    } else {
        alert('Please enter a zip code in US and express how you feel!');
    }

})