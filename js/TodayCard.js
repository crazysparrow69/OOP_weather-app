import Card from './Card.js';

export default class TodayCard extends Card {
    constructor(options) {
        super(options, options)
        this.location = options.location,
        this.icon = options.location === 'Belgorod' ? '../img/weather/cotton.jpg' : options.condition.icon,
        this.humidity = options.humidity,
        this.pressure = options.pressure_mb,
        this.temp = Math.round(options.temp_c),
        this.mintemp = Math.round(options.mintemp),
        this.maxtemp = Math.round(options.maxtemp)
        this.wind = options.wind_kph
    }

    #getDate() {
        const options = {
            months: {
                0: "Січень",
                1: "Лютий",
                2: "Березень",
                3: "Квітень",
                4: "Травень",
                5: "Червень",
                6: "Липень",
                7: "Серпень",
                8: "Вересень",
                9: "Жовтень",
                10: "Листопад",
                11: "Грудень"
            },
            weekdays: {
                0: 'понеділок',
                1: 'вівторок',
                2: 'середа',
                3: 'четвер',
                4: "п'ятниця",
                5: 'субота',
                6: 'неділя'
            }
        }
        const date = new Date();
        const time = `${date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`;

        return `${time} - ${date.getDate()} ${options.months[date.getMonth()]}, ${options.weekdays[date.getDay()]}`;
    }

    showCard() {
        const div = document.createElement('div');
        div.setAttribute('class', 'weather__today today');
        div.innerHTML = `
            <div class="today__title">
                <h1 class="today__city">Погода в ${this.location} зараз</h1>
                <h2 class="today__date">${this.#getDate()}</h2>
            </div>
            <div class="today__body">
                <div class="today__temp">${this.temp}°C</div>
                <div class="today__img">
                    <img src="${this.icon}" alt="Error">
                </div>
                <div class="today__minmax minmax">
                    <div class="minmax__row">
                        <div class="minmax__min">
                            <p>min</p>
                            <p>${this.mintemp}°C</p>
                        </div>
                        <div class="minmax__max">
                            <p>max</p>
                            <p>${this.maxtemp}°C</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="today__indicators indicators">
                <div class="indicators__row">
                    <div class="indicators__card">
                        <p>Вітер</p>
                        <p>${this.wind} км/год</p>
                    </div>
                    <div class="indicators__card">
                        <p>Тиск</p>
                        <p>${this.pressure} мм р.с.</p>
                    </div>
                    <div class="indicators__card">
                        <p>Вологість</p>
                        <p>${this.humidity}%</p>
                    </div>
                </div>
            </div>
        `;
        document.getElementById('weather__row').appendChild(div);
    }
}
