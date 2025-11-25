export const resumeData = {
    name: "Rahul AP",
    location: "Kerala, India",
    hero: {
        navName1: "Rahul",
        navName2: "Ap",
        role1: "Full-Stack Developer",
        role2: "Generative AI Engineer",
        exp: "2",
        p1: "Engineering next-gen interfaces and intelligent systems with full-stack architecture and GenAI. Based in Kerala, India.",
        name: "rahulapjs",
        skills1: "TypeScript",
        skills2: "GenAI",
        skills3: "Angular",
        passion: "Web/AI"
    },
    contact: {
        phone: "7593968596",
        email: "rahulap.js@gmail.com",
        linkedin: "https://linkedin.com/in/rahulapjs",
        github: "https://github.com/zccott",
        cv: "https://drive.google.com/file/d/10vp81RVSZhhdysMvzjt_BPwx5K0lxvkV/view?usp=drivesdk"
    },
    education: [
        {
            institution: "Kerala Government Polytechnic College",
            degree: "Diploma in Computer Engineering",
            year: "2021–2024",
        },
    ],
    experience: [
        {
            company: "AOT Technologies",
            role: "Junior Software Engineer",
            year: "2024–Present",
            description: [
                "Worked across frontend + backend for Canadian healthcare platforms.",
                "Angular + MUI + reusable UI components.",
                "Integrated REST APIs for user onboarding & appointment systems.",
                "Implemented NgRx/RxJS application-wide state.",
                "AI fax automation using Python + OpenAI/Gemini + Temporal.",
                "Real-time SOAP note tool using FastAPI + WebSockets + Twilio + Whisper.",
            ],
        },
        {
            company: "Nexus Technologies",
            role: "Intern",
            year: "2023–2024",
            description: [
                "Healthcare mobile app (Find doctors by symptoms).",
                "Designed UX/UI screens.",
                "AI symptom analysis feature.",
                "Flutter cross-platform development.",
            ],
        },
    ],
    projects: [
        {
            title: "AI-Powered SOAP Note Generator",
            subtitle: "Multi-Agent Medical Assistant",
            tech: ["Python", "Google ADK", "Gemini 2.5 Flash Lite", "Google Search Tool", "InMemoryRunner"],
            description: [
                "Multi-agent pipeline for medical intake and SOAP note creation",
                "Extracts structured clinical data from conversations",
                "Fetches guideline evidence via Google Search Tool",
                "Generates clinically accurate SOAP notes with safety checks",
                "Fully runnable Kaggle project",
            ],
            link: "https://www.kaggle.com/code/rahulapjs/multi-agent-medical-intake-soap-note-generator",
        },
        {
            title: "Readme Creator",
            subtitle: "AI-Powered README Generator",
            tech: ["React", "Redux", "Gemini", "Material-UI"],
            description: [
                "Web app for creating structured, professional README files",
                "Pre-designed templates with live markdown preview",
                "Gemini-powered content optimization using API key",
                "Add, edit, and reorder README sections with real-time updates",
            ],
            github: "https://github.com/rahulapjs/readmeGenerator",
        },
        {
            title: "Gemini PDF Analyzer",
            subtitle: "Streamlit + GenAI Resume Parsing Tool",
            tech: ["Streamlit", "Python", "Gemini 1.5 Flash/Pro"],
            description: [
                "Extracts resume text using PyPDF2",
                "Parses resume into detailed structured JSON",
                "Generates professional first-person summary with Gemini",
                "Supports multiple model selection (Flash / Pro)",
                "Clean UI with real-time feedback",
            ],
            github: "https://github.com/rahulapjs/ResumeParserAI",
        },
        {
            title: "EasyDiagno",
            subtitle: "AI-Powered Symptom Checker",
            tech: ["Flutter", "Firebase", "Python", "ML"],
            description: [
                "AI-powered symptom checker with chatbot interface",
                "Hospital locator with specialization filters",
                "User & hospital authentication using Firebase",
                "Admin module for managing hospitals and approvals",
                "ML-based diagnosis model integrated via Python API",
            ],
            github: "https://github.com/rahulapjs/EasyDiagno",
        },
        {
            title: "Streamify",
            subtitle: "Full Stack Chat App",
            tech: ["React", "Express", "WebRTC"],
            description: [
                "Real-time messaging + video chat",
                "100+ concurrent users",
                "Stream API integration",
                "Screen sharing + image sharing",
            ],
            github: "https://github.com/rahulapjs/streamify",
        },
    ],
    skills: {
        frontend: ["React","Angular","TypeScript","JavaScript (ES6+)","SCSS","HTML5","CSS3"],
        backend: ["Node.js","Express","FastAPI","Python","PostgreSQL","MongoDB","REST APIs"],
        state: ["NgRx","RxJS","Redux Toolkit"],
        ai: ["OpenAI","Gemini","Google ADK","LangChain","Whisper","LLM Prompt Engineering"],
        tools: ["Docker","Temporal","Git","Cypress","Postman","PyPDF2","BeautifulSoup"],
        realtime: ["WebSockets","WebRTC","Twilio"],
        design: ["Figma","UI/UX"]
    }

};
