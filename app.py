import os
import requests
from flask import Flask, render_template, jsonify, request
from dotenv import load_dotenv

load_dotenv()  

app = Flask(__name__)

API_KEY = os.getenv('API_KEY')
BASE_URL = 'http://api.openweathermap.org/data/2.5/weather'

@app.route('/')
def home():
    return render_template('index.html')  

@app.route('/get_weather', methods=['GET'])
def get_weather():
    city = request.args.get('city')
    if not city:
        return jsonify({'error': 'No city provided'}), 400

    params = {
        'q': city,
        'appid': API_KEY,
        'units': 'metric',  
    }

    try:
        response = requests.get(BASE_URL, params=params)
        data = response.json()

        if data['cod'] != 200:
            return jsonify({'error': 'City not found'}), 404

        weather_data = {
            'city': data['name'],
            'date': data['dt'],
            'temperature': data['main']['temp'],
            'weather': data['weather'][0]['description'],
            'humidity': data['main']['humidity'],
            'pressure': data['main']['pressure'],
            'wind_speed': data['wind']['speed'],
            'icon': data['weather'][0]['icon']
        }

        return jsonify(weather_data)

    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
