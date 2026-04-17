// ─── Coding Problems Data ─────────────────────────────────────────────────────
// HackerRank-style coding problems: 2–3 per topic, no backend execution.
// Keyed by topic slug.

export interface CodeExample {
  input: string;
  output: string;
  explanation: string;
}

export interface CodingProblem {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  examples: CodeExample[];
  constraints?: string[];
  starterCode: string;
  solution: string;
  solutionExplanation: string;
  expectedOutputForStarter?: string; // what "Run Code" shows for the starter
}

export type CodingProblemsMap = Record<string, CodingProblem[]>;

export const codingProblems: CodingProblemsMap = {
  // ─── Main Method ──────────────────────────────────────────────────────────
  'main-method': [
    {
      id: 'mm-cp1',
      title: 'Hello with Arguments',
      difficulty: 'easy',
      description:
        'Write a Java program that reads a name from command-line arguments and prints "Hello, <name>!". If no argument is provided, print "Hello, World!" instead. Access args[0] safely.',
      examples: [
        {
          input: 'java HelloArgs Alice',
          output: 'Hello, Alice!',
          explanation: 'args[0] = "Alice" so we greet Alice.',
        },
        {
          input: 'java HelloArgs',
          output: 'Hello, World!',
          explanation: 'No args provided, fallback to World.',
        },
      ],
      constraints: [
        'Must use String[] args in main signature',
        'Check args.length before accessing args[0]',
      ],
      starterCode: `public class HelloArgs {
    public static void main(String[] args) {
        // TODO: check if args has at least one element
        // If yes: print "Hello, " + args[0] + "!"
        // If no:  print "Hello, World!"
        
    }
}`,
      solution: `public class HelloArgs {
    public static void main(String[] args) {
        if (args.length > 0) {
            System.out.println("Hello, " + args[0] + "!");
        } else {
            System.out.println("Hello, World!");
        }
    }
}`,
      solutionExplanation:
        'We check args.length before accessing args[0] to prevent ArrayIndexOutOfBoundsException. This is a critical defensive pattern whenever working with command-line arguments.',
      expectedOutputForStarter: '// No output — starter code is incomplete. Add your logic!',
    },
    {
      id: 'mm-cp2',
      title: 'Max of Three Numbers',
      difficulty: 'easy',
      description:
        'Write a Java program that accepts three integers as command-line arguments and prints the maximum value. Demonstrate how args (String[]) need to be converted to integers before comparison.',
      examples: [
        {
          input: 'java MaxThree 10 45 23',
          output: 'Maximum: 45',
          explanation: '45 is the largest among 10, 45, 23.',
        },
        {
          input: 'java MaxThree 7 7 7',
          output: 'Maximum: 7',
          explanation: 'All are equal — any of them is the max.',
        },
      ],
      constraints: [
        'Must convert args to int using Integer.parseInt()',
        'Assume exactly 3 arguments are provided',
      ],
      starterCode: `public class MaxThree {
    public static void main(String[] args) {
        // Step 1: parse all three arguments
        int a = Integer.parseInt(args[0]);
        int b = Integer.parseInt(args[1]);
        int c = Integer.parseInt(args[2]);
        
        // Step 2: find and print the maximum
        // TODO: implement max logic
        
    }
}`,
      solution: `public class MaxThree {
    public static void main(String[] args) {
        int a = Integer.parseInt(args[0]);
        int b = Integer.parseInt(args[1]);
        int c = Integer.parseInt(args[2]);
        
        int max = a;
        if (b > max) max = b;
        if (c > max) max = c;
        
        System.out.println("Maximum: " + max);
    }
}`,
      solutionExplanation:
        'Command-line args are always Strings — Integer.parseInt() converts them. We then use simple comparison logic to find the max. This demonstrates the full flow of reading typed data from args.',
      expectedOutputForStarter: 'Maximum: [result depends on input — add your logic to compute]',
    },
  ],

  // ─── Data Types ───────────────────────────────────────────────────────────
  'data-types': [
    {
      id: 'dt-cp1',
      title: 'Integer Overflow Detection',
      difficulty: 'medium',
      description:
        'Write a Java program that demonstrates integer overflow. Start with Integer.MAX_VALUE, add 1 to it, and print both values. Then do the same with long. Observe the difference.',
      examples: [
        {
          input: 'No input needed — runs with hardcoded values',
          output: 'int MAX: 2147483647\nint MAX + 1: -2147483648\nlong MAX: 9223372036854775807\nlong MAX + 1: -9223372036854775808',
          explanation:
            'Integers wrap around silently. Both int and long demonstrate the wrap-around behavior.',
        },
      ],
      constraints: [
        'Use Integer.MAX_VALUE and Long.MAX_VALUE constants',
        'No try-catch — Java does NOT throw on integer overflow',
      ],
      starterCode: `public class OverflowDemo {
    public static void main(String[] args) {
        // Step 1: show max int value
        int maxInt = Integer.MAX_VALUE;
        System.out.println("int MAX: " + maxInt);
        
        // Step 2: add 1 — what happens?
        // TODO: print maxInt + 1
        
        // Step 3: same for long
        long maxLong = Long.MAX_VALUE;
        System.out.println("long MAX: " + maxLong);
        
        // TODO: print maxLong + 1
    }
}`,
      solution: `public class OverflowDemo {
    public static void main(String[] args) {
        int maxInt = Integer.MAX_VALUE;
        System.out.println("int MAX: " + maxInt);
        System.out.println("int MAX + 1: " + (maxInt + 1));
        
        long maxLong = Long.MAX_VALUE;
        System.out.println("long MAX: " + maxLong);
        System.out.println("long MAX + 1: " + (maxLong + 1));
    }
}`,
      solutionExplanation:
        'Adding 1 to MAX_VALUE wraps to MIN_VALUE because the binary representation overflows and the sign bit flips. Java never throws an exception for integer overflow — results silently wrap around. This is a common source of bugs in real applications.',
      expectedOutputForStarter:
        'int MAX: 2147483647\n[TODO lines not implemented yet]',
    },
    {
      id: 'dt-cp2',
      title: 'Type Casting Chain',
      difficulty: 'medium',
      description:
        'Write a Java program that demonstrates widening (automatic) and narrowing (explicit cast) type conversions. Show: int → long → double (widening), then double → int (narrowing with truncation).',
      examples: [
        {
          input: 'No input needed',
          output: 'int: 100\nlong (widened): 100\ndouble (widened): 100.0\nNarrowed back to int: 100\n\npi as double: 3.14159\npi truncated to int: 3',
          explanation:
            'Widening is automatic. Narrowing truncates (does NOT round) — 3.14159 becomes 3.',
        },
      ],
      constraints: [
        'Widenings must be implicit (no cast)',
        'Narrowings must use explicit cast syntax (int)',
      ],
      starterCode: `public class CastingDemo {
    public static void main(String[] args) {
        // Widening chain
        int i = 100;
        long l = i;       // automatic widening
        double d = l;     // automatic widening
        
        System.out.println("int: " + i);
        System.out.println("long (widened): " + l);
        System.out.println("double (widened): " + d);
        
        // Narrowing — requires explicit cast
        int backToInt = (int) d;
        System.out.println("Narrowed back to int: " + backToInt);
        
        // TODO: show pi truncation
        double pi = 3.14159;
        // narrow pi to int and print both
        
    }
}`,
      solution: `public class CastingDemo {
    public static void main(String[] args) {
        int i = 100;
        long l = i;
        double d = l;
        
        System.out.println("int: " + i);
        System.out.println("long (widened): " + l);
        System.out.println("double (widened): " + d);
        
        int backToInt = (int) d;
        System.out.println("Narrowed back to int: " + backToInt);
        
        System.out.println();
        double pi = 3.14159;
        int truncatedPi = (int) pi;
        System.out.println("pi as double: " + pi);
        System.out.println("pi truncated to int: " + truncatedPi);
    }
}`,
      solutionExplanation:
        'Widening conversions are always safe and automatic. Narrowing requires an explicit cast and truncates — it does NOT round. (int) 3.99 gives 3, not 4. This is a classic interview trick question.',
      expectedOutputForStarter:
        'int: 100\nlong (widened): 100\ndouble (widened): 100.0\nNarrowed back to int: 100\n[pi section not implemented]',
    },
  ],

  // ─── Strings ──────────────────────────────────────────────────────────────
  'strings': [
    {
      id: 'str-cp1',
      title: 'String Pool Inspector',
      difficulty: 'medium',
      description:
        'Write a Java program that demonstrates the String Pool behavior. Create two literal strings with the same value and two new String() objects. Use == and .equals() to compare them. Print all four comparisons and explain the results.',
      examples: [
        {
          input: 'No input needed',
          output: 's1 == s2: true\ns1 == s3: false\ns3 == s4: false\ns3.equals(s4): true',
          explanation:
            'Literals share a pool reference. new String() always creates a new heap object. .equals() compares content.',
        },
      ],
      constraints: [
        'Use exactly four String variables',
        'Print 4 comparison results with labels',
      ],
      starterCode: `public class StringPoolDemo {
    public static void main(String[] args) {
        String s1 = "Java";           // String Pool
        String s2 = "Java";           // Same pool object
        String s3 = new String("Java"); // New heap object
        String s4 = new String("Java"); // Another new heap object
        
        // TODO: print four comparisons with labels
        // 1. s1 == s2
        // 2. s1 == s3
        // 3. s3 == s4  
        // 4. s3.equals(s4)
        
    }
}`,
      solution: `public class StringPoolDemo {
    public static void main(String[] args) {
        String s1 = "Java";
        String s2 = "Java";
        String s3 = new String("Java");
        String s4 = new String("Java");
        
        System.out.println("s1 == s2: " + (s1 == s2));
        System.out.println("s1 == s3: " + (s1 == s3));
        System.out.println("s3 == s4: " + (s3 == s4));
        System.out.println("s3.equals(s4): " + s3.equals(s4));
    }
}`,
      solutionExplanation:
        's1 and s2 both reference the same pool object → ==  is true. s3 and s4 are separate heap objects → == is false. .equals() compares char content → true for all same-content Strings. This is one of the most-asked Java interview topics.',
      expectedOutputForStarter:
        '// No output — add your System.out.println() calls for each comparison.',
    },
    {
      id: 'str-cp2',
      title: 'String Reversal Without Library',
      difficulty: 'easy',
      description:
        'Write a Java program that reverses a String using a loop (NOT StringBuilder.reverse()). Then also show how it can be done using StringBuilder for comparison.',
      examples: [
        {
          input: 'Input: "Hello, Java!"',
          output: 'Manual reverse: !avaJ ,olleH\nStringBuilder reverse: !avaJ ,olleH',
          explanation: 'Both approaches produce identical output.',
        },
      ],
      constraints: [
        'Manual approach: use a for loop iterating from last char to first',
        'Must also show StringBuilder.reverse() approach',
      ],
      starterCode: `public class ReverseString {
    public static void main(String[] args) {
        String original = "Hello, Java!";
        
        // Approach 1: Manual loop
        String reversed = "";
        for (int i = original.length() - 1; i >= 0; i--) {
            // TODO: build reversed string
        }
        System.out.println("Manual reverse: " + reversed);
        
        // Approach 2: StringBuilder
        // TODO: use StringBuilder.reverse() and print
        
    }
}`,
      solution: `public class ReverseString {
    public static void main(String[] args) {
        String original = "Hello, Java!";
        
        String reversed = "";
        for (int i = original.length() - 1; i >= 0; i--) {
            reversed += original.charAt(i);
        }
        System.out.println("Manual reverse: " + reversed);
        
        StringBuilder sb = new StringBuilder(original);
        System.out.println("StringBuilder reverse: " + sb.reverse().toString());
    }
}`,
      solutionExplanation:
        'Manual approach concatenates characters from the end — note that String += in a loop is O(n²). For production code, always use StringBuilder. But the manual loop demonstrates how charAt() and string indexing work.',
      expectedOutputForStarter:
        'Manual reverse: [incomplete — add body to the for loop]\n[StringBuilder part not yet implemented]',
    },
    {
      id: 'str-cp3',
      title: 'Palindrome Checker',
      difficulty: 'easy',
      description:
        'Write a Java program that checks if a given String is a palindrome (reads the same forwards and backwards), ignoring case and spaces.',
      examples: [
        {
          input: '"racecar"',
          output: '"racecar" is a palindrome: true',
          explanation: 'racecar reversed is racecar.',
        },
        {
          input: '"A man a plan a canal Panama"',
          output: '"A man a plan a canal Panama" is a palindrome: true',
          explanation: 'After removing spaces and lowercasing: amanaplanacanalpanama.',
        },
      ],
      constraints: [
        'Remove spaces and convert to lowercase before checking',
        'Use two-pointer approach or String reversal',
      ],
      starterCode: `public class PalindromeChecker {
    
    static boolean isPalindrome(String s) {
        // Step 1: clean the string — remove spaces, lowercase
        s = s.replaceAll("\\\\s+", "").toLowerCase();
        
        // Step 2: check palindrome
        // TODO: compare s with its reverse
        // Hint: reverse using StringBuilder or two-pointer
        return false; // replace with actual logic
    }
    
    public static void main(String[] args) {
        System.out.println("\"racecar\" is a palindrome: " + isPalindrome("racecar"));
        System.out.println("\"A man a plan a canal Panama\" is a palindrome: " 
            + isPalindrome("A man a plan a canal Panama"));
        System.out.println("\"hello\" is a palindrome: " + isPalindrome("hello"));
    }
}`,
      solution: `public class PalindromeChecker {
    
    static boolean isPalindrome(String s) {
        s = s.replaceAll("\\s+", "").toLowerCase();
        String reversed = new StringBuilder(s).reverse().toString();
        return s.equals(reversed);
    }
    
    public static void main(String[] args) {
        System.out.println("\"racecar\" is a palindrome: " + isPalindrome("racecar"));
        System.out.println("\"A man a plan a canal Panama\" is a palindrome: " 
            + isPalindrome("A man a plan a canal Panama"));
        System.out.println("\"hello\" is a palindrome: " + isPalindrome("hello"));
    }
}`,
      solutionExplanation:
        'We first normalize the string (remove spaces, lowercase), then use StringBuilder.reverse() to get the reversed version and compare with .equals(). This checks content equality, correctly identifying palindromes.',
      expectedOutputForStarter:
        '"racecar" is a palindrome: false\n[logic not implemented — isPalindrome always returns false]',
    },
  ],

  // ─── Polymorphism ─────────────────────────────────────────────────────────
  'polymorphism': [
    {
      id: 'poly-cp1',
      title: 'Runtime Polymorphism Demo',
      difficulty: 'medium',
      description:
        'Create an Animal hierarchy with Dog and Cat subclasses. Use a parent-type reference array and call speak() on each. Demonstrate that the actual object\'s method runs (not the parent\'s).',
      examples: [
        {
          input: 'No input needed',
          output: 'Dog says: Woof!\nCat says: Meow!\nAnimal says: ...',
          explanation: 'Each object type\'s speak() is called via a parent-type reference — runtime dispatch.',
        },
      ],
      constraints: [
        'Use Animal[] array to store Dog, Cat, Animal objects',
        'Use a loop to call speak() on each element',
      ],
      starterCode: `class Animal {
    void speak() {
        System.out.println("Animal says: ...");
    }
}

class Dog extends Animal {
    // TODO: override speak()
}

class Cat extends Animal {
    // TODO: override speak()
}

public class PolymorphismDemo {
    public static void main(String[] args) {
        Animal[] animals = {
            new Dog(),
            new Cat(),
            new Animal()
        };
        
        // TODO: loop and call speak() on each
    }
}`,
      solution: `class Animal {
    void speak() {
        System.out.println("Animal says: ...");
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
        Animal[] animals = {
            new Dog(),
            new Cat(),
            new Animal()
        };
        
        for (Animal a : animals) {
            a.speak();
        }
    }
}`,
      solutionExplanation:
        'All three objects are stored in an Animal[] — the reference type is Animal. But when speak() is called, Java\'s dynamic dispatch looks at the actual object type (Dog, Cat, Animal) and calls the correct override. This is runtime polymorphism in action.',
      expectedOutputForStarter:
        'Animal says: ...\nAnimal says: ...\nAnimal says: ...\n[All call Animal\'s speak — overrides not implemented yet]',
    },
    {
      id: 'poly-cp2',
      title: 'Method Overloading Calculator',
      difficulty: 'easy',
      description:
        'Create a Calculator class with overloaded add() methods: one for two ints, one for two doubles, and one for three ints. Call each from main() to demonstrate compile-time polymorphism.',
      examples: [
        {
          input: 'No input needed',
          output: 'add(3, 4) = 7\nadd(2.5, 1.5) = 4.0\nadd(1, 2, 3) = 6',
          explanation: 'Compiler picks the right add() based on argument types and count.',
        },
      ],
      constraints: [
        'Cannot use return type alone to distinguish overloads',
        'Must use @Override for overriding (N/A for overloading)',
      ],
      starterCode: `public class Calculator {
    
    // TODO: add(int a, int b) → returns int
    
    // TODO: add(double a, double b) → returns double
    
    // TODO: add(int a, int b, int c) → returns int
    
    public static void main(String[] args) {
        Calculator calc = new Calculator();
        System.out.println("add(3, 4) = " + calc.add(3, 4));
        System.out.println("add(2.5, 1.5) = " + calc.add(2.5, 1.5));
        System.out.println("add(1, 2, 3) = " + calc.add(1, 2, 3));
    }
}`,
      solution: `public class Calculator {
    
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
        Calculator calc = new Calculator();
        System.out.println("add(3, 4) = " + calc.add(3, 4));
        System.out.println("add(2.5, 1.5) = " + calc.add(2.5, 1.5));
        System.out.println("add(1, 2, 3) = " + calc.add(1, 2, 3));
    }
}`,
      solutionExplanation:
        'Three add() methods with same name but different parameter lists = method overloading. The compiler selects the correct version at compile time based on argument types. This is static (compile-time) polymorphism.',
      expectedOutputForStarter:
        '// Compilation error — add() methods are not defined yet.',
    },
  ],

  // ─── Collections ──────────────────────────────────────────────────────────
  'collections': [
    {
      id: 'col-cp1',
      title: 'Word Frequency Counter',
      difficulty: 'medium',
      description:
        'Write a Java program that counts the frequency of each word in a sentence using HashMap. Print each word and its count, sorted by descending frequency.',
      examples: [
        {
          input: '"java is great java is fast java"',
          output: 'java: 3\nis: 2\ngreat: 1\nfast: 1',
          explanation: '"java" appears 3 times, "is" twice, others once.',
        },
      ],
      constraints: [
        'Use HashMap<String, Integer>',
        'Split by spaces, handle case-insensitively',
      ],
      starterCode: `import java.util.*;

public class WordFrequency {
    public static void main(String[] args) {
        String sentence = "java is great java is fast java";
        String[] words = sentence.toLowerCase().split("\\\\s+");
        
        // Use HashMap to count frequencies
        Map<String, Integer> freq = new HashMap<>();
        
        for (String word : words) {
            // TODO: increment count for each word
            // Hint: use freq.getOrDefault(word, 0) + 1
        }
        
        // TODO: print each entry (sort by value descending)
        // Hint: use a List from freq.entrySet() and sort
    }
}`,
      solution: `import java.util.*;

public class WordFrequency {
    public static void main(String[] args) {
        String sentence = "java is great java is fast java";
        String[] words = sentence.toLowerCase().split("\\s+");
        
        Map<String, Integer> freq = new HashMap<>();
        for (String word : words) {
            freq.put(word, freq.getOrDefault(word, 0) + 1);
        }
        
        List<Map.Entry<String, Integer>> entries = new ArrayList<>(freq.entrySet());
        entries.sort((a, b) -> b.getValue() - a.getValue());
        
        for (Map.Entry<String, Integer> entry : entries) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
    }
}`,
      solutionExplanation:
        'getOrDefault handles the first occurrence gracefully. Sorting entrySet by value descending requires a comparator on Map.Entry. This pattern (frequency map + sorted output) appears in many real interview problems.',
      expectedOutputForStarter:
        '// No output — HashMap populated but print logic not implemented.',
    },
  ],

  // ─── Exception Handling ───────────────────────────────────────────────────
  'exception-handling': [
    {
      id: 'ex-cp1',
      title: 'Safe Division with Custom Exception',
      difficulty: 'medium',
      description:
        'Create a custom exception `DivisionByZeroException` that extends RuntimeException. Write a `divide(int a, int b)` method that throws this exception when b is 0. Catch it in main and print a user-friendly message.',
      examples: [
        {
          input: 'divide(10, 2) and divide(10, 0)',
          output: '10 / 2 = 5\nError: Cannot divide 10 by zero!\nProgram continues after exception handling.',
          explanation:
            'Custom exception is thrown for division by zero, caught gracefully, and program continues.',
        },
      ],
      constraints: [
        'DivisionByZeroException must extend RuntimeException',
        'Include a helpful message in the exception',
        'Program must continue after catching the exception',
      ],
      starterCode: `// TODO: Define custom exception DivisionByZeroException

public class SafeDivision {
    
    static int divide(int a, int b) {
        // TODO: throw DivisionByZeroException if b == 0
        return a / b;
    }
    
    public static void main(String[] args) {
        // TODO: try calling divide(10, 2) and divide(10, 0)
        // catch the custom exception and print message
        // prove program continues after
    }
}`,
      solution: `class DivisionByZeroException extends RuntimeException {
    DivisionByZeroException(String message) {
        super(message);
    }
}

public class SafeDivision {
    
    static int divide(int a, int b) {
        if (b == 0) {
            throw new DivisionByZeroException(
                "Cannot divide " + a + " by zero!"
            );
        }
        return a / b;
    }
    
    public static void main(String[] args) {
        try {
            System.out.println("10 / 2 = " + divide(10, 2));
            System.out.println("10 / 0 = " + divide(10, 0));
        } catch (DivisionByZeroException e) {
            System.out.println("Error: " + e.getMessage());
        }
        System.out.println("Program continues after exception handling.");
    }
}`,
      solutionExplanation:
        'Custom exceptions let you attach domain-specific meaning to errors. RuntimeException (unchecked) doesn\'t force callers to declare it. The try-catch in main catches it gracefully, and execution resumes after the catch block — the program doesn\'t terminate.',
      expectedOutputForStarter:
        'Exception in thread "main" java.lang.ArithmeticException: / by zero\n[No custom logic implemented yet]',
    },
  ],

  // ─── Inheritance ──────────────────────────────────────────────────────────
  'inheritance': [
    {
      id: 'inh-cp1',
      title: 'Employee Hierarchy with super()',
      difficulty: 'medium',
      description:
        'Create an Employee base class with name and salary. Extend it with Manager, which adds a teamSize field. Demonstrate constructor chaining using super() and call display() on each. Show how toString() can be built using super.toString().',
      examples: [
        {
          input: 'No input needed',
          output: 'Employee: Alice | Salary: $50000\nManager: Bob | Salary: $80000 | Team Size: 5',
          explanation:
            'Manager calls super() to set name and salary, then adds its own teamSize.',
        },
      ],
      constraints: [
        'Manager constructor must call super(name, salary)',
        'Add display() in Employee and override in Manager',
      ],
      starterCode: `class Employee {
    protected String name;
    protected double salary;
    
    Employee(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }
    
    void display() {
        System.out.println("Employee: " + name + " | Salary: $" + (int) salary);
    }
}

class Manager extends Employee {
    private int teamSize;
    
    Manager(String name, double salary, int teamSize) {
        // TODO: call super() constructor first
        // TODO: set teamSize
    }
    
    // TODO: override display() to include teamSize
}

public class EmployeeDemo {
    public static void main(String[] args) {
        Employee e = new Employee("Alice", 50000);
        Manager m = new Manager("Bob", 80000, 5);
        
        e.display();
        m.display();
    }
}`,
      solution: `class Employee {
    protected String name;
    protected double salary;
    
    Employee(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }
    
    void display() {
        System.out.println("Employee: " + name + " | Salary: $" + (int) salary);
    }
}

class Manager extends Employee {
    private int teamSize;
    
    Manager(String name, double salary, int teamSize) {
        super(name, salary);
        this.teamSize = teamSize;
    }
    
    @Override
    void display() {
        System.out.println("Manager: " + name + " | Salary: $" + (int) salary + 
                           " | Team Size: " + teamSize);
    }
}

public class EmployeeDemo {
    public static void main(String[] args) {
        Employee e = new Employee("Alice", 50000);
        Manager m = new Manager("Bob", 80000, 5);
        
        e.display();
        m.display();
    }
}`,
      solutionExplanation:
        'super(name, salary) must be the first statement in Manager\'s constructor — this invokes Employee\'s constructor to initialize shared fields. @Override ensures we override display() correctly. This is the fundamental pattern of constructor chaining in Java inheritance.',
      expectedOutputForStarter:
        '// Compilation error — Manager constructor body is empty, super() not called.',
    },
  ],

  // ─── Multithreading ───────────────────────────────────────────────────────
  'multithreading': [
    {
      id: 'mt-cp1',
      title: 'Thread Race Condition Demo',
      difficulty: 'hard',
      description:
        'Write a Java program with a shared counter. Create two threads, each incrementing the counter 1000 times. Run WITHOUT synchronization, then WITH synchronization. Compare results.',
      examples: [
        {
          input: 'No input needed',
          output: 'Without sync: [some value < 2000, varies]\nWith sync: 2000',
          explanation:
            'Without sync, race conditions cause lost updates. With synchronized, result is always correct.',
        },
      ],
      constraints: [
        'Use two separate Thread objects',
        'Call thread.join() before printing final count',
        'Show both versions in output',
      ],
      starterCode: `public class RaceConditionDemo {
    static int countUnsafe = 0;
    static int countSafe = 0;
    
    static synchronized void incrementSafe() {
        countSafe++;
    }
    
    public static void main(String[] args) throws InterruptedException {
        // Unsafe version
        Thread t1 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) {
                countUnsafe++; // NOT synchronized
            }
        });
        Thread t2 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) {
                countUnsafe++; // NOT synchronized
            }
        });
        
        // TODO: start t1 and t2, join both, print result
        
        // Safe version — use incrementSafe()
        // TODO: create t3 and t4 calling incrementSafe() 1000 times each
        // start both, join both, print countSafe
    }
}`,
      solution: `public class RaceConditionDemo {
    static int countUnsafe = 0;
    static int countSafe = 0;
    
    static synchronized void incrementSafe() {
        countSafe++;
    }
    
    public static void main(String[] args) throws InterruptedException {
        Thread t1 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) countUnsafe++;
        });
        Thread t2 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) countUnsafe++;
        });
        t1.start(); t2.start();
        t1.join(); t2.join();
        System.out.println("Without sync: " + countUnsafe);
        
        Thread t3 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) incrementSafe();
        });
        Thread t4 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) incrementSafe();
        });
        t3.start(); t4.start();
        t3.join(); t4.join();
        System.out.println("With sync: " + countSafe);
    }
}`,
      solutionExplanation:
        'Without synchronized: two threads read the same value simultaneously, both add 1, both write — one update is lost. This race condition causes countUnsafe to be < 2000. With synchronized: only one thread can execute incrementSafe() at a time — no lost updates, result is always 2000.',
      expectedOutputForStarter:
        '// No output — start/join/print logic not implemented.',
    },
  ],
};

// Helper: get coding problems for a topic slug
export function getCodingProblems(slug: string): CodingProblem[] {
  return codingProblems[slug] ?? [];
}
