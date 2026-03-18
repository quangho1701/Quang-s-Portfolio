import finbudLogo from '../assets/finbud-logo.png';
import careerFoundationLogo from '../assets/career-foundation-logo.png';
import stanfordLogo from '../assets/stanford-logo.png';

export const skillsData = [
  {
    id: "01",
    title: "Algorithmic Thinking",
    description: "Using mathematical logic and data structures to solve complex problems with high efficiency.",
    appliedIn: "6+ Years of Competitive Programming"
  },
  {
    id: "02",
    title: "Building with AI",
    description: "Developing real-world applications using LLMs, RAG pipelines, and AI agents to solve user needs.",
    appliedIn: "Meet AI & Personal Projects"
  },
  {
    id: "03",
    title: "Technical Communication",
    description: "Breaking down complex technical concepts—like Python or Mathematics—into clear, simple ideas for everyone.",
    appliedIn: "Stanford \"Code in Place\" & Khan Academy"
  },
  {
    id: "04",
    title: "Mathematical Logic",
    description: "Applying a strong math foundation to optimize system logic and ensure code precision and reliability.",
    appliedIn: "Math Major & Research Interests"
  },
  {
    id: "05",
    title: "Minimalist Design (UI/UX)",
    description: "Designing clean, intuitive user interfaces in Figma with a focus on smooth and refined experiences.",
    appliedIn: "Portfolio Website & Prototyping"
  },
  {
    id: "06",
    title: "Web Development",
    description: "Building modern, responsive web applications using React and industry-standard programming languages.",
    appliedIn: "4+ Projects & Hackathons"
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
  },
  {
    id: "stanford-university",
    company: "Stanford University",
    role: "Section Leader - Code in Place 2025",
    dateRange: "APRIL 2025 - JUNE 2025",
    location: "Palo Alto, CA",
    logoText: "SU",
    logoImage: stanfordLogo,
    isCurrent: false,
    description: [
      "- Global Leadership: Selected from 10,000+ applicants to lead a global cohort of 14 students from 10 different countries through Stanford’s introductory Python curriculum.",
      "- Technical Instruction: Hosted live lectures covering algorithmic thinking, Python fundamentals (variables, control flow), graphics, and data structures (lists, file I/O).",
      "- Student Mentorship: Provided proactive support by authoring informational posts and resolving student questions, enabling the top performer to achieve a 100% completion rate."
    ]
  },
  {
    id: "khan-academy",
    company: "Khan Academy Vietnam Program",
    role: "Ambassador & Tutor — SAT Open Class",
    dateRange: "DECEMBER 2023 - JUNE 2024",
    location: "",
    logoText: "KA",
    logoImage: "https://cdn.mos.cms.futurecdn.net/a2qBNb4nfQMagf32HtbRG8.jpg",
    isCurrent: false,
    description: [
      "- AI-Powered Tutoring: Optimized an educational AI chatbot via precise prompt engineering and manual RAG techniques to deliver personalized mentoring for 100+ students and yielding two 1450+ top scores.",
      "- Community Management: Administered an active SAT study group of 2,500+ students nationwide; shared critical test strategies and organized impactful sessions to improve overall member performance.",
      "- Intensive Tutoring: Led revision sessions for 100+ students focusing on the SAT ”Information and Ideas” section, successfully mentoring students to achieve high scores, including two 1450+ results."
    ]
  }
];
