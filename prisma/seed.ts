import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("Seeding...");

  // 1. Create/Update Companies
  const companies = [
    {
      name: "TCS",
      slug: "tcs",
      summary: "Indian IT services company with focus on enterprise solutions.",
      logoEmoji: "💼",
      gradient: "from-blue-600 to-indigo-700",
      tier: "MNC"
    },
    {
      name: "Infosys",
      slug: "infosys",
      summary: "Global leader in next-generation digital services and consulting.",
      logoEmoji: "📘",
      gradient: "from-indigo-600 to-purple-700",
      tier: "MNC"
    },
    {
      name: "Amazon",
      slug: "amazon",
      summary: "Product-based tech giant known for high-scale Java systems.",
      logoEmoji: "🛒",
      gradient: "from-orange-500 to-yellow-600",
      tier: "FAANG"
    }
  ];

  for (const companyData of companies) {
    const company = await prisma.company.upsert({
      where: { slug: companyData.slug },
      update: companyData,
      create: companyData,
    });

    console.log(`Company ${company.name} ensured.`);

    // 2. Add Company Questions (5 each)
    const questions = [
      {
        tcs: [
          { question: "Difference between JVM, JRE, and JDK?", difficulty: "easy", category: "technical" },
          { question: "What are the features of Java 8?", difficulty: "medium", category: "technical" },
          { question: "Difference between Array and ArrayList?", difficulty: "easy", category: "technical" },
          { question: "Explain Exception Handling in Java.", difficulty: "medium", category: "technical" },
          { question: "What is Synchronization in Java?", difficulty: "hard", category: "technical" }
        ],
        infosys: [
          { question: "What is inheritance? Types of inheritance in Java?", difficulty: "easy", category: "technical" },
          { question: "Explain the difference between == and .equals().", difficulty: "easy", category: "technical" },
          { question: "What is the use of final, finally, and finalize?", difficulty: "medium", category: "technical" },
          { question: "What are Abstract Classes and Interfaces? Difference?", difficulty: "medium", category: "technical" },
          { question: "How is memory handled in Java?", difficulty: "hard", category: "technical" }
        ],
        amazon: [
          { question: "How does HashMap work internally in Java?", difficulty: "hard", category: "technical" },
          { question: "What is the difference between Fail-fast and Fail-safe iterators?", difficulty: "medium", category: "technical" },
          { question: "Explain Volatile keyword in Java.", difficulty: "hard", category: "technical" },
          { question: "What are the different ways to create a Thread? Which is better?", difficulty: "medium", category: "technical" },
          { question: "Explain the concept of functional interfaces and Lambda expressions.", difficulty: "medium", category: "technical" }
        ]
      }
    ];

    const companyQuestions = questions[0][company.slug as keyof typeof questions[0]] || [];
    
    for (const q of companyQuestions) {
      await prisma.companyQuestion.create({
        data: {
          companyId: company.id,
          question: q.question,
          difficulty: q.difficulty,
          category: q.category,
          modelAnswer: `This is a model answer for: ${q.question}. It demonstrates key Java concepts required for ${company.name}.`,
          hints: ["Think about the core concept.", "Consider the internal implementation."],
          tags: ["java", company.slug],
          isFresher: true
        }
      });
    }

    // 3. Add Coding Problems (2 each)
    const codingProblemsData = {
      tcs: [
        { title: "Reverse a String", slug: "reverse-string-tcs", difficulty: "easy" },
        { title: "Find Second Largest", slug: "second-largest-tcs", difficulty: "easy" }
      ],
      infosys: [
        { title: "Check Palindrome", slug: "check-palindrome-infosys", difficulty: "easy" },
        { title: "Fibonacci Series", slug: "fibonacci-infosys", difficulty: "medium" }
      ],
      amazon: [
        { title: "Two Sum", slug: "two-sum-amazon", difficulty: "easy" },
        { title: "Missing Number", slug: "missing-number-amazon", difficulty: "easy" }
      ]
    };

    const companyCodingProblems = codingProblemsData[company.slug as keyof typeof codingProblemsData] || [];

    for (const cp of companyCodingProblems) {
      await prisma.codingProblem.upsert({
        where: { slug: cp.slug },
        update: {
          companyId: company.id,
          title: cp.title,
          difficulty: cp.difficulty,
          description: `Write a Java program to solve ${cp.title}.`,
          examples: [{ input: "example input", output: "example output", explanation: "simple explanation" }],
          constraints: ["Time complexity O(n)", "Space complexity O(1)"],
          starterCode: "public class Solution {\n  public void solve() {\n    // your code\n  }\n}",
          solutionCode: "// reference solution",
          solutionExplanation: "Detailed explanation of the approach."
        },
        create: {
          companyId: company.id,
          title: cp.title,
          slug: cp.slug,
          difficulty: cp.difficulty,
          description: `Write a Java program to solve ${cp.title}.`,
          examples: [{ input: "example input", output: "example output", explanation: "simple explanation" }],
          constraints: ["Time complexity O(n)", "Space complexity O(1)"],
          starterCode: "public class Solution {\n  public void solve() {\n    // your code\n  }\n}",
          solutionCode: "// reference solution",
          solutionExplanation: "Detailed explanation of the approach."
        }
      });
    }
  }

  console.log("Seed completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });