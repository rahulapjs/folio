// src/data/kb.ts
import { resumeData } from "../data/resume";

function join(arr?: string[]) {
    return arr?.join(". ") || "";
}

export const KNOWLEDGE_BASE = [
    // ---------------- HERO ----------------
    {
        id: "hero",
        title: "Hero Summary",
        text: `${resumeData.name} — ${resumeData.hero.role1} & ${resumeData.hero.role2}. ${resumeData.hero.bio}`
    },

    // ---------------- CONTACT ----------------
    {
        id: "contact",
        title: "Contact Information",
        text: `Email: ${resumeData.contact.email}. Location: ${resumeData.location}. LinkedIn: ${resumeData.contact.linkedin}. GitHub: ${resumeData.contact.github}.`
    },

    // ---------------- EDUCATION ----------------
    {
        id: "education",
        title: "Education",
        text: resumeData.education
            .map(e => `${e.degree} from ${e.institution} (${e.year})`)
            .join(". ")
    },

    // ---------------- EXPERIENCE ----------------
    ...resumeData.experience.map((ex, i) => ({
        id: `exp_${i}`,
        title: `${ex.role} @ ${ex.company}`,
        text: `${ex.role} at ${ex.company} (${ex.year}). ${join(ex.description)}`
    })),

    // ---------------- PROJECTS ----------------
    ...resumeData.projects.map((prj, i) => ({
        id: `project_${i}`,
        title: prj.title,
        text: `${prj.title} — ${prj.subtitle}. Tech used: ${prj.tech.join(", ")}. ${join(prj.description)}`
    })),

    // ---------------- SKILLS ----------------
    {
        id: "skills",
        title: "Technical Skills",
        text: [
            `Frontend: ${resumeData.skills.frontend.join(", ")}`,
            `Backend: ${resumeData.skills.backend.join(", ")}`,
            `AI: ${resumeData.skills.ai.join(", ")}`,
            `State Mgmt: ${resumeData.skills.state.join(", ")}`,
            `Realtime: ${resumeData.skills.realtime.join(", ")}`,
            `Tools: ${resumeData.skills.tools.join(", ")}`,
            `Design: ${resumeData.skills.design.join(", ")}`
        ].join(" • ")
    }
];
