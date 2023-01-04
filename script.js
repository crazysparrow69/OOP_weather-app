import { SingletonFactory } from './js/App.js';

const app = SingletonFactory.getInstance();
document.getElementById("sample__button")
    .addEventListener('click', () => app
        .fetchWeather()
        .then(() => app
            .deleteCards()
            .createCards()
            .showCards()
            .changeBackground()
        )
    );
