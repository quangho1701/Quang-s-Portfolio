import finbudLogo from '../assets/finbud-logo.png';
import careerFoundationLogo from '../assets/career-foundation-logo.png';

export const skillsData = [
  {
    id: "01",
    title: "Content Systems",
    description: "Content production tied to storytelling, editorial, or distribution.",
    rolesCount: 4
  },
  {
    id: "02",
    title: "AI Tooling",
    description: "Explicit work involving AI products, prompts, or agentic systems.",
    rolesCount: 2
  },
  {
    id: "03",
    title: "Growth Strategy",
    description: "Acquisition, retention, scaling, or growth-focused ownership.",
    rolesCount: 2
  },
  {
    id: "04",
    title: "Partnerships",
    description: "Influencer, creator, or ecosystem collaboration programs.",
    rolesCount: 2
  },
  {
    id: "05",
    title: "Automation",
    description: "Operational systems, repeatable workflows, or process automation.",
    rolesCount: 1
  },
  {
    id: "06",
    title: "Technical Writing",
    description: "Clear documentation, knowledge transfer, and instructional writing.",
    rolesCount: 1
  }
];

export const experiencesData = [
  {
    id: "finbud-ai",
    company: "FinBud AI",
    role: "Software Engineer Intern",
    dateRange: "AUGUST 2025 - PRESENT",
    location: "Chicago, IL",
    logoText: "FB",
    logoImage: finbudLogo,
    isCurrent: true,
    description: [
      "- Database & Infrastructure Management: Integrated SQLAlchemy connection pooling on AWS EC2/Docker infrastructure to improve data throughput and reduce query latency by 30%.",
      "- Backend & API Development: Maintained scalable RESTful APIs using FastAPI to manage data flow between the client and PostgreSQL/ChromaDB databases, which improves query accuracy by 15%.",
      "- AI Chatbot Development: Engineered an intelligent financial chatbot using a RAG pipeline with LangChain, OpenAI API, and ChromaDB to process real-time financial data for 500+ active users."
    ]
  },
  {
    id: "career-foundation-hub",
    company: "Career Foundation Hub",
    role: "Software Engineer Intern",
    dateRange: "MARCH 2024 - JULY 2024",
    location: "Virginia",
    logoText: "CF",
    logoImage: careerFoundationLogo,
    isCurrent: false,
    description: [
      "- Full-Stack Development: Developed a full-stack Mentorship-as-a-Service platform using Next.js (frontend) and Node.js (backend) to serve 100+ early-career professionals in FinTech.",
      "- CI/CD & Unit Testing: Implemented a CI/CD pipeline with GitHub Actions and wrote comprehensive unit tests (PyTest) for 10+ backend services, reducing production bugs by 35%.",
      "- AI Agent Automation: Built an AI Agent system using Python and LangChain to automate job data crawling and JD analysis, increasing matching efficiency for users by 40%."
    ]
  }
];
