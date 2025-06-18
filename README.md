# internship-week-1

# 🌍 EcoVision – AI-Powered E-Waste Classification Platform

EcoVision is a full-stack MERN (MongoDB, Express, React, Node.js) web application that classifies electronic waste using deep learning models. It helps users identify the type, category, and hazardous materials in e-waste, and track their environmental impact — one item at a time.

---

## 🚀 Features

- 🔐 Secure Sign-up/Login (JWT Auth)
- 🖼️ Upload images of e-waste for AI classification
- 🧠 ML model (CNN-based) predicts:
- Object Name (e.g., Smartphone, Keyboard)
- Category (e.g., Large/Small Appliances)
- Hazardous Elements (e.g., Lead, Mercury)
- 📊 Dashboard with all previous classifications
- 📥 Download PDF report of each classification
- 🌱 Impact Tracker: Calculates your positive impact on the environment
- 🧩 Minimalist white & blue UI with 3D visual elements
- 🧠 Trained on [Kaggle E-Waste Dataset](https://www.kaggle.com/datasets/akshat103/e-waste-image-dataset)

---

## 🖥️ Tech Stack

| Layer        | Technology                     |
|--------------|---------------------------------|
| Frontend     | React.js, Tailwind CSS, Three.js |
| Backend      | Node.js, Express.js             |
| Database     | MongoDB (Mongoose)              |
| ML Model     | CNN via TensorFlow or PyTorch (served via Flask or API) |
| Report Gen   | jsPDF                           |
| Auth         | JWT (JSON Web Tokens)           |



installation process 

🔧 Installation & Setup
Follow the steps below to run the project locally:

1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/your-username/ecovision.git
cd ecovision
2. Setup the Backend
bash
Copy
Edit
cd server
npm install
Create a .env file inside the server/ folder with the following variables:

ini
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Then start the backend server:

bash
Copy
Edit
npm run dev
3. Setup the Frontend
bash
Copy
Edit
cd ../client
npm install
Create a .env file inside the client/ folder:

ini
Copy
Edit
REACT_APP_API_URL=http://localhost:5000
Then start the frontend app:

bash
Copy
Edit
npm start
4. Setup the Machine Learning Model (Optional – Local or API-based)
If you're hosting the ML model locally (e.g., via Flask):

bash
Copy
Edit
cd ../ml-model
pip install -r requirements.txt
python app.py
Make sure the model server is running on a separate port (e.g., http://localhost:5001) and accessible via API from the backend.


