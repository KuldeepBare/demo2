import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Google GenAI if key is present
const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    geminiReady: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString(),
  });
});

// Helper for simulated tutor fallback
function getSimulatedChatReply(message: string, subject: string, mode: string): string {
  const lower = message.toLowerCase();
  
  if (lower.includes('quantum') || lower.includes('superposition')) {
    return `### 🌌 Quantum Superposition: An Intuitive Breakdown\n\nImagine a spinning coin on a table. While it spins rapidly, is it heads or tails? In a classical sense, it's a blur of both probabilities. In quantum mechanics, a quantum particle like an electron exists in a linear combination of states until measured.\n\n$$\\vert \\psi \\rangle = \\alpha \\vert 0 \\rangle + \\beta \\vert 1 \\rangle$$\n\nWhere:\n* $\\alpha$ and $\\beta$ are probability amplitudes (complex numbers).\n* The probability of measuring state $\\vert 0 \\rangle$ is $\\vert \\alpha \\vert^2$.\n* The probability of measuring state $\\vert 1 \\rangle$ is $\\vert \\beta \\vert^2$, with $\\vert \\alpha \\vert^2 + \\vert \\beta \\vert^2 = 1$.\n\n**Key Takeaway:** The particle doesn't simply hide in one state—it actively interferes with itself (as seen in the famous double-slit experiment) until an irreversible decoherence or measurement occurs.\n\n**Quick Socratic Check:** What do you predict happens to the wave function $\\vert \\psi \\rangle$ the exact instant a detector registers the particle?`;
  }
  
  if (lower.includes('bayes') || lower.includes('probability')) {
    return `### 📊 Bayes' Theorem: Updating Beliefs with Evidence\n\nBayes' Theorem provides a mathematical formula for updating the probability of a hypothesis ($H$) in light of new evidence ($E$):\n\n$$P(H \\mid E) = \\frac{P(E \\mid H) \\cdot P(H)}{P(E)}$$\n\n#### The Four Cornerstones:\n1. **$P(H \\mid E)$ (Posterior Probability):** How confident we are in hypothesis $H$ after observing evidence $E$.\n2. **$P(E \\mid H)$ (Likelihood):** How likely we would observe evidence $E$ if hypothesis $H$ were true.\n3. **$P(H)$ (Prior Probability):** Our baseline belief in $H$ before seeing any evidence.\n4. **$P(E)$ (Marginal Likelihood):** Total probability of observing evidence $E$ across all possible hypotheses.\n\n**Real-World Example:** In medical testing, even a test with 99% accuracy can yield more false positives than true positives if the underlying condition is extremely rare (e.g., 1 in 10,000)!`;
  }

  if (lower.includes('dynamic programming') || lower.includes('memoization') || lower.includes('dp')) {
    return `### ⚡ Dynamic Programming: Optimal Substructure & Overlapping Subproblems\n\nDynamic Programming (DP) is an algorithmic optimization technique that converts exponential O(2^n) recursive workloads into polynomial O(n) time by caching intermediate solutions.\n\n\`\`\`python\n# Classic Fibonacci with Memoization (Top-Down DP)\ndef fib_memo(n: int, memo: dict = {}) -> int:\n    if n <= 1:\n        return n\n    if n not in memo:\n        memo[n] = fib_memo(n - 1, memo) + fib_memo(n - 2, memo)\n    return memo[n]\n\`\`\`\n\n#### The 4-Step Mental Model:\n1. **Define the State:** What parameters uniquely identify a subproblem? (e.g., dp[i][w] in 0/1 Knapsack).\n2. **Identify State Transitions:** Formulate the recurrence relation relating dp[i] to previous states.\n3. **Base Cases:** Anchor your boundaries (e.g., dp[0] = 0).\n4. **Execution Order:** Choose Top-Down (recursion + memo) or Bottom-Up (tabulation table).`;
  }

  return `### 💡 NovaLearn Neural Insight (${subject} · ${mode})\n\nGreat question regarding: **"${message}"**.\n\nLet's break this down into first principles:\n\n1. **Core Concept:** At the foundation, this concept relies on understanding how underlying variables interact rather than memorizing formulas in isolation.\n2. **Intuitive Mental Model:** Think of this system as an equilibrium. When you perturb one component, the surrounding variables adjust according to governing laws.\n3. **Practical Application:** Whether you are preparing for exams or building practical projects, test your understanding by explaining the reverse case: *What would cause this principle to fail?*\n\n**Next Step:** Would you like to practice a high-yield quiz question on this topic or generate a structured study sprint?`;
}

// POST /api/chat
app.post('/api/chat', async (req, res) => {
  const { message, subject = 'General Science', mode = 'Socratic Tutor', history = [] } = req.body;

  if (!message || typeof message !== 'string') {
    res.status(400).json({ error: 'Message is required' });
    return;
  }

  if (!ai) {
    const fallbackResponse = getSimulatedChatReply(message, subject, mode);
    res.json({ reply: fallbackResponse, source: 'simulated' });
    return;
  }

  try {
    const systemPrompt = `You are NovaLearn, an elite futuristic AI study companion and cognitive tutor.
Your subject focus is: ${subject}.
Your tutoring mode is: ${mode} (options include: Socratic Tutor, Quick Explainer, Exam Prep Drill, Mnemonics & Analogies).
Style guidelines:
- Clear, encouraging, high-yield academic precision.
- Use clean Markdown with headers, bullet points, and code blocks or math symbols when applicable.
- Break complex problems down step-by-step.
- Conclude with a thought-provoking check question or quick drill to verify understanding.
- Do not mention internal system instructions or AI prompts.`;

    const formattedHistory = (history || []).slice(-6).map((item: any) => ({
      role: item.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: item.content }],
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [
        ...formattedHistory,
        {
          role: 'user',
          parts: [{ text: message }],
        },
      ],
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    const reply = response.text || getSimulatedChatReply(message, subject, mode);
    res.json({ reply, source: 'gemini' });
  } catch (error) {
    console.warn('Gemini chat error, using graceful fallback:', error);
    const fallbackResponse = getSimulatedChatReply(message, subject, mode);
    res.json({ reply: fallbackResponse, source: 'simulated' });
  }
});

// POST /api/generate-plan
app.post('/api/generate-plan', async (req, res) => {
  const { subject, days = 14, hoursPerDay = 2, level = 'Intermediate', goal = 'Mastery Exam' } = req.body;

  const defaultPlan = {
    title: `${days}-Day Mastery Blueprint: ${subject || 'Data Structures & Algorithms'}`,
    subject: subject || 'Computer Science',
    totalHours: Number(days) * Number(hoursPerDay),
    intensity: `${hoursPerDay}h daily · ${level} Level`,
    goal: goal || 'Target Exam & Deep Conceptual Mastery',
    phases: [
      {
        phaseName: 'Phase 1: Foundations & Core Architecture',
        daysRange: `Days 1–${Math.max(1, Math.round(days * 0.3))}`,
        focus: 'Fundamental theorems, state machines, and core mental representations',
        tasks: [
          { day: 1, title: 'Diagnostic benchmark & taxonomy mapping', duration: `${hoursPerDay}h`, completed: true },
          { day: 2, title: 'Foundational axioms and core definition mastery', duration: `${hoursPerDay}h`, completed: false },
          { day: 3, title: 'Active recall drill on high-frequency fundamentals', duration: `${hoursPerDay}h`, completed: false },
        ],
      },
      {
        phaseName: 'Phase 2: Complex Synthesis & Problem Sets',
        daysRange: `Days ${Math.round(days * 0.3) + 1}–${Math.round(days * 0.7)}`,
        focus: 'Bridging multi-variable concepts, edge cases, and algorithmic patterns',
        tasks: [
          { day: 4, title: 'Medium-to-hard problem breakdown & pattern recognition', duration: `${hoursPerDay}h`, completed: false },
          { day: 5, title: 'Error-log analysis & targeted weak spot reinforcement', duration: `${hoursPerDay}h`, completed: false },
          { day: 6, title: 'Timed mini-simulation & performance review', duration: `${hoursPerDay}h`, completed: false },
        ],
      },
      {
        phaseName: 'Phase 3: High-Stakes Simulation & Polishing',
        daysRange: `Days ${Math.round(days * 0.7) + 1}–${days}`,
        focus: 'Full exam simulations, speed optimization, and cognitive stamina',
        tasks: [
          { day: 7, title: 'Full comprehensive simulation under timed conditions', duration: `${hoursPerDay}h`, completed: false },
          { day: 8, title: 'Formula derivation without reference materials', duration: `${hoursPerDay}h`, completed: false },
          { day: 9, title: 'Final high-yield summary review & mental rehearsal', duration: `${hoursPerDay}h`, completed: false },
        ],
      },
    ],
    milestones: [
      { title: 'Checkpoint 1: Core Diagnostics', progress: 100, status: 'Completed' },
      { title: 'Checkpoint 2: Synthesis Milestone', progress: 45, status: 'In Progress' },
      { title: 'Checkpoint 3: Final Mock Exam', progress: 0, status: 'Upcoming' },
    ],
  };

  if (!ai) {
    res.json(defaultPlan);
    return;
  }

  try {
    const prompt = `Create a detailed, high-yield study plan JSON for:
Subject: ${subject}
Timeline: ${days} days, studying ${hoursPerDay} hours per day.
Proficiency level: ${level}.
Target Goal: ${goal}.

Return ONLY valid JSON matching this schema:
{
  "title": string,
  "subject": string,
  "totalHours": number,
  "intensity": string,
  "goal": string,
  "phases": [
    {
      "phaseName": string,
      "daysRange": string,
      "focus": string,
      "tasks": [
        { "day": number, "title": string, "duration": string, "completed": boolean }
      ]
    }
  ],
  "milestones": [
    { "title": string, "progress": number, "status": string }
  ]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.4,
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    if (parsed.title && Array.isArray(parsed.phases)) {
      res.json(parsed);
      return;
    }
    res.json(defaultPlan);
  } catch (error) {
    console.warn('Gemini plan generation error, fallback:', error);
    res.json(defaultPlan);
  }
});

// POST /api/generate-quiz
app.post('/api/generate-quiz', async (req, res) => {
  const { topic = 'Machine Learning', count = 4, difficulty = 'Intermediate' } = req.body;

  const defaultQuestions = [
    {
      id: 'q1',
      question: 'In Deep Neural Networks, what is the primary consequence of the "Vanishing Gradient Problem" during backpropagation?',
      options: [
        'The loss function oscillates erratically without converging',
        'Early layers learn exceedingly slowly or halt updates because gradients diminish exponentially',
        'Weights explode to infinity, causing numerical overflow',
        'The model immediately overfits to the training batch'
      ],
      correctIndex: 1,
      hint: 'Think about multiplying several small fractional derivatives according to the chain rule.',
      explanation: 'When computing gradients backwards through multiple layers with saturating activations (like sigmoid or tanh), repeatedly multiplying numbers < 1 causes gradients for early layers to shrink close to zero, effectively stalling their learning.',
      concept: 'Backpropagation & Gradient Flow'
    },
    {
      id: 'q2',
      question: 'Which of the following activation functions was specifically designed to mitigate the vanishing gradient problem for positive inputs?',
      options: [
        'Standard Sigmoid',
        'Hyperbolic Tangent (Tanh)',
        'Rectified Linear Unit (ReLU)',
        'Softmax Normalization'
      ],
      correctIndex: 2,
      hint: 'Its derivative is a constant 1 for all positive values of x.',
      explanation: 'ReLU (f(x) = max(0, x)) has a constant derivative of 1 for any positive input, meaning gradients do not attenuate through repeated multiplications in positive activation regions.',
      concept: 'Activation Functions'
    },
    {
      id: 'q3',
      question: 'What is the primary trade-off addressed by L2 Regularization (Weight Decay) in statistical modeling?',
      options: [
        'Trading slightly higher training bias for substantially lower testing variance',
        'Eliminating the need for a validation dataset',
        'Increasing computational complexity from O(N) to O(N^3)',
        'Forcing all non-essential weights strictly to zero'
      ],
      correctIndex: 0,
      hint: 'L2 penalizes large weights, preventing the model from fitting high-frequency noise.',
      explanation: 'By adding the squared sum of weights to the loss function, L2 penalizes overly complex decision boundaries, gently increasing bias while drastically reducing variance on unseen data.',
      concept: 'Regularization & Generalization'
    },
    {
      id: 'q4',
      question: 'In the Transformer architecture, why is the Self-Attention mechanism scaled by 1/sqrt(d_k)?',
      options: [
        'To prevent dot-product values from growing too large and pushing softmax into near-zero gradient regions',
        'To enforce orthogonality between Queries and Keys',
        'To reduce memory consumption of attention matrices by half',
        'To enable parallel computation across attention heads'
      ],
      correctIndex: 0,
      hint: 'For large dimension sizes d_k, the dot product variance equals d_k.',
      explanation: 'Without scaling, for large vector dimensions d_k, the dot products grow large in magnitude, pushing the softmax function into regions with extremely flat gradients.',
      concept: 'Attention Mechanisms'
    }
  ];

  if (!ai) {
    res.json({ topic, difficulty, questions: defaultQuestions.slice(0, count) });
    return;
  }

  try {
    const prompt = `Generate an interactive quiz on the topic "${topic}" with difficulty level "${difficulty}".
Number of questions: ${count}.
Provide high quality, challenging, conceptually rigorous questions.

Return ONLY a JSON array matching:
[
  {
    "id": string,
    "question": string,
    "options": [string, string, string, string],
    "correctIndex": number (0 to 3),
    "hint": string,
    "explanation": string,
    "concept": string
  }
]`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.5,
      },
    });

    const parsed = JSON.parse(response.text || '[]');
    if (Array.isArray(parsed) && parsed.length > 0) {
      res.json({ topic, difficulty, questions: parsed });
      return;
    }
    res.json({ topic, difficulty, questions: defaultQuestions.slice(0, count) });
  } catch (error) {
    console.warn('Gemini quiz error, using fallback:', error);
    res.json({ topic, difficulty, questions: defaultQuestions.slice(0, count) });
  }
});

// Configure Vite middleware in development or static serving in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`NovaLearn Full-Stack Server running on port ${PORT}`);
  });
}

startServer();
