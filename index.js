// Sistem inputs


//selection of sistem elements
directions= (dir)=>{
    switch(dir)
    {
        case 'home': window.location.href = '../index.html';
                    break;
        case 'search': window.location.href = './page/search.html';
                    break;
        case 'history':
                    window.location.href = './page/history.html';
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
    const location = document.getElementById('location');
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
       rowLocation.classList.add("row-unlocation");
        location.classList.add("p-unlocation");
        location.innerHTML = 'Esta ubicacion no existe';
        temps.classList.add("notVisibility");
        cards.classList.add("notVisibility");
        return; 
    }

    else{
        rowLocation.classList.remove("row-unlocation");
        location.classList.remove("p-unlocation");
        temps.classList.remove("notVisibility");
        cards.classList.remove("notVisibility");

    }
    
    
    
    location.innerHTML = `${data.location}`;

    
    temperature.innerHTML = `${Math.trunc(data.temperature)}&deg;C`;
    
    apTemperature.innerHTML = `${Math.trunc(data.temperatureApparent)}&deg;C`;


    !data.humidity ? humidityCard.style.display ="none" : humidity.innerHTML = `${data.humidity}%`;
    
    !data.precipitationProb ? precipitationProbCard.style.display ="none" : precipitationProb.innerHTML = `${data.precipitationProbability}% `;
   
    !data.rainIntensity ? rainIntensityCard.style.display ="none" :rainIntensity.innerHTML = `${data.rainIntensity}`;
    
    !data.uvHealthConcern ? uvHealthConcernCard.style.display ="none" : uvHealthConcern.innerHTML = `${showUVHeath(data.uvHealthConcern)} `;

   
    !data.visibility ? visibilityCard.style.display ="none" : visibility.innerHTML = `${data.visibility} km`;
    return;
}
 const showUVHeath=(data)=>{
  console.log(data);
    if((0 <= data) && (data <=2 )){
      console.log('1',data)
      return 'Bajo'
    }
    else if((2 < data) && (data <=5)){
      console.log('2',data)
      return 'Moderado'
    }
    else if((5 < data) && (data <= 7)){
      console.log('3',data)
      return 'Alto'
    }
    else if( (7< data) && (data <=10)){
      console.log('4',data)
      return 'Muy Alto'
    }
    else{
      console.log('5',data)
      return 'Extremo'
    }
 }

eventKey=async(event, page)=>{

    switch(page){
        case 'home': {
            if (event.key === 'Enter') {
            await createUser()
            await search();
            directions('search');
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
            directions('search');
    }


historial= async() =>{
    
    try {
        const response = await axios.get('http://localhost:3000/GeoWeather/weather/', { withCredentials: true });
        const data = response.data.data;
        const tableBody = document.getElementById('tableBody');

        data.forEach(item => {
          const row = document.createElement('tr');
          row.innerHTML = `<td>${item.location}</td>
                           <td>${item.temperature}</td>
                           <td>${item.temperatureApparent}</td>
                           <td>${item.humidity}</td>
                           <td>${item.visibility}</td>
                           <td>${item.uvHealthConcern}</td>
                           <td>${item.precipitationProbability}</td>
                           <td>${item.rainIntensity}</td>`;
          
          tableBody.appendChild(row);
        });
      } catch (error) {
        console.error('Error al obtener datos de la API:', error);
      }
    

    


}

