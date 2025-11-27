export const resumeData = {
    name: "Rahul AP",
    location: "Kerala, India",
    hero: {
        navName1: "Rahul",
        navName2: "Ap",
        role1: "Full-Stack Developer",
        role2: "Generative AI Engineer",
        exp: "2",
        bio: "Engineering next-gen interfaces and intelligent systems with full-stack architecture and GenAI. Based in Kerala, India.",
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
                "A multi-agent medical automation system that transforms patient–provider conversations into structured, clinically accurate SOAP notes.",
                "Extracts medical entities, performs evidence validation using Google Search Tool, and enforces safety constraints through agent-level reasoning.",
                "Built with Gemini 2.5 Flash Lite, Python, and Google ADK to ensure fact-checked and guideline-aligned outputs.",
                "Includes a fully runnable Kaggle notebook demonstrating end-to-end workflow automation for healthcare documentation.",
            ],
            link: "https://www.kaggle.com/code/rahulapjs/multi-agent-medical-intake-soap-note-generator",
        },
        {
            title: "Readme Creator",
            subtitle: "AI-Powered README Generator",
            tech: ["React", "Redux", "Gemini", "Material-UI"],
            description: [
                "An interactive web app that generates clean, professional README files using customizable templates and live markdown preview.",
                "Features section-based editing, reordering, autosave, and a responsive Material-UI interface.",
                "Gemini API integration enables automatic content improvement, keyword insertion, and readability enhancement.",
                "Built with React + Redux Toolkit for predictable state management and a smooth editing workflow.",
            ],
            github: "https://github.com/rahulapjs/readmeGenerator",
        },
        {
            title: "Gemini PDF Analyzer",
            subtitle: "Streamlit + GenAI Resume Parsing Tool",
            tech: ["Streamlit", "Python", "Gemini 1.5 Flash/Pro"],
            description: [
                "AI-driven resume parsing tool that extracts unstructured PDF text and converts it into structured, machine-readable JSON.",
                "Generates polished first-person professional summaries using Gemini Flash/Pro models.",
                "Built with Streamlit for a clean, fast UI and PyPDF2 for precise text extraction.",
                "Includes real-time feedback, model switching, and multi-format export for recruiters and job seekers.",
            ],
            github: "https://github.com/rahulapjs/ResumeParserAI",
        },
        {
            title: "EasyDiagno",
            subtitle: "AI-Powered Symptom Checker",
            tech: ["Flutter", "Firebase", "Python", "ML"],
            description: [
                "Cross-platform medical assistant app that predicts possible conditions based on user symptoms using machine learning.",
                "Includes Firebase authentication, a hospital locator with specialization filters, and admin dashboards for hospital approvals.",
                "Conversational chatbot interface powered by Python APIs for diagnosis logic.",
                "Optimized for mobile with Flutter, following clean UI/UX medical design patterns.",
            ],
            github: "https://github.com/rahulapjs/EasyDiagno",
        },
        {
            title: "Streamify",
            subtitle: "Full Stack Chat App",
            tech: ["React", "Express", "WebRTC"],
            description: [
                "Real-time chat + video calling application built with WebRTC, WebSockets, and Express.",
                "Supports screen sharing, image sharing, typing indicators, and online presence tracking.",
                "Frontend optimized for low-latency calls and tested with 100+ concurrent users.",
                "Showcases full-stack architecture and peer-to-peer communication fundamentals.",
            ],
            github: "https://github.com/rahulapjs/streamify",
        },
    ],

    skills: {
        frontend: ["React", "Angular", "TypeScript", "JavaScript (ES6+)", "SCSS", "HTML5", "CSS3"],
        backend: ["Node.js", "Express", "FastAPI", "Python", "PostgreSQL", "MongoDB", "REST APIs"],
        state: ["NgRx", "RxJS", "Redux Toolkit"],
        ai: ["OpenAI", "Gemini", "Google ADK", "LangChain", "Whisper", "LLM Prompt Engineering"],
        tools: ["Docker", "Temporal", "Git", "Cypress", "Postman", "PyPDF2", "BeautifulSoup"],
        realtime: ["WebSockets", "WebRTC", "Twilio"],
        design: ["Figma", "UI/UX"]
    }

};

export const seo = {
    home: {
        title: "Rahul A P | Full-Stack Developer & Generative AI Engineer",
        description:
            "Full-Stack Developer and GenAI Engineer from Kerala, India. Building intelligent, scalable applications using Angular, React, Node.js, Python, FastAPI, and AI technologies."
    },
    journey: {
        title: "Career Journey | Rahul A P — Full-Stack Developer & GenAI Engineer",
        description:
            "Explore the journey of Rahul A P — from academics to engineering AI-driven healthcare platforms, automation systems, and full-stack applications."
    },
    skills: {
        title: "Skills & Tech Stack | Rahul A P — Full-Stack & GenAI Developer",
        description:
            "Technical skills of Rahul A P: Angular, React, TypeScript, Node.js, Python, FastAPI, MongoDB, NgRx, WebSockets, and GenAI tools like OpenAI and Gemini."
    },
    projects: {
        title: "Projects | Rahul A P — AI, Full-Stack & Automation Engineering",
        description:
            "Explore AI agents, full-stack apps, automation tools, chat applications, resume analyzers, and more by Full-Stack Developer & GenAI Engineer Rahul A P."
    },
    contact: {
        title: "Contact | Rahul A P — Full-Stack Developer & GenAI Engineer",
        description:
            "Get in touch with Full-Stack Developer and GenAI Engineer Rahul A P for collaborations, freelance work, or engineering opportunities."
    }
};
