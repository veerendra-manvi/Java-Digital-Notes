export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'tricky';
}

export interface InterviewQuestion {
  question: string;
  answer: string;
  difficulty: 'beginner' | 'intermediate' | 'tricky';
  type: 'conceptual' | 'output' | 'scenario' | 'difference';
}

export interface CodeExample {
  title: string;
  code: string;
  output: string;
  explanation: string;
  interviewNote?: string;
}

export interface Subtopic {
  id: string;
  title: string;
  definition: string;
  simpleExplanation: string;
  analogy?: string;
  oneLineRevision: string;
  commonMistake: string;
  interviewLanguage: string;
  codeExample?: CodeExample;
}

export interface Topic {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: 'basics' | 'oop' | 'advanced' | 'interview-critical';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  learningTimeMin: number;
  icon: string;
  color: string;
  gradient: string;
  subtopics: Subtopic[];
  interviewQuestions: InterviewQuestion[];
  quizQuestions: QuizQuestion[];
  whatInterviewerWantsToHear: string;
  best30SecAnswer: string;
  topCommonWrongAnswer: string;
  visualizerType: 'flow' | 'memory' | 'hierarchy' | 'comparison' | 'lifecycle' | 'relationship';
}

export const topics: Topic[] = [
  // ─────────────────────────────────────────────
  // 1. MAIN METHOD
  // ─────────────────────────────────────────────
  {
    id: 'main-method',
    slug: 'main-method',
    title: 'Main Method',
    tagline: 'The Gateway to Every Java Program',
    description:
      'The main method is Java\'s official handshake with the JVM. It\'s the one method the JVM specifically looks for to start executing your program — no main, no start.',
    category: 'basics',
    difficulty: 'beginner',
    learningTimeMin: 20,
    icon: '🚀',
    color: '#6366f1',
    gradient: 'from-indigo-500 to-purple-600',
    visualizerType: 'flow',
    whatInterviewerWantsToHear:
      'The interviewer wants to hear that you understand WHY each keyword in the main method signature exists — not just that you memorized it.',
    best30SecAnswer:
      'The main method is the JVM\'s entry point into a Java application. It must be public so the JVM can access it from outside the class, static so JVM can call it without creating an object, void because JVM doesn\'t expect a return value, and String[] args to accept command-line arguments. Without this exact signature, the JVM simply won\'t know where to start.',
    topCommonWrongAnswer:
      'Many students say "main is the starting point of Java" — that\'s incomplete. You must explain WHY each modifier exists.',
    subtopics: [
      {
        id: 'jvm-entry-point',
        title: 'JVM Entry Point',
        definition:
          'The JVM (Java Virtual Machine) is like a strict event organizer — it will only start a party if it finds a "main" stage set up exactly right.',
        simpleExplanation:
          'When you run a Java program, the JVM scans your class for a method with this exact signature: public static void main(String[] args). If it finds it, the program starts. If not, it throws a NoSuchMethodError.',
        analogy:
          'Think of the JVM as a delivery driver. It will only deliver to an address labeled exactly "main". Wrong spelling, wrong door — the package never arrives.',
        oneLineRevision: 'JVM = strict boss who only starts work if main() exists with exact signature.',
        commonMistake:
          'Students often write Main() with a capital M or forget String[] args — both cause JVM to fail silently at runtime with a "Main method not found" error.',
        interviewLanguage:
          'In an interview, say: "The JVM uses the main method as the application\'s entry point. It\'s a contract — the JVM knows exactly what it\'s looking for, and if it\'s missing or malformed, the program simply won\'t run."',
      },
      {
        id: 'main-syntax',
        title: 'Syntax of the Main Method',
        definition:
          'The main method has a very strict, non-negotiable signature that the JVM recognizes as the program\'s start.',
        simpleExplanation:
          'The signature is: public static void main(String[] args)\n- public: accessible from anywhere (JVM needs to call it from outside)\n- static: JVM can call it without creating an object first\n- void: JVM doesn\'t care what value comes back\n- String[] args: door open for command-line inputs',
        oneLineRevision: 'public static void main(String[] args) — memorize this like your phone number.',
        commonMistake:
          'Writing "static public" instead of "public static" — Java allows this, but interviewers may ask if the order matters (it doesn\'t, but consistency is preferred).',
        interviewLanguage:
          '"Each keyword in the main method signature serves a specific purpose. Public — JVM access. Static — no object needed. Void — no return. String[] args — command-line parameters."',
        codeExample: {
          title: 'The Classic Main Method',
          code: `public class HelloJava {
    // This is the entry point — JVM starts here!
    public static void main(String[] args) {
        System.out.println("Java Digital Notes - Let's Go!");
    }
}`,
          output: 'Java Digital Notes - Let\'s Go!',
          explanation:
            'The JVM loads the class, finds main(), executes System.out.println(), prints to console, and exits.',
          interviewNote:
            'Interviewers love to ask: Can we have multiple main methods? Yes! Via overloading, but JVM only calls public static void main(String[] args).',
        },
      },
      {
        id: 'public-keyword',
        title: 'Why public?',
        definition: 'public grants the JVM — which lives outside your class — permission to access the method.',
        simpleExplanation:
          'The JVM runs outside your class. To call your main method, it needs the "public" access modifier. Think of it like an unlocked front door — without public, the JVM can\'t even knock.',
        analogy: 'A "public" park vs a "private" gated community. JVM can only walk into the public park.',
        oneLineRevision: 'public = JVM can see it from outside the class.',
        commonMistake: 'Making main private or protected — instantly causes JVM to throw "Main method not found."',
        interviewLanguage:
          '"public is needed because the JVM is an external entity to your class. It needs to invoke main() from the outside, so the method must be publicly accessible."',
      },
      {
        id: 'static-keyword',
        title: 'Why static?',
        definition: 'static means the method belongs to the class, not to any particular object — so JVM can call it without creating an instance first.',
        simpleExplanation:
          'If main weren\'t static, JVM would have to first create an object of your class to call it. But here\'s the chicken-and-egg problem: how does JVM know what arguments to pass the constructor? It doesn\'t. So main must be static — callable without any object.',
        analogy: 'A static method is like a doorbell outside a house — you can ring it without going inside first.',
        oneLineRevision: 'static = no object needed; JVM calls it directly on the class.',
        commonMistake: 'Removing static forces JVM into a paradox — it needs to create an object, but doesn\'t know how to construct it.',
        interviewLanguage:
          '"static is essential because JVM needs to call main() before any objects exist. It\'s a class-level method, not an instance-level one."',
      },
      {
        id: 'void-keyword',
        title: 'Why void?',
        definition: 'void tells the JVM — "I will not return anything to you after this method runs."',
        simpleExplanation:
          'The JVM starts main() and doesn\'t wait for a result. Once execution is done, JVM exits the program. There\'s no caller waiting for a return value, so void makes perfect sense.',
        oneLineRevision: 'void = JVM doesn\'t care what happens after — it\'s a one-way street.',
        commonMistake: 'Trying to return int or String from main — compiler will reject it with an error.',
        interviewLanguage:
          '"void tells the JVM that main() won\'t return anything, which makes sense because once the program finishes, there\'s nothing to return to."',
      },
      {
        id: 'string-args',
        title: 'String[] args — Command Line Arguments',
        definition: 'String[] args is an array that holds any arguments passed to the program when run from the command line.',
        simpleExplanation:
          'When you type: java HelloJava Alice 25\nJava stores ["Alice", "25"] in args. You can read args[0] to get "Alice" and args[1] to get "25" inside your program.',
        analogy:
          'Like a restaurant order form passed to the chef — args is the list of items you passed in when "placing the order" (running the program).',
        oneLineRevision: 'String[] args = external inputs delivered to your program at launch time.',
        commonMistake:
          'Forgetting that args is always a String array — even if you pass numbers, they come in as strings and must be converted with Integer.parseInt().',
        interviewLanguage:
          '"String[] args allows users to pass runtime inputs when launching the program from the command line. They\'re always strings, so any type conversion is the developer\'s responsibility."',
        codeExample: {
          title: 'Reading Command Line Arguments',
          code: `public class Greet {
    public static void main(String[] args) {
        // args[0] is the first argument passed
        if (args.length > 0) {
            System.out.println("Hello, " + args[0] + "!");
        } else {
            System.out.println("Hello, World!");
        }
    }
}`,
          output: 'Hello, Alice!   (if run as: java Greet Alice)',
          explanation: 'The program reads the first argument from the args array and uses it as a name.',
          interviewNote: 'Always check args.length before accessing args[0] to avoid ArrayIndexOutOfBoundsException!',
        },
      },
    ],
    interviewQuestions: [
      {
        question: 'Can we run a Java program without the main method?',
        answer:
          'In modern Java (Java 7+), no — the JVM strictly requires public static void main(String[] args) as the entry point. In older Java (before 7), static blocks could execute before main, but JVM still expected main to exist. From Java 21+, JEP 445 allows unnamed classes with no explicit main method for simple scripts, but in standard applications, main is mandatory.',
        difficulty: 'intermediate',
        type: 'conceptual',
      },
      {
        question: 'What happens if we remove "static" from the main method?',
        answer:
          'The program compiles successfully (it\'s valid Java syntax) but throws a runtime error: "Main method is not static in class X, please define the main method as: public static void main(String[] args)". The JVM specifically looks for a static main method.',
        difficulty: 'beginner',
        type: 'output',
      },
      {
        question: 'Can we overload the main method?',
        answer:
          'Yes! You can create multiple methods named main with different parameters. The compiler allows it. However, JVM will only automatically invoke public static void main(String[] args). Any other overloaded main must be called explicitly like a regular method.',
        difficulty: 'intermediate',
        type: 'conceptual',
      },
      {
        question: 'Can main method be final?',
        answer:
          'Yes, main can be declared final — it still works. Final just prevents it from being overridden in a subclass, but since JVM calls it on the specific class, it makes no difference.',
        difficulty: 'tricky',
        type: 'conceptual',
      },
      {
        question: 'What is the output if main throws an uncaught exception?',
        answer:
          'The JVM catches the exception, prints the stack trace to stderr, and terminates the program with a non-zero exit code. The thread dies, and if no other non-daemon threads exist, the JVM shuts down.',
        difficulty: 'intermediate',
        type: 'scenario',
      },
    ],
    quizQuestions: [
      {
        id: 'mm-q1',
        question: 'Which of the following is the correct main method signature?',
        options: [
          'public void main(String[] args)',
          'public static void Main(String[] args)',
          'public static void main(String[] args)',
          'static public int main(String args[])',
        ],
        answer: 2,
        explanation: 'The JVM requires exactly public static void main(String[] args). Capital M in "Main" won\'t be recognized, and the return type must be void.',
        difficulty: 'easy',
      },
      {
        id: 'mm-q2',
        question: 'What happens if you remove "public" from the main method?',
        options: [
          'Compilation error',
          'Runtime error — JVM says main method not found',
          'Program runs normally',
          'NullPointerException',
        ],
        answer: 1,
        explanation: 'The code compiles fine (it\'s valid syntax), but JVM can\'t find the expected public main method at runtime.',
        difficulty: 'easy',
      },
      {
        id: 'mm-q3',
        question: 'What is the data type of "args" in the main method?',
        options: ['String', 'int[]', 'String[]', 'Object[]'],
        answer: 2,
        explanation: 'args is of type String[] — an array of Strings — holding all command-line arguments.',
        difficulty: 'easy',
      },
      {
        id: 'mm-q4',
        question: 'What happens if you remove "static" from the main method?',
        options: [
          'Compilation error',
          'Program runs but prints nothing',
          'Runtime error: "Main method is not static"',
          'NullPointerException at startup',
        ],
        answer: 2,
        explanation: 'Removing static compiles fine, but at runtime JVM throws: "Main method is not static in class X, please define the main method as: public static void main(String[] args)".',
        difficulty: 'medium',
      },
      {
        id: 'mm-q5',
        question: 'Can you overload the main method (have multiple main methods in a class)?',
        options: [
          'No — compiler error',
          'Yes — but JVM only auto-calls public static void main(String[])',
          'Yes — JVM calls all versions in order',
          'No — runtime error if multiple main methods exist',
        ],
        answer: 1,
        explanation: 'You can overload main() just like any method. The compiler allows it. But JVM only automatically invokes the standard signature. Others must be called explicitly.',
        difficulty: 'medium',
      },
      {
        id: 'mm-q6',
        question: 'What does args[0] contain when you run: java MyApp Hello World',
        options: ['MyApp', 'Hello', 'World', 'Hello World'],
        answer: 1,
        explanation: 'args[0] = "Hello", args[1] = "World". The class name (MyApp) is NOT included in the args array.',
        difficulty: 'medium',
      },
      {
        id: 'mm-q7',
        question: 'What happens if you access args[0] when no command-line arguments are provided?',
        options: [
          'Returns null',
          'Returns empty string ""',
          'throws ArrayIndexOutOfBoundsException',
          'Compilation error',
        ],
        answer: 2,
        explanation: 'Without checking args.length first, accessing args[0] on an empty args array throws ArrayIndexOutOfBoundsException. Always guard with if(args.length > 0).',
        difficulty: 'tricky',
      },
      {
        id: 'mm-q8',
        question: 'Which keyword combination in main allows the JVM to call it without creating a class instance?',
        options: ['public', 'void', 'static', 'final'],
        answer: 2,
        explanation: 'static makes the method belong to the class (not instances), so JVM can invoke it directly without creating any object first — critical for the bootstrap process.',
        difficulty: 'tricky',
      },
    ],

  },

  // ─────────────────────────────────────────────
  // 2. DATA TYPES (FULLY EXPANDED)
  // ─────────────────────────────────────────────
  {
    id: 'data-types',
    slug: 'data-types',
    title: 'Data Types',
    tagline: 'The Building Blocks of Every Variable',
    description: 'Data types define what kind of data a variable can hold and how much memory it occupies. Java is a strongly-typed language — every variable has a type, and that type is enforced at compile time.',
    category: 'basics',
    difficulty: 'beginner',
    learningTimeMin: 25,
    icon: '📊',
    color: '#10b981',
    gradient: 'from-emerald-400 to-teal-600',
    visualizerType: 'memory',
    whatInterviewerWantsToHear: 'The interviewer wants to hear that you know the difference between primitive and reference types, can recall memory sizes, and understand widening vs narrowing conversions.',
    best30SecAnswer: 'Java has 8 primitive data types — byte, short, int, long, float, double, char, and boolean — each with a fixed size and range. Non-primitive types like String, arrays, and objects reference memory on the heap. Java is strongly typed, and all types are fixed at compile time.',
    topCommonWrongAnswer: 'Saying "String is a primitive type" — it\'s not! String is a class in Java.',
    subtopics: [
      {
        id: 'primitive-vs-nonprimitive',
        title: 'Primitive vs Non-Primitive',
        definition: 'Primitive types store the raw value directly in the variable\'s memory slot. Non-primitive types store a reference — a pointer to where the actual object lives in heap memory.',
        simpleExplanation: '8 Primitives: byte, short, int, long, float, double, char, boolean\nNon-primitives: String, Arrays, Classes, Interfaces\n\nPrimitive = the value IS in the variable.\nNon-primitive = the variable POINTS to the value elsewhere (heap).',
        analogy: 'Primitive = cash in your hand. Non-primitive = a debit card that points to money in a bank account. Same concept, different storage model.',
        oneLineRevision: 'Primitive = actual value stored in stack. Non-primitive = reference (address) stored, object on heap.',
        commonMistake: 'Treating String like a primitive — String is a class (java.lang.String), therefore a reference type. It just gets special treatment with string literals and the String Pool.',
        interviewLanguage: '"Primitive types directly store values with fixed, platform-independent sizes. Non-primitive types like String, Arrays, and custom objects store a memory reference pointing to the heap."',
        codeExample: {
          title: 'Primitive vs Non-Primitive',
          code: `public class DataTypeDemo {
    public static void main(String[] args) {
        // Primitives — value stored directly in memory slot
        int   age    = 25;
        boolean isActive = true;
        char  grade  = 'A';

        // Non-primitives — reference stored, object lives on heap
        String name   = "Alice";    // String is a CLASS, not primitive!
        int[]  scores = {90, 85};   // Array is a non-primitive type

        System.out.println("Age:    " + age);
        System.out.println("Name:   " + name);
        System.out.println("Grade:  " + grade);
    }
}`,
          output: 'Age:    25\nName:   Alice\nGrade:  A',
          explanation: 'age, isActive, grade store values directly in the stack frame. name and scores hold memory addresses pointing to heap objects.',
          interviewNote: 'Classic interview question: "Is String a primitive?" — always say NO. String is a class in java.lang. It\'s a reference type that gets special JVM treatment.',
        },
      },
      {
        id: 'integer-types',
        title: 'Integer Types — byte, short, int, long',
        definition: 'Four integer types with increasing memory capacity, each with a fixed size and value range regardless of the operating system.',
        simpleExplanation: 'byte  → 1 byte  → range: -128 to 127\nshort → 2 bytes → range: -32,768 to 32,767\nint   → 4 bytes → range: ±2.1 Billion  ← DEFAULT integer type\nlong  → 8 bytes → range: ±9.2 Quintillion (use L suffix)\n\nAll whole-number literals are int by default. Use L suffix for long values beyond int range.',
        analogy: 'Think of containers: byte is a cup, short is a mug, int is a bucket, long is a swimming pool. Always pick the smallest container that fits your data — no wasted space.',
        oneLineRevision: 'byte < short < int < long — each is bigger. int is the default. Add L for long literals.',
        commonMistake: 'Forgetting the L suffix: long x = 10000000000; gives a compile error because 10000000000 exceeds int range. Write 10000000000L to fix it.',
        interviewLanguage: '"int is the default integer type in Java. I use long when numbers exceed int range (~±2 billion), and byte or short when I want to optimize memory — like in large arrays or sensor data."',
        codeExample: {
          title: 'Integer Types + Overflow Trap',
          code: `public class IntegerTypes {
    public static void main(String[] args) {
        byte  b = 127;                        // max: 127
        short s = 32767;                      // max: 32,767
        int   i = 2_147_483_647;              // max: ~2.1 billion (underscores OK!)
        long  l = 9_223_372_036_854_775_807L; // max: ~9.2 quintillion — L required!

        System.out.println("byte:  " + b);
        System.out.println("short: " + s);
        System.out.println("int:   " + i);
        System.out.println("long:  " + l);

        // byte OVERFLOW — silent wrap-around!
        byte overflow = (byte) 128; // 128 exceeds byte max (127) → wraps to -128
        System.out.println("Overflow: " + overflow);
    }
}`,
          output: 'byte:  127\nshort: 32767\nint:   2147483647\nlong:  9223372036854775807\nOverflow: -128',
          explanation: 'When 128 is cast to byte, it exceeds the range (max 127) and wraps around to -128. Java does NOT throw an exception for integer overflow — it silently wraps.',
          interviewNote: 'Classic trick: byte b = 127; b++; What is b? Answer: -128! Adding 1 to max byte wraps to min byte. No exception thrown — this surprises most students.',
        },
      },
      {
        id: 'floating-point-types',
        title: 'Floating-Point Types — float and double',
        definition: 'float and double represent decimal numbers. double is the default for all floating-point literals and provides significantly more precision than float.',
        simpleExplanation: 'float  → 4 bytes → ~6-7 decimal digits precision (use F suffix)\ndouble → 8 bytes → ~15-16 decimal digits precision ← DEFAULT decimal type\n\nAll decimal literals are double by default. Add F suffix for float: 3.14F\nFor financial calculations — use BigDecimal, not float/double!',
        analogy: 'float is a ruler measured to millimeters. double is a micrometer measured to nanometers. Same concept, dramatically different precision.',
        oneLineRevision: 'float = 4B, less precise, needs F suffix. double = 8B, more precise, is the default.',
        commonMistake: 'Writing float f = 3.14; without the F suffix — compile error! 3.14 is a double literal by default. You must write 3.14F or explicitly cast: (float) 3.14.',
        interviewLanguage: '"double is the default floating-point type in Java. float uses half the memory but is less precise. For real-world financial apps, neither is ideal — I\'d use BigDecimal to avoid rounding errors like the famous 0.1 + 0.2 = 0.30000000000000004 issue."',
        codeExample: {
          title: 'float vs double — Precision Trap',
          code: `public class FloatDouble {
    public static void main(String[] args) {
        double price = 19.99;   // no suffix needed
        float  tax   = 0.18F;  // F suffix required!

        // Precision comparison
        double d = 1.0 / 3.0;
        float  f = 1.0F / 3.0F;

        System.out.println("double: " + d); // more decimal places
        System.out.println("float:  " + f); // fewer, less precise

        // ⚠️ The famous floating-point trap!
        System.out.println(0.1 + 0.2); // NOT 0.3!
    }
}`,
          output: 'double: 0.3333333333333333\nfloat:  0.33333334\n0.30000000000000004',
          explanation: '0.1 + 0.2 ≠ 0.3 in floating-point! Binary fractions can\'t represent 0.1 exactly. The stored approximation causes tiny errors that add up.',
          interviewNote: 'When asked "why 0.1 + 0.2 ≠ 0.3?", say: floating-point uses binary fractions which can\'t represent 0.1 exactly — causing tiny rounding errors. Use BigDecimal for precise monetary calculations.',
        },
      },
      {
        id: 'char-boolean',
        title: 'char and boolean — The Special Two',
        definition: 'char stores a single Unicode character (2 bytes, range 0–65535). boolean stores only true or false — it has no numeric equivalent in Java.',
        simpleExplanation: 'char   → 2 bytes → single Unicode character → written in SINGLE quotes: \'A\'\nboolean → JVM-dependent size → only true or false → no int equivalent!\n\nchar stores Unicode values internally — arithmetic on char works!\nboolean is strict — you CANNOT cast it to int or use 0/1 like in C.',
        analogy: 'char is like a single playing card — stores exactly one symbol. boolean is a light switch — only ON (true) or OFF (false), nothing in between.',
        oneLineRevision: 'char = single character in single quotes, 2 bytes Unicode. boolean = true/false only, no int casting allowed.',
        commonMistake: 'Using double quotes for char: char c = "A" → compile error! char uses SINGLE quotes. Also, if (boolVar == 1) → compile error — Java booleans are NOT integers.',
        interviewLanguage: '"char is 2 bytes because Java uses UTF-16 Unicode encoding. boolean has no guaranteed size — the JVM decides. Unlike C, Java booleans have no integer equivalence — you can\'t cast true to 1 or compare boolean to 1."',
        codeExample: {
          title: 'char and boolean Examples',
          code: `public class CharBoolean {
    public static void main(String[] args) {
        char letter = 'J';     // single quotes!
        char digit  = '5';     // char '5' is NOT int 5

        // char stores Unicode internally — arithmetic is valid!
        System.out.println((int) 'A');   // 65 — Unicode of 'A'
        System.out.println((char) 66);   // 'B' — Unicode 66 as char
        System.out.println('A' + 1);     // 66 — int arithmetic!
        System.out.println((char)('A' + 1)); // 'B' — cast back to char

        // boolean
        boolean isJavaFun = true;
        int score = 85;
        boolean passed = score >= 60;  // boolean expression

        System.out.println("Passed: " + passed);
        // if (passed == 1) { } // ← COMPILE ERROR in Java!
    }
}`,
          output: '65\nB\n66\nB\nPassed: true',
          explanation: '\'A\' is Unicode 65. Casting to int gives 65. \'A\' + 1 = 66 (int arithmetic). Cast (char)(\'A\'+1) to get the character \'B\'. boolean has no numeric form in Java.',
          interviewNote: 'char c = \'A\'; c++; What is c? → \'B\'! Because char arithmetic works on Unicode values. Also: char is unsigned (0 to 65535), unlike byte/short which are signed.',
        },
      },
      {
        id: 'type-casting',
        title: 'Type Casting — Widening and Narrowing',
        definition: 'Widening is automatic promotion from a smaller type to a larger one — safe and implicit. Narrowing is manual demotion from a larger type to a smaller one — requires explicit cast and may lose data.',
        simpleExplanation: 'Widening (auto, safe): byte → short → int → long → float → double\nNarrowing (manual, risky): double → float → long → int → short → byte\n\nWidening: no data loss — moving to bigger container.\nNarrowing: may truncate decimal OR cause integer overflow.',
        analogy: 'Widening = pouring water from a small cup into a large bucket — nothing spills. Narrowing = pouring a bucket into a cup — overflow is possible!',
        oneLineRevision: 'Widening = auto and safe. Narrowing = explicit cast needed, truncates or overflows.',
        commonMistake: 'Assuming (int) 3.9 becomes 4 — it becomes 3! Java TRUNCATES (drops the decimal part), it does NOT round during narrowing casts.',
        interviewLanguage: '"Widening conversion is implicit and safe — Java automatically promotes smaller types to larger ones. Narrowing requires an explicit cast and risks data loss. For example, (int) 9.9 gives 9, not 10 — Java truncates, not rounds."',
        codeExample: {
          title: 'Widening vs Narrowing Cast',
          code: `public class TypeCasting {
    public static void main(String[] args) {
        // ── WIDENING ── automatic, no cast needed
        int   i = 2500;
        long  l = i;      // int auto-promoted to long
        double d = l;     // long auto-promoted to double
        System.out.println("Widened: " + d); // 2500.0

        // ── NARROWING ── explicit cast required
        double pi     = 3.99999;
        int truncated = (int) pi;  // decimal dropped, NOT rounded!
        System.out.println("Narrowed: " + truncated); // 3, NOT 4!

        // ── OVERFLOW while narrowing ──
        int  big  = 300;
        byte b    = (byte) big; // 300 doesn't fit in byte!
        System.out.println("Byte overflow: " + b); // 44
    }
}`,
          output: 'Widened: 2500.0\nNarrowed: 3\nByte overflow: 44',
          explanation: 'Widening extends the value cleanly. Narrowing drops the fractional part. Casting 300 to byte wraps: 300 % 256 = 44 (byte arithmetic uses modulo 256).',
          interviewNote: 'Top interview questions: "(int) 9.99?" → 9. "(byte) 130?" → -126 (130 - 256 = -126). Memorize the wrap formula: value % 256, then adjust for signed range.',
        },
      },
    ],
    interviewQuestions: [
      {
        question: 'What are the 8 primitive data types in Java?',
        answer: 'byte (1B), short (2B), int (4B), long (8B), float (4B), double (8B), char (2B), boolean (JVM-dependent). All have fixed, platform-independent sizes — unlike C/C++ where sizes can vary by OS.',
        difficulty: 'beginner',
        type: 'conceptual',
      },
      {
        question: 'What is the default value of instance variables for each primitive type?',
        answer: 'byte/short/int/long → 0, float/double → 0.0, char → \'\\u0000\' (null character), boolean → false. Important: LOCAL variables have NO default value — you must initialize them or the compiler throws an error.',
        difficulty: 'intermediate',
        type: 'conceptual',
      },
      {
        question: 'Is String a primitive data type in Java?',
        answer: 'No. String is a class in the java.lang package — it is a reference (non-primitive) type. Although literals like "hello" and the String Pool give it special syntax, it is still an object created on the heap.',
        difficulty: 'beginner',
        type: 'conceptual',
      },
      {
        question: 'What is the output of: byte b = 127; b++; System.out.println(b);',
        answer: '-128. When byte\'s maximum value (127) is incremented, it overflows and wraps around to the minimum value (-128). This is integer overflow — Java does NOT throw an exception, it silently wraps.',
        difficulty: 'tricky',
        type: 'output',
      },
      {
        question: 'Why does 0.1 + 0.2 not equal 0.3 in Java?',
        answer: 'Because floating-point numbers (float/double) use binary fractions. 0.1 cannot be represented exactly in binary — it\'s an infinitely repeating binary fraction, similar to 1/3 in decimal. The approximation causes tiny errors. Use BigDecimal for exact decimal arithmetic.',
        difficulty: 'intermediate',
        type: 'conceptual',
      },
    ],
    quizQuestions: [
      {
        id: 'dt-q1',
        question: 'Which is the default integer type in Java?',
        options: ['byte', 'short', 'int', 'long'],
        answer: 2,
        explanation: 'int is the default integer type — when you write a literal like 42, Java treats it as int. Append L for long literals.',
        difficulty: 'easy',
      },
      {
        id: 'dt-q2',
        question: 'What is the output of: System.out.println((int) 7.9);',
        options: ['7', '8', '7.9', 'Compilation Error'],
        answer: 0,
        explanation: 'Java truncates (does NOT round) during narrowing cast. (int) 7.9 drops the .9 and gives 7.',
        difficulty: 'easy',
      },
      {
        id: 'dt-q3',
        question: 'Which correctly declares a float variable?',
        options: ['float f = 3.14;', 'float f = 3.14F;', 'float f = 3.14D;', 'float f = double(3.14);'],
        answer: 1,
        explanation: '3.14 is a double literal by default. To assign it to float, use the F suffix: 3.14F. Without it, the compiler throws a "possible lossy conversion" error.',
        difficulty: 'easy',
      },
      {
        id: 'dt-q4',
        question: 'What is the output of: byte b = 127; b++; System.out.println(b);',
        options: ['128', '-128', '127', 'Compilation Error'],
        answer: 1,
        explanation: 'Incrementing byte beyond its max (127) wraps around to its min (-128). This is integer overflow — Java does not throw an exception, it silently wraps.',
        difficulty: 'medium',
      },
      {
        id: 'dt-q5',
        question: 'How many bytes does a char occupy in Java?',
        options: ['1 byte', '2 bytes', '4 bytes', 'Depends on OS'],
        answer: 1,
        explanation: 'Java uses UTF-16 encoding — char is always 2 bytes (16 bits), holding Unicode values from 0 to 65535. Unlike C where char is 1 byte.',
        difficulty: 'medium',
      },
      {
        id: 'dt-q6',
        question: 'Which statement about boolean in Java is TRUE?',
        options: [
          'boolean is 1 byte',
          'You can cast boolean to int (true=1, false=0)',
          'boolean can only be true or false — no int casting',
          'boolean is 4 bytes like in C',
        ],
        answer: 2,
        explanation: 'Java booleans have NO numeric equivalent. Unlike C/C++, you cannot cast true to 1 or compare boolean to an integer. The size is JVM-dependent.',
        difficulty: 'medium',
      },
      {
        id: 'dt-q7',
        question: 'What is the output of: System.out.println(\'A\' + 1);',
        options: ['A1', 'B', '66', 'Compilation Error'],
        answer: 2,
        explanation: 'char arithmetic promotes to int. \'A\' is Unicode 65. 65 + 1 = 66. To get \'B\', cast back: (char)(\'A\' + 1).',
        difficulty: 'tricky',
      },
      {
        id: 'dt-q8',
        question: 'Which of these is a widening conversion (automatic, no cast needed)?',
        options: ['double → int', 'long → short', 'int → long', 'float → byte'],
        answer: 2,
        explanation: 'Widening goes from smaller to larger: byte → short → int → long → float → double. int → long is a safe widening — done automatically.',
        difficulty: 'medium',
      },
      {
        id: 'dt-q9',
        question: 'What is the result of: long x = 10000000000; without the L suffix?',
        options: [
          'Stores 10000000000 as long',
          'Compilation error — integer literal too large',
          'Runtime overflow',
          'Stored as double automatically',
        ],
        answer: 1,
        explanation: '10000000000 exceeds int range (±2.1 billion). Without L, Java treats it as an int literal and gives a compile-time error. Write 10000000000L to fix it.',
        difficulty: 'tricky',
      },
    ],

  },


  // ─────────────────────────────────────────────
  // 3. STRINGS (FULLY DETAILED)
  // ─────────────────────────────────────────────
  {
    id: 'strings',
    slug: 'strings',
    title: 'Strings',
    tagline: 'Java\'s Most Interview-Tested Topic — Nail It!',
    description:
      'Strings in Java are not just text — they\'re immutable objects living in a special memory zone called the String Pool. Understanding how Java handles strings separates good developers from great ones in every interview.',
    category: 'interview-critical',
    difficulty: 'intermediate',
    learningTimeMin: 35,
    icon: '🧵',
    color: '#f59e0b',
    gradient: 'from-amber-400 to-orange-500',
    visualizerType: 'memory',
    whatInterviewerWantsToHear:
      'Any interviewer asking about Strings wants to hear about immutability, the String Pool, the difference between == and .equals(), and when to use StringBuilder vs StringBuffer.',
    best30SecAnswer:
      'In Java, String is an immutable class. When you create a String literal, it goes into the String Pool in the heap — if the same string already exists, Java reuses it. Using == compares references (memory addresses), while .equals() compares actual content. For frequent modifications, we use StringBuilder (faster, not thread-safe) or StringBuffer (slower, thread-safe).',
    topCommonWrongAnswer:
      '"String is a primitive type" — absolutely wrong. Also saying "== compares content" — it compares references, not values.',
    subtopics: [
      {
        id: 'string-creation',
        title: 'Two Ways to Create Strings',
        definition:
          'You can create a String via a literal ("hello") or via the new keyword. The difference is where Java stores them in memory.',
        simpleExplanation:
          'String literal: Java checks the String Pool first. If "hello" already exists, it reuses the same reference.\nnew String("hello"): Always creates a brand-new object on the heap, outside the pool — even if an identical string exists.',
        analogy:
          'String literal = looking up a shared word in a dictionary (one copy for everyone). new String() = printing your own personal copy of that same word.',
        oneLineRevision: 'Literal → goes to pool (shared). new String() → always creates a fresh heap object.',
        commonMistake:
          'Using == to compare strings created with new String() gives false even if content is identical — because they\'re different objects.',
        interviewLanguage:
          '"String literals are stored in the String Pool to save memory via reuse. new String() bypasses the pool and always allocates new heap space — so == will return false between a literal and a new String() even with identical content."',
        codeExample: {
          title: 'String Pool vs Heap',
          code: `public class StringCreation {
    public static void main(String[] args) {
        // Literal → goes to String Pool
        String a = "Java";
        String b = "Java";  // reuses same pool object
        
        // new keyword → always new heap object
        String c = new String("Java");
        String d = new String("Java");
        
        System.out.println(a == b);      // true  (same pool reference)
        System.out.println(a == c);      // false (pool vs heap)
        System.out.println(c == d);      // false (different heap objects)
        System.out.println(c.equals(d)); // true  (content is same)
    }
}`,
          output: 'true\nfalse\nfalse\ntrue',
          explanation:
            'Literals share references in the pool. new String() creates separate heap objects each time. Always use .equals() for content comparison.',
          interviewNote:
            'Top interview trap: What does String a = "Java"; String b = "Java"; a == b return? Answer: true — because both point to the same String Pool object.',
        },
      },
      {
        id: 'immutability',
        title: 'String Immutability',
        definition:
          'Once created, a String\'s content can never change. Any "modification" actually creates a brand-new String object.',
        simpleExplanation:
          'When you write str = str + " World", Java creates a completely new String object — the original "Hello" still exists (until garbage collected). The variable str now points to the new string.',
        analogy:
          'Immutability is like writing in permanent ink on a stone tablet. To "change" the text, you carve a new tablet. The old tablet still exists — you just moved your finger to the new one.',
        oneLineRevision: 'String in Java = stone tablet. Every "change" carves a new tablet.',
        commonMistake:
          'Thinking "str = str + x" modifies the original str — it doesn\'t! It creates a new object every time, which is why string concatenation in loops is inefficient.',
        interviewLanguage:
          '"Strings in Java are immutable — once created, they can\'t be changed. Operations like concatenation don\'t modify the original; they create new String objects. This makes strings thread-safe by default and enables String Pool optimization."',
        codeExample: {
          title: 'Immutability in Action',
          code: `public class StringImmutability {
    public static void main(String[] args) {
        String s = "Hello";
        System.out.println("Before: " + System.identityHashCode(s)); // memory address
        
        s = s + " World";  // new object created in memory!
        System.out.println("After:  " + System.identityHashCode(s)); // different address!
        
        // Original "Hello" is untouched in memory (until GC)
        System.out.println("Value: " + s);
    }
}`,
          output: 'Before: 1829164700\nAfter:  2018699554\nValue: Hello World',
          explanation:
            'The identity hash codes are different — proof that s now points to a completely new object in memory after concatenation.',
          interviewNote:
            'Interviewers love asking: If strings are immutable, how does String concatenation work? Answer: By creating a new String object each time.',
        },
      },
      {
        id: 'equals-vs-doubleequals',
        title: '== vs .equals() — The Classic Trap',
        definition:
          '== compares the memory addresses (references) of two objects. .equals() compares the actual character-by-character content.',
        simpleExplanation:
          '== asks: "Are you the SAME object?" .equals() asks: "Do you contain the SAME content?"\nFor primitives, == is fine. For any object (including String), always use .equals().',
        analogy:
          '== is comparing two people\'s home addresses — same exact house. .equals() compares their names — same name, even if living in different houses.',
        oneLineRevision: '== = same object, .equals() = same content. Always use .equals() for Strings.',
        commonMistake:
          'Using == instead of .equals() and getting surprised by false results — happens whenever Strings are created with new keyword or come from different sources.',
        interviewLanguage:
          '"== compares references — it checks if two variables point to the exact same memory location. .equals() compares content — it\'s the right tool for checking if two strings have the same characters."',
        codeExample: {
          title: '== vs equals() Demo',
          code: `public class EqualsDemo {
    public static void main(String[] args) {
        String s1 = "Java";          // String Pool
        String s2 = "Java";          // Same pool reference
        String s3 = new String("Java"); // New heap object
        
        // Reference comparison
        System.out.println(s1 == s2);       // true — same pool object
        System.out.println(s1 == s3);       // false — pool vs heap
        
        // Content comparison
        System.out.println(s1.equals(s2));  // true
        System.out.println(s1.equals(s3));  // true — content matches!
        
        // Null-safe comparison (best practice)
        System.out.println("Java".equals(s3)); // true — avoids NullPointerException
    }
}`,
          output: 'true\nfalse\ntrue\ntrue\ntrue',
          explanation:
            'Always use .equals() for string content comparison. Use "literal".equals(variable) to avoid NullPointerException if the variable is null.',
          interviewNote: 'Pro tip: Write "literal".equals(variable) instead of variable.equals("literal") to be null-safe.',
        },
      },
      {
        id: 'string-methods',
        title: 'Essential String Methods',
        definition:
          'String class comes packed with built-in methods that cover almost everything you\'d want to do with text.',
        simpleExplanation:
          'Key methods to know:\n- length(): number of characters\n- charAt(i): character at index i\n- substring(start, end): extract a portion\n- indexOf("x"): position of first occurrence\n- toLowerCase() / toUpperCase()\n- trim(): remove leading/trailing whitespace\n- replace("old", "new")\n- split("delimiter")\n- contains("text")\n- startsWith() / endsWith()',
        oneLineRevision: 'String has 60+ methods — know length(), charAt(), substring(), indexOf(), trim(), and replace().',
        commonMistake:
          'Using substring(start, end) — many students think end is inclusive. It\'s exclusive! substring(0, 4) on "Hello" gives "Hell" not "Hello".',
        interviewLanguage:
          '"String class provides rich utility methods. I\'m most frequently using length(), charAt(), substring(), trim(), and split() in practice. split() returns a String array."',
        codeExample: {
          title: 'Common String Methods',
          code: `public class StringMethods {
    public static void main(String[] args) {
        String str = "  Java Rocks!  ";
        
        System.out.println(str.trim());           // "Java Rocks!"
        System.out.println(str.trim().length());  // 12
        System.out.println(str.trim().toUpperCase()); // "JAVA ROCKS!"
        System.out.println(str.trim().charAt(0)); // 'J'
        
        // Substring — end index is EXCLUSIVE
        System.out.println("Hello".substring(0, 4)); // "Hell" not "Hello"
        
        // Split into array
        String csv = "Alice,Bob,Charlie";
        String[] names = csv.split(",");
        System.out.println(names[1]); // "Bob"
    }
}`,
          output: 'Java Rocks!\n12\nJAVA ROCKS!\nJ\nHell\nBob',
          explanation: 'Each method returns a new String — remember, Strings are immutable. The original str is unchanged.',
        },
      },
      {
        id: 'stringbuilder-stringbuffer',
        title: 'StringBuilder vs StringBuffer',
        definition:
          'StringBuilder and StringBuffer are mutable alternatives to String — they allow in-place modifications without creating new objects.',
        simpleExplanation:
          'StringBuilder — fast, not thread-safe — use in single-threaded code. StringBuffer — slower (synchronized), thread-safe — use in multi-threaded code.\nBoth have: append(), insert(), delete(), reverse(), toString().',
        analogy:
          'String is a stone tablet (recarve = new tablet). StringBuilder is a whiteboard (erasable, fast). StringBuffer is a whiteboard with a lock (slower, but two people can use it safely).',
        oneLineRevision:
          'StringBuilder = fast + not thread-safe. StringBuffer = slower + thread-safe. Both are mutable.',
        commonMistake:
          'Using String concatenation (+=) inside loops when StringBuilder should be used. Each += creates a new String object — O(n²) memory in loops!',
        interviewLanguage:
          '"Whenever we need frequent modifications to strings, especially in loops, StringBuilder is the right choice over String concatenation because String is immutable and concatenation creates a new object every time. StringBuffer is preferred in multi-threaded scenarios due to synchronization."',
        codeExample: {
          title: 'StringBuilder vs String Concatenation',
          code: `public class StringBuilderDemo {
    public static void main(String[] args) {
        // BAD: String += in loop — creates many objects!
        String bad = "";
        for (int i = 0; i < 5; i++) {
            bad += i;  // new String each iteration
        }
        
        // GOOD: StringBuilder — modifies in place
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 5; i++) {
            sb.append(i);  // reuses same object
        }
        
        System.out.println("Bad:  " + bad);    // 01234
        System.out.println("Good: " + sb.toString()); // 01234
        
        // StringBuilder methods
        sb.reverse();
        System.out.println("Reversed: " + sb); // 43210
        
        sb.insert(2, "-");
        System.out.println("Inserted: " + sb); // 43-210
    }
}`,
          output: 'Bad:  01234\nGood: 01234\nReversed: 43210\nInserted: 43-210',
          explanation:
            'StringBuilder modifies itself in place — much more efficient than String concatenation in loops.',
          interviewNote:
            'Critical interview point: Why use StringBuilder in loops? String + in loop = O(n²) memory. StringBuilder.append() = O(n). Always use StringBuilder for building strings dynamically.',
        },
      },
    ],
    interviewQuestions: [
      {
        question: 'Why is String immutable in Java?',
        answer:
          'Three main reasons: 1) Security — String is used in class loading, network connections, and database connections. If mutable, a malicious class could alter these after validation. 2) String Pool efficiency — immutability allows safe sharing of String literals across multiple references. 3) Thread safety — immutable objects are inherently thread-safe, requiring no synchronization.',
        difficulty: 'intermediate',
        type: 'conceptual',
      },
      {
        question: 'What is the String Pool?',
        answer:
          'The String Pool (or String Intern Pool) is a special memory area inside the Java heap where String literals are stored. When you create a String literal like "Java", JVM first checks if "Java" already exists in the pool. If it does, the same reference is returned. If not, a new String is created in the pool. This saves memory by avoiding duplicate string objects.',
        difficulty: 'intermediate',
        type: 'conceptual',
      },
      {
        question: 'What is the output? String s = "Hello"; s.concat(" World"); System.out.println(s);',
        answer:
          '"Hello" — because strings are immutable. concat() creates a NEW string but you never assigned it back. s still references the original "Hello". The correct usage is: s = s.concat(" World");',
        difficulty: 'tricky',
        type: 'output',
      },
      {
        question: 'When should you use StringBuffer over StringBuilder?',
        answer:
          'Only in multi-threaded environments where multiple threads might modify the same string object simultaneously. StringBuffer methods are synchronized, making them thread-safe at the cost of performance. In single-threaded code, always prefer StringBuilder.',
        difficulty: 'intermediate',
        type: 'scenario',
      },
      {
        question: 'What is String interning?',
        answer:
          'String interning is the process of adding a String to the String Pool (or retrieving the pool reference if it already exists). You can explicitly intern any String using String.intern(). For example: String s = new String("Java").intern(); now s points to the pool reference, not the heap object.',
        difficulty: 'tricky',
        type: 'conceptual',
      },
    ],
    quizQuestions: [
      {
        id: 'str-q1',
        question: 'What does String s1 = "Java"; String s2 = "Java"; System.out.println(s1 == s2); print?',
        options: ['false', 'true', 'Compilation Error', 'NullPointerException'],
        answer: 1,
        explanation: 'Both s1 and s2 are literals that go to the String Pool. Java reuses the same pool reference, so == returns true.',
        difficulty: 'easy',
      },
      {
        id: 'str-q2',
        question: 'Which is mutable?',
        options: ['String', 'String[]', 'StringBuilder', 'All of these'],
        answer: 2,
        explanation: 'StringBuilder is mutable — you can modify its content without creating a new object. String itself is immutable.',
        difficulty: 'easy',
      },
      {
        id: 'str-q3',
        question: '"Hello".substring(1, 3) returns?',
        options: ['Hel', 'el', 'ell', 'ello'],
        answer: 1,
        explanation: 'substring(start, end) — end is exclusive. Characters at index 1 and 2 ("e" and "l") = "el".',
        difficulty: 'easy',
      },
      {
        id: 'str-q4',
        question: 'Which method adds a string to the String Pool?',
        options: ['concat()', 'toString()', 'intern()', 'valueOf()'],
        answer: 2,
        explanation: 'intern() adds the string to the String Pool or returns the existing pool reference if it already exists.',
        difficulty: 'medium',
      },
      {
        id: 'str-q5',
        question: 'What does: String s = "Hello"; s.concat(" World"); System.out.println(s); print?',
        options: ['Hello World', 'Hello', 'null', 'Compilation Error'],
        answer: 1,
        explanation: 'Strings are immutable. concat() returns a new String but we never captured it. s still points to "Hello".',
        difficulty: 'medium',
      },
      {
        id: 'str-q6',
        question: 'Which is thread-safe between StringBuilder and StringBuffer?',
        options: ['StringBuilder', 'StringBuffer', 'Both are thread-safe', 'Neither is thread-safe'],
        answer: 1,
        explanation: 'StringBuffer methods are synchronized — thread-safe but slower. StringBuilder is faster but not synchronized — use in single-threaded code.',
        difficulty: 'medium',
      },
      {
        id: 'str-q7',
        question: 'String s = new String("Hello"); places the string:',
        options: [
          'Only in the String Pool',
          'Only in the heap (outside pool)',
          'Both in pool and heap',
          'In stack memory',
        ],
        answer: 1,
        explanation: 'new String() always creates a new heap object outside the pool. The literal "Hello" in the constructor call does go to the pool, but the new String() reference points to a separate heap copy.',
        difficulty: 'tricky',
      },
      {
        id: 'str-q8',
        question: 'What is the time complexity of String + concatenation in a loop of n iterations?',
        options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(1)'],
        answer: 2,
        explanation: 'Each + creates a new String by copying all characters — O(1+2+...+n) = O(n²). Use StringBuilder.append() for O(n) total.',
        difficulty: 'tricky',
      },
      {
        id: 'str-q9',
        question: 'Which comparison is null-safe and won\'t throw NullPointerException?',
        options: ['s.equals("Java")', '"Java".equals(s)', 's == "Java"', 's.compareTo("Java")'],
        answer: 1,
        explanation: '"Java".equals(s) is null-safe — "Java" is never null. If s is null, .equals() returns false instead of throwing NPE. Calling s.equals() when s is null throws NPE.',
        difficulty: 'tricky',
      },
    ],

  },

  // ─────────────────────────────────────────────
  // 4. POLYMORPHISM (FULLY DETAILED)
  // ─────────────────────────────────────────────
  {
    id: 'polymorphism',
    slug: 'polymorphism',
    title: 'Polymorphism',
    tagline: 'One Reference — Infinite Behaviors',
    description:
      'Polymorphism is Java\'s ability to treat objects of different types through a common interface, letting the same code work with many object types. It\'s the most-asked OOP concept in interviews — know it cold.',
    category: 'oop',
    difficulty: 'intermediate',
    learningTimeMin: 40,
    icon: '🎭',
    color: '#8b5cf6',
    gradient: 'from-violet-500 to-purple-700',
    visualizerType: 'hierarchy',
    whatInterviewerWantsToHear:
      'Interviewers want to hear the precise difference between compile-time and runtime polymorphism, how dynamic dispatch works, and real-world use cases.',
    best30SecAnswer:
      'Polymorphism means "many forms." In Java, it comes in two types: compile-time (method overloading — resolved at compile time based on method signature) and runtime (method overriding with dynamic dispatch — resolved at runtime based on the actual object type). Runtime polymorphism is the more powerful form and is achieved through inheritance and interface implementation.',
    topCommonWrongAnswer:
      'Saying "overloading and overriding are the same" or confusing which one is compile-time vs runtime.',
    subtopics: [
      {
        id: 'compile-time-poly',
        title: 'Compile-Time Polymorphism (Method Overloading)',
        definition:
          'When multiple methods in the same class share the same name but have different parameter lists — the compiler decides which one to call based on the method signature.',
        simpleExplanation:
          'Think of a print() method that handles int, double, and String. The compiler looks at what you\'re passing and picks the right version before the program even runs.',
        analogy:
          'Like a Swiss Army knife — same tool name (knife), different blades for different jobs. You pick the right blade at the start, not mid-use.',
        oneLineRevision: 'Overloading = same name, different signatures, resolved at compile time.',
        commonMistake:
          'Thinking return type alone distinguishes overloaded methods — it doesn\'t. void add(int) and int add(int) causes a compilation error.',
        interviewLanguage:
          '"Compile-time polymorphism is achieved through method overloading — the correct method is chosen at compile time based on the number, type, and order of parameters. Return type cannot distinguish overloaded methods."',
        codeExample: {
          title: 'Method Overloading Example',
          code: `public class Calculator {
    
    // Same method name, different parameters
    int add(int a, int b) {
        return a + b;
    }
    
    double add(double a, double b) {
        return a + b;
    }
    
    int add(int a, int b, int c) {
        return a + b + c;
    }
    
    public static void main(String[] args) {
        Calculator c = new Calculator();
        System.out.println(c.add(1, 2));       // calls int version → 3
        System.out.println(c.add(1.5, 2.5));   // calls double version → 4.0
        System.out.println(c.add(1, 2, 3));    // calls 3-param version → 6
    }
}`,
          output: '3\n4.0\n6',
          explanation:
            'The compiler sees the argument types and counts at each call site and binds to the correct method version — this binding happens before program execution.',
          interviewNote:
            'Ask: Is overloading resolved at compile-time or runtime? Always: compile-time (static binding).',
        },
      },
      {
        id: 'runtime-poly',
        title: 'Runtime Polymorphism (Method Overriding)',
        definition:
          'When a subclass provides its own implementation of a method already defined in the parent class — the JVM decides which version to call at runtime based on the actual object type.',
        simpleExplanation:
          'A parent class reference can point to a child class object. When you call an overridden method through that parent reference, Java calls the child\'s version — not the parent\'s. This decision happens at runtime.',
        analogy:
          'You call "speak!" to any of your pets. A Dog barks, a Cat meows, a Bird chirps. Same command, different behavior depending on the actual creature.',
        oneLineRevision: 'Overriding = same signature in parent and child, JVM picks child\'s version at runtime.',
        commonMistake:
          'Thinking that using a parent reference will call the parent\'s method — if the child overrides it, the child\'s method runs. That\'s runtime polymorphism.',
        interviewLanguage:
          '"Runtime polymorphism is achieved through method overriding and dynamic method dispatch. A parent reference holds a child object, and when an overridden method is called, JVM resolves it at runtime to the overriding method in the actual object\'s class."',
        codeExample: {
          title: 'Runtime Polymorphism — Dynamic Dispatch',
          code: `class Animal {
    // Parent method that can be overridden
    void speak() {
        System.out.println("Animal speaks...");
    }
}

class Dog extends Animal {
    @Override
    void speak() {
        System.out.println("Dog says: Woof!");
    }
}

class Cat extends Animal {
    @Override
    void speak() {
        System.out.println("Cat says: Meow!");
    }
}

public class PolymorphismDemo {
    public static void main(String[] args) {
        // Parent reference → child object (Upcasting)
        Animal a1 = new Dog();  // Dog object, Animal reference
        Animal a2 = new Cat();  // Cat object, Animal reference
        Animal a3 = new Animal(); // Animal object
        
        a1.speak(); // Calls Dog's speak() — resolved at runtime!
        a2.speak(); // Calls Cat's speak() — resolved at runtime!
        a3.speak(); // Calls Animal's speak()
    }
}`,
          output: 'Dog says: Woof!\nCat says: Meow!\nAnimal speaks...',
          explanation:
            'Even though all references are of type Animal, Java looks at the actual object type at runtime and calls the correct overridden method.',
          interviewNote:
            'This is called Dynamic Method Dispatch — the JVM dynamically dispatches the method call to the actual object\'s class. It\'s the backbone of polymorphism in Java.',
        },
      },
      {
        id: 'upcasting-downcasting',
        title: 'Upcasting and Downcasting',
        definition:
          'Upcasting = storing a child object in a parent reference. Downcasting = getting the child reference back from a parent reference.',
        simpleExplanation:
          'Upcasting is safe and automatic. Downcasting requires explicit cast and can throw ClassCastException if the actual object is not of the expected subtype.',
        analogy:
          'Upcasting: A racing car (Dog) parked under "Vehicle" (Animal) label — always safe. Downcasting: Assuming a "Vehicle" is a racing car — sometimes wrong!',
        oneLineRevision: 'Upcasting = auto, safe. Downcasting = manual, risky — use instanceof first.',
        commonMistake:
          'Downcasting without instanceof check — leads to ClassCastException at runtime if the actual object type doesn\'t match.',
        interviewLanguage:
          '"Upcasting is implicit and safe — child always IS a parent. Downcasting should always be guarded with instanceof to prevent ClassCastException."',
        codeExample: {
          title: 'Upcasting and Safe Downcasting',
          code: `class Animal { void speak() { System.out.println("Animal!"); } }
class Dog extends Animal { void fetch() { System.out.println("Fetching!"); } }

public class CastingDemo {
    public static void main(String[] args) {
        // Upcasting — automatic
        Animal a = new Dog();  // Dog IS-An Animal
        a.speak();             // works fine
        // a.fetch();          // ERROR! Animal ref can't see Dog-specific methods
        
        // Safe Downcasting with instanceof
        if (a instanceof Dog) {
            Dog d = (Dog) a;  // explicit downcast
            d.fetch();         // now we can access Dog's method
        }
        
        // Dangerous: what if actual object is not a Dog?
        Animal cat = new Animal();
        // Dog d2 = (Dog) cat; // ClassCastException at runtime!
    }
}`,
          output: 'Animal!\nFetching!',
          explanation:
            'Always use instanceof before downcasting. Java 16+ has pattern matching: if (a instanceof Dog d) { d.fetch(); } — cleaner and safer.',
        },
      },
      {
        id: 'poly-real-world',
        title: 'Real-World Polymorphism',
        definition:
          'Polymorphism is what makes frameworks, plugins, and extensible code possible — new behavior without changing existing code.',
        simpleExplanation:
          'Payment example: A ShoppingCart can call payment.pay() regardless of whether payment is CreditCard, UPI, or NetBanking — all implement the same interface. Adding a new payment method doesn\'t require changing ShoppingCart.',
        analogy: 'A TV remote works the same regardless of which TV brand is plugged in — because all TVs follow the "TV interface."',
        oneLineRevision: 'Polymorphism = write once, work with many types — the foundation of extensible design.',
        commonMistake:
          'Not leveraging polymorphism — instead using long if-else or switch chains to check types. Polymorphism eliminates this.',
        interviewLanguage:
          '"In real projects, polymorphism allows you to write code against abstractions. For example, my ShoppingCart only knows about a Payment interface. Whether it\'s UPI or Credit Card, the cart doesn\'t need to change. New payment type = new class implementing Payment. That\'s the Open-Closed Principle in action."',
        codeExample: {
          title: 'Polymorphism in Real World (Payment System)',
          code: `// Payment interface — the common abstraction
interface Payment {
    void pay(double amount);
}

class CreditCard implements Payment {
    public void pay(double amount) {
        System.out.println("Paid ₹" + amount + " via Credit Card");
    }
}

class UPI implements Payment {
    public void pay(double amount) {
        System.out.println("Paid ₹" + amount + " via UPI");
    }
}

class ShoppingCart {
    // Accepts ANY Payment type — polymorphism!
    void checkout(Payment payment, double amount) {
        payment.pay(amount);  // runtime dispatch to actual type
    }
}

public class PaymentDemo {
    public static void main(String[] args) {
        ShoppingCart cart = new ShoppingCart();
        cart.checkout(new CreditCard(), 1499.00);
        cart.checkout(new UPI(), 999.00);
    }
}`,
          output: 'Paid ₹1499.0 via Credit Card\nPaid ₹999.0 via UPI',
          explanation:
            'ShoppingCart.checkout() works with any Payment type without modification. Adding Bitcoin? Just create a new class implementing Payment.',
          interviewNote:
            'This is the power of programming to an interface (abstraction) — enabled entirely by runtime polymorphism.',
        },
      },
    ],
    interviewQuestions: [
      {
        question: 'What is the difference between method overloading and overriding?',
        answer:
          'Overloading is compile-time polymorphism — same method name, different parameter lists, within the same class. Overriding is runtime polymorphism — same method name and signature, in a parent and child class. Overloading is resolved by compiler. Overriding is resolved by JVM at runtime based on actual object type.',
        difficulty: 'beginner',
        type: 'difference',
      },
      {
        question: 'Can we override a static method in Java?',
        answer:
          'No — static methods belong to the class, not instances, so they can\'t be overridden. If you define a static method with the same name in a child class, it\'s called method hiding, not overriding. Dynamic dispatch doesn\'t apply to static methods.',
        difficulty: 'tricky',
        type: 'conceptual',
      },
      {
        question: 'What is dynamic method dispatch?',
        answer:
          'Dynamic method dispatch is Java\'s mechanism for runtime polymorphism. When you call an overridden method through a parent reference, Java waits until runtime, looks at the actual object type in memory, and dispatches the call to the correct overriding method. This is resolved by the JVM — not the compiler.',
        difficulty: 'intermediate',
        type: 'conceptual',
      },
      {
        question: 'What is the output?\nAnimal a = new Dog();\na.speak();\nDog.speak() prints "Woof", Animal.speak() prints "Roar"',
        answer:
          '"Woof" — because a holds a Dog object. Even though the reference type is Animal, runtime polymorphism ensures Dog\'s speak() is called. This is dynamic method dispatch.',
        difficulty: 'intermediate',
        type: 'output',
      },
      {
        question: 'Can constructors be polymorphic?',
        answer:
          'No — constructors are not inherited and therefore cannot be overridden. However, constructor overloading (multiple constructors with different parameters) is a form of compile-time polymorphism within the same class.',
        difficulty: 'tricky',
        type: 'conceptual',
      },
    ],
    quizQuestions: [
      {
        id: 'poly-q1',
        question: 'Method overloading is an example of which polymorphism?',
        options: ['Runtime polymorphism', 'Compile-time polymorphism', 'Dynamic polymorphism', 'Interface polymorphism'],
        answer: 1,
        explanation: 'Method overloading is resolved at compile time by the compiler based on method signatures — hence compile-time (static) polymorphism.',
        difficulty: 'easy',
      },
      {
        id: 'poly-q2',
        question: 'Animal a = new Dog(); — what is this called?',
        options: ['Downcasting', 'Upcasting', 'Method hiding', 'Method overloading'],
        answer: 1,
        explanation: 'Storing a child object (Dog) in a parent reference (Animal) is called Upcasting. It\'s safe and implicit.',
        difficulty: 'easy',
      },
      {
        id: 'poly-q3',
        question: 'Which keyword enables runtime polymorphism?',
        options: ['static', 'final', '@Override', 'abstract'],
        answer: 2,
        explanation: '@Override ensures method overriding — the mechanism behind runtime polymorphism. Without overriding, there\'s nothing to dispatch dynamically.',
        difficulty: 'easy',
      },
      {
        id: 'poly-q4',
        question: 'Can you override a final method?',
        options: ['Yes', 'No, final prevents overriding', 'Only in abstract classes', 'Only with @Override'],
        answer: 1,
        explanation: 'final methods cannot be overridden — the compiler enforces this. final essentially "seals" the method\'s behavior.',
        difficulty: 'easy',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // REMAINING 10 TOPICS — METADATA ONLY (will expand same format)
  // ─────────────────────────────────────────────
  {
    id: 'methods',
    slug: 'methods',
    title: 'Methods',
    tagline: 'The Smallest, Reusable Units of Logic',
    description: 'Methods are the building blocks of Java logic — named blocks of code that perform specific tasks and can be called repeatedly. Understanding them deeply is the gateway to clean, interview-worthy code.',
    category: 'basics',
    difficulty: 'beginner',
    learningTimeMin: 25,
    icon: '⚙️',
    color: '#06b6d4',
    gradient: 'from-cyan-400 to-blue-500',
    visualizerType: 'flow',
    whatInterviewerWantsToHear: 'Clear understanding of method anatomy, call-by-value, and the difference between instance and static methods.',
    best30SecAnswer: 'A method in Java is a named block of code that performs a specific task and can be reused. It has a return type, name, and parameters. Java always passes arguments by value — even references are passed by value of the reference.',
    topCommonWrongAnswer: 'Saying Java supports call-by-reference — it does NOT. Java is strictly call-by-value.',
    subtopics: [
      {
        id: 'method-declaration',
        title: 'Method Declaration',
        definition: 'A method\'s signature defines what it\'s called, what it accepts, and what it gives back.',
        simpleExplanation: 'Syntax: accessModifier returnType methodName(parameters) { // body }',
        oneLineRevision: 'Method = name + return type + parameters + body.',
        commonMistake: 'Forgetting that void methods cannot use "return value;" — they can only use bare "return;" for early exit.',
        interviewLanguage: '"Every method in Java has a signature — modifier, return type, name, and parameters. The method signature (name + parameters) determines how it\'s identified by the compiler."',
        codeExample: {
          title: 'Method Anatomy',
          code: `public class MethodDemo {
    // Instance method — needs an object to call
    public int square(int n) {    // returns int
        return n * n;
    }
    
    // Static method — called on the class
    public static void greet(String name) {  // returns void
        System.out.println("Hello, " + name + "!");
    }
    
    public static void main(String[] args) {
        // Call static method directly
        greet("Alice");           // Hello, Alice!
        
        // Call instance method via object
        MethodDemo obj = new MethodDemo();
        System.out.println(obj.square(5));  // 25
    }
}`,
          output: 'Hello, Alice!\n25',
          explanation: 'Static methods belong to the class. Instance methods belong to objects.',
        },
      },
      {
        id: 'call-by-value',
        title: 'Call by Value in Java',
        definition: 'Java always passes a COPY of the value — whether it\'s a primitive value or a reference address.',
        simpleExplanation: 'For primitives: the copy is the actual value. For objects: the copy is the reference (address). Reassigning the parameter inside the method doesn\'t affect the original variable.',
        analogy: 'You give someone a photocopy of your map (primitive = value copy, object = reference copy). They can read it, even follow it to the location — but they can\'t change YOUR original map.',
        oneLineRevision: 'Java = always call by value. For objects, the value IS the reference.',
        commonMistake: 'Thinking Java passes objects by reference — modifying object content works, but reassigning the parameter variable doesn\'t affect the original.',
        interviewLanguage: '"Java is strictly call-by-value. For primitives, the actual value is copied. For objects, the reference (memory address) is copied. You can mutate the object\'s state through the copied reference, but you cannot reassign the caller\'s reference variable from inside a method."',
        codeExample: {
          title: 'Call by Value Demo',
          code: `public class CallByValue {
    static void changePrimitive(int x) {
        x = 100;  // changes local copy only!
    }
    
    static void changeObject(int[] arr) {
        arr[0] = 99;  // modifies the actual object!
    }
    
    public static void main(String[] args) {
        int n = 10;
        changePrimitive(n);
        System.out.println(n);  // still 10! original unchanged
        
        int[] nums = {1, 2, 3};
        changeObject(nums);
        System.out.println(nums[0]); // 99! object content changed
    }
}`,
          output: '10\n99',
          explanation: 'Primitive: copy of value — changes don\'t affect original. Object: copy of reference — content can be modified through the reference, but the original variable still points to same object.',
        },
      },
      {
        id: 'static-vs-instance-methods',
        title: 'Static vs Instance Methods',
        definition: 'Static methods belong to the class, while instance methods belong to objects created from that class.',
        simpleExplanation: 'Use static when logic does not depend on object state. Use instance methods when behavior needs object fields.',
        analogy: 'A company helpline number is static (same for everyone). Your personal employee ID is instance-specific.',
        oneLineRevision: 'static = class-level; instance = object-level.',
        commonMistake: 'Accessing instance fields directly inside static methods without creating an object.',
        interviewLanguage: '"Static methods are utility-like and don\'t require object creation. Instance methods operate on per-object state and are invoked on object references."',
        codeExample: {
          title: 'Static vs Instance',
          code: `class Student {
    String name;
    static String school = "JDN Academy";

    Student(String name) { this.name = name; }

    void printProfile() {
        System.out.println(name + " studies at " + school);
    }

    static void printSchool() {
        System.out.println("School: " + school);
    }
}

public class StaticInstanceDemo {
    public static void main(String[] args) {
        Student.printSchool();
        Student s1 = new Student("Asha");
        s1.printProfile();
    }
}`,
          output: 'School: JDN Academy\nAsha studies at JDN Academy',
          explanation: 'printSchool() is called on class directly. printProfile() requires an object because it uses instance field name.',
          interviewNote: 'If a method only uses static data and utility logic, make it static to avoid unnecessary object creation.',
        },
      },
      {
        id: 'return-types-and-void',
        title: 'Return Types and void',
        definition: 'A method either returns a value of declared type or returns nothing using void.',
        simpleExplanation: 'If method is declared int, it must return int. If void, no value is returned to caller.',
        analogy: 'Think of a vending machine: either it gives a product back (return value) or just performs an action (void).',
        oneLineRevision: 'Declared return type and actual returned value must match.',
        commonMistake: 'Missing return statement in non-void method paths causing compilation failure.',
        interviewLanguage: '"Java compiler enforces return type consistency. In non-void methods, every control path must return the declared type."',
        codeExample: {
          title: 'Return Type Safety',
          code: `public class ReturnTypeDemo {
    static int max(int a, int b) {
        if (a > b) return a;
        return b;
    }

    static void printResult(int value) {
        System.out.println("Result = " + value);
    }

    public static void main(String[] args) {
        int m = max(12, 7);
        printResult(m);
    }
}`,
          output: 'Result = 12',
          explanation: 'max() returns an int to caller; printResult() performs output only and returns nothing.',
        },
      },
    ],
    interviewQuestions: [
      { question: 'Does Java support call by reference?', answer: 'No. Java is strictly call-by-value. For objects, the value of the reference (address) is passed. You can modify object state through this copied reference, but cannot reassign the caller\'s variable.', difficulty: 'intermediate', type: 'conceptual' },
      { question: 'What is the difference between a parameter and an argument?', answer: 'Parameters are variables declared in the method definition. Arguments are the actual values passed when calling the method. Parameter = placeholder. Argument = actual data.', difficulty: 'beginner', type: 'difference' },
      { question: 'Can a static method access instance variables directly?', answer: 'No. Static methods execute without an object context, so they cannot directly use instance fields or instance methods. You must create an object first or make the target member static.', difficulty: 'beginner', type: 'conceptual' },
      { question: 'What happens if a non-void method misses a return statement?', answer: 'Compilation fails with "missing return statement" because Java requires every execution path in a non-void method to return the declared type.', difficulty: 'intermediate', type: 'scenario' },
      { question: 'What is method signature in Java?', answer: 'Method signature is method name + parameter list (number/type/order). Return type and access modifiers are not part of the signature for overloading resolution.', difficulty: 'intermediate', type: 'conceptual' },
    ],
    quizQuestions: [
      { id: 'meth-q1', question: 'Java passes objects to methods by:', options: ['Reference', 'Value of the reference', 'Value of the object', 'Pointer'], answer: 1, explanation: 'Java passes the copy of the reference (address) — this is still "by value" — value of the reference.',
        difficulty: 'easy',
      },
      { id: 'meth-q2', question: 'Which method can be called without creating an object?', options: ['Instance method', 'Constructor', 'Static method', 'Abstract method'], answer: 2, explanation: 'Static methods belong to the class, so they can be called as ClassName.method().',
        difficulty: 'easy',
      },
      { id: 'meth-q3', question: 'Which is true for a method declared as void?', options: ['Must return int', 'Cannot be called from main', 'Returns no value to caller', 'Can only be static'], answer: 2, explanation: 'void methods perform actions but do not return a value back to the caller.',
        difficulty: 'easy',
      },
    ],
  },
  {
    id: 'arrays',
    slug: 'arrays',
    title: 'Arrays',
    tagline: 'Fixed-Size, Index-Based Data Storage',
    description: 'Arrays are the foundation of all data structure work in Java. They store elements of the same type in contiguous memory, accessed via zero-based indices.',
    category: 'basics',
    difficulty: 'beginner',
    learningTimeMin: 25,
    icon: '📦',
    color: '#ec4899',
    gradient: 'from-pink-500 to-rose-500',
    visualizerType: 'memory',
    whatInterviewerWantsToHear: 'Array declaration, initialization, traversal, default values, and common pitfalls like ArrayIndexOutOfBoundsException.',
    best30SecAnswer: 'Arrays in Java are fixed-size, homogeneous data structures that store elements in contiguous memory. They\'re zero-indexed, support O(1) access by index, and have a fixed length after creation. All elements are initialized to default values (0 for int, null for objects, false for boolean).',
    topCommonWrongAnswer: 'Saying arrays can resize dynamically — they cannot. Use ArrayList for dynamic sizing.',
    subtopics: [
      {
        id: 'array-declaration',
        title: 'Array Declaration and Initialization',
        definition: 'Arrays must be declared with a type and fixed size. Once created, size cannot change.',
        simpleExplanation: 'int[] arr = new int[5]; // creates array of 5 ints, each 0\nint[] arr = {1,2,3,4,5}; // inline initialization',
        oneLineRevision: 'Arrays: fixed-size, zero-indexed, same-type elements, default values on creation.',
        commonMistake: 'Accessing arr[arr.length] — off-by-one error! Valid indices are 0 to length-1.',
        interviewLanguage: '"Arrays in Java are fixed-size. Declaration creates a reference, initialization allocates memory. Elements default to 0/null/false depending on type."',
        codeExample: {
          title: 'Array Basics',
          code: `public class ArrayDemo {
    public static void main(String[] args) {
        // Declaration and initialization
        int[] scores = new int[3];  // {0, 0, 0} by default
        scores[0] = 95;
        scores[1] = 87;
        scores[2] = 92;
        
        // Inline initialization
        String[] names = {"Alice", "Bob", "Charlie"};
        
        // Traversal
        for (int i = 0; i < scores.length; i++) {
            System.out.println(names[i] + ": " + scores[i]);
        }
        
        // Enhanced for loop
        for (String name : names) {
            System.out.print(name + " ");
        }
    }
}`,
          output: 'Alice: 95\nBob: 87\nCharlie: 92\nAlice Bob Charlie',
          explanation: 'Arrays use 0-based indexing. length property (not method!) gives size. Enhanced for loop is cleaner for read-only traversal.',
          interviewNote: 'Note: array.length is a property (no parentheses). String.length() is a method (with parentheses). Confusing these is a classic mistake!',
        },
      },
      {
        id: 'multidimensional-arrays',
        title: 'Multidimensional Arrays',
        definition: 'A multidimensional array is an array of arrays, commonly used as matrix-like structures.',
        simpleExplanation: 'int[][] marks = new int[2][3]; means 2 rows and 3 columns.',
        analogy: 'A classroom seating chart: row number + column number identifies a seat.',
        oneLineRevision: '2D array = array where each element is another array.',
        commonMistake: 'Assuming all rows have same length always. Java allows jagged arrays (rows can differ).',
        interviewLanguage: '"Java 2D arrays are actually arrays of arrays, so they can be rectangular or jagged depending on row sizes."',
        codeExample: {
          title: '2D Array Traversal',
          code: `public class MatrixDemo {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6}
        };

        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                System.out.print(matrix[i][j] + " ");
            }
            System.out.println();
        }
    }
}`,
          output: '1 2 3 \n4 5 6 ',
          explanation: 'Outer loop iterates rows; inner loop iterates columns in each row.',
        },
      },
      {
        id: 'array-operations',
        title: 'Common Array Operations',
        definition: 'Basic array operations include traversal, search, min/max extraction, and copy.',
        simpleExplanation: 'You loop through an array to inspect or transform values, and use utility methods for sorting/copying.',
        analogy: 'Like checking each shelf in a rack to find one specific item.',
        oneLineRevision: 'Most array logic is loop-driven and index-based.',
        commonMistake: 'Using == for comparing two arrays by content (compares references only).',
        interviewLanguage: '"For arrays, I use Arrays.equals for content comparison and Arrays.sort for in-place sorting. Direct == compares only references."',
        codeExample: {
          title: 'Search and Max',
          code: `import java.util.Arrays;

public class ArrayOps {
    public static void main(String[] args) {
        int[] nums = {7, 2, 9, 4};
        int max = nums[0];
        for (int n : nums) {
            if (n > max) max = n;
        }
        Arrays.sort(nums);
        System.out.println("Max: " + max);
        System.out.println("Sorted: " + Arrays.toString(nums));
    }
}`,
          output: 'Max: 9\nSorted: [2, 4, 7, 9]',
          explanation: 'Enhanced for-loop finds max, and Arrays.sort sorts in ascending order.',
        },
      },
      {
        id: 'array-default-values',
        title: 'Default Values and Memory Behavior',
        definition: 'On creation, Java initializes array elements with default values based on type.',
        simpleExplanation: 'int -> 0, boolean -> false, object -> null.',
        analogy: 'Newly opened spreadsheet cells already have default blank/zero placeholders.',
        oneLineRevision: 'Java never leaves array elements uninitialized.',
        commonMistake: 'Assuming object array elements are objects by default; actually they start as null references.',
        interviewLanguage: '"Array memory is allocated at runtime, and JVM initializes all elements with type-specific defaults to keep behavior deterministic."',
      },
    ],
    interviewQuestions: [
      { question: 'What is the default value of elements in an int array?', answer: '0. Java initializes all array elements to default values: 0 for numeric types, false for boolean, null for Object references.', difficulty: 'beginner', type: 'conceptual' },
      { question: 'What exception is thrown when accessing an invalid array index?', answer: 'ArrayIndexOutOfBoundsException — a runtime exception thrown when you access index < 0 or >= array.length.', difficulty: 'beginner', type: 'conceptual' },
      { question: 'Why are arrays considered fixed-size?', answer: 'Because array memory is allocated as one contiguous block at creation. Size becomes immutable afterward; to "resize", you create a new array and copy data.', difficulty: 'intermediate', type: 'conceptual' },
      { question: 'How is a 2D array represented internally in Java?', answer: 'As an array of references where each element points to another array. That is why row lengths can differ (jagged arrays).', difficulty: 'intermediate', type: 'difference' },
      { question: 'How do you compare array content safely?', answer: 'Use Arrays.equals(arr1, arr2) for 1D arrays and Arrays.deepEquals for nested arrays. Using == only checks whether both references point to the same array object.', difficulty: 'intermediate', type: 'scenario' },
    ],
    quizQuestions: [
      { id: 'arr-q1', question: 'int[] arr = new int[5]; What is arr[2]?', options: ['5', '2', '0', 'null'], answer: 2, explanation: 'New int arrays are initialized with 0 for all elements by default.',
        difficulty: 'easy',
      },
      { id: 'arr-q2', question: 'Valid index range for int[] arr = new int[4] is:', options: ['1 to 4', '0 to 4', '0 to 3', '-1 to 3'], answer: 2, explanation: 'Arrays are zero-indexed, so last valid index is length - 1.',
        difficulty: 'easy',
      },
      { id: 'arr-q3', question: 'Which utility compares array content correctly?', options: ['arr1 == arr2', 'arr1.equals(arr2)', 'Arrays.equals(arr1, arr2)', 'Objects.hash(arr1, arr2)'], answer: 2, explanation: 'Arrays.equals compares elements one by one for content equality.',
        difficulty: 'easy',
      },
    ],
  },
  {
    id: 'method-overloading',
    slug: 'method-overloading',
    title: 'Method Overloading',
    tagline: 'Same Name, Smarter Behavior',
    description: 'Method overloading lets you define multiple methods with the same name but different parameters — a core example of compile-time polymorphism and clean API design.',
    category: 'oop',
    difficulty: 'beginner',
    learningTimeMin: 20,
    icon: '🔀',
    color: '#14b8a6',
    gradient: 'from-teal-400 to-cyan-600',
    visualizerType: 'comparison',
    whatInterviewerWantsToHear: 'That you know overloading is compile-time polymorphism, resolved by method signatures, and that return type alone cannot distinguish overloaded methods.',
    best30SecAnswer: 'Method overloading means having multiple methods with the same name but different parameter lists in the same class. The compiler resolves which method to call at compile time based on the number, type, and order of arguments. Return type alone cannot be used to overload — it\'s not part of the method signature.',
    topCommonWrongAnswer: 'Thinking return type can overload methods — compiler uses only method name + parameters for signature.',
    subtopics: [
      {
        id: 'overloading-rules',
        title: 'Rules of Overloading',
        definition: 'Two methods are overloaded when they have the same name but differ in parameter count, type, or order.',
        simpleExplanation: 'Valid: add(int,int) and add(double,double) and add(int,int,int)\nInvalid: int add(int,int) and double add(int,int) — same signature, different return type.',
        oneLineRevision: 'Overloading rule: same name, different parameters (count, type, or order).',
        commonMistake: 'Trying to overload by changing only the return type — compilation error!',
        interviewLanguage: '"Overloading works only when method signatures differ. Signature = method name + parameter list. Return type is NOT part of the signature."',
        codeExample: {
          title: 'Overloading Examples',
          code: `public class Overloading {
    static int add(int a, int b) { return a + b; }
    static double add(double a, double b) { return a + b; }
    static int add(int a, int b, int c) { return a + b + c; }
    // static double add(int a, int b) { return a+b; } // ERROR! Same sig as first
    
    public static void main(String[] args) {
        System.out.println(add(1, 2));        // 3   — int version
        System.out.println(add(1.1, 2.2));    // 3.3 — double version
        System.out.println(add(1, 2, 3));     // 6   — 3-param version
    }
}`,
          output: '3\n3.3000000000000003\n6',
          explanation: 'Compiler picks the matching version. Floating point arithmetic causes the 3.3000... result — a common Java gotcha.',
        },
      },
      {
        id: 'compile-time-resolution',
        title: 'Compile-Time Method Resolution',
        definition: 'In overloading, compiler decides the method to call before program runs.',
        simpleExplanation: 'Decision is based on argument types available at compile time, not runtime object type.',
        analogy: 'Reception desk routes your call using the number you dialed, not who eventually picks up.',
        oneLineRevision: 'Overloading dispatch is compile-time, not runtime.',
        commonMistake: 'Mixing overloading with overriding and expecting runtime dispatch.',
        interviewLanguage: '"Overloading is static binding. Compiler resolves the most specific applicable method during compilation."',
      },
      {
        id: 'type-promotion-in-overloading',
        title: 'Type Promotion and Ambiguity',
        definition: 'If exact overload is absent, Java applies widening conversion or boxing to choose a method.',
        simpleExplanation: 'int can widen to long, float, double. But ambiguous matches lead to compilation error.',
        analogy: 'If exact shirt size is unavailable, store gives nearest larger fit; if two fits are equally plausible, decision fails.',
        oneLineRevision: 'Overloading may use promotion, but ambiguity causes compile-time failure.',
        commonMistake: 'Assuming Java will always "guess" correctly when two overloads are equally good.',
        interviewLanguage: '"Java overload resolution priority is exact match, then widening, then boxing/varargs. Ambiguous candidates are rejected at compile time."',
        codeExample: {
          title: 'Ambiguous Overload',
          code: `public class PromotionDemo {
    static void show(long x) { System.out.println("long"); }
    static void show(float x) { System.out.println("float"); }

    public static void main(String[] args) {
        // show(10); // chooses long (widening int -> long)
        show(10L);
        show(10f);
    }
}`,
          output: 'long\nfloat',
          explanation: 'Compiler maps each call to the closest matching method by conversion rules.',
        },
      },
      {
        id: 'constructor-overloading',
        title: 'Constructor Overloading',
        definition: 'Constructors can also be overloaded to support multiple object initialization styles.',
        simpleExplanation: 'You can define Student(), Student(String), Student(String,int) etc.',
        analogy: 'One product with different packaging options for different customer needs.',
        oneLineRevision: 'Constructors can be overloaded for flexible object creation.',
        commonMistake: 'Duplicating initialization logic instead of chaining constructors using this(...).',
        interviewLanguage: '"Constructor overloading improves readability by offering multiple initialization paths while centralizing setup logic with constructor chaining."',
      },
    ],
    interviewQuestions: [
      { question: 'Can you overload methods by changing only the return type?', answer: 'No! Return type is not part of the method signature. Two methods with the same name and parameters but different return types cause a compilation error.', difficulty: 'beginner', type: 'conceptual' },
      { question: 'How does compiler choose overloaded methods?', answer: 'Compiler uses static type information and selects the most specific applicable overload at compile time. Exact match is preferred over widening/boxing/varargs.', difficulty: 'intermediate', type: 'conceptual' },
      { question: 'What is ambiguous method call in overloading?', answer: 'When two or more overloads are equally valid and compiler cannot determine a most specific method, it reports compile-time ambiguity error.', difficulty: 'tricky', type: 'scenario' },
      { question: 'Can constructors be overloaded?', answer: 'Yes. Constructors with different parameter lists are valid overloads and are commonly used to support multiple initialization flows.', difficulty: 'beginner', type: 'conceptual' },
      { question: 'Is overloading runtime polymorphism?', answer: 'No. Overloading is compile-time polymorphism (static binding). Runtime polymorphism comes from overriding.', difficulty: 'intermediate', type: 'difference' },
    ],
    quizQuestions: [
      { id: 'ol-q1', question: 'Which change is valid for method overloading?', options: ['Change return type only', 'Change parameter type', 'Change access modifier', 'Change method body'], answer: 1, explanation: 'Only parameter changes (count, type, or order) constitute valid overloading.',
        difficulty: 'easy',
      },
      { id: 'ol-q2', question: 'Overloading is resolved at:', options: ['Runtime', 'Compile time', 'Class loading time', 'JIT time'], answer: 1, explanation: 'Overloading uses static binding and is resolved by the compiler.',
        difficulty: 'easy',
      },
      { id: 'ol-q3', question: 'Which pair is valid overload?', options: ['sum(int,int) and sum(int,int)', 'sum(int,int) and sum(long,long)', 'sum(int,int) and int sum(int,int)', 'sum() and sum()'], answer: 1, explanation: 'Changing parameter types creates a different method signature, making it valid overload.',
        difficulty: 'easy',
      },
    ],
  },
  {
    id: 'encapsulation',
    slug: 'encapsulation',
    title: 'Encapsulation',
    tagline: 'Lock Your Data. Control the Keys.',
    description: 'Encapsulation is the OOP principle of bundling data (fields) and behavior (methods) inside a class while restricting direct outside access. It\'s the foundation of clean, secure Java class design.',
    category: 'oop',
    difficulty: 'beginner',
    learningTimeMin: 25,
    icon: '🔒',
    color: '#f97316',
    gradient: 'from-orange-400 to-red-500',
    visualizerType: 'comparison',
    whatInterviewerWantsToHear: 'That encapsulation = data hiding via private fields + controlled access via public getters/setters, and WHY this matters in real applications.',
    best30SecAnswer: 'Encapsulation bundles data and methods into a class while restricting direct access to the data. Fields are made private, and access is provided through public getters and setters. This prevents invalid states, enables validation, and makes code maintainable.',
    topCommonWrongAnswer: 'Saying encapsulation is just "using private" — it\'s about controlled access + data validation + bundling.',
    subtopics: [
      {
        id: 'private-fields',
        title: 'Private Fields and Getters/Setters',
        definition: 'Making fields private and providing controlled access through public getter/setter methods.',
        simpleExplanation: 'private field = locked data. Getter = read-only window. Setter = controlled write door that validates input.',
        analogy: 'A bank account balance. You can\'t directly grab money — you go through a teller (getter/setter) who validates every transaction.',
        oneLineRevision: 'private field + public getter/setter = encapsulation in practice.',
        commonMistake: 'Creating setters that accept any value without validation — defeats the purpose of encapsulation.',
        interviewLanguage: '"Encapsulation means making fields private so they can\'t be directly accessed or modified, then providing getters and setters that enforce business rules."',
        codeExample: {
          title: 'Encapsulated BankAccount',
          code: `public class BankAccount {
    private double balance;  // locked!
    private String owner;
    
    public BankAccount(String owner, double balance) {
        this.owner = owner;
        this.balance = (balance >= 0) ? balance : 0; // validate at construction
    }
    
    // Getter — read only
    public double getBalance() { return balance; }
    
    // Setter with validation
    public void deposit(double amount) {
        if (amount > 0) balance += amount;
        else System.out.println("Invalid deposit amount!");
    }
    
    public static void main(String[] args) {
        BankAccount acc = new BankAccount("Alice", 1000);
        acc.deposit(500);
        System.out.println("Balance: " + acc.getBalance()); // 1500.0
        acc.deposit(-100);  // Invalid!
        // acc.balance = -999; // ERROR! private field
    }
}`,
          output: 'Balance: 1500.0\nInvalid deposit amount!',
          explanation: 'The setter (deposit) validates before modifying balance. Direct access to balance is blocked by private.',
        },
      },
      {
        id: 'validation-through-setters',
        title: 'Validation Through Setters',
        definition: 'Setters should enforce business rules before updating internal state.',
        simpleExplanation: 'Setter is not just assignment; it\'s a checkpoint where bad input is blocked.',
        analogy: 'Airport security validates your passport before letting you board.',
        oneLineRevision: 'Setter without validation is just a public variable in disguise.',
        commonMistake: 'Auto-generating getters/setters for every field blindly, even for fields that should be immutable.',
        interviewLanguage: '"Encapsulation is valuable when setters enforce invariants like age >= 0 or salary > 0 to prevent invalid object states."',
      },
      {
        id: 'immutable-objects',
        title: 'Immutability as Advanced Encapsulation',
        definition: 'An immutable object does not allow state changes after construction.',
        simpleExplanation: 'Fields are private final, values assigned in constructor, and no setters are exposed.',
        analogy: 'A printed ID card: once issued, details cannot be edited.',
        oneLineRevision: 'Immutability is strict encapsulation with no write access after creation.',
        commonMistake: 'Returning mutable internal references (like Date/List) from getters, which breaks immutability.',
        interviewLanguage: '"Immutable classes are thread-safe by design and reduce side effects; they are a strong form of encapsulation."',
      },
      {
        id: 'access-modifiers-design',
        title: 'Access Modifiers and Encapsulation Design',
        definition: 'Access modifiers define visibility boundaries and protect internals from misuse.',
        simpleExplanation: 'private = class only, default = package, protected = package + subclasses, public = everywhere.',
        analogy: 'Different office access cards: some rooms are restricted by role.',
        oneLineRevision: 'Good encapsulation starts with minimum required visibility.',
        commonMistake: 'Marking everything public for convenience, causing tight coupling and brittle APIs.',
        interviewLanguage: '"I follow least-privilege visibility: keep members private by default and expose only required operations."',
      },
    ],
    interviewQuestions: [
      { question: 'What is the difference between encapsulation and abstraction?', answer: 'Encapsulation = hiding DATA (implementation details) behind access controls (private + getters/setters). Abstraction = hiding COMPLEXITY by exposing only what\'s necessary (interfaces/abstract classes). Encapsulation is HOW you hide. Abstraction is WHAT you show.', difficulty: 'intermediate', type: 'difference' },
      { question: 'Why are public fields considered bad design?', answer: 'Public fields allow uncontrolled writes from anywhere, making it impossible to enforce validation or invariants. This increases bugs and coupling.', difficulty: 'beginner', type: 'conceptual' },
      { question: 'How does encapsulation help maintenance?', answer: 'Internal implementation can change without breaking external callers, as long as public methods stay consistent. This reduces ripple effects during refactors.', difficulty: 'intermediate', type: 'scenario' },
      { question: 'Can encapsulation improve security?', answer: 'Yes. Sensitive fields like passwords/tokens can be kept private and accessed only through safe operations (e.g., hash comparison), preventing accidental exposure.', difficulty: 'intermediate', type: 'conceptual' },
      { question: 'Is encapsulation only about getters and setters?', answer: 'No. It is about designing controlled access boundaries. Sometimes exposing behavior methods (deposit/withdraw) is better than exposing generic setters.', difficulty: 'intermediate', type: 'difference' },
    ],
    quizQuestions: [
      { id: 'enc-q1', question: 'What is the purpose of a setter method in encapsulation?', options: ['Only to assign a value', 'To expose private fields', 'To provide controlled + validated access to modify fields', 'To make fields public'], answer: 2, explanation: 'Setters should validate input before modifying private fields — that\'s what gives encapsulation its power.',
        difficulty: 'easy',
      },
      { id: 'enc-q2', question: 'Which access modifier gives strictest encapsulation?', options: ['public', 'protected', 'private', 'default'], answer: 2, explanation: 'private restricts access to the same class only, maximizing data hiding.',
        difficulty: 'easy',
      },
      { id: 'enc-q3', question: 'Which design best preserves invariant age >= 0?', options: ['public int age;', 'private int age; setter validates non-negative input', 'protected int age;', 'default int age;'], answer: 1, explanation: 'Private field with validated setter prevents invalid states and enforces business rule.',
        difficulty: 'easy',
      },
    ],
  },
  {
    id: 'inheritance',
    slug: 'inheritance',
    title: 'Inheritance',
    tagline: 'Don\'t Rewrite — Extend!',
    description: 'Inheritance lets a class acquire the properties and behaviors of another class, promoting code reuse and establishing a natural class hierarchy.',
    category: 'oop',
    difficulty: 'intermediate',
    learningTimeMin: 30,
    icon: '🌳',
    color: '#22c55e',
    gradient: 'from-green-400 to-emerald-600',
    visualizerType: 'hierarchy',
    whatInterviewerWantsToHear: 'IS-A relationship, extends keyword, constructor chaining with super(), method overriding, and why multiple class inheritance is not supported.',
    best30SecAnswer: 'Inheritance uses the "extends" keyword to let a child class inherit fields and methods from a parent class. It establishes an IS-A relationship. Java supports single class inheritance (a class extending one class) but multiple inheritance through interfaces. The super keyword accesses parent members.',
    topCommonWrongAnswer: '"Java supports multiple inheritance" — Java supports multiple interface implementation, NOT multiple class inheritance.',
    subtopics: [
      {
        id: 'extends-keyword',
        title: 'The extends Keyword',
        definition: 'extends establishes the parent-child (IS-A) relationship between two classes.',
        simpleExplanation: 'class Dog extends Animal means Dog IS-AN Animal. Dog inherits all public and protected members of Animal.',
        analogy: 'Like a child inheriting traits from a parent — same eyes, similar habits, but also their own unique personality.',
        oneLineRevision: 'extends = inherits all parent features + adds its own.',
        commonMistake: 'Trying to access private parent members in child class — private is not inherited!',
        interviewLanguage: '"extends creates an IS-A relationship. The child inherits public and protected members. Private members are not inherited — they exist in the object but are inaccessible."',
        codeExample: {
          title: 'Basic Inheritance',
          code: `class Vehicle {
    String brand = "Generic";
    void start() { System.out.println(brand + " starting..."); }
}

class Car extends Vehicle {
    int doors = 4;
    void honk() { System.out.println("Beep beep!"); }
}

public class InheritanceDemo {
    public static void main(String[] args) {
        Car c = new Car();
        c.brand = "Toyota";  // inherited from Vehicle
        c.start();           // inherited from Vehicle
        c.honk();            // Car's own method
        System.out.println("Doors: " + c.doors);
    }
}`,
          output: 'Toyota starting...\nBeep beep!\nDoors: 4',
          explanation: 'Car inherits brand and start() from Vehicle while adding its own doors and honk().',
        },
      },
      {
        id: 'super-keyword',
        title: 'super Keyword and Constructor Chaining',
        definition: 'super refers to parent class members and invokes parent constructors.',
        simpleExplanation: 'Child constructor implicitly calls super() first. You can explicitly call super(args) to initialize parent state.',
        analogy: 'Before setting up your room, you first build the house foundation.',
        oneLineRevision: 'Parent constructor runs before child constructor via super().',
        commonMistake: 'Trying to use this(...) and super(...) together in same constructor; only one can be first statement.',
        interviewLanguage: '"Constructor chaining ensures base state initialization first. super() must be first statement in child constructor."',
        codeExample: {
          title: 'super in Action',
          code: `class Animal {
    Animal(String type) {
        System.out.println("Animal constructor: " + type);
    }
}

class Dog extends Animal {
    Dog() {
        super("Mammal");
        System.out.println("Dog constructor");
    }
}

public class SuperDemo {
    public static void main(String[] args) {
        new Dog();
    }
}`,
          output: 'Animal constructor: Mammal\nDog constructor',
          explanation: 'Parent constructor executes first, then child constructor.',
        },
      },
      {
        id: 'method-overriding-with-inheritance',
        title: 'Overriding in Inheritance',
        definition: 'A child class can redefine a parent method with same signature to provide specialized behavior.',
        simpleExplanation: 'Parent defines generic behavior; child customizes it.',
        analogy: 'A template email from HR can be customized by each department.',
        oneLineRevision: 'Inheritance + overriding = runtime polymorphism.',
        commonMistake: 'Changing method signature accidentally, which creates overloading instead of overriding.',
        interviewLanguage: '"Overriding maintains signature contract while changing implementation, enabling dynamic dispatch through parent references."',
      },
      {
        id: 'types-of-inheritance',
        title: 'Types of Inheritance in Java',
        definition: 'Java supports single, multilevel, and hierarchical class inheritance; multiple class inheritance is not supported.',
        simpleExplanation: 'One class can extend one class only, but interfaces enable multiple behavior inheritance.',
        analogy: 'A person can have one biological mother class lineage but can learn multiple skill interfaces.',
        oneLineRevision: 'Classes: single inheritance; interfaces: multiple implementation.',
        commonMistake: 'Expecting class A extends B, C syntax like C++ — invalid in Java.',
        interviewLanguage: '"Java avoids diamond complexity in classes by restricting to single inheritance and uses interfaces for multiple inheritance of type contracts."',
      },
    ],
    interviewQuestions: [
      { question: 'Why doesn\'t Java support multiple class inheritance?', answer: 'To avoid the "Diamond Problem" — if class C inherits from both A and B, and both A and B have a method foo(), C doesn\'t know which foo() to use. Java avoids this by restricting single class inheritance but allows multiple interface implementation (since interfaces don\'t have implementation conflicts by default).', difficulty: 'intermediate', type: 'conceptual' },
      { question: 'What is IS-A relationship?', answer: 'It means child object can be treated as parent type. Example: Dog IS-A Animal, so Dog can be referenced by Animal variable.', difficulty: 'beginner', type: 'conceptual' },
      { question: 'What is constructor chaining in inheritance?', answer: 'When child object is created, parent constructor executes first using implicit or explicit super() call, then child constructor runs.', difficulty: 'intermediate', type: 'scenario' },
      { question: 'Can private members be inherited?', answer: 'They exist in object memory but are not directly accessible in child class. Access is only through parent\'s public/protected methods.', difficulty: 'intermediate', type: 'difference' },
      { question: 'When should inheritance be avoided?', answer: 'Avoid when relationship is not true IS-A or behavior varies wildly. Prefer composition when flexibility and loose coupling are needed.', difficulty: 'tricky', type: 'scenario' },
    ],
    quizQuestions: [
      { id: 'inh-q1', question: 'Which keyword is used for inheritance in Java?', options: ['implements', 'inherits', 'extends', 'super'], answer: 2, explanation: '"extends" keyword creates the inheritance (IS-A) relationship between classes.',
        difficulty: 'easy',
      },
      { id: 'inh-q2', question: 'Which executes first during child object creation?', options: ['Child constructor', 'Parent constructor', 'main method again', 'Only child fields'], answer: 1, explanation: 'Parent constructor is always invoked before child constructor.',
        difficulty: 'easy',
      },
      { id: 'inh-q3', question: 'Java class inheritance supports:', options: ['Multiple class inheritance', 'Only hierarchical inheritance', 'Single class inheritance', 'No inheritance'], answer: 2, explanation: 'A class can extend only one class in Java.',
        difficulty: 'easy',
      },
    ],
  },
  {
    id: 'aggregation-composition',
    slug: 'aggregation-composition',
    title: 'Aggregation & Composition',
    tagline: 'Has-A Relationships — Weak vs Strong',
    description: 'Aggregation and Composition both represent HAS-A relationships between classes, but differ in the lifecycle dependency between the owner and the owned object.',
    category: 'oop',
    difficulty: 'intermediate',
    learningTimeMin: 25,
    icon: '🔗',
    color: '#a855f7',
    gradient: 'from-purple-400 to-fuchsia-600',
    visualizerType: 'relationship',
    whatInterviewerWantsToHear: 'Clear distinction between HAS-A vs IS-A, and the difference in lifecycle: composition (child dies with parent) vs aggregation (child survives parent).',
    best30SecAnswer: 'Both are HAS-A relationships. Composition is strong — the child object CANNOT exist without the parent (e.g., Heart inside Human — no Human, no Heart). Aggregation is weak — the child can exist independently (e.g., Department and Professor — Professor can exist without the Department).',
    topCommonWrongAnswer: 'Confusing HAS-A with IS-A, or treating composition and aggregation as the same thing.',
    subtopics: [
      {
        id: 'composition-strong',
        title: 'Composition (Strong Association)',
        definition: 'Composition is a HAS-A relationship where the child object\'s lifecycle is tied to the parent. Destroy the parent, destroy the child.',
        simpleExplanation: 'A House HAS-A Room. When the house is demolished, rooms no longer exist. The Room is created inside House and belongs entirely to it.',
        analogy: 'Your heart is composed inside you. If you cease to exist, the heart (as part of you) ceases to exist too.',
        oneLineRevision: 'Composition = strong HAS-A. Child cannot survive without parent.',
        commonMistake: 'Implementing composition but allowing the child object to be shared across multiple parents — that\'s aggregation!',
        interviewLanguage: '"In composition, the child object is created and destroyed by the parent. It\'s a tight life-cycle dependency — can\'t exist independently."',
        codeExample: {
          title: 'Composition Example',
          code: `class Engine {  // Engine can't exist without Car in composition
    private int horsepower;
    public Engine(int hp) { this.horsepower = hp; }
    public void start() { System.out.println("Engine running at " + horsepower + "hp"); }
}

class Car {
    private String model;
    private Engine engine;  // Car OWNS the Engine — composition
    
    public Car(String model, int hp) {
        this.model = model;
        this.engine = new Engine(hp);  // Engine created WITH Car
    }
    
    public void drive() {
        engine.start();
        System.out.println(model + " is driving!");
    }
}

public class CompositionDemo {
    public static void main(String[] args) {
        Car car = new Car("Tesla Model 3", 450);
        car.drive();
        // Engine is automatically destroyed when car goes out of scope
    }
}`,
          output: 'Engine running at 450hp\nTesla Model 3 is driving!',
          explanation: 'Engine is created inside Car\'s constructor and owned exclusively by it. No Car = no Engine.',
        },
      },
      {
        id: 'aggregation-weak',
        title: 'Aggregation (Weak Association)',
        definition: 'Aggregation is a HAS-A relationship where child can exist independently of parent.',
        simpleExplanation: 'Department has Professors, but Professor can exist without one specific Department.',
        analogy: 'A playlist has songs, but songs exist even if playlist is deleted.',
        oneLineRevision: 'Aggregation = weak HAS-A; child survives parent.',
        commonMistake: 'Creating child inside parent constructor and calling it aggregation; that usually models composition.',
        interviewLanguage: '"Aggregation models loose ownership where parent references external child objects instead of owning lifecycle."',
        codeExample: {
          title: 'Aggregation Example',
          code: `class Professor {
    String name;
    Professor(String name) { this.name = name; }
}

class Department {
    String name;
    Professor professor; // reference to externally created object
    Department(String name, Professor professor) {
        this.name = name;
        this.professor = professor;
    }
}

public class AggregationDemo {
    public static void main(String[] args) {
        Professor p = new Professor("Dr. Mehta");
        Department d = new Department("CSE", p);
        System.out.println(d.name + " - " + d.professor.name);
    }
}`,
          output: 'CSE - Dr. Mehta',
          explanation: 'Professor object is created independently and injected into Department.',
        },
      },
      {
        id: 'has-a-vs-is-a',
        title: 'HAS-A vs IS-A',
        definition: 'HAS-A indicates composition/aggregation, while IS-A indicates inheritance.',
        simpleExplanation: 'Car HAS-A Engine (relationship). Car IS-A Vehicle (inheritance).',
        analogy: 'A person HAS-A phone, but person IS-A human.',
        oneLineRevision: 'HAS-A = object relation; IS-A = class hierarchy.',
        commonMistake: 'Using inheritance for everything, even where composition is better.',
        interviewLanguage: '"IS-A should represent substitutability, while HAS-A models collaboration between objects."',
      },
      {
        id: 'when-to-use-composition',
        title: 'When to Prefer Composition',
        definition: 'Composition is preferred over inheritance when behavior must be assembled flexibly at runtime.',
        simpleExplanation: 'Attach features as components instead of locking into rigid class trees.',
        analogy: 'Building a custom PC by combining parts instead of buying one sealed machine.',
        oneLineRevision: 'Prefer composition for flexibility and maintainability.',
        commonMistake: 'Deep inheritance chains for feature reuse leading to fragile base class issues.',
        interviewLanguage: '"I use composition when I need change-friendly designs and inheritance only for true IS-A substitution."',
      },
    ],
    interviewQuestions: [
      { question: 'What is the difference between Aggregation and Composition?', answer: 'Composition: Strong HAS-A. Child cannot exist without parent. Child is created/destroyed with parent. Example: Heart inside Human.\nAggregation: Weak HAS-A. Child can exist independently. Example: Professor in Department — Professor survives even if Department is removed.', difficulty: 'intermediate', type: 'difference' },
      { question: 'How do you identify composition in code?', answer: 'Parent usually creates child internally and controls its lifecycle. Child reference is private and not meant to be shared externally.', difficulty: 'intermediate', type: 'conceptual' },
      { question: 'Can aggregation and composition both be HAS-A?', answer: 'Yes. Both are HAS-A. The deciding factor is lifecycle dependency and ownership strength.', difficulty: 'beginner', type: 'difference' },
      { question: 'Why is composition often preferred over inheritance?', answer: 'Composition provides loose coupling and runtime flexibility. Inheritance creates tight compile-time coupling and rigid hierarchies.', difficulty: 'intermediate', type: 'scenario' },
      { question: 'Give one real-world aggregation example.', answer: 'University and Student. A student can exist independently even if a specific university record is removed.', difficulty: 'beginner', type: 'conceptual' },
    ],
    quizQuestions: [
      { id: 'ac-q1', question: 'Which describes Composition?', options: ['Weak HAS-A relationship', 'Child can exist without parent', 'Child lifecycle depends on parent', 'IS-A relationship'], answer: 2, explanation: 'In composition, the child object cannot exist independently — its lifecycle is tied to the parent.',
        difficulty: 'easy',
      },
      { id: 'ac-q2', question: 'Department has Professor (Professor exists independently). This is:', options: ['Composition', 'Aggregation', 'Inheritance', 'Polymorphism'], answer: 1, explanation: 'Independent child lifecycle indicates aggregation.',
        difficulty: 'easy',
      },
      { id: 'ac-q3', question: 'Car is-a Vehicle is example of:', options: ['HAS-A', 'Aggregation', 'Composition', 'IS-A'], answer: 3, explanation: 'IS-A relation is inheritance, not aggregation/composition.',
        difficulty: 'easy',
      },
    ],
  },
  {
    id: 'abstraction-interfaces',
    slug: 'abstraction-interfaces',
    title: 'Abstraction & Interfaces',
    tagline: 'Show What, Hide How',
    description: 'Abstraction focuses on exposing only essential features while hiding implementation complexity. Java achieves abstraction through abstract classes and interfaces.',
    category: 'oop',
    difficulty: 'intermediate',
    learningTimeMin: 35,
    icon: '🎨',
    color: '#0ea5e9',
    gradient: 'from-sky-400 to-blue-600',
    visualizerType: 'comparison',
    whatInterviewerWantsToHear: 'The concrete difference between abstract class and interface, when to use each, and the rule changes in Java 8+ (default/static methods in interfaces).',
    best30SecAnswer: 'Abstraction means showing only what is necessary and hiding implementation. Abstract classes can have both abstract and concrete methods, one parent allowed. Interfaces define a contract — all methods are abstract by default (Java 8+ allows default/static methods). Use abstract class for IS-A with shared behavior; use interface for CAN-DO capability.',
    topCommonWrongAnswer: 'Saying "interfaces can\'t have method bodies" — since Java 8, they can have default and static methods.',
    subtopics: [
      {
        id: 'abstract-class',
        title: 'Abstract Class',
        definition: 'A class with at least one abstract method — it cannot be instantiated and must be extended.',
        simpleExplanation: 'Abstract class is like a template. You define the structure (abstract methods) and some common behavior (concrete methods). Child classes fill in the blanks.',
        analogy: 'A job application form — the form is the template (abstract class), the applicant fills in their specific details (overrides abstract methods).',
        oneLineRevision: 'Abstract class = partial blueprint. Must extend. Can have both abstract and concrete methods.',
        commonMistake: 'Trying to instantiate an abstract class directly: new AbstractClass() — compilation error!',
        interviewLanguage: '"Abstract class provides a partial implementation. It\'s used when child classes share some common behavior (concrete methods) but must also implement their own specific behavior (abstract methods)."',
        codeExample: {
          title: 'Abstract Class Example',
          code: `abstract class Shape {
    String color;
    
    // Abstract method — child MUST implement
    abstract double area();
    
    // Concrete method — shared by all shapes
    void describe() {
        System.out.println("I am a " + color + " shape with area: " + area());
    }
}

class Circle extends Shape {
    double radius;
    Circle(String color, double r) { this.color = color; this.radius = r; }
    
    @Override
    double area() { return Math.PI * radius * radius; }
}

public class AbstractDemo {
    public static void main(String[] args) {
        // Shape s = new Shape(); // ERROR! Can't instantiate abstract class
        Circle c = new Circle("Red", 5);
        c.describe();
    }
}`,
          output: 'I am a Red shape with area: 78.53981633974483',
          explanation: 'Circle must implement area() because it\'s abstract in Shape. describe() is inherited as-is.',
        },
      },
      {
        id: 'interface-basics',
        title: 'Interface as Contract',
        definition: 'An interface defines behavior contracts that implementing classes must fulfill.',
        simpleExplanation: 'It tells WHAT should be done, not HOW exactly each class does it.',
        analogy: 'A charger port standard: many brands, one contract.',
        oneLineRevision: 'Interface = capability contract.',
        commonMistake: 'Treating interface as only for code reuse; its primary value is decoupling and polymorphism.',
        interviewLanguage: '"Interfaces enable programming to abstractions, allowing implementations to vary without changing client code."',
        codeExample: {
          title: 'Interface Contract',
          code: `interface Payment {
    void pay(double amount);
}

class UpiPayment implements Payment {
    public void pay(double amount) {
        System.out.println("Paid via UPI: " + amount);
    }
}

class CardPayment implements Payment {
    public void pay(double amount) {
        System.out.println("Paid via Card: " + amount);
    }
}

public class InterfaceDemo {
    public static void main(String[] args) {
        Payment p = new UpiPayment();
        p.pay(1200);
    }
}`,
          output: 'Paid via UPI: 1200.0',
          explanation: 'Client uses Payment interface reference, not concrete class type.',
        },
      },
      {
        id: 'default-and-static-methods',
        title: 'Default and Static Methods in Interface',
        definition: 'Java 8+ allows interfaces to contain default and static methods with implementation.',
        simpleExplanation: 'default helps evolve interfaces without breaking old implementations.',
        analogy: 'Software policy update where existing users get a sensible default behavior.',
        oneLineRevision: 'Interface methods can have bodies via default/static.',
        commonMistake: 'Assuming all interface methods must be abstract in modern Java.',
        interviewLanguage: '"Default methods were introduced for backward-compatible interface evolution, especially in large frameworks."',
      },
      {
        id: 'abstract-vs-interface-usage',
        title: 'When to Use Abstract Class vs Interface',
        definition: 'Use abstract class for shared state/partial implementation and interface for behavior contracts across unrelated types.',
        simpleExplanation: 'Abstract class answers "what common base behavior exists?" Interface answers "what ability should multiple classes expose?"',
        analogy: 'Abstract class is common family DNA; interface is optional skill certification.',
        oneLineRevision: 'Abstract class for shared base; interface for common capability.',
        commonMistake: 'Forcing inheritance hierarchy where a simple interface would keep design cleaner.',
        interviewLanguage: '"I choose abstract class when code sharing is central; interface when extensibility and pluggability are priorities."',
      },
    ],
    interviewQuestions: [
      { question: 'What is the difference between abstract class and interface?', answer: 'Abstract class: can have state (fields), constructors, both abstract and concrete methods, single inheritance. Interface: no instance fields (only constants), no constructors, all methods abstract by default (default/static methods allowed in Java 8+), supports multiple implementation. Use abstract class for IS-A with shared code; interface for capability contracts (CAN-DO).', difficulty: 'intermediate', type: 'difference' },
      { question: 'Can interface have constructors?', answer: 'No. Interfaces cannot be instantiated, so constructors are not allowed. Constructors belong to classes.', difficulty: 'beginner', type: 'conceptual' },
      { question: 'Why were default methods added to interfaces?', answer: 'To allow adding new methods to existing interfaces without breaking all implementing classes.', difficulty: 'intermediate', type: 'conceptual' },
      { question: 'Can a class implement multiple interfaces?', answer: 'Yes. Java allows multiple interface implementation, enabling multiple behavior contracts without multiple class inheritance.', difficulty: 'beginner', type: 'conceptual' },
      { question: 'How does abstraction improve maintainability?', answer: 'It reduces coupling by exposing stable contracts and hiding implementation detail, allowing internal changes without affecting consumers.', difficulty: 'intermediate', type: 'scenario' },
    ],
    quizQuestions: [
      { id: 'ai-q1', question: 'Can an abstract class have a constructor?', options: ['No', 'Yes', 'Only default constructor', 'Only if no abstract methods'], answer: 1, explanation: 'Abstract classes can have constructors — they\'re called via super() in child class constructors.',
        difficulty: 'easy',
      },
      { id: 'ai-q2', question: 'Which is true for interfaces in Java 8+?', options: ['No method body allowed', 'Can have default methods', 'Can have constructors', 'Can extend classes'], answer: 1, explanation: 'Interfaces can define default and static methods with implementation from Java 8 onward.',
        difficulty: 'easy',
      },
      { id: 'ai-q3', question: 'A class can:', options: ['Extend multiple classes', 'Implement multiple interfaces', 'Have no parent class', 'Override private methods'], answer: 1, explanation: 'Java supports multiple interface implementation, not multiple class inheritance.',
        difficulty: 'easy',
      },
    ],
  },
  {
    id: 'exception-handling',
    slug: 'exception-handling',
    title: 'Exception Handling',
    tagline: 'Expect the Unexpected — Handle It Gracefully',
    description: 'Exceptions are runtime disruptions to normal program flow. Java\'s exception handling mechanism lets you anticipate, catch, and respond to errors without crashing the program.',
    category: 'advanced',
    difficulty: 'intermediate',
    learningTimeMin: 35,
    icon: '⚠️',
    color: '#ef4444',
    gradient: 'from-red-500 to-rose-600',
    visualizerType: 'flow',
    whatInterviewerWantsToHear: 'Exception hierarchy, checked vs unchecked, try-catch-finally behavior, throw vs throws, and custom exception creation.',
    best30SecAnswer: 'Exception handling in Java uses try-catch-finally blocks. Checked exceptions must be declared or handled (IOException, SQLException). Unchecked exceptions extend RuntimeException (NullPointerException, ArrayIndexOutOfBoundsException). "throw" raises an exception; "throws" declares that a method might throw one.',
    topCommonWrongAnswer: 'Confusing throw and throws, or saying finally always runs (it doesn\'t run if System.exit() is called).',
    subtopics: [
      {
        id: 'try-catch-finally',
        title: 'try-catch-finally Block',
        definition: 'try: code that might fail. catch: handles the failure. finally: always runs (cleanup code).',
        simpleExplanation: 'try { risky code } catch (Exception e) { handle it } finally { always runs }\nfinally runs even if exception is thrown or caught.',
        analogy: 'try = jumping off a diving board. catch = safety net. finally = toweling off — you do it regardless of whether you stuck the landing.',
        oneLineRevision: 'try = risky zone, catch = rescue, finally = always happens.',
        commonMistake: 'Catching Exception (parent) before catching specific exceptions (child) — unreachable catch block error!',
        interviewLanguage: '"try-catch-finally is Java\'s structured exception handling. finally is used for resource cleanup — file closing, connection closing — because it runs regardless of outcome."',
        codeExample: {
          title: 'try-catch-finally Demo',
          code: `public class ExceptionDemo {
    public static void main(String[] args) {
        try {
            int[] arr = new int[3];
            arr[10] = 5;  // ArrayIndexOutOfBoundsException!
            System.out.println("This won't print");
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Caught: " + e.getMessage());
        } finally {
            System.out.println("Finally always runs — cleanup here!");
        }
        System.out.println("Program continues after handling...");
    }
}`,
          output: 'Caught: Index 10 out of bounds for length 3\nFinally always runs — cleanup here!\nProgram continues after handling...',
          explanation: 'The exception is caught gracefully. Finally runs. Program continues normally after the try-catch-finally block.',
        },
      },
      {
        id: 'checked-vs-unchecked',
        title: 'Checked vs Unchecked Exceptions',
        definition: 'Checked exceptions are enforced by compiler; unchecked exceptions occur at runtime and are not mandatory to catch.',
        simpleExplanation: 'IOException is checked (must handle/declare). NullPointerException is unchecked (optional handling).',
        analogy: 'Checked = mandatory document check at gate. Unchecked = random runtime issue while traveling.',
        oneLineRevision: 'Checked compile-time enforced, unchecked runtime-driven.',
        commonMistake: 'Catching Exception everywhere instead of handling specific expected exception types.',
        interviewLanguage: '"Checked exceptions represent recoverable conditions the compiler forces you to acknowledge, while unchecked exceptions usually indicate programming defects."',
      },
      {
        id: 'throw-vs-throws',
        title: 'throw vs throws',
        definition: 'throw is used to raise an exception object; throws declares potential exceptions in method signature.',
        simpleExplanation: 'throw happens inside method body. throws appears after method parameters.',
        analogy: 'throw is firing an alarm now; throws is warning sign saying alarm may fire here.',
        oneLineRevision: 'throw = action, throws = declaration.',
        commonMistake: 'Using throws inside method body or throw in signature.',
        interviewLanguage: '"I use throws for contract declaration and throw when business rule validation fails at runtime."',
      },
      {
        id: 'custom-exceptions',
        title: 'Custom Exceptions',
        definition: 'Custom exceptions model domain-specific errors with meaningful names and messages.',
        simpleExplanation: 'Instead of generic RuntimeException, create InvalidAgeException etc.',
        analogy: 'Custom road signs are clearer than generic "danger" boards.',
        oneLineRevision: 'Custom exceptions improve readability and error semantics.',
        commonMistake: 'Creating custom exception without meaningful context/message.',
        interviewLanguage: '"Custom exceptions improve intent communication and help service layers map errors to appropriate responses."',
        codeExample: {
          title: 'Custom Exception Example',
          code: `class InvalidAgeException extends Exception {
    InvalidAgeException(String message) {
        super(message);
    }
}

public class CustomExceptionDemo {
    static void validateAge(int age) throws InvalidAgeException {
        if (age < 18) throw new InvalidAgeException("Age must be 18+");
    }

    public static void main(String[] args) {
        try {
            validateAge(16);
        } catch (InvalidAgeException e) {
            System.out.println(e.getMessage());
        }
    }
}`,
          output: 'Age must be 18+',
          explanation: 'Custom checked exception gives domain meaning and can be handled specifically.',
        },
      },
      {
        id: 'try-with-resources',
        title: 'try-with-resources',
        definition: 'A Java construct that auto-closes resources implementing AutoCloseable.',
        simpleExplanation: 'Use try(...) { } to avoid manual close() in finally.',
        analogy: 'Automatic door closer prevents leaving doors open by mistake.',
        oneLineRevision: 'try-with-resources handles cleanup automatically.',
        commonMistake: 'Still writing verbose finally-close blocks for resources that support AutoCloseable.',
        interviewLanguage: '"try-with-resources is safer and less error-prone than manual close logic, especially under exceptions."',
      },
    ],
    interviewQuestions: [
      { question: 'What is the difference between throw and throws?', answer: '"throw" is used inside a method body to explicitly raise an exception: throw new RuntimeException("error"). "throws" is used in the method signature to declare that the method might throw a checked exception: public void read() throws IOException. throw = action. throws = declaration.', difficulty: 'intermediate', type: 'difference' },
      { question: 'Does finally always execute?', answer: 'Almost always. Exceptions: if System.exit() is called inside try or catch, or if the JVM crashes. Otherwise, finally always runs — even if a return statement is in try or catch.', difficulty: 'tricky', type: 'conceptual' },
      { question: 'What is checked exception in Java?', answer: 'A checked exception is a subclass of Exception (excluding RuntimeException) that compiler forces you to handle with try-catch or declare using throws.', difficulty: 'beginner', type: 'conceptual' },
      { question: 'Why is catching broad Exception discouraged?', answer: 'It hides root causes, may swallow programming bugs, and reduces maintainability. Catch the most specific exception you can handle meaningfully.', difficulty: 'intermediate', type: 'scenario' },
      { question: 'When should custom exceptions be used?', answer: 'Use them to represent business/domain failures clearly (e.g., InvalidOrderStateException) instead of relying on generic exceptions.', difficulty: 'intermediate', type: 'conceptual' },
    ],
    quizQuestions: [
      { id: 'eh-q1', question: 'NullPointerException is a:', options: ['Checked Exception', 'Error', 'Unchecked Exception', 'Compile-time exception'], answer: 2, explanation: 'NullPointerException extends RuntimeException, making it an unchecked exception — no need to declare or catch it.',
        difficulty: 'easy',
      },
      { id: 'eh-q2', question: 'Which keyword declares possible exceptions in method signature?', options: ['throw', 'throws', 'final', 'catch'], answer: 1, explanation: 'throws is used in method declaration to indicate potential exceptions.',
        difficulty: 'easy',
      },
      { id: 'eh-q3', question: 'Best way to auto-close resources?', options: ['finally with null check only', 'System.gc()', 'try-with-resources', 'catch Throwable'], answer: 2, explanation: 'try-with-resources ensures AutoCloseable resources are closed automatically.',
        difficulty: 'easy',
      },
    ],
  },
  {
    id: 'multithreading',
    slug: 'multithreading',
    title: 'Multithreading',
    tagline: 'Do Many Things at Once, Safely',
    description: 'Multithreading allows Java programs to run multiple threads of execution simultaneously, enabling parallelism, better CPU utilization, and responsive applications.',
    category: 'advanced',
    difficulty: 'advanced',
    learningTimeMin: 45,
    icon: '⚡',
    color: '#f59e0b',
    gradient: 'from-yellow-400 to-orange-500',
    visualizerType: 'lifecycle',
    whatInterviewerWantsToHear: 'Thread creation (Thread class vs Runnable), thread lifecycle states, synchronization to prevent race conditions, and basic deadlock understanding.',
    best30SecAnswer: 'Java multithreading allows concurrent execution using Thread class or Runnable interface. Threads go through states: New→Runnable→Running→Waiting/Sleeping→Terminated. Synchronization using "synchronized" keyword prevents race conditions when multiple threads access shared resources. Deadlock occurs when two threads wait for each other\'s lock forever.',
    topCommonWrongAnswer: 'Saying Thread and Runnable are the same — key difference is that implementing Runnable allows extending another class too (more flexible).',
    subtopics: [
      {
        id: 'creating-threads',
        title: 'Creating Threads — Two Ways',
        definition: 'Threads can be created by extending Thread class or implementing Runnable interface.',
        simpleExplanation: 'Way 1: Extend Thread class, override run(), call start()\nWay 2: Implement Runnable, override run(), pass to Thread constructor\nPro tip: Runnable is preferred (allows extending other classes)',
        analogy: 'Multithreading = hiring multiple staff for different counters at a bank. Each does their own job simultaneously.',
        oneLineRevision: 'Thread or Runnable → override run() → call start() (not run()!) to launch the thread.',
        commonMistake: 'Calling thread.run() instead of thread.start() — run() executes synchronously in the current thread, not a new thread!',
        interviewLanguage: '"I prefer implementing Runnable over extending Thread because Java allows single inheritance — implementing Runnable keeps the class free to extend another class if needed."',
        codeExample: {
          title: 'Thread Creation — Both Ways',
          code: `// Way 1: Extend Thread
class MyThread extends Thread {
    public void run() {
        System.out.println("Thread 1 running: " + Thread.currentThread().getName());
    }
}

// Way 2: Implement Runnable (preferred)
class MyRunnable implements Runnable {
    public void run() {
        System.out.println("Thread 2 running: " + Thread.currentThread().getName());
    }
}

public class ThreadDemo {
    public static void main(String[] args) {
        MyThread t1 = new MyThread();
        t1.start();  // start(), not run()!
        
        Thread t2 = new Thread(new MyRunnable());
        t2.start();
        
        // Lambda (Java 8+ — cleanest way)
        Thread t3 = new Thread(() -> System.out.println("Thread 3 (lambda): " + Thread.currentThread().getName()));
        t3.start();
    }
}`,
          output: 'Thread 1 running: Thread-0\nThread 2 running: Thread-1\nThread 3 (lambda): Thread-2\n(order may vary — threads run concurrently)',
          explanation: 'All three threads start() concurrently. Output order may vary each run — that\'s the nature of multithreading.',
          interviewNote: 'Golden rule: ALWAYS call start(), never run(). start() creates a new thread; run() is just a method call.',
        },
      },
      {
        id: 'thread-lifecycle',
        title: 'Thread Lifecycle States',
        definition: 'A thread moves through states like New, Runnable, Running, Waiting/Blocked, and Terminated.',
        simpleExplanation: 'new Thread() creates New. start() makes Runnable. Scheduler runs it. sleep()/wait() pauses it. Completion ends it.',
        analogy: 'Like a train journey: prepared, queued, moving, halted at station, journey complete.',
        oneLineRevision: 'Know state transitions, not just state names.',
        commonMistake: 'Thinking start() means immediate execution; it only requests scheduling.',
        interviewLanguage: '"Thread scheduling is JVM/OS dependent, so start() transitions to runnable state, not guaranteed immediate running state."',
      },
      {
        id: 'synchronization-race-condition',
        title: 'Synchronization and Race Conditions',
        definition: 'Synchronization ensures only one thread accesses critical section at a time to prevent data corruption.',
        simpleExplanation: 'Without synchronized, two threads can update shared data simultaneously and produce incorrect results.',
        analogy: 'One shared whiteboard in office: only one person should write at a time.',
        oneLineRevision: 'synchronized protects critical sections from concurrent writes.',
        commonMistake: 'Synchronizing large non-critical blocks, causing performance bottlenecks.',
        interviewLanguage: '"Synchronization guarantees mutual exclusion and establishes happens-before visibility for shared mutable state."',
        codeExample: {
          title: 'Synchronized Counter',
          code: `class Counter {
    private int count = 0;

    public synchronized void increment() {
        count++;
    }

    public int getCount() { return count; }
}

public class SyncDemo {
    public static void main(String[] args) throws InterruptedException {
        Counter c = new Counter();
        Runnable task = () -> {
            for (int i = 0; i < 1000; i++) c.increment();
        };

        Thread t1 = new Thread(task);
        Thread t2 = new Thread(task);
        t1.start(); t2.start();
        t1.join(); t2.join();

        System.out.println(c.getCount());
    }
}`,
          output: '2000',
          explanation: 'synchronized on increment prevents lost updates from concurrent increments.',
        },
      },
      {
        id: 'deadlock-basics',
        title: 'Deadlock Basics',
        definition: 'Deadlock happens when threads wait forever for each other\'s locked resources.',
        simpleExplanation: 'Thread A holds lock1 and waits for lock2; Thread B holds lock2 and waits for lock1.',
        analogy: 'Two people each holding one key and waiting for the other to hand over theirs first.',
        oneLineRevision: 'Deadlock = cyclic wait with no progress.',
        commonMistake: 'Acquiring locks in inconsistent order across threads.',
        interviewLanguage: '"To avoid deadlock, keep consistent lock ordering, reduce nested locks, and prefer timed lock strategies when needed."',
      },
      {
        id: 'executor-framework-intro',
        title: 'Executor Framework Intro',
        definition: 'Executor framework decouples task submission from thread management.',
        simpleExplanation: 'Instead of manual thread creation for each task, use thread pools via Executors.',
        analogy: 'Restaurant manager assigns orders to a fixed team instead of hiring new staff for every order.',
        oneLineRevision: 'Prefer thread pools over ad-hoc thread creation.',
        commonMistake: 'Creating too many raw Thread objects causing overhead and poor scalability.',
        interviewLanguage: '"In production, I prefer ExecutorService for controlled concurrency, pooling, and lifecycle management."',
      },
    ],
    interviewQuestions: [
      { question: 'What is the difference between Thread class and Runnable interface?', answer: 'Extending Thread: class inherits Thread\'s capabilities. Can\'t extend any other class (Java single inheritance). Implementing Runnable: class stays free to extend another class. Better OOP design (separation of task from threading mechanism). Lambda expressions work with Runnable. Runnable is generally preferred.', difficulty: 'intermediate', type: 'difference' },
      { question: 'What is a race condition?', answer: 'A race condition occurs when multiple threads access and modify shared data simultaneously, leading to inconsistent results depending on thread execution order. Example: two threads both reading balance as 100 and both depositing 50 — final balance might be 150 instead of 200. Fix: use synchronized keyword.', difficulty: 'intermediate', type: 'conceptual' },
      { question: 'What does join() do in threading?', answer: 'join() makes current thread wait until the target thread completes. It is commonly used in main to wait for worker thread completion before reading final results.', difficulty: 'beginner', type: 'conceptual' },
      { question: 'What is deadlock and one prevention strategy?', answer: 'Deadlock is indefinite waiting due to cyclic lock dependency. A common prevention strategy is consistent lock acquisition ordering across all threads.', difficulty: 'intermediate', type: 'scenario' },
      { question: 'Why prefer ExecutorService in real apps?', answer: 'It reuses threads via pools, controls concurrency, simplifies lifecycle management, and improves performance/resource usage compared to creating raw threads repeatedly.', difficulty: 'intermediate', type: 'conceptual' },
    ],
    quizQuestions: [
      { id: 'mt-q1', question: 'What method should you call to start a thread?', options: ['run()', 'begin()', 'start()', 'execute()'], answer: 2, explanation: 'start() creates a new OS thread and internally calls run(). Calling run() directly just executes in the current thread.',
        difficulty: 'easy',
      },
      { id: 'mt-q2', question: 'Which keyword helps prevent race condition on shared method?', options: ['volatile', 'final', 'synchronized', 'transient'], answer: 2, explanation: 'synchronized enforces mutual exclusion for critical section access.',
        difficulty: 'easy',
      },
      { id: 'mt-q3', question: 'Calling run() directly on Thread object will:', options: ['Start new thread', 'Execute on current thread', 'Throw exception', 'Pause JVM'], answer: 1, explanation: 'run() is a normal method call; only start() creates a new thread.',
        difficulty: 'easy',
      },
    ],
  },
];

export function getTopicBySlug(slug: string): Topic | undefined {
  return topics.find((t) => t.slug === slug);
}

export function getTopicsByCategory(category: string): Topic[] {
  if (category === 'all') return topics;
  return topics.filter((t) => t.category === category);
}
