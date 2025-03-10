# Define 3.0
The official template repository for Define 3.0

![DefineHack 2025 Logo](https://github.com/user-attachments/assets/8173bc16-418e-4912-b500-c6427e4ba4b6)

# I LOVE FINANCE
### Team Information
- **Team Name**: INNOV8
- **Track**: FINTECH

### Team Members
| Name          | Role               | GitHub                                           | LinkedIn                                                      |
|--------------|--------------------|--------------------------------------------------|----------------------------------------------------------------|
| Naveen Ravi  | Frontend/Backend   | [@Naveenravi07](https://github.com/Naveenravi07) | [Profile](https://www.linkedin.com/in/naveen-ravi-97b158229/) |
| Manu Madhu   | AI/ML              | [@Manumanu1234](https://github.com/Manumanu1234) | [Profile](https://www.linkedin.com/in/manu-madhu-086506281/)  |
| Sirin Simon  | UI/UX Design       | [@Sirinsimon](https://github.com/Sirinsimon)     | [Profile](https://www.linkedin.com/in/sirin-simon-813291293/) |
| Suraj P A    | Frontend/Python    | [@SurajPa05](https://github.com/SurajPa05)       | [Profile](https://www.linkedin.com/in/suraj-p-a-115144302/)   |

## Project Details

### Overview
_Our fintech website offers real-time financial insights, AI-powered chat, stock market analysis, loan status detection, credit score prediction, and financial news summarization. Users also receive a monthly AI-generated PDF report with insights and recommendations._

### Problem Statement
_Many individuals and businesses struggle with understanding financial data, tracking market trends, and accessing reliable customer support for fintech-related queries. Financial information is often complex, scattered, and difficult to interpret, leading to poor decision-making._

### Solution
_We are developing a fintech website with a clean, user-friendly dashboard that presents key financial data in an accessible format. The platform features an AI-powered chatbot that provides financial insights and customer support. Additionally, the website integrates real-time financial data, stock market analysis, credit score prediction, and loan status detection to enhance user decision-making. Users also receive AI-generated financial reports with insights and recommendations._

### Demo
[![Project Demo](https://img.youtube.com/vi/HjPIh6R8lDs/0.jpg)](https://www.youtube.com/watch?v=HjPIh6R8lDs)


### Live Project
[Project Name](https://your-project-url.com)

## Technical Implementation

### Technologies Used
- **Frontend**: Vite.js
- **Backend**: Node.js, Python
- **Database**: PostgreSQL
- **APIs**: Gemini, Groq, NewsAPI
- **DevOps**: (To be added)
- **Other Tools**: (To be added)

### Key Features
- **AI-Powered Financial Insights** – The **Dashboard** and **Financial Advisor** provide **real-time financial insights**, analytics, and expert guidance. Users can track financial health, analyze trends, and make data-driven decisions with AI support.  

- **Personalized AI Assistant** – The **Personal Assistant** is **RAG-based**, meaning it understands the user’s financial history and offers tailored advice. It helps users plan investments, manage expenses, and make informed financial choices.  

- **Market & Risk Analysis** – The **Stock Analysis** feature uses **AI agents** to evaluate market trends, while **Loan Status & Credit Score Prediction** helps users assess financial risks and loan     eligibility. These tools improve financial planning.  

 - **Automated Reports & Security** – The platform **automates financial report generation**, offering **monthly AI-driven reports** with insights and recommendations. **Fraud Detection** ensures financial security by identifying suspicious activities using AI.

## Setup Instructions

### Prerequisites
- Node.js
- Python
- PostgreSQL

## Installation and Running the Project

### 1. Clone the Repository
```
git clone https://github.com/YOUR-TEAM/define-3.0.git
cd define-3.0
```

### 2. Setup Client (Frontend)
```
cd client
npm install
npm run dev
```
- Runs the frontend on http://localhost:5173/ (default Vite port)

### 3. Setup Server (Node.js Backend)
```
cd ../server
npm install
cp .env.example .env  # Configure your environment variables
npm run dev
```
- Runs the backend on http://localhost:8000/

### 4. Setup Python Services (FastAPI)
```
cd ../python
python -m venv venv  # Create a virtual environment
source venv/bin/activate  # (Use venv\\Scripts\\activate on Windows)
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8080 --reload
```
- Runs the Python API on http://localhost:8080/

## Additional Resources

### Project Timeline
1. **Planning & Research** – Define core features, gather fintech data sources, and design the website architecture.
2. **UI/UX Design** – Develop a clean, user-friendly dashboard and chatbot interface.
3. **Backend & AI Integration** – Implement financial data processing, chatbot (RAG model), and AI-powered analytics.
4. **Frontend Development** – Build the interactive dashboard, chatbot UI, and data visualization components.
5. **Testing & Refinement** – Conduct functional testing, refine AI responses, and optimize performance.
6. **Finalization & Deployment** – Integrate all features, generate sample financial reports, and deploy the prototype.

### Challenges Faced
1. **Integrating Real-Time Financial Data** – Handling live stock market updates and financial news required selecting reliable APIs and optimizing data fetching to ensure accuracy and speed.
2. **Optimizing AI Chatbot Responses** – Fine-tuning the RAG-based chatbot to provide relevant financial insights while keeping responses concise and accurate.
3. **Ensuring a Smooth User Experience** – Balancing a feature-rich dashboard with a clean UI required multiple iterations of UI/UX design and frontend optimizations.

### Future Enhancements
1. **Advanced AI Insights** – Enhance the chatbot with deeper financial analysis, personalized investment advice, and predictive analytics.
2. **Expanded Financial Services** – Integrate budgeting tools, expense tracking, and loan comparison features to provide a more comprehensive fintech experience.
3. **User Customization & Personalization** – Allow users to customize their dashboard, set financial goals, and receive tailored recommendations.

### References (if any)
- [Reference 1](link)
- [Reference 2](link)

### Submission Checklist
- [x] Completed all sections of this README
- [x] Added project demo video
- [ ] Provided live project link
- [x] Ensured all team members are listed
- [x] Included setup instructions
- [x] Submitted final code to repository

© Define 3.0 | [Define 3.0](https://www.define3.xyz/)
"""
