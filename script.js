const apiKey = 'YOUR_API_KEY';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
let iconElement = document.getElementById('icon');
const containerElement = document.getElementById('container');

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    } else {
        console.error('Location input is empty');
        containerElement.textContent = 'Sorry'
    }
});

function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            locationElement.textContent = data.name;
            temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
            descriptionElement.textContent = data.weather[0].description;
            const weatherDescription = data.weather[0].description;
            descriptionElement.textContent = weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);

            const temp = data.main.temp;

            
            iconElement.src = '';
            iconElement.style.opacity = 1;

            
            if (temp >= 10 && temp < 15) {
                document.body.style.backgroundColor = '#9DB4C0';
                iconElement.src = "images/snow.png";
                descriptionElement.textContent = "The weather is cool, offering a refreshing escape from the heat. It's a great time to enjoy outdoor activities, as the temperature is mild and comfortable. You might need a light jacket or sweater, especially in the early morning or evening hours. The cool weather can invigorate your senses and provide a pleasant environment for leisurely walks, cycling, or a picnic in the park.";
            } else if (temp >= 15 && temp < 20) {
                document.body.style.backgroundColor = '#C7E5ED';
                iconElement.src = "images/mild.png";
                descriptionElement.textContent = "The temperature is mild, making it ideal for a variety of activities. The air feels just right – not too hot and not too cold. You can enjoy a casual stroll, jog, or bike ride without worrying about extreme temperatures. It's also perfect weather for gardening, reading a book outdoors, or enjoying a cup of coffee on the patio. Dressing in layers is recommended to stay comfortable throughout the day.";
            } else if (temp >= 20 && temp < 25) {
                document.body.style.backgroundColor = '#F5ECD7';
                iconElement.src = "images/wind.png";
                descriptionElement.textContent = "The weather is warm, signaling the approach of summer. It's a pleasant temperature for spending time outside, whether you're heading to the beach, hosting a barbecue, or taking a hike. The warmth can uplift your spirits and provide the perfect setting for social gatherings and outdoor fun. Light and breathable clothing is advisable to stay cool and comfortable.";
            } else if (temp >= 25 && temp < 30) {
                document.body.style.backgroundColor = '#F9D8AD';
                iconElement.src = "images/hot.png";
                descriptionElement.textContent = "The temperature is hot, and you can feel the intensity of the sun. It's important to stay hydrated and seek shade during the peak afternoon hours to avoid overheating. This weather is perfect for swimming, sunbathing, and other water activities. Wearing sunscreen and protective clothing is essential to protect your skin from sunburn. The evenings can be balmy and enjoyable for outdoor dining or a sunset walk.";
            } else if (temp >= 30 && temp < 35) {
                document.body.style.backgroundColor = '#FFB86F';
                iconElement.src = "images/very-hot.png";
                descriptionElement.textContent = "The weather is very hot, and the heat is noticeable throughout the day. It's crucial to take precautions to prevent heat-related illnesses, such as drinking plenty of water, avoiding strenuous activities during peak heat, and staying in air-conditioned environments when possible. This is the kind of weather that encourages you to take it easy, perhaps with a cold drink in hand while lounging in the shade or enjoying a dip in the pool.";
            } else if (temp >= 35 && temp < 40) {
                document.body.style.backgroundColor = '#FF8C42';
                iconElement.src = "images/scorching-sun.png";
                descriptionElement.textContent = "The temperature is scorching hot, with the sun beating down relentlessly. Heat waves are common in this range, and it's important to be vigilant about heat safety. Outdoor activities should be limited to early morning or late evening to avoid the intense heat. Staying indoors with fans or air conditioning is highly recommended. The heat can be exhausting, so taking regular breaks and cooling off is essential.";
            } else if (temp >= 40) {
                document.body.style.backgroundColor = '#FF3C38';
                iconElement.src = "images/blazing.png";
                descriptionElement.textContent = "The weather is blazing hot, with temperatures reaching extreme levels. This kind of heat can be dangerous, and it's crucial to stay informed about heat advisories and warnings. Limit outdoor exposure and prioritize staying in cool, shaded, or air-conditioned areas. Heat exhaustion and heat stroke are serious risks, so ensure you stay hydrated and take frequent breaks. This is a time to take extra care of vulnerable populations, such as the elderly and young children.";
            }

            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundPosition = "center";
            document.body.style.backgroundRepeat = "no-repeat";

            console.log('Image src:', iconElement.src);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            locationElement.textContent = 'Sorry, location not found';
            temperatureElement.textContent = '';
            descriptionElement.textContent = '';
            iconElement.src = 'images/sorry.png';
            document.body.style.backgroundImage = "none";
            iconElement.style.opacity = 1;
        });
}
