// src/data/companiesData.ts
// Static seed data for all 7 companies.
// Used by prisma/seed.ts — does NOT query the database.

export interface SeedQuestion {
  category: 'technical' | 'hr' | 'aptitude' | 'coding';
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  modelAnswer: string;
  hints: string[];
  tags: string[];
  isFresher: boolean;
}

export interface SeedCompany {
  name: string;
  slug: string;
  tagline: string;
  summary: string;
  logoEmoji: string;
  gradient: string;
  tier: 'FAANG' | 'Tier-1' | 'MNC' | 'Tier-2';
  questions: SeedQuestion[];
}

export const companiesSeedData: SeedCompany[] = [
  // ──────────────────────────────────────────────────────────────────────────
  // 1. TCS
  // ──────────────────────────────────────────────────────────────────────────
  {
    name: 'TCS',
    slug: 'tcs',
    tagline: 'Tata Consultancy Services — India\'s largest IT company',
    summary:
      'TCS interviews focus heavily on aptitude, logical reasoning, and basic programming fundamentals. For freshers, the TCS National Qualifier Test (NQT) tests quantitative aptitude, verbal ability, and programming logic. Technical rounds for experienced candidates include Java/OOPs, SQL, and data structures. HR rounds assess cultural fit with the Tata values.',
    logoEmoji: '🔵',
    gradient: 'from-blue-600 to-indigo-700',
    tier: 'Tier-1',
    questions: [
      {
        category: 'technical',
        difficulty: 'easy',
        question: 'What is the difference between == and .equals() in Java?',
        modelAnswer:
          '== compares references (memory addresses) for objects, and values for primitives. .equals() compares the actual content of objects. For String: "Java" == "Java" may return true (pool), but new String("Java") == new String("Java") returns false. Always use .equals() for String and object content comparison.',
        hints: [
          'Think about what each variable holds — a value or a memory address.',
          'For primitives, == compares values. For objects, it compares addresses.',
          'String pool makes == behave unexpectedly — new String() bypasses the pool.',
        ],
        tags: ['Java', 'String', 'OOP'],
        isFresher: true,
      },
      {
        category: 'technical',
        difficulty: 'easy',
        question: 'Explain the four pillars of OOP with one-line definitions.',
        modelAnswer:
          '1. Encapsulation: bundling data and methods, exposing only what\'s needed via access modifiers. 2. Inheritance: a child class acquires properties/behaviors from a parent class. 3. Polymorphism: one interface, many implementations — same method name behaves differently by context. 4. Abstraction: hiding implementation complexity, exposing only the essential interface.',
        hints: [
          'Think about what each pillar "protects", "shares", "changes", or "hides".',
          'Encapsulation = controlled access. Inheritance = code reuse. Polymorphism = flexibility. Abstraction = simplicity.',
          'Every real-world example maps to one of these — car (a vehicle), shape (draw differently), bank account (hide balance logic).',
        ],
        tags: ['OOP', 'Java', 'Concepts'],
        isFresher: true,
      },
      {
        category: 'technical',
        difficulty: 'medium',
        question: 'What is the difference between ArrayList and LinkedList? When would you use each?',
        modelAnswer:
          'ArrayList uses a dynamic array — O(1) random access, O(n) insert/delete in middle. LinkedList uses doubly-linked nodes — O(n) access, O(1) insert/delete at head/tail. Use ArrayList for frequent reads and random access. Use LinkedList when you need frequent insertions/deletions at both ends (as a Queue or Deque). ArrayList is generally preferred due to better cache locality.',
        hints: [
          'Think about how each stores elements in memory — array vs. linked nodes.',
          'Which is faster for get(i)? Which is faster for add(0, element)?',
          'LinkedList has extra memory overhead per node (prev + next pointers).',
        ],
        tags: ['Collections', 'Data Structures', 'Java'],
        isFresher: true,
      },
      {
        category: 'technical',
        difficulty: 'medium',
        question: 'What is a NullPointerException and how do you prevent it?',
        modelAnswer:
          'NPE occurs when you call a method or access a field on a null reference. Prevention: 1) Check for null before calling methods. 2) Use Optional<T> (Java 8+) for values that may be absent. 3) Use "YourString".equals(variable) instead of variable.equals("YourString"). 4) Initialize fields with non-null defaults. 5) Use @NonNull annotations and IDE warnings.',
        hints: [
          'A null reference is like an address to an empty plot — there is nothing there to operate on.',
          'Optional<T> is a container that may or may not hold a value — makes null-handling explicit.',
          'Always validate method inputs, especially when accepting external data.',
        ],
        tags: ['Exception', 'Java', 'Best Practices'],
        isFresher: true,
      },
      {
        category: 'technical',
        difficulty: 'hard',
        question: 'Explain how HashMap works internally. What happens during a collision?',
        modelAnswer:
          'HashMap uses an array of buckets. When storing a key-value pair: compute key.hashCode(), apply bit manipulation to get bucket index, store as a Node. Collision: two keys map to same bucket. Pre-Java 8: linked list of nodes (O(n) worst). Java 8+: converts to red-black tree when bucket size > 8 (O(log n)). Load factor (0.75): when 75% full, HashMap doubles and rehashes. hashCode() and equals() must be consistent — keys MUST override both.',
        hints: [
          'hashCode() determines which bucket. equals() resolves collisions within a bucket.',
          'Think of the array as a street, buckets as houses, and entries as residents in a house.',
          'Java 8 optimization: a crowded bucket (>8 entries) switches from linked list to tree.',
        ],
        tags: ['Collections', 'HashMap', 'Internals'],
        isFresher: false,
      },
      {
        category: 'hr',
        difficulty: 'easy',
        question: 'Why do you want to join TCS?',
        modelAnswer:
          'TCS is not just a company — it\'s a career platform. I\'m drawn to: 1) Scale — working on projects that affect millions of users globally. 2) Learning programs — TCS iON, internal training, certification support. 3) Diversity of domains — finance, healthcare, retail — all under one roof. 4) Stability and growth. I believe TCS will give me the environment to grow technically while building delivery and client communication skills.',
        hints: [
          'Research TCS\'s recent initiatives, products (TCS iON, ignio AI), or CSR programs.',
          'Connect your goals to what TCS specifically offers — not just "big company".',
          'Mention learning culture, diverse projects, and growth opportunities.',
        ],
        tags: ['HR', 'Motivation'],
        isFresher: true,
      },
      {
        category: 'hr',
        difficulty: 'easy',
        question: 'Tell me about yourself.',
        modelAnswer:
          'Structure: Present → Past → Future. Example: "I\'m [Name], a Computer Science graduate from [College]. Over my academic years, I built [project X] which solved [problem Y] using [tech stack]. I\'ve strengthened my Java and SQL fundamentals through coursework and side projects. Looking ahead, I want to build enterprise-level solutions, and I believe TCS\'s scale and training programs are the right environment to start that journey."',
        hints: [
          'Follow the Present → Past → Future 3-part structure.',
          'Keep it to 90 seconds. Mention 1 technical achievement, 1 project, and your goal.',
          'End by connecting your goal to why THIS company is the right fit.',
        ],
        tags: ['HR', 'Introduction'],
        isFresher: true,
      },
      {
        category: 'aptitude',
        difficulty: 'easy',
        question: 'If a train travels at 60 km/h for 2.5 hours, how far does it travel? If it then travels back at 40 km/h, what is the average speed for the round trip?',
        modelAnswer:
          'Distance = 60 × 2.5 = 150 km. For average speed of round trip: Use the harmonic mean formula: Avg speed = 2 × s1 × s2 / (s1 + s2) = 2 × 60 × 40 / (60 + 40) = 4800 / 100 = 48 km/h. Note: Never average speeds directly — always use the harmonic mean for equal distances.',
        hints: [
          'Distance = Speed × Time for the first leg.',
          'For equal distances at different speeds, average speed ≠ (s1 + s2) / 2.',
          'Harmonic mean formula: 2 × s1 × s2 / (s1 + s2).',
        ],
        tags: ['Aptitude', 'Speed-Distance-Time'],
        isFresher: true,
      },
      {
        category: 'aptitude',
        difficulty: 'medium',
        question: 'In a group of 5 people, how many ways can 3 people be selected? If they must sit in a row, how many arrangements are possible?',
        modelAnswer:
          'Combinations (selection, order doesn\'t matter): C(5,3) = 5! / (3! × 2!) = 10 ways. Permutations (arrangement in a row, order matters): P(5,3) = 5! / (5-3)! = 5 × 4 × 3 = 60 arrangements. Or: 10 (combinations) × 3! (arrangements of 3 people) = 10 × 6 = 60.',
        hints: [
          'Selection = Combination (C). Arrangement = Permutation (P).',
          'C(n,r) = n! / (r! × (n-r)!). P(n,r) = n! / (n-r)!',
          'For permutations from combinations: multiply by r! to account for arrangements.',
        ],
        tags: ['Aptitude', 'Permutation-Combination'],
        isFresher: true,
      },
      {
        category: 'coding',
        difficulty: 'easy',
        question: 'Write a Java method to check if a given string is a palindrome.',
        modelAnswer:
          `public static boolean isPalindrome(String s) {
    // Normalize: remove spaces and convert to lowercase
    s = s.replaceAll("\\\\s+", "").toLowerCase();
    int left = 0, right = s.length() - 1;
    while (left < right) {
        if (s.charAt(left) != s.charAt(right)) return false;
        left++;
        right--;
    }
    return true;
}
// Time: O(n), Space: O(1). Alternative: StringBuilder.reverse().equals()`,
        hints: [
          'Two-pointer approach: compare characters from both ends moving inward.',
          'Normalize first: remove spaces and ignore case.',
          'Another approach: reverse the string and compare with the original.',
        ],
        tags: ['Coding', 'String', 'Two-Pointer'],
        isFresher: true,
      },
      {
        category: 'coding',
        difficulty: 'medium',
        question: 'Write a Java program to find the second largest element in an array without sorting.',
        modelAnswer:
          `public static int secondLargest(int[] arr) {
    int first = Integer.MIN_VALUE, second = Integer.MIN_VALUE;
    for (int num : arr) {
        if (num > first) {
            second = first;
            first = num;
        } else if (num > second && num != first) {
            second = num;
        }
    }
    if (second == Integer.MIN_VALUE) throw new RuntimeException("No second largest");
    return second;
}
// Time O(n), Space O(1) — single pass, no sorting needed.`,
        hints: [
          'Track two variables: first and second largest.',
          'When you find a new maximum, the old maximum becomes the second largest.',
          'Handle edge case: what if all elements are equal?',
        ],
        tags: ['Coding', 'Array', 'Linear Scan'],
        isFresher: true,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 2. INFOSYS
  // ──────────────────────────────────────────────────────────────────────────
  {
    name: 'Infosys',
    slug: 'infosys',
    tagline: 'Navigate your future — a global IT leader',
    summary:
      'Infosys uses a structured 3-round interview process for freshers: aptitude test (InfyTQ platform), technical round (Java/C++, data structures, DBMS, OS fundamentals), and HR round. The process emphasizes Problem Solving Skills, Communication, SDLC knowledge, and attitude for learning. Experienced profiles are evaluated on specific tech stacks and project depth.',
    logoEmoji: '🟡',
    gradient: 'from-amber-500 to-orange-600',
    tier: 'Tier-1',
    questions: [
      {
        category: 'technical',
        difficulty: 'easy',
        question: 'What is the difference between abstract class and interface in Java?',
        modelAnswer:
          'Abstract class: can have concrete methods, constructors, state (fields), and supports single inheritance. Interface: only abstract methods (before Java 8), no state, supports multiple implementation. Java 8 introduced default and static methods in interfaces. Choose abstract class when you need shared implementation or state. Choose interface for pure contracts and when a class needs multiple contracts.',
        hints: [
          'Can you instantiate either? No for both, but for different reasons.',
          'Abstract class = partial blueprint. Interface = pure contract.',
          'Java 8 added default methods to interfaces — narrowing the gap.',
        ],
        tags: ['OOP', 'Java', 'Design'],
        isFresher: true,
      },
      {
        category: 'technical',
        difficulty: 'easy',
        question: 'Explain the concept of Java garbage collection.',
        modelAnswer:
          'The JVM\'s garbage collector automatically reclaims memory from objects that are no longer reachable (no live references point to them). The heap is divided into Young Generation (Eden + Survivor spaces) and Old Generation. Most objects are short-lived (die in Young Gen during minor GC). Long-lived objects are promoted to Old Gen (major GC, more expensive). GC prevents memory leaks and manual memory management bugs.',
        hints: [
          '"Reachable" means: there\'s a chain of references from a live thread/stack to the object.',
          'Young Gen = nursery for new objects. Old Gen = retirement home for survivors.',
          'System.gc() is a hint, not a command — JVM decides when to actually run GC.',
        ],
        tags: ['JVM', 'Memory', 'GC'],
        isFresher: true,
      },
      {
        category: 'technical',
        difficulty: 'medium',
        question: 'What are Java 8 streams? Explain map() vs flatMap().',
        modelAnswer:
          'Streams provide a declarative, functional-pipeline way to process collections. Lazy — intermediate ops (filter, map) don\'t execute until a terminal op (collect, count) triggers them. map(f): applies f to each element — produces one output per input, preserving the stream structure. flatMap(f): each element maps to a stream, then all streams are flattened into one. Use flatMap when each element can produce zero or more results. Example: splitting sentences into words uses flatMap.',
        hints: [
          'Think of map as a 1-to-1 transformation, flatMap as a 1-to-many that flattens.',
          'Lazy evaluation: the pipeline is built, then executed on terminal operation.',
          'flatMap is key for working with nested collections or Optional<Optional<T>>.',
        ],
        tags: ['Java 8', 'Streams', 'Functional'],
        isFresher: false,
      },
      {
        category: 'technical',
        difficulty: 'hard',
        question: 'Explain the SOLID principles with a Java example for at least two.',
        modelAnswer:
          'S — Single Responsibility: one class, one reason to change. Example: separate UserService from EmailService. O — Open/Closed: open for extension, closed for modification. Example: use Strategy pattern instead of if-else for payment methods. L — Liskov Substitution: subclass must be substitutable for parent. I — Interface Segregation: don\'t force clients to implement unused methods — split fat interfaces. D — Dependency Inversion: depend on abstractions, not concretions — inject dependencies.',
        hints: [
          'Each letter addresses a different dimension of class design quality.',
          'SOLID violations lead to the symptoms: spaghetti code, rigid change cascades, untestable code.',
          'Think of a real PaymentProcessor that violates Open/Closed by having massive if-else chains.',
        ],
        tags: ['SOLID', 'Design Principles', 'OOP'],
        isFresher: false,
      },
      {
        category: 'hr',
        difficulty: 'easy',
        question: 'Where do you see yourself in 5 years?',
        modelAnswer:
          'In 5 years, I see myself as a technically strong software engineer with hands-on experience in enterprise-grade projects, ideally having led at least a small module or team. At Infosys, I\'d like to leverage the certification programs and global project exposure to specialize in cloud or backend systems. My goal is to grow from executing tasks to designing solutions and mentoring peers.',
        hints: [
          'Be realistic and specific — not "I want to be a CTO in 5 years".',
          'Align your 5-year goal with what the company offers (certifications, global projects, tech stacks).',
          'Mention both technical growth and soft skill development (leadership, client interaction).',
        ],
        tags: ['HR', 'Career Goal'],
        isFresher: true,
      },
      {
        category: 'aptitude',
        difficulty: 'medium',
        question: 'A can do a work in 15 days, B in 20 days. They work together for 6 days, then A leaves. How many more days does B need to finish?',
        modelAnswer:
          'A\'s rate: 1/15/day. B\'s rate: 1/20/day. Together: 1/15 + 1/20 = 4/60 + 3/60 = 7/60/day. Work in 6 days = 6 × 7/60 = 42/60 = 7/10. Remaining work = 1 - 7/10 = 3/10. B alone: (3/10) ÷ (1/20) = (3/10) × 20 = 6 days.',
        hints: [
          'Convert "can do in X days" to rate = 1/X per day.',
          'Combined rate = sum of individual rates.',
          'Remaining work = 1 - (rate × days already worked). Then divide by B\'s rate.',
        ],
        tags: ['Aptitude', 'Work-Time'],
        isFresher: true,
      },
      {
        category: 'coding',
        difficulty: 'easy',
        question: 'Write Java code to reverse a linked list.',
        modelAnswer:
          `class ListNode { int val; ListNode next; }

public static ListNode reverseList(ListNode head) {
    ListNode prev = null, curr = head;
    while (curr != null) {
        ListNode next = curr.next;  // save next
        curr.next = prev;           // reverse link
        prev = curr;                // move prev forward
        curr = next;                // move curr forward
    }
    return prev;  // prev is new head
}
// Time: O(n), Space: O(1) — iterative in-place reversal`,
        hints: [
          'You need to keep track of 3 nodes at each step: prev, curr, and next.',
          'Reverse the link: curr.next = prev (not the usual forward direction).',
          'After the loop, prev points to the new head.',
        ],
        tags: ['Coding', 'Linked List', 'Pointer Manipulation'],
        isFresher: true,
      },
      {
        category: 'coding',
        difficulty: 'medium',
        question: 'Write a Java method to find all pairs in an array that sum to a target value.',
        modelAnswer:
          `public static List<int[]> findPairs(int[] arr, int target) {
    List<int[]> result = new ArrayList<>();
    Set<Integer> seen = new HashSet<>();
    for (int num : arr) {
        int complement = target - num;
        if (seen.contains(complement)) {
            result.add(new int[]{complement, num});
        }
        seen.add(num);
    }
    return result;
}
// Time: O(n), Space: O(n) — HashSet for O(1) lookup per element`,
        hints: [
          'For each element, check if its complement (target - element) was already seen.',
          'A HashSet gives O(1) lookup — no nested loop needed.',
          'Watch for duplicates — do you want to count the same pair twice?',
        ],
        tags: ['Coding', 'Array', 'HashSet', 'Two-Sum variant'],
        isFresher: false,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 3. IBM
  // ──────────────────────────────────────────────────────────────────────────
  {
    name: 'IBM',
    slug: 'ibm',
    tagline: 'IBM — Let\'s create. Think big.',
    summary:
      'IBM interviews focus on problem-solving, communication, and system thinking. For freshers, rounds typically include aptitude, technical (Java, OOP, Cloud basics, DBMS), and HR. IBM values candidates who understand enterprise scale, cloud computing (IBM Cloud), and AI (Watson). Communication, curiosity, and cultural fit are highly weighted.',
    logoEmoji: '🔷',
    gradient: 'from-sky-600 to-blue-800',
    tier: 'Tier-1',
    questions: [
      {
        category: 'technical',
        difficulty: 'easy',
        question: 'What is REST API? Name the HTTP methods and their purpose.',
        modelAnswer:
          'REST (Representational State Transfer) is an architectural style for APIs over HTTP. HTTP Methods: GET — retrieve data (read-only, idempotent). POST — create new resource. PUT — replace entire resource. PATCH — partial update. DELETE — remove resource. REST is stateless — each request must contain all info needed. Resources are identified by URLs. Responses are typically JSON or XML.',
        hints: [
          'CRUD maps to HTTP: Create=POST, Read=GET, Update=PUT/PATCH, Delete=DELETE.',
          'Stateless means the server holds no client session state between requests.',
          'Idempotent: calling the same request multiple times has the same effect (GET, PUT, DELETE).',
        ],
        tags: ['REST', 'API', 'Web'],
        isFresher: true,
      },
      {
        category: 'technical',
        difficulty: 'medium',
        question: 'What is a microservices architecture? How is it different from monolithic?',
        modelAnswer:
          'Monolithic: single deployable unit with all features tightly coupled — simple to develop initially but hard to scale and maintain. Microservices: application split into small, independently deployable services, each owning its data and communicating via APIs. Benefits: independent scaling, tech stack freedom per service, fault isolation. Challenges: network complexity, distributed data consistency, DevOps overhead.',
        hints: [
          'Monolith = all code in one box. Microservices = many small boxes talking to each other.',
          'Netflix and Amazon moved from monolith to microservices to scale independently.',
          'Each microservice should own its own database (no shared DB between services).',
        ],
        tags: ['Architecture', 'Microservices', 'Design'],
        isFresher: false,
      },
      {
        category: 'technical',
        difficulty: 'easy',
        question: 'What is cloud computing? Name the three service models with examples.',
        modelAnswer:
          'Cloud computing: on-demand delivery of IT resources (compute, storage, networking) over the internet with pay-as-you-go pricing. Service models: 1) IaaS (Infrastructure as a Service) — virtual machines, storage. Examples: AWS EC2, Azure VMs, IBM Cloud. 2) PaaS (Platform as a Service) — managed platform for app deployment. Examples: Heroku, Google App Engine, IBM Cloud Foundry. 3) SaaS (Software as a Service) — complete applications. Examples: Gmail, Salesforce, Office 365.',
        hints: [
          'Think of it as layers: IaaS = raw infrastructure, PaaS = platform tools, SaaS = ready-to-use apps.',
          'Pizza analogy: IaaS = make your own pizza, PaaS = take-and-bake, SaaS = delivery.',
          'IBM Cloud, Azure, AWS, GCP are all IaaS/PaaS providers.',
        ],
        tags: ['Cloud', 'IaaS', 'PaaS', 'SaaS'],
        isFresher: true,
      },
      {
        category: 'hr',
        difficulty: 'easy',
        question: 'Tell me about a challenging situation you faced and how you resolved it.',
        modelAnswer:
          'Use the STAR framework: Situation (set the context), Task (your responsibility), Action (what you did), Result (measurable outcome). Example: "During my final year project, our team disagreed on the tech stack with 2 weeks to deadline. I organized a structured comparison session, presented a data-driven recommendation, and we aligned on the right choice. We delivered on time with a working demo that got graded A."',
        hints: [
          'STAR: Situation, Task, Action, Result — use this structure always.',
          'Focus on what YOU specifically did, not what "we" did.',
          'Quantify the result if possible — grade, time saved, users served.',
        ],
        tags: ['HR', 'STAR', 'Behavioral'],
        isFresher: true,
      },
      {
        category: 'aptitude',
        difficulty: 'medium',
        question: 'A bag contains 4 red, 3 blue, and 2 green balls. Two balls are drawn at random. What is the probability that both are the same color?',
        modelAnswer:
          'Total balls = 9. Total ways to pick 2 = C(9,2) = 36. Same color: Red: C(4,2) = 6. Blue: C(3,2) = 3. Green: C(2,2) = 1. Favorable = 6 + 3 + 1 = 10. Probability = 10/36 = 5/18 ≈ 0.278.',
        hints: [
          'Total outcomes = C(9,2) — choosing 2 from 9.',
          'For same color: calculate favorable outcomes for each color separately, then add.',
          'C(n,2) = n×(n-1)/2.',
        ],
        tags: ['Aptitude', 'Probability'],
        isFresher: true,
      },
      {
        category: 'coding',
        difficulty: 'medium',
        question: 'Write Java code to implement a stack using two queues.',
        modelAnswer:
          `class StackUsingQueues<T> {
    private Queue<T> q1 = new LinkedList<>();
    private Queue<T> q2 = new LinkedList<>();

    public void push(T elem) {
        q2.add(elem);
        while (!q1.isEmpty()) q2.add(q1.poll());
        Queue<T> temp = q1; q1 = q2; q2 = temp;
    }

    public T pop() {
        if (q1.isEmpty()) throw new EmptyStackException();
        return q1.poll();
    }

    public T peek() { return q1.peek(); }
    public boolean isEmpty() { return q1.isEmpty(); }
}
// Push O(n), Pop O(1). Alternative: Push O(1), Pop O(n).`,
        hints: [
          'A stack is LIFO, a queue is FIFO. You need to simulate LIFO using two FIFOs.',
          'Key insight: on each push, move all elements to the end — making the new element the "front" for pop.',
          'You can also do it the other way: cheap push, expensive pop.',
        ],
        tags: ['Coding', 'Stack', 'Queue', 'Data Structures'],
        isFresher: false,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 4. DELOITTE
  // ──────────────────────────────────────────────────────────────────────────
  {
    name: 'Deloitte',
    slug: 'deloitte',
    tagline: 'Making an impact that matters',
    summary:
      'Deloitte blends consulting and technology. Their interviews test analytical thinking, communication, and business context awareness alongside technical skills. The process includes aptitude tests, case study rounds for consulting roles, and technical rounds for tech roles. Cultural fit with Deloitte\'s values (integrity, excellence, inclusion) is strongly assessed in HR rounds.',
    logoEmoji: '🟢',
    gradient: 'from-emerald-600 to-teal-700',
    tier: 'Tier-1',
    questions: [
      {
        category: 'technical',
        difficulty: 'medium',
        question: 'What is a transaction in a database? Explain ACID properties.',
        modelAnswer:
          'A transaction is a set of operations executed as a single unit. ACID ensures reliability: A — Atomicity: all operations succeed or none do (all-or-nothing). C — Consistency: transaction moves DB from one valid state to another — no constraint violations. I — Isolation: concurrent transactions don\'t interfere — each appears as if it\'s the only one running. D — Durability: once committed, changes persist even after a crash (written to disk).',
        hints: [
          'Classic example: bank transfer — debit account A and credit account B must both succeed or both fail.',
          'Atomicity prevents partial updates. Isolation prevents dirty reads.',
          'Durability is achieved via transaction logs (WAL — Write-Ahead Logging).',
        ],
        tags: ['Database', 'ACID', 'SQL'],
        isFresher: true,
      },
      {
        category: 'technical',
        difficulty: 'easy',
        question: 'What is the difference between SQL JOIN types? When do you use INNER JOIN vs LEFT JOIN?',
        modelAnswer:
          'INNER JOIN: returns rows where there\'s a match in BOTH tables. LEFT JOIN (LEFT OUTER JOIN): returns ALL rows from the left table + matched rows from right (NULLs where no match). RIGHT JOIN: opposite of LEFT. FULL OUTER JOIN: all rows from both tables. Use INNER JOIN when you only care about matched data. Use LEFT JOIN when you want to keep all records from the left table even if there\'s no corresponding row on the right.',
        hints: [
          'Think of it as a Venn diagram: INNER = intersection. LEFT = entire left circle + intersection.',
          'LEFT JOIN is perfect for "find customers who have no orders" — filter WHERE order.id IS NULL.',
          'FULL OUTER JOIN = both circles combined.',
        ],
        tags: ['SQL', 'Joins', 'Database'],
        isFresher: true,
      },
      {
        category: 'hr',
        difficulty: 'easy',
        question: 'How do you handle working under pressure or tight deadlines?',
        modelAnswer:
          'I approach pressure with a structured mindset: 1) Prioritize — identify what must deliver vs. what can be deferred. 2) Break it down — large deadlines feel manageable when split into daily milestones. 3) Communicate early — if I see a risk, I flag it with context and a proposed plan, not just the problem. 4) Focus — during crunch time I reduce context-switching. I\'ve found that pressure, when channeled, actually sharpens focus.',
        hints: [
          'Don\'t just say "I work well under pressure" — show the behavior behind it.',
          'Give a specific example using STAR (Situation, Task, Action, Result).',
          'Mention communication as a key tool — proactive escalation is valued.',
        ],
        tags: ['HR', 'Pressure', 'Behavioral'],
        isFresher: true,
      },
      {
        category: 'aptitude',
        difficulty: 'hard',
        question: 'In a class of 60 students, 40% play cricket, 25% play football, and 10% play both. How many play neither? What % play exactly one sport?',
        modelAnswer:
          'Cricket = 40% of 60 = 24. Football = 25% of 60 = 15. Both = 10% of 60 = 6. Cricket only = 24 - 6 = 18. Football only = 15 - 6 = 9. At least one = 18 + 9 + 6 = 33. Neither = 60 - 33 = 27. Exactly one = 18 + 9 = 27 students = 45%.',
        hints: [
          'Draw a Venn diagram with two circles. Fill in "both" first.',
          'Each circle = total for that sport. "Only" = total - "both".',
          'Union = A + B - A∩B. Neither = Total - Union.',
        ],
        tags: ['Aptitude', 'Set Theory', 'Venn Diagram'],
        isFresher: true,
      },
      {
        category: 'coding',
        difficulty: 'medium',
        question: 'Write a Java function to detect if a linked list has a cycle.',
        modelAnswer:
          `public static boolean hasCycle(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;  // moves 2 steps
        if (slow == fast) return true;  // cycle detected
    }
    return false;
}
// Floyd's Tortoise and Hare algorithm.
// Time O(n), Space O(1) — no extra data structure needed.`,
        hints: [
          'Floyd\'s algorithm: slow pointer moves 1 step, fast pointer moves 2 steps.',
          'If there\'s a cycle, fast will eventually lap slow and they\'ll meet.',
          'If no cycle, fast reaches null first.',
        ],
        tags: ['Coding', 'Linked List', 'Floyd\'s Algorithm'],
        isFresher: false,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 5. ACCENTURE
  // ──────────────────────────────────────────────────────────────────────────
  {
    name: 'Accenture',
    slug: 'accenture',
    tagline: 'Let there be change.',
    summary:
      'Accenture has a well-defined fresher hiring process: Accenture Online Assessment (Communication, Cognitive, Technical + Coding), followed by Technical Interview and HR interview. They heavily evaluate communication skills, coding ability (Java, Python), logical reasoning, and enthusiasm. Accenture values adaptability, teamwork, and learnability above raw technical depth.',
    logoEmoji: '🟣',
    gradient: 'from-purple-600 to-violet-700',
    tier: 'MNC',
    questions: [
      {
        category: 'technical',
        difficulty: 'easy',
        question: 'Explain method overloading vs method overriding in Java.',
        modelAnswer:
          'Overloading (compile-time polymorphism): same method name, different parameter lists, in the same class. Compiler picks the right version based on argument types. Overriding (runtime polymorphism): subclass provides its own implementation of a parent\'s method with the same signature. JVM resolves at runtime based on actual object type. @Override annotation is recommended to catch mistakes. Overloading cannot be done by return type alone.',
        hints: [
          'Overloading = same name, different params, same class. Overriding = same signature, different class (parent-child).',
          'Overloading is resolved at compile time. Overriding is resolved at runtime.',
          '@Override prevents accidental overloading when you meant to override.',
        ],
        tags: ['OOP', 'Java', 'Polymorphism'],
        isFresher: true,
      },
      {
        category: 'technical',
        difficulty: 'easy',
        question: 'What is the difference between checked and unchecked exceptions?',
        modelAnswer:
          'Checked exceptions: must be handled at compile time (catch or declare with throws). Represent recoverable conditions. Examples: IOException, SQLException. Unchecked exceptions (RuntimeException subclasses): compiler doesn\'t force handling. Represent programming bugs. Examples: NullPointerException, ArrayIndexOutOfBoundsException, IllegalArgumentException. Rule of thumb: checked = caller should handle it. Unchecked = programmer should fix the code.',
        hints: [
          'If the compiler complains about an unhandled exception — it\'s checked.',
          'RuntimeException and its subclasses are all unchecked.',
          'Checked = predictable failure (file not found). Unchecked = programmer error (null access).',
        ],
        tags: ['Java', 'Exception Handling'],
        isFresher: true,
      },
      {
        category: 'hr',
        difficulty: 'easy',
        question: 'What are your strengths and weaknesses?',
        modelAnswer:
          'Strength: Be specific and work-relevant. "I\'m persistent — when I encounter a bug, I don\'t give up until I understand the root cause, not just apply a fix. This helped me debug a memory leak in my project that had stumped our team for 2 days." Weakness: Be honest and show self-awareness + improvement. "I sometimes over-research before starting — I\'d read 5 articles before writing a single line. I\'ve learned to timebox my research to 20 minutes, then prototype first."',
        hints: [
          'Never say "I\'m a perfectionist" — it sounds fake and clichéd.',
          'Strength should be directly relevant to the job role.',
          'Weakness must show awareness AND an active improvement plan.',
        ],
        tags: ['HR', 'Self-Awareness'],
        isFresher: true,
      },
      {
        category: 'coding',
        difficulty: 'easy',
        question: 'Write Java code to count the frequency of each character in a string.',
        modelAnswer:
          `public static Map<Character, Integer> charFrequency(String s) {
    Map<Character, Integer> freq = new LinkedHashMap<>();
    for (char c : s.toCharArray()) {
        freq.put(c, freq.getOrDefault(c, 0) + 1);
    }
    return freq;
}
// Print: freq.forEach((k, v) -> System.out.println(k + ": " + v));
// Time: O(n), Space: O(k) where k = distinct characters`,
        hints: [
          'Iterate through each character, use a Map to count.',
          'getOrDefault(key, 0) handles the first occurrence cleanly.',
          'LinkedHashMap preserves insertion order if you need ordered output.',
        ],
        tags: ['Coding', 'String', 'HashMap'],
        isFresher: true,
      },
      {
        category: 'aptitude',
        difficulty: 'easy',
        question: 'What is the next number in the sequence: 2, 6, 12, 20, 30, ?',
        modelAnswer:
          'Differences: 4, 6, 8, 10 — increasing by 2 each time. Next difference = 12. Answer = 30 + 12 = 42. Pattern: n(n+1) — 1×2=2, 2×3=6, 3×4=12, 4×5=20, 5×6=30, 6×7=42.',
        hints: [
          'Look at the differences between consecutive terms.',
          'The differences form an arithmetic sequence (AP) increasing by 2.',
          'Alternatively, notice the pattern: n × (n+1) for n = 1, 2, 3...',
        ],
        tags: ['Aptitude', 'Number Series'],
        isFresher: true,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 6. AMAZON
  // ──────────────────────────────────────────────────────────────────────────
  {
    name: 'Amazon',
    slug: 'amazon',
    tagline: 'Work hard. Have fun. Make history.',
    summary:
      'Amazon interviews are among the most structured globally. Every interview ties to Amazon\'s 16 Leadership Principles. Technical rounds include DSA (arrays, trees, graphs, DP), system design, and coding. Behavioral rounds use STAR method tightly aligned to LP. Amazon expects candidates to "disagree and commit" and think long-term. Coding problems are medium-to-hard LeetCode level.',
    logoEmoji: '🟠',
    gradient: 'from-orange-500 to-amber-600',
    tier: 'FAANG',
    questions: [
      {
        category: 'technical',
        difficulty: 'hard',
        question: 'Given an array of integers, find the maximum subarray sum (Kadane\'s Algorithm). Explain your approach.',
        modelAnswer:
          `public static int maxSubarraySum(int[] arr) {
    int maxSoFar = arr[0], currentMax = arr[0];
    for (int i = 1; i < arr.length; i++) {
        currentMax = Math.max(arr[i], currentMax + arr[i]);
        maxSoFar = Math.max(maxSoFar, currentMax);
    }
    return maxSoFar;
}
// Kadane's Algorithm: O(n) time, O(1) space.
// Key insight: at each position, decide — extend the running subarray or start fresh.
// Start fresh when the running sum becomes negative (it would hurt the next sum).`,
        hints: [
          'At each element, decide: is it better to extend the current subarray or start a new one from here?',
          'Start fresh when currentMax + arr[i] < arr[i] — i.e., when currentMax is negative.',
          'Track two variables: current running max and overall max seen so far.',
        ],
        tags: ['Coding', 'Dynamic Programming', 'Array', 'Kadane'],
        isFresher: false,
      },
      {
        category: 'technical',
        difficulty: 'hard',
        question: 'Design a URL shortener service. What are the key components?',
        modelAnswer:
          'Key components: 1) API: POST /shorten (returns short URL), GET /[code] (redirects). 2) ID Generation: Base62 encoding of auto-increment ID or hash (MD5/SHA256, take first 7 chars). 3) Storage: key-value database (Redis for caching, DynamoDB/PostgreSQL for persistence). 4) Redirect: 301 (permanent, browser caches) vs 302 (temporary, always hits server). 5) Scale: read-heavy — cache hits with Redis, CDN. Estimated: 100M URLs/day → ~1160/sec reads. Handle collisions in hash-based approach.',
        hints: [
          'Think in components: API layer, ID generation, storage, and redirect mechanism.',
          'Base62 (a-z, A-Z, 0-9) with 7 characters gives 62^7 ≈ 3.5 trillion unique URLs.',
          '301 vs 302 redirect is a trade-off: analytics tracking (302) vs performance (301).',
        ],
        tags: ['System Design', 'Scalability', 'Architecture'],
        isFresher: false,
      },
      {
        category: 'hr',
        difficulty: 'medium',
        question: 'Tell me about a time when you had to deliver under an extremely tight deadline.',
        modelAnswer:
          'Structure: STAR + connect to Amazon Leadership Principles (Deliver Results, Bias for Action). Example: "During my hackathon project, we lost a team member 6 hours before the demo. I immediately triaged remaining features using MoSCoW (Must, Should, Could, Won\'t). I took over the most critical module, we cut 2 nice-to-have features, and delivered a working demo on time — and placed 2nd out of 30 teams. I learned that clarity under pressure starts with ruthless prioritization."',
        hints: [
          'Amazon interviewers are listening for leadership principles in your answer.',
          'This maps to "Deliver Results" and "Bias for Action".',
          'STAR structure is mandatory. Quantify the outcome when possible.',
        ],
        tags: ['HR', 'Leadership Principles', 'STAR', 'Deliver Results'],
        isFresher: false,
      },
      {
        category: 'hr',
        difficulty: 'medium',
        question: 'Describe a situation where you disagreed with a team member or manager. How did you handle it?',
        modelAnswer:
          'Amazon LP: "Disagree and Commit." Template: "Acknowledge the disagreement respectfully, present data/reasoning clearly, listen actively to their perspective, find common ground or escalate for a decision, then fully commit to the agreed direction even if it\'s not your preference." Example: "I disagreed on using NoSQL vs SQL for a project. I documented trade-offs in a one-pager, presented it to the team, they chose SQL — I committed to that decision fully and we delivered successfully."',
        hints: [
          'Amazon respects disagreement backed by data. Show you\'re confident but not obstinate.',
          '"Disagree and Commit" means: voice your view, then execute the team\'s decision 100%.',
          'Never say you just went along without expressing your view — that shows low ownership.',
        ],
        tags: ['HR', 'Leadership Principles', 'Conflict Resolution'],
        isFresher: false,
      },
      {
        category: 'technical',
        difficulty: 'medium',
        question: 'What is the difference between BFS and DFS? When would you use each?',
        modelAnswer:
          'BFS (Breadth-First Search): explores level by level using a Queue. Finds shortest path in unweighted graphs. Memory: O(width). DFS (Depth-First Search): goes deep before backtracking using Stack/recursion. Better for topological sort, cycle detection, all paths. Memory: O(depth). Use BFS for: shortest path, minimum hops, level-order traversal. Use DFS for: path existence, topological ordering, connected components, maze traversal.',
        hints: [
          'BFS = Queue (FIFO). DFS = Stack/recursion (LIFO).',
          'BFS guarantees shortest path in unweighted graphs. DFS does not.',
          'DFS is elegant with recursion; BFS needs explicit queue management.',
        ],
        tags: ['Coding', 'Graph', 'BFS', 'DFS', 'Algorithms'],
        isFresher: false,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 7. GOOGLE
  // ──────────────────────────────────────────────────────────────────────────
  {
    name: 'Google',
    slug: 'google',
    tagline: 'Do the right thing.',
    summary:
      'Google\'s hiring process is rigorous and structured: 1–2 phone screens (coding), 4–5 onsite rounds (1 Googleyness & Leadership, 2–3 coding, 1 system design for L4+). Coding questions are hard LeetCode: graph traversal, DP, trees, string manipulation. Code must be clean, correct, and efficient. Communication of thought process is critical — interviewers want to see how you think, not just the answer.',
    logoEmoji: '🌈',
    gradient: 'from-blue-500 via-red-500 to-yellow-500',
    tier: 'FAANG',
    questions: [
      {
        category: 'technical',
        difficulty: 'hard',
        question: 'Given a binary tree, perform a level-order traversal. Return results as a list of lists.',
        modelAnswer:
          `public List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);
    while (!queue.isEmpty()) {
        int levelSize = queue.size();   // snapshot current level count
        List<Integer> level = new ArrayList<>();
        for (int i = 0; i < levelSize; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left != null) queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }
        result.add(level);
    }
    return result;
}
// BFS with level-size snapshot. O(n) time, O(n) space.`,
        hints: [
          'Use a Queue for BFS. Snapshot the queue size at the start of each level.',
          'Processing exactly queue.size() elements at each iteration gives you one complete level.',
          'Add children to the queue while processing the current level.',
        ],
        tags: ['Coding', 'Tree', 'BFS', 'Level-Order'],
        isFresher: false,
      },
      {
        category: 'technical',
        difficulty: 'hard',
        question: 'Find all unique permutations of an array that may contain duplicates.',
        modelAnswer:
          `public List<List<Integer>> permuteUnique(int[] nums) {
    Arrays.sort(nums);
    List<List<Integer>> result = new ArrayList<>();
    boolean[] used = new boolean[nums.length];
    backtrack(nums, used, new ArrayList<>(), result);
    return result;
}

private void backtrack(int[] nums, boolean[] used, List<Integer> current, List<List<Integer>> result) {
    if (current.size() == nums.length) { result.add(new ArrayList<>(current)); return; }
    for (int i = 0; i < nums.length; i++) {
        if (used[i]) continue;
        if (i > 0 && nums[i] == nums[i-1] && !used[i-1]) continue; // skip dup
        used[i] = true;
        current.add(nums[i]);
        backtrack(nums, used, current, result);
        used[i] = false;
        current.remove(current.size() - 1);
    }
}`,
        hints: [
          'Sort the array first — this groups duplicates together for easy detection.',
          'Skip: if nums[i] == nums[i-1] and the previous element is NOT used (already completed that branch).',
          'Standard backtracking template: choose → recurse → unchoose.',
        ],
        tags: ['Coding', 'Backtracking', 'Permutations'],
        isFresher: false,
      },
      {
        category: 'technical',
        difficulty: 'hard',
        question: 'Design a system like Google Drive. Focus on the storage and sync architecture.',
        modelAnswer:
          'Key components: 1) Client app: chunked upload (divide files into 4MB chunks, deduplicate via hash). 2) Metadata Service: stores file/folder hierarchy, version history, sharing permissions (Bigtable). 3) Block Storage: raw file chunks stored in GCS (Google Cloud Storage) — immutable blobs. 4) Sync Engine: event-driven (Pub/Sub) — clients subscribe to change notifications. 5) CDN: edge caching for frequently accessed files. 6) Consistency: eventual consistency for collaboration, strong consistency for metadata. Handle conflicts with "last-write-wins" or operational transform.',
        hints: [
          'Split responsibilities: metadata (DB) vs. content (object store — S3/GCS).',
          'Chunking and deduplication are key to storage efficiency — same chunk = same SHA hash = stored once.',
          'Sync architecture = push notifications via WebSockets/long-polling when other clients change a file.',
        ],
        tags: ['System Design', 'Distributed Systems', 'Storage'],
        isFresher: false,
      },
      {
        category: 'hr',
        difficulty: 'medium',
        question: 'Tell me about a time you had to learn something entirely new in a short time. How did you approach it?',
        modelAnswer:
          'Example: "For a hackathon, I had 48 hours to learn Docker and containerize our app — I\'d never used it before. I followed: 1) Official docs skim (30 min), 2) Identify minimal required concepts, 3) Build a working hello-world, 4) Adapt to our app incrementally. By hour 10, our app was containerized. I learned that you rarely need 100% coverage — find the 20% that delivers 80% of the value, then iterate." Google values intellectual curiosity and rapid self-directed learning.',
        hints: [
          'Google values "Googleyness" — intellectual curiosity and learning agility.',
          'Show a concrete, structured approach to learning — not just "I Googled it".',
          'Quantify: how fast, what was the outcome, what methodology worked.',
        ],
        tags: ['HR', 'Learning', 'Googleyness'],
        isFresher: false,
      },
      {
        category: 'coding',
        difficulty: 'medium',
        question: 'Implement LRU (Least Recently Used) Cache with O(1) get and put.',
        modelAnswer:
          `class LRUCache {
    private final int capacity;
    private final LinkedHashMap<Integer, Integer> cache;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.cache = new LinkedHashMap<>(capacity, 0.75f, true) {
            protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {
                return size() > capacity;
            }
        };
    }

    public int get(int key) { return cache.getOrDefault(key, -1); }

    public void put(int key, int value) { cache.put(key, value); }
}
// LinkedHashMap with accessOrder=true maintains LRU order automatically.
// O(1) get/put. The map self-evicts the eldest entry when full.`,
        hints: [
          'LRU = evict the item that was accessed least recently.',
          'Optimal data structure: HashMap (O(1) lookup) + Doubly Linked List (O(1) move-to-front).',
          'Java cheat: LinkedHashMap with accessOrder=true + override removeEldestEntry.',
        ],
        tags: ['Coding', 'LRU Cache', 'Design', 'LinkedHashMap'],
        isFresher: false,
      },
    ],
  },
];
