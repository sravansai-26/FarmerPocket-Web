import asyncio
import os
from app.services.weather_provider import get_weather_provider
from app.core.config import settings

async def main():
    print(f"OWM Key present: {bool(settings.OPENWEATHER_API_KEY)}")
    print(f"Tomorrow Key present: {bool(settings.TOMORROW_API_KEY)}")
    
    provider = get_weather_provider()
    print(f"Using provider: {provider.__class__.__name__}")
    
    lat = 17.3850
    lon = 78.4867
    
    current = await provider.get_current_weather(lat, lon)
    print("Current Weather:")
    print(current)
    
    forecast = await provider.get_forecast(lat, lon, days=3)
    print("Forecast:")
    print(forecast)

if __name__ == "__main__":
    asyncio.run(main())
