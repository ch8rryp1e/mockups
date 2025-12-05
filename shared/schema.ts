import { z } from "zod";

// Question types
export interface Question {
  id: number;
  text: string;
  passage?: string;
  options: {
    id: string;
    text: string;
  }[];
  correctAnswer: string;
}

export interface QuestionStatus {
  id: number;
  answered: boolean;
  markedForReview: boolean;
  selectedAnswer?: string;
}

// Test session types
export interface TestSession {
  id: string;
  startCode: string;
  currentQuestion: number;
  questions: Question[];
  questionStatuses: QuestionStatus[];
  startedAt: Date;
  isOnBreak: boolean;
  breakEndTime?: Date;
  completed: boolean;
}

// Start code validation
export const startCodeSchema = z.object({
  code: z.string().length(6).regex(/^\d+$/, "Code must contain only numbers"),
});

export type StartCodeInput = z.infer<typeof startCodeSchema>;

// API response types
export interface StartCodeResponse {
  success: boolean;
  message: string;
  sessionId?: string;
}

// Sample questions for the test (Reading and Writing section)
export const sampleQuestions: Question[] = [
  {
    id: 1,
    passage: "Although critics believed that customers would never agree to pay to pick their own produce on farms, such concerns didn't _____ Booker T. Whatley's efforts to promote the practice. Thanks in part to Whatley's determined advocacy, farms that allow visitors to pick their own apples, pumpkins, and other produce can be found throughout the United States.",
    text: "Which choice completes the text with the most logical and precise word or phrase?",
    options: [
      { id: "A", text: "enhance" },
      { id: "B", text: "hinder" },
      { id: "C", text: "misrepresent" },
      { id: "D", text: "aggravate" },
    ],
    correctAnswer: "B",
  },
  {
    id: 2,
    passage: "The quantum computer's processing power grows exponentially with each additional qubit, making it potentially capable of solving problems that would take classical computers millions of years to complete.",
    text: "Which choice best describes the main advantage of quantum computers mentioned in the text?",
    options: [
      { id: "A", text: "They use less energy than classical computers" },
      { id: "B", text: "They can solve problems much faster than classical computers" },
      { id: "C", text: "They are smaller and more portable" },
      { id: "D", text: "They are easier to program" },
    ],
    correctAnswer: "B",
  },
  {
    id: 3,
    passage: "Marine biologists studying coral reef ecosystems have discovered that certain species of fish develop unique color patterns that help them blend into their specific microhabitats within the reef.",
    text: "Based on the passage, what is the primary function of the unique color patterns in these fish?",
    options: [
      { id: "A", text: "To attract mates during breeding season" },
      { id: "B", text: "To warn predators of their toxicity" },
      { id: "C", text: "To provide camouflage in their environment" },
      { id: "D", text: "To regulate body temperature" },
    ],
    correctAnswer: "C",
  },
  {
    id: 4,
    passage: "The archaeological evidence suggests that ancient Mesopotamian cities had sophisticated systems of _____ management, with canals and reservoirs designed to distribute water efficiently across agricultural lands.",
    text: "Which choice completes the text with the most logical word?",
    options: [
      { id: "A", text: "waste" },
      { id: "B", text: "water" },
      { id: "C", text: "population" },
      { id: "D", text: "trade" },
    ],
    correctAnswer: "B",
  },
  {
    id: 5,
    passage: "Recent studies indicate that urban green spaces not only improve air quality but also have significant positive effects on residents' mental health and community cohesion.",
    text: "According to the passage, urban green spaces provide benefits in which areas?",
    options: [
      { id: "A", text: "Transportation and commerce" },
      { id: "B", text: "Education and employment" },
      { id: "C", text: "Environmental quality and social well-being" },
      { id: "D", text: "Housing costs and property values" },
    ],
    correctAnswer: "C",
  },
  {
    id: 6,
    passage: "The author argues that modern technology, while increasing productivity, has paradoxically led to a decrease in leisure time for many workers.",
    text: "Which word best describes the relationship the author identifies between technology and leisure time?",
    options: [
      { id: "A", text: "harmonious" },
      { id: "B", text: "contradictory" },
      { id: "C", text: "indifferent" },
      { id: "D", text: "predictable" },
    ],
    correctAnswer: "B",
  },
  {
    id: 7,
    passage: "Indigenous communities in the Amazon have developed extensive knowledge of medicinal plants over thousands of years, knowledge that modern pharmaceutical companies are now seeking to _____ for drug development.",
    text: "Which choice completes the text with the most appropriate word?",
    options: [
      { id: "A", text: "dismiss" },
      { id: "B", text: "regulate" },
      { id: "C", text: "utilize" },
      { id: "D", text: "undermine" },
    ],
    correctAnswer: "C",
  },
  {
    id: 8,
    passage: "The Renaissance period saw a remarkable flourishing of artistic and scientific achievement, with figures like Leonardo da Vinci excelling in multiple disciplines simultaneously.",
    text: "What does the passage suggest about intellectual achievement during the Renaissance?",
    options: [
      { id: "A", text: "It was limited to the arts" },
      { id: "B", text: "It spanned multiple fields of study" },
      { id: "C", text: "It focused primarily on religious themes" },
      { id: "D", text: "It was confined to Italy" },
    ],
    correctAnswer: "B",
  },
  {
    id: 9,
    passage: "Climate scientists warn that rising global temperatures could lead to more frequent and severe weather events, including hurricanes, droughts, and flooding.",
    text: "According to the passage, what is one potential consequence of rising temperatures?",
    options: [
      { id: "A", text: "Decreased ocean levels" },
      { id: "B", text: "More extreme weather patterns" },
      { id: "C", text: "Expansion of polar ice caps" },
      { id: "D", text: "Reduced atmospheric changes" },
    ],
    correctAnswer: "B",
  },
  {
    id: 10,
    passage: "The economist's analysis revealed that small businesses, despite facing numerous challenges, remain _____ to local economies, providing essential services and employment opportunities.",
    text: "Which choice completes the text with the most logical word?",
    options: [
      { id: "A", text: "detrimental" },
      { id: "B", text: "irrelevant" },
      { id: "C", text: "vital" },
      { id: "D", text: "marginal" },
    ],
    correctAnswer: "C",
  },
  {
    id: 11,
    text: "Which choice most effectively uses data from the graph to complete the example?",
    passage: "Geographer Adebayo Oluwole Eludoyin and his colleagues surveyed small-scale farmers in three locations in Ondo State, Nigeria—which has mountainous terrain in the north, an urbanized center, and coastal terrain in the south—to learn more about their practices, like the types of crops they mainly cultivated. In some regions, female farmers as a percentage of total farmers who mainly cultivated a particular crop varied widely depending on the crop.",
    options: [
      { id: "A", text: "most of the farmers who mainly cultivated cereals and most of the farmers who mainly cultivated non-root vegetables in south Ondo were women." },
      { id: "B", text: "more women in central Ondo mainly cultivated root crops than mainly cultivated cereals." },
      { id: "C", text: "most of the farmers who mainly cultivated non-root vegetables in north and south Ondo were women." },
      { id: "D", text: "a relatively equal proportion of women across the three regions of Ondo mainly cultivated cereals." },
    ],
    correctAnswer: "C",
  },
  {
    id: 12,
    passage: "The theory of plate tectonics explains how the Earth's surface is divided into large plates that move slowly over geological time, causing earthquakes and volcanic activity at their boundaries.",
    text: "What phenomenon does plate tectonics help explain?",
    options: [
      { id: "A", text: "The formation of clouds" },
      { id: "B", text: "Seismic and volcanic activity" },
      { id: "C", text: "Ocean current patterns" },
      { id: "D", text: "Atmospheric pressure changes" },
    ],
    correctAnswer: "B",
  },
  {
    id: 13,
    passage: "Researchers found that students who took handwritten notes during lectures demonstrated better comprehension and retention of material compared to those who typed their notes.",
    text: "What conclusion can be drawn from the research mentioned?",
    options: [
      { id: "A", text: "Typing is faster than handwriting" },
      { id: "B", text: "Handwriting notes may improve learning outcomes" },
      { id: "C", text: "Lectures are less effective than reading" },
      { id: "D", text: "Technology should be banned from classrooms" },
    ],
    correctAnswer: "B",
  },
  {
    id: 14,
    passage: "The novel's protagonist struggles with the _____ between her desire for personal freedom and her sense of duty to her family.",
    text: "Which choice completes the text with the most appropriate word?",
    options: [
      { id: "A", text: "harmony" },
      { id: "B", text: "similarity" },
      { id: "C", text: "tension" },
      { id: "D", text: "agreement" },
    ],
    correctAnswer: "C",
  },
  {
    id: 15,
    passage: "Social media platforms have fundamentally changed how news is consumed, with many users now receiving their primary information through algorithmically curated feeds rather than traditional news sources.",
    text: "What change in news consumption does the passage describe?",
    options: [
      { id: "A", text: "A return to print newspapers" },
      { id: "B", text: "A shift toward algorithm-selected content" },
      { id: "C", text: "Increased trust in journalists" },
      { id: "D", text: "Declining interest in current events" },
    ],
    correctAnswer: "B",
  },
  {
    id: 16,
    passage: "The architect's innovative design incorporated sustainable materials and passive cooling systems to reduce the building's environmental impact.",
    text: "What was the primary goal of the architectural choices mentioned?",
    options: [
      { id: "A", text: "To maximize interior space" },
      { id: "B", text: "To reduce costs" },
      { id: "C", text: "To minimize environmental harm" },
      { id: "D", text: "To create visual appeal" },
    ],
    correctAnswer: "C",
  },
  {
    id: 17,
    passage: "Despite initial skepticism from the scientific community, the researcher's hypothesis was eventually _____ by numerous independent studies that replicated her findings.",
    text: "Which choice completes the text with the most logical word?",
    options: [
      { id: "A", text: "refuted" },
      { id: "B", text: "validated" },
      { id: "C", text: "complicated" },
      { id: "D", text: "dismissed" },
    ],
    correctAnswer: "B",
  },
  {
    id: 18,
    passage: "The ancient library of Alexandria was renowned throughout the Mediterranean world as a center of learning, housing scrolls from countless civilizations and attracting scholars from distant lands.",
    text: "What made the library of Alexandria significant according to the passage?",
    options: [
      { id: "A", text: "Its architectural beauty" },
      { id: "B", text: "Its role as an intellectual hub" },
      { id: "C", text: "Its military importance" },
      { id: "D", text: "Its economic influence" },
    ],
    correctAnswer: "B",
  },
  {
    id: 19,
    passage: "Behavioral economists have shown that people often make irrational financial decisions, influenced by cognitive biases rather than purely logical analysis of costs and benefits.",
    text: "What do behavioral economists argue about financial decision-making?",
    options: [
      { id: "A", text: "It is always based on careful calculation" },
      { id: "B", text: "It is often affected by psychological factors" },
      { id: "C", text: "It requires advanced mathematical skills" },
      { id: "D", text: "It has become more rational over time" },
    ],
    correctAnswer: "B",
  },
  {
    id: 20,
    passage: "The migration patterns of monarch butterflies represent one of nature's most _____ phenomena, with millions of insects traveling thousands of miles between their breeding and wintering grounds.",
    text: "Which choice completes the text most appropriately?",
    options: [
      { id: "A", text: "ordinary" },
      { id: "B", text: "remarkable" },
      { id: "C", text: "problematic" },
      { id: "D", text: "unpredictable" },
    ],
    correctAnswer: "B",
  },
  {
    id: 21,
    passage: "The documentary filmmaker spent three years embedded with the community, building trust and capturing intimate moments that revealed the daily realities of life in the remote village.",
    text: "What approach did the filmmaker take to create the documentary?",
    options: [
      { id: "A", text: "Brief visits with staged interviews" },
      { id: "B", text: "Long-term immersion in the community" },
      { id: "C", text: "Remote observation via cameras" },
      { id: "D", text: "Reconstruction of historical events" },
    ],
    correctAnswer: "B",
  },
  {
    id: 22,
    passage: "Critics of standardized testing argue that such assessments fail to capture the full range of student abilities, including creativity, critical thinking, and collaborative skills.",
    text: "What is the main criticism of standardized testing presented in the passage?",
    options: [
      { id: "A", text: "Tests are too easy" },
      { id: "B", text: "Tests are too expensive to administer" },
      { id: "C", text: "Tests measure only a limited set of skills" },
      { id: "D", text: "Tests favor certain demographic groups" },
    ],
    correctAnswer: "C",
  },
  {
    id: 23,
    passage: "The artist's later works showed a dramatic shift in style, moving away from realistic portraiture toward abstract compositions that emphasized emotion over representation.",
    text: "How did the artist's style change over time?",
    options: [
      { id: "A", text: "From abstract to realistic" },
      { id: "B", text: "From emotional to technical" },
      { id: "C", text: "From realistic to abstract" },
      { id: "D", text: "From colorful to monochromatic" },
    ],
    correctAnswer: "C",
  },
  {
    id: 24,
    passage: "While some historians emphasize economic factors as the primary cause of the conflict, others argue that ideological differences played an equally _____ role.",
    text: "Which choice completes the text with the most logical word?",
    options: [
      { id: "A", text: "minor" },
      { id: "B", text: "significant" },
      { id: "C", text: "negligible" },
      { id: "D", text: "confusing" },
    ],
    correctAnswer: "B",
  },
  {
    id: 25,
    passage: "The discovery of antibiotics revolutionized medicine in the twentieth century, transforming previously fatal infections into treatable conditions and dramatically increasing life expectancy.",
    text: "What impact did antibiotics have according to the passage?",
    options: [
      { id: "A", text: "They eliminated all infectious diseases" },
      { id: "B", text: "They fundamentally changed medical treatment" },
      { id: "C", text: "They replaced the need for surgery" },
      { id: "D", text: "They reduced the cost of healthcare" },
    ],
    correctAnswer: "B",
  },
  {
    id: 26,
    passage: "The urban planner proposed creating more pedestrian-friendly zones in the city center, arguing that reducing car traffic would improve both air quality and the vibrancy of street life.",
    text: "What benefits does the urban planner associate with pedestrian zones?",
    options: [
      { id: "A", text: "Lower construction costs" },
      { id: "B", text: "Better environment and community engagement" },
      { id: "C", text: "Faster transportation options" },
      { id: "D", text: "Increased parking availability" },
    ],
    correctAnswer: "B",
  },
  {
    id: 27,
    passage: "The poet's use of natural imagery throughout the collection serves to _____ the themes of renewal and transformation that appear in nearly every piece.",
    text: "Which choice completes the text with the most appropriate word?",
    options: [
      { id: "A", text: "obscure" },
      { id: "B", text: "contradict" },
      { id: "C", text: "reinforce" },
      { id: "D", text: "simplify" },
    ],
    correctAnswer: "C",
  },
];
