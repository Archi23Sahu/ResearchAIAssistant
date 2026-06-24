import os
from groq import Groq
from tavily import TavilyClient

GROQ_API_KEY   = os.environ.get("GROQ_API_KEY", "")
TAVILY_API_KEY = os.environ.get("TAVILY_API_KEY", "")

groq_client   = Groq(api_key=GROQ_API_KEY)
tavily_client = TavilyClient(api_key=TAVILY_API_KEY)

def run_research_agent(topic: str) -> str:
    # ── Step 1: Search the web with Tavily ──────────────────────────────────
    print(f"[Agent] Searching for: {topic}")
    search_results = tavily_client.search(
        query=topic,
        search_depth="advanced",
        max_results=5,
        include_answer=True,
    )

    # Format sources for the LLM
    sources_text = ""
    sources_list = []
    for i, result in enumerate(search_results.get("results", []), 1):
        title   = result.get("title", "")
        url     = result.get("url", "")
        content = result.get("content", "")
        sources_text += f"\n### Source {i}: {title}\nURL: {url}\n{content}\n"
        sources_list.append(f"{i}. [{title}]({url})")

    tavily_answer = search_results.get("answer", "")

    # ── Step 2: Write report with Groq ──────────────────────────────────────
    print("[Agent] Writing report with Groq...")
    prompt = f"""You are an expert research writer. Based on the following web search results, write a comprehensive, well-structured research report on the topic: "{topic}"

SEARCH RESULTS:
{sources_text}

QUICK ANSWER FROM SEARCH:
{tavily_answer}

Write the report in this EXACT markdown format:

# {topic}

## Overview
[Write 2-3 paragraphs introducing the topic based on the sources]

## Key Findings
[Write 5-6 bullet points with the most important facts from the sources]

## Detailed Analysis
[Write 3-4 paragraphs going deeper into the topic]

## Different Perspectives
[Describe any debates, controversies, or different viewpoints found in sources]

## Conclusion
[Write 1-2 paragraphs summarizing key takeaways]

## Sources
{chr(10).join(sources_list)}

Rules:
- Use ONLY information from the provided sources
- Cite sources naturally in the text using [Source N] notation
- Be informative, neutral, and thorough
- Use proper markdown formatting
"""

    response = groq_client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3,
        max_tokens=3000,
    )

    return response.choices[0].message.content
