// Sistem inputs


//selection of sistem elements
direccions= (dir)=>{
    switch(dir)
    {
        case 'home': window.location.href = '../index.html';
                    break;
        case 'search': window.location.href = './page/search.html';
                    break;
    }
    
}

createUser=async()=>{
    try {
        await axios.get('http://localhost:3000/GeoWeather/user/newuser',{withCredentials:true}).then((result) => { console.log('Response',result)}).catch((err) => { console.log('Error:', err)});
        
      }

 
  catch (err) {
    console.log('Erro al crear usuario:', err);
  }

}



const search = async () => {
const input = document.getElementById('locationSearch');
    
    if (!input.value) {
        console.log('Insert a location');
        return;
    } 
    else {
        try {
              const result = await axios.post(`http://localhost:3000/GeoWeather/weather/newWeather/${input.value}`, {}, { withCredentials: true });

              sessionStorage.setItem('search', JSON.stringify(result.data.data));
            }

       
        catch (err) {
          console.log('Error:', err);
        }

  }
};





data = () =>{
    let  data = JSON.parse(sessionStorage.getItem('search'));
    console.log('Dataaaaaa',data);





    // seleccion de elementos donde se van a mostrar los valores
    const rowLocation = document.getElementById('rowLocation');
    const temps = document.getElementById('temps')
    const cards = document.getElementById('cards');
    const locat = document.getElementById('location');
    const temperature = document.getElementById('temperature');
    const apTemperature = document.getElementById('apTemperature');
    const precipitationProb = document.getElementById('precipitationProb');
    const rainIntensity = document.getElementById('rainIntensity');
    const uvHealthConcern = document.getElementById('uvHealthConcern');
    const visibility = document.getElementById('visibility');
    const humidity = document.getElementById('humidity');

    // seleccion de cartas 


    const humidityCard = document.getElementById('humidityCard');
    const precipitationProbCard = document.getElementById('precipitationProbCard');
    const rainIntensityCard = document.getElementById('rainIntensityCard');
    const uvHealthConcernCard = document.getElementById('uvHealthConcernCard');
    const visibilityCard = document.getElementById('visibilityCard');

    if( !data ){
        rowLocation.style.marginTop = "20%"
        locat.style.fontSize = "3rem"
        
        locat.innerHTML = 'Esta ubicacion no existe';
        locat.style.textAlign = "center"
        temps.style.display = "none";
        cards.style.display = "none";
        return;
    }
    
    
    
    locat.innerHTML = `${data.location}`;

    
    temperature.innerHTML = `${Math.trunc(data.temperature)}&deg;C/`;
    
    apTemperature.innerHTML = `${Math.trunc(data.temperatureApparent)}&deg;C `;


    !data.humidity ? humidityCard.style.display ="none" : humidity.innerHTML = `${data.humidity}`;
    
    !data.precipitationProb ? precipitationProbCard.style.display ="none" : precipitationProb.innerHTML = `${data.precipitationProbability}% `;
   
    !data.rainIntensity ? rainIntensityCard.style.display ="none" :rainIntensity.innerHTML = `${data.rainIntensity}`;
    
    !data.uvHealthConcern ?uvHealthConcernCard.style.display ="none" : uvHealthConcern.innerHTML = `${data.uvHealthConcern} `;

    !data.uvHealthConcern ? visibilityCard.style.display ="none" : visibility.innerHTML = `${data.visibility} `;
    return;
}

eventKey=async(event, page)=>{

    switch(page){
        case 'home': {
            if (event.key === 'Enter') {
            await createUser()
            await search();
            direccions('search');
          }
        }
        break;
        case 'search': {
            if (event.key === 'Enter') {
                await createUser()
                await search();
                data()
              }

        }
    }
    
    
}

clickButton =async() =>{
            await createUser()
            await search();
            direccions('search');
    }


historial= async() =>{;
    
    const data = await axios.get(`http://localhost:3000/GeoWeather/weather/`, { withCredentials: true });
    direccions('search');
    const cards = document.getElementById('cards');
    //const location = document.getElementById('location');
    location.style.display = "none";
    cards.style.display = "none";

    


}

