from flask import Flask, render_template, request, redirect, url_for, jsonify
import requests

app = Flask(__name__)

# API endpoint ve Instagram verilerini alacak fonksiyon
def fetch_instagram_data(username):
    url = "https://instagram-scraper-api2.p.rapidapi.com/v1/info"
    querystring = {"username_or_id_or_url": username}
    headers = {
        "x-rapidapi-key": "52277bb50fmshb5baa702fa0fc1ep1772c7jsnd1ab864d3e36",
        "x-rapidapi-host": "instagram-scraper-api2.p.rapidapi.com"
    }
    try:
        response = requests.get(url, headers=headers, params=querystring)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/verification', methods=['POST'])
def verification():
    username = request.form.get('user')
    if not username:
        return jsonify({"error": "Username is required"}), 400

    data = fetch_instagram_data(username)
    if "data" in data and "hd_profile_pic_url_info" in data["data"] and "url" in data["data"]["hd_profile_pic_url_info"]:
        profile_pic_url_hd = data["data"]["hd_profile_pic_url_info"]["url"]
        # Profil fotoğrafı URL'sinin tam olarak HTTPS ile başladığını kontrol et
        if not profile_pic_url_hd.startswith('https://'):
            profile_pic_url_hd = "https://" + profile_pic_url_hd.lstrip('http://')
        return render_template('verification.html', profile_pic_url=profile_pic_url_hd)
    else:
        return jsonify({"error": "Profile picture URL not found"}), 404


if __name__ == '__main__':
    app.run(debug=True)
