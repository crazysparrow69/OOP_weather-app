import TodayCard from './TodayCard.js';
import ForecastCard from './ForecastCard.js';

export const SingletonFactory = (function(){
    class App {
        #baseUrl = 'https://api.weatherapi.com/v1';
        #reqType = '/forecast.json';
        #apikey = '20171a04458146ed8e6134808230301';
        #forecastDays = 5;
        #select = document.getElementById("sample__select");
        current = {};
        forecast = [];
        cards = [];
    
        #getSelectedCity() { return this.#select.querySelectorAll("option")[this.#select.selectedIndex].value; }
    
        createCards() {
            this.cards[0] = new TodayCard(this.current);
            for (let i = 1; i < this.#forecastDays; i++) this.cards[i] = new ForecastCard(this.forecast[i-1]);
            return this;
        }
    
        showCards() { 
            this.cards.forEach(card => card.showCard())
            return this;
        }
    
        deleteCards() {
            const div = document.getElementById('weather__row');
            while (div.firstChild) div.removeChild(div.firstChild);
            return this;
        }
    
        changeBackground() {
            document.body.style.backgroundImage = `url(../img/cities/${this.#getSelectedCity().toLowerCase()}.jpg`;
            return this;
        }
    
        fetchWeather() {
            return fetch(
            `${this.#baseUrl}${this.#reqType}?`
                + `q=${this.#getSelectedCity()}`         
                + `&days=${this.#forecastDays}`           
                + `&key=${this.#apikey}`
            )
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                this.current = { 
                    location: data.location.name,
                    mintemp: data.forecast.forecastday[0].day.mintemp_c,
                    maxtemp: data.forecast.forecastday[0].day.maxtemp_c,
                    ...data.current
                };
                for (let i = 1; i < this.#forecastDays; i++) {
                    this.forecast[i-1] = {
                        location: data.location.name,
                        date: data.forecast.forecastday[i].date,
                        day: data.forecast.forecastday[i].day
                    }
                }
                console.log({ current: this.current, forecast: this.forecast });
            });
        }
    }
  
    let instance;
  
    return {
        getInstance: function(){
        if (!instance) {
          instance = new App();
          delete instance.constructor;
        }
        return instance;
      }
    };
  
})();
