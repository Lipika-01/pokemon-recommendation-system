from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
import numpy as np
import os

app = Flask(__name__)
CORS(app)

# Load files
knn = joblib.load("knn_model.pkl")
scaler = joblib.load("scaler.pkl")
le = joblib.load("label_encoder.pkl")
df = pd.read_csv("pokemon_final.csv")

FEATURE_COLUMNS = ["hp", "attack", "defense", "sp_attack", "sp_defense", "speed"]


@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "PokéMatch backend is running successfully."
    })


def predict_style(user_input):
    user_df = pd.DataFrame([user_input], columns=FEATURE_COLUMNS)
    user_scaled = scaler.transform(user_df)
    pred = knn.predict(user_scaled)
    return le.inverse_transform(pred)[0]


def recommend_pokemon(user_input, top_n=3):
    style = predict_style(user_input)
    filtered = df[df["battle_style"] == style].copy()

    def calc_distance(row):
        return np.sqrt(
            (row["hp"] - user_input["hp"]) ** 2 +
            (row["attack"] - user_input["attack"]) ** 2 +
            (row["defense"] - user_input["defense"]) ** 2 +
            (row["sp_attack"] - user_input["sp_attack"]) ** 2 +
            (row["sp_defense"] - user_input["sp_defense"]) ** 2 +
            (row["speed"] - user_input["speed"]) ** 2
        )

    filtered["distance"] = filtered.apply(calc_distance, axis=1)
    filtered = filtered.sort_values(by="distance")

    recommendations = filtered[
        ["name", "type1", "hp", "attack", "defense", "sp_attack", "sp_defense", "speed", "battle_style", "distance"]
    ].head(top_n)

    recommendations["distance"] = recommendations["distance"].round(2)

    return style, recommendations


@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        if not data:
            return jsonify({"error": "No JSON data received"}), 400

        user_input = {
            "hp": int(data["hp"]),
            "attack": int(data["attack"]),
            "defense": int(data["defense"]),
            "sp_attack": int(data["sp_attack"]),
            "sp_defense": int(data["sp_defense"]),
            "speed": int(data["speed"])
        }

        style, recs = recommend_pokemon(user_input)

        return jsonify({
            "predicted_style": style,
            "recommendations": recs.to_dict(orient="records")
        })

    except KeyError as e:
        return jsonify({"error": f"Missing field: {str(e)}"}), 400
    except ValueError:
        return jsonify({"error": "All input values must be valid numbers"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)