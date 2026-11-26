/* =============================================================
   content/research.js  —  the Research section (Recent Publications)

   Shape: { heading, subtitle (optional), items: [...], link (optional) }
   A publication item renders as: figure on the LEFT, details on the RIGHT.
     {
       figure: "assets/pub-1.svg",  // image/graph on the left (swap for a real figure)
       title:  "Paper title",
       meta:   "Venue Year",        // where it was published
       desc:   "One line on what it is.",
       url:    "https://..."         // link to the paper
     }
   `link` is the "see everything" link shown under the list.
   ============================================================= */

window.CONTENT = window.CONTENT || {};

window.CONTENT.research = {
  items: [
    {
      figure: "assets/pub-1.svg",
      title:  "Load-Bearing Context: The Question Damage Score for Evaluating Context Reliance in Linguistic Reasoning",
      meta:   "EACL 2027",
      desc:   "A metric — the Question Damage Score — for measuring how much a language model actually relies on the given context when reasoning through a linguistic problem.",
      url:    "https://arxiv.org/abs/2608.27756"
    },
    {
      figure: "assets/pub-2.svg",
      title:  "From Rosetta to Match-Up: A Paired Corpus of Linguistic Puzzles with Human and LLM Benchmarks",
      meta:   "LREC 2026",
      desc:   "A paired corpus of linguistic puzzles with human and LLM benchmarks, probing how models handle Rosetta-stone-style reasoning.",
      url:    "https://doi.org/10.63317/3yq3khhygtya"
    },
    {
      figure: "assets/pub-3.svg",
      title:  "Can LLMs Generate and Solve Linguistic Olympiad Puzzles?",
      meta:   "EMNLP 2025",
      desc:   "A study of whether large language models can both generate and solve Linguistic Olympiad puzzles, and what that reveals about their reasoning.",
      url:    "https://aclanthology.org/2025.emnlp-main.969/"
    },
    {
      figure: "assets/pub-4.svg",
      title:  "Handling Uncertainty in Health Data using Generative Algorithms",
      meta:   "GenAI for Health Workshop, AAAI 2025",
      desc:   "Generative approaches to modeling and handling uncertainty in health data.",
      url:    "https://openreview.net/forum?id=X5EMRXRPe6"
    }
  ],
  link: {
    text: "See all publications on Google Scholar",
    url:  "https://scholar.google.com/citations?user=Eko2UdoAAAAJ&hl=en"
  }
};
