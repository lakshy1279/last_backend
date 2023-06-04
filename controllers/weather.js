const axios = require('axios');
// we can also use lru-cache but i am getting some error so i use this.
const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 300 });

const maxCacheEntries = 1000;
const details = async (req, res, next) => {
    try {
      const apiKey = process.env.KEY; 
      const { city } = req.params;
      const cacheKey = `weather_${city}`;

    // Check if the data is present in the cache
    const cachedData = cache.get(cacheKey);
     if (cachedData) {
        return res.json(cachedData);
     }
      console.log(city);
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
      const response = await axios.get(url);
      const data = response.data;
      console.log("data", data.weather);
      const weather = {
        city: data.name,
        temperature: data.main.temp,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        windSpeed: data.wind.speed,
        sunrise:data.sys.sunrise,
        sunset:data.sys.sunset
      };
      cache.set(cacheKey, weather);
      if (cache.keys().length > maxCacheEntries) {
        cache.del(cache.keys()[0]);
      }
      res.json(weather);
     } catch (error) {
       next(error);
     }
};

module.exports = {details};
  