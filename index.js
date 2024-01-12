// Sistem inputs
const inputSearch = document.getElementById('locationSearch');
const inputHome = document.getElementById('weather');

//selection of sistem elements
const location = document.getElementById('location');
const temperature = document.getElementById('temperature');
const apTemperature = document.getElementById('apTemperature');
const precipitationProb = document.getElementById('precipitationProb');
const rainIntensity = document.getElementById('rainIntensity');
const uvHealthConcern = document.getElementById('uvHealthConcern');
const visibility = document.getElementById('visibility');


eventKey=async(event)=>{
    
    if (!inputSearch.value) {
        console.log('Insert a location');
        return;
    } 
    else {
    
    if (event.key === 'Enter') {
      await search();
      data();
    }
}
  }


const search = async () => {
    
    if (!inputHome.value) {
        console.log('Insert a location');
        return;
    } 
    else {
        try {
              await axios.get('http://localhost:3000/GeoWeather/user/newuser',{withCredentials:true}).then((result) => { console.log('Response',result)})
                                                                                                                      .catch((err) => { console.log('Error:', err)});

              const result2 = await axios.post(`http://localhost:3000/GeoWeather/weather/newWeather/${input.value}`, {}, { withCredentials: true });

              sessionStorage.setItem('search', JSON.stringify(result2.data.data));

          
              window.location.href = './page/search.html';
            }

       
        catch (err) {
          console.log('Error:', err);
        }

  }
};

back= ()=>{
    window.location.href = '../index.html'
}



data = () =>{
    let  data = JSON.parse(sessionStorage.getItem('search'));
    console.log('Dataaaaaa',data);
    if( !data ){
        
        location.innerHTML = 'Esta ubicacion no existe';
        return;
    }
    
    location.innerHTML = `${data.location}`;
    
    temperature.innerHTML = `${Math.trunc(data.temperature)}&deg;C /`;
    
    apTemperature.innerHTML = `${Math.trunc(data.temperatureApparent)}&deg;C `;
    
    
    precipitationProb.innerHTML = `${data.precipitationProbability}% `;
   
    rainIntensity.innerHTML = `${data.rainIntensity}`;
    
    uvHealthConcern.innerHTML = `${data.uvHealthConcern} `;
    
    visibility.innerHTML = `${data.visibility} `;
    return;
}


