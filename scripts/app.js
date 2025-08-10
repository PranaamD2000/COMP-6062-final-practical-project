const { createApp } = Vue;

createApp({
  data() {
    return {
      user: {}, 
      city: 'London',
      province: 'Ontario',
      country: 'Canada',
      weather: {},
      word: '',
      definition: {}
    };
  },
// calls both the functions as soon as page loads
created(){
    this.fetchUser();
    this.fetchWeather();
},
  methods: {
    //Method to get data for random user
    fetchUser() {
      fetch('https://comp6062.liamstewart.ca/random-user-data')
        .then(response => {
            if(response.ok){
                return response.json()
            }
            else{
                console.log("An error occured. Please try again.")
            }
        }).then(data => {
          this.user = {
            name: data["user_profile"]["first_name"] + ' ' + data["user_profile"]["last_name"],
            age:  data["user_profile"]["age"],
            picture: data["user_profile"]["avatar_url"]
          };
        })
        .catch(error => {
            console.log("Total Failure")}
        );
    },
     //Method to get data for desired weather
    fetchWeather() {
      const url = `https://comp6062.liamstewart.ca/weather-data?city=${this.city}&province=${this.province}&country=${this.country}`;
      fetch(url)
      .then(response => {
        if(response.ok){
            return response.json()
        }
        else{
            console.log("An error occured. Please try again.")
        }

    }).then(data => {
          this.weather = {
            temp: data["weather_data"]["temperature"],
            wind:  data["weather_data"]["wind_speed"],
            desc:  data["weather_data"]["weather_description"]
          };
        })
        .catch(error => {
            console.log("Total Failure")}
        );
    },
    //Method to get defination for desired word
    fetchDefinition() {
      const url = `https://comp6062.liamstewart.ca/api/define?word=${this.word}`;
      fetch(url)
      .then(response => {
        if(response.ok){
            return response.json()
        }
        else{
            console.log("An error occured. Please try again.")
        }

    }).then(data => {
          this.definition = {
            word: data.word,
            phonetic: data.phonetic,
            definition: data.definition
          };
        })
        .catch(error => {
            console.log("Total Failure")}
        );
    }
  }
}).mount('#app');
