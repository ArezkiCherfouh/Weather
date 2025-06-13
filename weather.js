document.addEventListener('DOMContentLoaded',()=>{
    function changetheme() {
        const darkElement = document.querySelector('.godark');
        const lightElement = document.querySelector('.golight');
        const scoreBox = document.body;
        const city=document.querySelector('.cityInput');
        if (darkElement) {
            darkElement.classList.remove('godark');
            darkElement.classList.add('golight');
            city.classList.add('city');
            city.classList.remove('lightcity');
            scoreBox.style.backgroundColor = "#333";
            scoreBox.style.color = "white"; 
            darkElement.innerHTML="Light";
        } else if (lightElement) {
            lightElement.classList.remove('golight');
            lightElement.classList.add('godark');
            scoreBox.style.backgroundColor = "#fff"; 
            scoreBox.style.color = "black"; 
            city.classList.add('lightcity');
            city.classList.remove('city');
            lightElement.innerHTML="Dark";
        }
    }
    document.querySelector('.golight').addEventListener('click',changetheme);
    async function getWeather() {
        const city = document.querySelector(".cityInput").value;
        const resultDiv = document.querySelector(".result");
        try {
            const res = await fetch(`https://weather-backend-tn4l.onrender.com/weather?city=${city}`);
            const data = await res.json();
            if (data.error) {
                resultDiv.innerHTML = `<p class="info">⚠️ ${data.error}</p>`;
            } else {
                resultDiv.innerHTML = `<h1 class="intro">Weather in ${data.city}</h1><p class="temp">Temperature : ${data.temperature}°C ,<br/> Feels like : ${data.feels_like}°C</p><p class="goes">Goes from : ${data.min_temp}°C <br/>To : ${data.max_temp}°C</p><p class="discr">${data.description}</p>`;
                document.querySelector(".cityInput").value='';
            }
        } catch (err) {
            resultDiv.innerHTML = `<p class="info">⚠️Error fetching weather. ${err}</p>`;
        }
    }
    const button=document.querySelector('.subbtn');
    button.addEventListener('click',getWeather);
    document.querySelector(".cityInput").addEventListener('keydown',(event)=>{
        if (event.key==='Enter') {
            getWeather();
        }
    })
})
