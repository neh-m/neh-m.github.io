/* =============================================================
   content/projects.js  —  the Selected Projects section

   Shape: { heading, subtitle (optional), items: [...], link (optional) }
   A project item renders as: the hackathon on the LEFT, details on the RIGHT.
   The left column shows three lines: aside (hackathon) · note+award · location.
     {
       aside:    "HackPrinceton '26",   // the hackathon (left column)
       note:     "Science & Discovery", // track / context
       award:    "Winner",              // highlighted; optional
       location: "Princeton University",// where it took place
       title:    "Project name",
       desc:     "A short line on what it does.",
       url:      "https://..."           // link to the repo (optional)
     }
   `link` is the "see everything" link shown under the list.
   ============================================================= */

window.CONTENT = window.CONTENT || {};

window.CONTENT.projects = {
  items: [
    {
      aside:    "HackPrinceton '26",
      note:     "Science & Discovery · MLH",
      award:    "Winner",
      location: "Princeton University",
      title:    "Model Safety Investigation Tool",
      desc:     "An open-source interpretability tool for AI Safety, and an MCP server with interactive 3D viz of a model's architecture for probing safety risks like sycophancy, jailbreaks, and backdoors, on your client's hardware.",
      url:      "https://github.com/Lewy09-Tm25/hack-princeton"
    },
    {
      aside:    "Emotional AI Hackathon",
      note:     "ElevenLabs · AITinkerers",
      award:    "Winner",
      location: "New York City",
      title:    "Maya — Crisis Pre-Triage Voice Agent",
      desc:     "A browser voice agent that triages crisis-line calls in real time into urgency levels (L0–L4) and hands counselors a live workspace. Built on ElevenLabs Conversational AI and OpenAI.",
      url:      "https://github.com/Lewy09-Tm25/emotional_ai_hack"
    },
    {
      aside:    "Personal Project",
      title:    "Agentic Language Tutor",
      desc:     "A language-learning app where multiple AI agents generate topic lessons, grade pronunciation with speech recognition, simplify news articles to your level, and quiz vocabulary. Built with OpenAI, ElevenLabs, and React.",
      url:      "https://github.com/Lewy09-Tm25/Agentic-Language-Tutor"
    },
    {
      aside:    "Agents in Finance",
      note:     "Plaid · AITinkerers",
      award:    "Winner",
      location: "New York City",
      title:    "Budget Copilot",
      desc:     "A personal-finance assistant that links bank accounts via Plaid, auto-categorizes transactions, and answers spending questions through a Claude-powered chat.",
      url:      "https://github.com/charlesinwald/budget-copilot"
    }
  ],
  link: {
    text: "See more on GitHub",
    url:  "https://github.com/Lewy09-Tm25"
  }
};
