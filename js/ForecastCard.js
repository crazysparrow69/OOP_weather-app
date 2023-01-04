import Card from './Card.js';

export default class ForecastCard extends Card {
    constructor(options) {
        super(options, options)
        this.location = options.location,
        this.date = options.date.slice(5).replaceAll('-', '.'),
        this.mintemp = Math.round(options.day.mintemp_c),
        this.maxtemp = Math.round(options.day.maxtemp_c),
        this.wind = options.day.maxwind_kph,
        this.icon = options.location === 'Belgorod' ? '../img/weather/cotton.jpg' : options.day.condition.icon
    }

    #getDate() { return this.date; }

    showCard() {
        const div = document.createElement('div');
        div.setAttribute('class', 'weather__ahead card');
        div.innerHTML = `
            <div class="card__row">
                <div class="card__date">${this.#getDate()}</div>
                <div class="card__img">
                    <img src="${this.icon}" alt="">
                </div>
                <div class="card__minmax">
                    <div class="card__min">
                        <p>min<p>
                        <p>${this.mintemp}°C</</p>
                    </div>
                    <div class="card__max">
                        <p>max</p>
                        <p>${this.maxtemp}°C</p>
                    </div>
                </div>
                <div class="card__wind">
                    <p>${this.wind} км/год</p>
                </div>
            </div>
        `;
        document.getElementById('weather__row').appendChild(div);
    }
}
