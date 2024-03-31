exports.findEvents = async (req, res) => {
    const { latitude, longitude, date } = req.query;

    if (!latitude || !longitude || !date) {
        return res.status(400).json({ message: 'Missing required query parameters.' });
    }

    const queryDate = new Date(date);
    if (isNaN(queryDate.getTime())) {
        return res.status(400).json({ message: 'Invalid date format. Please use YYYY-MM-DD.' });
    }

    const events = await Event.find({
        date: { $gte: queryDate }
    });

    const eventsWithDistance = await Promise.all(events.map(async (event) => {
        const response = await axios.get('https://gg-backend-assignment.azurewebsites.net/api/Distance', {
            params: {
                code: 'aBcDeFgHiJkL123456',
                latitude1: latitude,
                longitude1: longitude,
                latitude2: event.latitude,
                longitude2: event.longitude
            }
        });
        event.distance = response.data.distance;
        return event;
    }));

    eventsWithDistance.sort((a, b) => a.distance - b.distance);

    const limitedEvents = eventsWithDistance.slice(0, 10);

    const eventsWithWeather = await Promise.all(limitedEvents.map(async (event) => {
        const weatherResponse = await axios.get('https://gg-backend-assignment.azurewebsites.net/api/Weather', {
            params: {
                code: 'ZyXwVuTsRq987654',
                city: event.city_name,
                date: event.date.toISOString().split('T')[0]
            }
        });
        event.weather = weatherResponse.data.weather;
        return event;
    }));

    res.status(200).json(eventsWithWeather.map(event => ({
        eventName: event.event_name,
        city: event.city_name,
        date: event.date.toISOString().split('T')[0],
        weather: event.weather,
        distance: `${event.distance} km`
    })));
};
