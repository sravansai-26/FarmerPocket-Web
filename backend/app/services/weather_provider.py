import abc
import os
import random
import httpx
from typing import Dict, Any
from app.core.config import settings

class WeatherProvider(abc.ABC):
    @abc.abstractmethod
    async def get_current_weather(self, lat: float, lon: float) -> Dict[str, Any]:
        """Fetch current weather data for the given coordinates."""
        pass

    @abc.abstractmethod
    async def get_forecast(self, lat: float, lon: float, days: int = 3) -> Dict[str, Any]:
        """Fetch forecast data."""
        pass


class MockWeatherProvider(WeatherProvider):
    async def get_current_weather(self, lat: float, lon: float) -> Dict[str, Any]:
        return {
            "temperature": round(random.uniform(25.0, 35.0), 1),
            "humidity": random.randint(40, 90),
            "precipitation": round(random.uniform(0.0, 50.0), 1), # mm
            "condition": random.choice(["Clear", "Rain", "Cloudy"]),
            "source": "Mock Agro Data"
        }

    async def get_forecast(self, lat: float, lon: float, days: int = 3) -> Dict[str, Any]:
        return {
            "daily": [
                {
                    "day": i,
                    "temperature": round(random.uniform(25.0, 35.0), 1),
                    "precipitation_prob": random.randint(10, 90)
                } for i in range(days)
            ],
            "source": "Mock Agro Data"
        }


class OpenWeatherMapProvider(WeatherProvider):
    def __init__(self):
        self.api_key = settings.OPENWEATHER_API_KEY

    async def get_current_weather(self, lat: float, lon: float) -> Dict[str, Any]:
        if not self.api_key:
            return await MockWeatherProvider().get_current_weather(lat, lon)
        
        try:
            async with httpx.AsyncClient() as client:
                url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={self.api_key}&units=metric"
                response = await client.get(url)
                response.raise_for_status()
                data = response.json()
                
                return {
                    "temperature": data.get("main", {}).get("temp"),
                    "humidity": data.get("main", {}).get("humidity"),
                    "precipitation": data.get("rain", {}).get("1h", 0.0),
                    "condition": data.get("weather", [{}])[0].get("main", "Clear"),
                    "source": "OpenWeatherMap"
                }
        except Exception as e:
            print(f"OWM current weather error: {e}")
            return await MockWeatherProvider().get_current_weather(lat, lon)

    async def get_forecast(self, lat: float, lon: float, days: int = 3) -> Dict[str, Any]:
        if not self.api_key:
            return await MockWeatherProvider().get_forecast(lat, lon, days)
        
        try:
            async with httpx.AsyncClient() as client:
                url = f"https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={self.api_key}&units=metric"
                response = await client.get(url)
                response.raise_for_status()
                data = response.json()
                
                # OWM free tier returns 3-hour chunks for 5 days.
                # Group by day, simplified for the dashboard:
                daily_forecasts = []
                for i in range(days):
                    # just grab one chunk per day approximately
                    idx = i * 8
                    if idx >= len(data.get("list", [])):
                        break
                    day_data = data["list"][idx]
                    prob = day_data.get("pop", 0) * 100
                    daily_forecasts.append({
                        "day": i,
                        "temperature": day_data.get("main", {}).get("temp"),
                        "precipitation_prob": int(prob)
                    })
                    
                return {
                    "daily": daily_forecasts,
                    "source": "OpenWeatherMap"
                }
        except Exception as e:
            print(f"OWM forecast error: {e}")
            return await MockWeatherProvider().get_forecast(lat, lon, days)


class TomorrowIoProvider(WeatherProvider):
    def __init__(self):
        self.api_key = settings.TOMORROW_API_KEY

    async def get_current_weather(self, lat: float, lon: float) -> Dict[str, Any]:
        if not self.api_key:
            return await MockWeatherProvider().get_current_weather(lat, lon)
            
        try:
            async with httpx.AsyncClient() as client:
                url = f"https://api.tomorrow.io/v4/weather/realtime?location={lat},{lon}&apikey={self.api_key}"
                response = await client.get(url)
                response.raise_for_status()
                data = response.json()
                
                values = data.get("data", {}).get("values", {})
                return {
                    "temperature": values.get("temperature"),
                    "humidity": values.get("humidity"),
                    "precipitation": values.get("precipitationIntensity", 0.0),
                    "condition": "Clear", # Tomorrow.io uses codes, simplifying here
                    "source": "Tomorrow.io"
                }
        except Exception as e:
            print(f"Tomorrow.io current error: {e}")
            return await MockWeatherProvider().get_current_weather(lat, lon)

    async def get_forecast(self, lat: float, lon: float, days: int = 3) -> Dict[str, Any]:
        if not self.api_key:
            return await MockWeatherProvider().get_forecast(lat, lon, days)
            
        try:
            async with httpx.AsyncClient() as client:
                url = f"https://api.tomorrow.io/v4/weather/forecast?location={lat},{lon}&timesteps=1d&apikey={self.api_key}"
                response = await client.get(url)
                response.raise_for_status()
                data = response.json()
                
                daily_forecasts = []
                timelines = data.get("timelines", {}).get("daily", [])
                
                for i in range(min(days, len(timelines))):
                    day_data = timelines[i].get("values", {})
                    prob = day_data.get("precipitationProbabilityAvg", 0)
                    
                    daily_forecasts.append({
                        "day": i,
                        "temperature": day_data.get("temperatureAvg"),
                        "precipitation_prob": int(prob)
                    })
                    
                return {
                    "daily": daily_forecasts,
                    "source": "Tomorrow.io"
                }
        except Exception as e:
            print(f"Tomorrow.io forecast error: {e}")
            return await MockWeatherProvider().get_forecast(lat, lon, days)


def get_weather_provider() -> WeatherProvider:
    """Factory to return the active weather provider."""
    # Prioritize active API keys
    if settings.OPENWEATHER_API_KEY:
        return OpenWeatherMapProvider()
    elif settings.TOMORROW_API_KEY:
        return TomorrowIoProvider()
    return MockWeatherProvider()
