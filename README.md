# Pokémon Recommendation System using Machine Learning
___
## 📌 Project Overview
This project implements a Pokémon Recommendation System using Data Science and Machine Learning techniques. The system analyzes Pokémon statistics and predicts their battle style using the K-Nearest Neighbors (KNN) algorithm. Based on the predicted category, it recommends similar Pokémon using distance-based similarity.

---

## 🎯 Objective
- To apply data preprocessing and feature engineering techniques  
- To build a classification model using KNN  
- To develop a recommendation system based on similarity  
- To integrate the model with a web interface using Flask  

---

## 🧠 Concepts Used
- Data Science and Data Analysis  
- Data Cleaning and Preprocessing  
- Feature Engineering  
- K-Nearest Neighbors (KNN) Algorithm  
- Feature Scaling (StandardScaler)  
- Train-Test Split  
- Euclidean Distance  
- Flask Web Framework  
- HTML and CSS for frontend  

---

## 📊 Dataset
The dataset contains Pokémon attributes such as:
- HP  
- Attack  
- Defense  
- Special Attack  
- Special Defense  
- Speed  
- Type  

A new feature **battle_style** is created based on these stats to classify Pokémon into:
- Offensive  
- Defensive  
- Speedster  
- Special Attacker  
- Balanced  

---

## ⚙️ Project Workflow
1. Load and explore dataset  
2. Clean and preprocess data  
3. Perform feature engineering  
4. Encode target variable  
5. Split dataset into training and testing sets  
6. Apply feature scaling  
7. Train KNN model (k = 5)  
8. Evaluate model performance  
9. Predict battle style for user input  
10. Recommend similar Pokémon using Euclidean distance  
11. Deploy using Flask web application  

---

## 🧪 Model Performance
- Algorithm Used: K-Nearest Neighbors (KNN)  
- Accuracy Achieved: ~88.8%  

---

## 🖥️ System Features
- Accepts user input for Pokémon stats  
- Predicts battle style  
- Recommends top similar Pokémon  
- Displays results through web interface  

---
### Backend: https://pokemon-recommendation-system.onrender.com
---
### Frontend: https://pokemon-recommendation-system.vercel.app
---

## 🧾 Conclusion
Thus, we have successfully implemented a Pokémon Recommendation System using Data Science and Machine Learning techniques. The K-Nearest Neighbors (KNN) algorithm was used to classify Pokémon into different battle styles based on their statistical attributes. Further, a similarity-based approach using Euclidean distance was applied to recommend the most relevant Pokémon to the user. The system was integrated with a Flask-based web interface, making it interactive and user-friendly. The project demonstrates the effective use of data preprocessing, feature engineering, model training, and deployment in building a real-world application.

---

## 🔮 Future Scope
Improve recommendation accuracy using advanced machine learning models
Incorporate deep learning techniques for better predictions
Add Pokémon images, types, and detailed visual cards in UI
Deploy the system on cloud platforms for public access
Integrate real-time Pokémon APIs for dynamic data
Enhance UI/UX with modern design and animations

---

👩‍💻 Developed By:
Lipika Bag
