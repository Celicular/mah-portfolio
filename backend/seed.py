import json
import os

DATA_DIR = os.path.join(os.path.dirname(__file__), "data")

PORTFOLIO_DATA = [
  {
    "id": "port-1",
    "title": "Cruise Booking Desk",
    "category": "React & PostgreSQL",
    "image": "/portfolio/2.png",
    "desc": "A large-scale cruise travel booking platform built with React and PostgreSQL, designed for high performance, seamless navigation, and real-time travel package management.",
    "link": "https://cruisebookingdesk.com",
    "order": 0,
    "hidden": False,
    "under_development": False
  },
  {
    "id": "port-2",
    "title": "Book Holiday Rental",
    "category": "React & PHP",
    "image": "/portfolio/1.png",
    "desc": "A vacation rental marketplace enabling property listings, booking inquiries, and dynamic property management. Built with React and PHP for reliable server-side functionality.",
    "link": "https://bookholidayrental.com",
    "order": 1,
    "hidden": False,
    "under_development": False
  },
  {
    "id": "port-3",
    "title": "340 Real Estate",
    "category": "Next.js & PostgreSQL",
    "image": "/portfolio/3.png",
    "desc": "A modern real estate platform powered by Next.js and PostgreSQL, featuring dynamic property listings, optimized performance, and scalable backend infrastructure.",
    "link": "https://340realestate.com",
    "order": 2,
    "hidden": False,
    "under_development": False
  },
  {
    "id": "port-4",
    "title": "Algharbiaco",
    "category": "React & PHP",
    "image": "/portfolio/6.png",
    "desc": "An international corporate website developed for a global client, delivering a professional digital presence with modern UI design and reliable backend integration.",
    "link": "https://algharbiaco.com",
    "order": 3,
    "hidden": False,
    "under_development": False
  },
  {
    "id": "port-5",
    "title": "Australia Vacation Rental",
    "category": "React + Vite & PHP",
    "image": "/portfolio/4.png",
    "desc": "A fast and scalable vacation rental platform built using React with Vite and PHP, optimized for property discovery, booking inquiries, and seamless user experience.",
    "link": "https://australiavacationrental.com",
    "order": 4,
    "hidden": False,
    "under_development": False
  },
  {
    "id": "port-6",
    "title": "New Zealand Stays",
    "category": "React + Vite & PHP",
    "image": "/portfolio/5.png",
    "desc": "A property rental platform tailored for the New Zealand market, featuring responsive UI, efficient property listings, and fast performance powered by React, Vite, and PHP.",
    "link": "https://newzealandstays.com",
    "order": 5,
    "hidden": False,
    "under_development": False
  }
]

PROJECTS_DATA = [
  {
    "id": "proj-1",
    "title": "CensorAI",
    "type": "AI / NLP Moderation System",
    "tech": ["Python", "NLP", "Machine Learning", "Video Processing", "AI Moderation"],
    "image": "/project/main.png",
    "desc": "An AI-powered social media moderation prototype that detects and flags hate speech or offensive content in uploaded videos. Using Natural Language Processing and machine learning models, the system analyzes spoken and textual content in real time to maintain a safer online environment.",
    "link": "https://github.com/Celicular/TechDx404-NLP-censorAI",
    "order": 0,
    "hidden": False,
    "under_development": False
  },
  {
    "id": "proj-2",
    "title": "LetsLearn",
    "type": "AI Learning Platform",
    "tech": ["Python", "RAG", "Local LLM", "Vector Databases", "Document Processing"],
    "image": "/project/1.png",
    "desc": "An intelligent offline educational application that transforms documents into interactive learning tools. Built with Retrieval-Augmented Generation (RAG), it allows users to upload study materials and query them using AI—running completely locally without requiring internet access.",
    "link": "https://github.com/Celicular/lets-learn",
    "order": 1,
    "hidden": False,
    "under_development": False
  },
  {
    "id": "proj-3",
    "title": "Clarity ERP",
    "type": "Enterprise Software",
    "tech": ["Full Stack", "Monolithic Architecture", "Workflow Automation", "Database Systems"],
    "image": "/project/2.png",
    "desc": "An enterprise-grade ERP command center designed to centralize and automate workforce management. The platform replaces fragmented SaaS tools by providing a unified ecosystem for business operations, task orchestration, and data-driven decision making.",
    "link": "https://github.com/Celicular/Clarity-ERP",
    "order": 2,
    "hidden": False,
    "under_development": False
  },
  {
    "id": "proj-4",
    "title": "Cap2Easy",
    "type": "AI Video Tool",
    "tech": ["Python", "OpenAI Whisper", "Speech Recognition", "GPU Acceleration", "Video Rendering"],
    "image": "/project/3.png",
    "desc": "A powerful video captioning system that automatically generates accurate subtitles using OpenAI Whisper speech recognition. It supports custom fonts, multilingual transcription, real-time preview, and GPU acceleration for fast high-quality caption rendering.",
    "link": "https://github.com/Celicular/Celi-Cap2Easy",
    "order": 3,
    "hidden": False,
    "under_development": False
  }
]

def seed_data():
    os.makedirs(DATA_DIR, exist_ok=True)
    
    with open(os.path.join(DATA_DIR, "portfolio.json"), "w", encoding="utf-8") as f:
        json.dump(PORTFOLIO_DATA, f, indent=2, ensure_ascii=False)
        
    with open(os.path.join(DATA_DIR, "projects.json"), "w", encoding="utf-8") as f:
        json.dump(PROJECTS_DATA, f, indent=2, ensure_ascii=False)
        
    print(f"Successfully seeded {len(PORTFOLIO_DATA)} portfolio items and {len(PROJECTS_DATA)} projects.")

if __name__ == "__main__":
    seed_data()
