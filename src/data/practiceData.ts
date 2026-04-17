// ─── Practice Questions Data ─────────────────────────────────────────────────
// Open-ended concept questions (NOT MCQ) — 3–5 per topic.
// Keyed by topic slug for O(1) lookup.

export interface PracticeQuestion {
  id: string;
  question: string;
  hint: string;
  answer: string;
  checkYourself: string; // guiding explanation for self-assessment
}

export type PracticeMap = Record<string, PracticeQuestion[]>;

export const practiceData: PracticeMap = {
  // ─── Main Method ──────────────────────────────────────────────────────────
  'main-method': [
    {
      id: 'mm-p1',
      question: 'In your own words, explain what happens when you run `java HelloWorld` in the terminal.',
      hint: 'Think about what the JVM does before it even runs any of your code.',
      answer:
        'The JVM is invoked, which loads the HelloWorld class using the ClassLoader. It then searches for a method with the exact signature `public static void main(String[] args)`. Once found, JVM invokes it — this is where your program execution begins. JVM manages memory, runs bytecode, and shuts down when main() returns.',
      checkYourself:
        'Did you mention: JVM loading the class, looking for main(), and the program terminating when main returns?',
    },
    {
      id: 'mm-p2',
      question: 'Why can\'t the main method return a value (why is it `void`)? What if you try `int main()`?',
      hint: 'Think about who calls main() and whether they wait for a return value.',
      answer:
        'The JVM calls main() to start the program but has no mechanism to receive or use a return value in standard Java. If you write `int main()`, JVM simply won\'t recognize it as the entry point — it looks exclusively for `void main(String[])`. The program would compile but fail at runtime with "Main method not found".',
      checkYourself:
        'Did you explain that JVM is the caller and it doesn\'t use any return value? Did you mention the runtime error?',
    },
    {
      id: 'mm-p3',
      question: 'Can you write a Java program with TWO main methods? What happens?',
      hint: 'Consider method overloading — can two methods have the same name but different parameters?',
      answer:
        'Yes — you can overload main() just like any other method. `public static void main(String[] args)` is the JVM entry point. Additional mains like `public static void main(int x)` or `public static void main()` are valid Java methods that compile fine, but JVM only invokes the standard signature automatically. The others can be called manually from within your code.',
      checkYourself:
        'Did you mention overloading is allowed but JVM only auto-calls the standard signature?',
    },
    {
      id: 'mm-p4',
      question: 'What is the purpose of `String[] args` and when would you actually use it?',
      hint: 'Think about running a program from the command line with arguments.',
      answer:
        'args holds any command-line arguments passed when running the program. Example: `java Greeter Alice 25` stores ["Alice", "25"] in args. Real-world uses: providing config values (file paths, flags), separating environment-specific settings from code, building simple CLI tools without a GUI. Always check args.length before accessing args[0] to avoid ArrayIndexOutOfBoundsException.',
      checkYourself:
        'Did you give a concrete use-case example and mention type-safety (all args are Strings)?',
    },
    {
      id: 'mm-p5',
      question: 'What is the difference between calling `main()` directly vs using `java ClassName`?',
      hint: 'One is a regular method call, one involves the JVM doing special setup.',
      answer:
        'Running `java ClassName` tells the JVM to start a fresh JVM instance, load the class, initialize static members, and invoke main as the program entry point — this is a full JVM launch. Calling main() directly from within code is just a regular method call on the current JVM — no new JVM is created, the JVM is already running, and main is treated as a normal method. The behavior is the same if you pass the correct args.',
      checkYourself:
        'Did you distinguish between JVM startup process vs a simple internal method call?',
    },
  ],

  // ─── Data Types ───────────────────────────────────────────────────────────
  'data-types': [
    {
      id: 'dt-p1',
      question: 'Why does Java have multiple integer types (byte, short, int, long) instead of just one?',
      hint: 'Think about memory efficiency in large systems — sensor arrays, game worlds, embedded devices.',
      answer:
        'Using smaller types where possible saves memory. A byte array of 1 million values uses 1 MB; an int array uses 4 MB. In embedded systems, network protocols, image processing, and game engines where memory is critical, choosing the right size matters a lot. int is the default for convenience in general code, but byte/short have real roles in performance-critical contexts.',
      checkYourself:
        'Did you give a concrete memory calculation or real-world scenario where type choice matters?',
    },
    {
      id: 'dt-p2',
      question: 'Explain why `0.1 + 0.2` doesn\'t equal `0.3` in Java. What\'s the fix?',
      hint: 'Think about how computers store decimal numbers in binary.',
      answer:
        '0.1 cannot be represented exactly in binary floating-point (just like 1/3 can\'t in decimal). The closest binary approximation introduces tiny rounding errors. When you add two approximations, errors compound. The fix: use BigDecimal for precise decimal math — `new BigDecimal("0.1").add(new BigDecimal("0.2"))` gives exactly 0.3. Always use string constructor with BigDecimal to avoid the same floating-point error creeping in.',
      checkYourself:
        'Did you explain binary representation limits AND mention the BigDecimal solution?',
    },
    {
      id: 'dt-p3',
      question: 'What is type widening? When does Java do it automatically and when does it require a cast?',
      hint: 'Think about which conversions are "safe" (no data loss) vs "risky" (possible truncation).',
      answer:
        'Widening converts a smaller type to a larger one automatically — safe, no data loss. Java does it implicitly: `int i = 5; long l = i;` works without a cast. Narrowing requires explicit cast because data may be lost: `double d = 9.9; int i = (int) d;` truncates to 9, not 10. Java truncates (drops decimal), it does NOT round during narrowing casts.',
      checkYourself:
        'Did you give examples of both widening and narrowing, and mention truncation vs rounding?',
    },
    {
      id: 'dt-p4',
      question: 'What is the difference between a primitive variable and a reference variable in memory?',
      hint: 'Think about what\'s actually stored in the variable slot vs what the variable "points to".',
      answer:
        'A primitive variable stores the actual value in the stack memory slot. Example: `int x = 42` — the stack slot contains 42 directly. A reference variable stores a memory address (pointer) to an object on the heap. Example: `String s = "Hello"` — the stack slot contains the heap address where the String object lives. This is why == on primitives works (compares values) but == on references compares addresses, not content.',
      checkYourself:
        'Did you explain stack vs heap, and connect it to why == behaves differently for primitives vs objects?',
    },
  ],

  // ─── Strings ──────────────────────────────────────────────────────────────
  'strings': [
    {
      id: 'str-p1',
      question: 'Why are Strings immutable in Java? Name at least two concrete benefits this provides.',
      hint: 'Think about the String Pool, security, and multithreading.',
      answer:
        '1) String Pool efficiency: immutability allows the JVM to safely share String literals. If "hello" changes, every variable pointing to that pool entry would be corrupted. 2) Thread safety: immutable objects need no synchronization — multiple threads can read the same String without locks. 3) Security: Strings are used in class loading, network connections, file paths — if mutable, malicious code could alter them after validation. 4) Hashcode caching: String\'s hashCode is computed once and cached — reliable as HashMap keys.',
      checkYourself:
        'Did you mention at least 2 of: pool efficiency, thread safety, security, hashcode caching?',
    },
    {
      id: 'str-p2',
      question: 'Explain the difference between `==` and `.equals()` on Strings. When can `==` give a misleading result?',
      hint: 'Think about what is stored in the variable for a String — is it the characters or something else?',
      answer:
        '== compares references (memory addresses) — it checks if both variables point to the exact same object. .equals() compares the actual character content. `==` gives misleading results when strings are created with `new String()` or come from different sources (user input, file reads, method returns) — these create separate objects with different addresses even if content is identical. Always use .equals() or .equalsIgnoreCase() for String comparisons.',
      checkYourself:
        'Did you explain what == actually compares, and give a case where == gives wrong results?',
    },
    {
      id: 'str-p3',
      question: 'What is the String Pool? How does `String.intern()` relate to it?',
      hint: 'Think about memory optimization for repeated string values.',
      answer:
        'The String Pool (intern pool) is a special area in the Java heap where String literals are cached. When you write `String s = "Java"`, JVM checks if "Java" is in the pool — if yes, returns the same reference. If no, creates it. `intern()` lets you add a heap String to the pool manually: `String s = new String("Java").intern()` now makes s point to the pool copy. This allows == comparison to work and saves memory for frequently repeated strings.',
      checkYourself:
        'Did you explain how pool lookup works for literals and what intern() does for heap strings?',
    },
    {
      id: 'str-p4',
      question: 'When should you choose StringBuilder over String concatenation? Why?',
      hint: 'Think about what happens in memory on each `+` operation with String.',
      answer:
        'Use StringBuilder when building strings in loops or with many concatenations. String + creates a new String object each time — in a loop of n iterations, this is O(n²) memory and time. StringBuilder modifies a single internal buffer, making append() O(1) amortized. Example: building a CSV of 10,000 rows with + would create thousands of intermediate String objects; StringBuilder uses one buffer. Rule: if you\'re concatenating in a loop, always use StringBuilder.',
      checkYourself:
        'Did you explain the O(n²) problem with String + in loops and connect it to StringBuilder\'s efficiency?',
    },
    {
      id: 'str-p5',
      question: 'What does `"Hello".substring(1, 4)` return? How does the indexing work?',
      hint: 'Remember: end index is exclusive in Java\'s substring.',
      answer:
        '"ell" — substring(start, end) includes the character at `start` and excludes the character at `end`. Index 1 = \'e\', index 2 = \'l\', index 3 = \'l\', index 4 = \'o\' (excluded). So characters at 1, 2, 3 = "ell". Common trap: many students answer "ello" thinking end is inclusive. Java is end-exclusive consistently across substring, String.charAt ranges, and similar APIs.',
      checkYourself:
        'Did you correctly say "ell" and explain the start-inclusive, end-exclusive rule?',
    },
  ],

  // ─── Polymorphism ─────────────────────────────────────────────────────────
  'polymorphism': [
    {
      id: 'poly-p1',
      question: 'Explain compile-time vs runtime polymorphism in Java with one concrete example of each.',
      hint: 'Think about method overloading (same class, different params) vs method overriding (parent-child relationship).',
      answer:
        'Compile-time (static): Method overloading — `add(int,int)` and `add(double,double)` in same class. Compiler picks the right version at compile time based on argument types. Runtime (dynamic): Method overriding — `Animal.speak()` overridden in `Dog.speak()`. When `Animal a = new Dog(); a.speak();` is called, JVM looks at the actual object (Dog) at runtime and calls Dog\'s speak(). Runtime polymorphism is more powerful and is the basis of design patterns, frameworks, and APIs.',
      checkYourself:
        'Did you give examples of both types and say which is decided at compile time vs runtime?',
    },
    {
      id: 'poly-p2',
      question: 'What is dynamic dispatch? How does Java decide which overriding method to call?',
      hint: 'Think about the JVM\'s Virtual Method Table (vtable).',
      answer:
        'Dynamic dispatch is the process by which the JVM resolves method calls at runtime based on the actual type of the object, not the declared type of the reference. Internally, every class has a Virtual Method Table (vtable) mapping method signatures to their implementations. When you call an overridden method, JVM looks up the vtable of the actual object\'s class. This is why `Animal ref = new Dog(); ref.speak()` calls Dog\'s speak — JVM checks Dog\'s vtable.',
      checkYourself:
        'Did you explain that the actual object type (not reference type) determines the method called?',
    },
    {
      id: 'poly-p3',
      question: 'Can you achieve polymorphism without inheritance? Explain using interfaces.',
      hint: 'Think about how multiple unrelated classes can share a common interface.',
      answer:
        'Yes — interface-based polymorphism. Multiple unrelated classes can implement the same interface and be used interchangeably. Example: `interface Drawable { void draw(); }` implemented by `Circle`, `Rectangle`, `Triangle`. You can write `Drawable d = new Circle(); d.draw();` — same reference type, different behaviors. This is more flexible than inheritance-based polymorphism because classes can implement multiple interfaces without the rigid class hierarchy.',
      checkYourself:
        'Did you show how interfaces enable polymorphism without inheritance and explain the flexibility benefit?',
    },
    {
      id: 'poly-p4',
      question: 'What is a covariant return type? Is it related to polymorphism?',
      hint: 'Think about what happens when an overriding method returns a subtype instead of the parent\'s return type.',
      answer:
        'Since Java 5, an overriding method can return a subtype of the parent method\'s return type — this is called a covariant return type. Example: parent returns `Animal`, override returns `Dog` (which extends Animal). This is a form of runtime polymorphism — the return type is more specific in the subclass. Builders and factory methods use this pattern for fluent APIs where each subclass returns its own type.',
      checkYourself:
        'Did you explain that the override can narrow the return type, and give a real use case?',
    },
  ],

  // ─── Collections ──────────────────────────────────────────────────────────
  'collections': [
    {
      id: 'col-p1',
      question: 'What is the difference between ArrayList and LinkedList? When would you choose each?',
      hint: 'Think about how each stores elements internally and which operations are fast/slow.',
      answer:
        'ArrayList: backed by a dynamic array. O(1) random access (get by index), O(n) for insert/delete in the middle. Good for frequent reads. LinkedList: doubly linked nodes. O(n) random access, O(1) insert/delete at head/tail. Good for frequent insertion/deletion at ends (queue/deque). In practice: ArrayList is almost always preferred because cache locality makes it faster even for inserts in most real workloads. Use LinkedList only when you need a Queue/Deque.',
      checkYourself:
        'Did you compare time complexities for access and insertion, and give a concrete use-case recommendation?',
    },
    {
      id: 'col-p2',
      question: 'How does HashMap work internally? What happens during a collision?',
      hint: 'Think about buckets, hashCode(), and what Java 8 changed.',
      answer:
        'HashMap uses an array of "buckets" (linked lists or trees). When storing a key-value pair: 1) compute key.hashCode(), 2) apply bit manipulation to get bucket index, 3) store entry in that bucket. Collision: two keys map to same bucket. Java 8+: when a bucket has >8 entries, it converts from linked list to a red-black tree (O(log n) instead of O(n) lookup). Initial capacity: 16 buckets. Load factor: 0.75 — when 75% full, HashMap doubles and rehashes.',
      checkYourself:
        'Did you explain hashing, buckets, collision handling, and Java 8\'s tree optimization?',
    },
    {
      id: 'col-p3',
      question: 'What is the difference between HashMap, TreeMap, and LinkedHashMap?',
      hint: 'Think about ordering guarantees and use cases.',
      answer:
        'HashMap: no ordering guarantee, O(1) average for get/put. Best general-purpose map. TreeMap: sorted by natural key order (or custom Comparator), O(log n) for all operations (backed by red-black tree). Good when you need sorted keys. LinkedHashMap: maintains insertion order, O(1) operations. Good when you need predictable iteration order. Use LinkedHashMap for LRU caches (set accessOrder=true).',
      checkYourself:
        'Did you cover ordering behavior and performance for all three?',
    },
    {
      id: 'col-p4',
      question: 'Why should you never modify a collection while iterating over it with a for-each loop?',
      hint: 'Think about ConcurrentModificationException and how Iterator tracks changes.',
      answer:
        'For-each uses Iterator internally. Iterator maintains a modCount — a counter incremented on every structural modification. If the collection\'s modCount changes during iteration (via add/remove), Iterator detects it and throws ConcurrentModificationException. Fix: 1) Use `Iterator.remove()` instead of list.remove(). 2) Collect items to remove, then remove after iteration. 3) Use CopyOnWriteArrayList for concurrent scenarios. 4) Use removeIf() with a predicate (Java 8+).',
      checkYourself:
        'Did you explain modCount, ConcurrentModificationException, and at least one correct fix?',
    },
  ],

  // ─── Exception Handling ───────────────────────────────────────────────────
  'exception-handling': [
    {
      id: 'ex-p1',
      question: 'What is the difference between checked and unchecked exceptions? Give one example of each.',
      hint: 'Think about compile-time enforcement vs runtime surprises.',
      answer:
        'Checked exceptions: compiler forces you to handle or declare them. They represent recoverable conditions. Examples: IOException, SQLException, ClassNotFoundException. Must use try-catch or throws declaration. Unchecked (RuntimeException): compiler doesn\'t enforce handling. Represent programming bugs. Examples: NullPointerException, ArrayIndexOutOfBoundsException, ClassCastException. Should be fixed by fixing the code, not caught and swallowed.',
      checkYourself:
        'Did you explain compiler enforcement difference and give correct examples of each?',
    },
    {
      id: 'ex-p2',
      question: 'What is the purpose of the `finally` block? When does it NOT execute?',
      hint: 'Think about resource cleanup and the edge case of JVM exit.',
      answer:
        'finally always executes after try-catch, regardless of whether an exception occurred or was caught. Used for resource cleanup: closing files, DB connections, sockets. finally does NOT run if: 1) `System.exit()` is called inside try or catch — JVM terminates immediately. 2) JVM itself crashes (OutOfMemoryError, power loss). 3) Thread is killed with `Thread.stop()` (deprecated but still possible). Java 7+ try-with-resources is preferred over finally for AutoCloseable resources.',
      checkYourself:
        'Did you explain when finally runs, what it\'s used for, and at least one case where it doesn\'t run?',
    },
    {
      id: 'ex-p3',
      question: 'Explain the exception propagation mechanism in Java with an example.',
      hint: 'Think about the call stack and how exceptions travel up through method calls.',
      answer:
        'When an exception is thrown in a method and not caught there, it propagates up the call stack to the caller. If the caller doesn\'t catch it, it goes further up — until it reaches main(). If main() doesn\'t catch it, the JVM catches it, prints the stack trace, and terminates the program. Example: methodC() throws → methodB() (no catch) → methodA() (no catch) → main() (no catch) → JVM terminates. The stack trace shows this entire chain.',
      checkYourself:
        'Did you trace exception propagation from throw site to JVM with a call stack example?',
    },
  ],

  // ─── Inheritance ──────────────────────────────────────────────────────────
  'inheritance': [
    {
      id: 'inh-p1',
      question: 'What is the difference between `super()` and `this()` in constructors?',
      hint: 'Think about what each one calls and when they must appear.',
      answer:
        '`super()` calls the parent class constructor. `this()` calls another constructor within the same class. Both must be the FIRST statement in a constructor — you cannot have both in the same constructor. `super()` is implicitly added by Java if you don\'t write it (calling no-arg parent constructor). `this()` is used for constructor chaining within a class to reduce code duplication. You cannot call super() and this() together in the same constructor.',
      checkYourself:
        'Did you explain both, mention they must be the first statement, and note they can\'t coexist?',
    },
    {
      id: 'inh-p2',
      question: 'Why does Java not support multiple inheritance of classes? What is the diamond problem?',
      hint: 'Think about ambiguity when two parent classes have the same method.',
      answer:
        'The diamond problem: Class D extends both B and C. Both B and C override method from A. When D calls that method, which version runs — B\'s or C\'s? This ambiguity is why Java forbids multiple class inheritance. Java\'s fix: interfaces with default methods (Java 8+) — when diamond occurs with interfaces, the concrete class must override the conflicting method explicitly. So Java gains the benefit of multiple inheritance through interfaces while avoiding the ambiguity problem.',
      checkYourself:
        'Did you explain the diamond ambiguity and how Java resolves it with interfaces?',
    },
    {
      id: 'inh-p3',
      question: 'What is method hiding vs method overriding? How does `static` change things?',
      hint: 'Think about what happens when the parent and child both have a static method with the same name.',
      answer:
        'Method overriding: instance methods — resolved at runtime via dynamic dispatch. The child\'s version runs when referenced via parent type. Method hiding: static methods — resolved at compile time based on reference type, NOT actual object type. `Animal.staticMethod()` calls Animal\'s version even if object is Dog. This is a subtle trap: polymorphism does NOT apply to static methods. Also, @Override annotation cannot be used on static methods (compiler error).',
      checkYourself:
        'Did you explain that static methods are hidden (compile-time) not overridden (runtime)?',
    },
  ],

  // ─── Interfaces & Abstract Classes ────────────────────────────────────────
  'interfaces-abstract': [
    {
      id: 'ia-p1',
      question: 'When would you prefer an abstract class over an interface? Give a real scenario.',
      hint: 'Think about shared state, constructor logic, and partial implementation.',
      answer:
        'Choose abstract class when: subclasses share common state (fields) and behavior. Example: `abstract class Shape { protected String color; abstract double area(); void printColor() { ... } }` — all shapes have a color field and printColor() logic. This can\'t be done cleanly with just an interface. Use interfaces for pure contracts without shared state, or when a class needs to implement multiple contracts. Key rule: abstract class = "IS-A with shared implementation", interface = "CAN-DO contract".',
      checkYourself:
        'Did you give a concrete scenario and explain the shared state / partial implementation advantage?',
    },
    {
      id: 'ia-p2',
      question: 'What are default methods in interfaces (Java 8)? Why were they added?',
      hint: 'Think about backward compatibility when adding methods to existing interfaces.',
      answer:
        'Default methods allow interfaces to have method implementations. Before Java 8, adding a method to an interface would break ALL implementing classes. Default methods solve this: existing implementers inherit the default implementation unless they override it. Example: `List.forEach()` was added in Java 8 as a default method — all existing List implementations got it for free. They also allow interface-based multiple inheritance of behavior (with explicit resolution for conflicts).',
      checkYourself:
        'Did you explain the backward compatibility motivation and how existing implementations benefit?',
    },
    {
      id: 'ia-p3',
      question: 'Can an interface extend another interface? Can a class implement multiple interfaces?',
      hint: 'Think about how Java handles multiple interface inheritance.',
      answer:
        'Interface extending interface: Yes, using `extends` (not implements). One interface can extend multiple interfaces. Example: `interface Flyable extends Movable, Colorable {}`. A class implementing Flyable must implement all methods from Flyable, Movable, and Colorable. Class implementing multiple interfaces: Yes — `class Hawk extends Bird implements Flyable, Predator {}`. This is Java\'s substitute for multiple class inheritance, and it works because interfaces don\'t have state that could conflict.',
      checkYourself:
        'Did you confirm both are possible and show correct syntax for each?',
    },
  ],

  // ─── OOP Pillars ──────────────────────────────────────────────────────────
  'oop-pillars': [
    {
      id: 'oop-p1',
      question: 'Describe encapsulation in your own words. What problem does it solve?',
      hint: 'Think about controlling access to data and hiding internal implementation details.',
      answer:
        'Encapsulation bundles data (fields) and behavior (methods) inside a class, and restricts direct access to fields via access modifiers (private). External code interacts only through controlled methods (getters/setters). Problem solved: prevents invalid state. Example: `private int age;` with `setAge(int a) { if(a > 0) this.age = a; }` — without encapsulation, any code could set age = -5. Encapsulation enforces invariants, reduces coupling, and makes code maintainable.',
      checkYourself:
        'Did you explain bundling + access control and give a concrete protection example?',
    },
    {
      id: 'oop-p2',
      question: 'What is abstraction and how is it different from encapsulation?',
      hint: 'Think about "what you expose" vs "how you hide the internals".',
      answer:
        'Abstraction: showing only what\'s necessary, hiding complexity. Achieved via abstract classes, interfaces, and method-level hiding of implementation details. Example: `List.sort()` — you don\'t know it\'s using TimSort internally; you just call the method. Encapsulation: hiding the internal state and protecting it from direct access. Difference: Abstraction = hide "how it works" (implementation). Encapsulation = hide "what it contains" (data). Both reduce coupling but at different levels.',
      checkYourself:
        'Did you clearly differentiate what each concept hides and give examples for both?',
    },
  ],

  // ─── Multithreading ───────────────────────────────────────────────────────
  'multithreading': [
    {
      id: 'mt-p1',
      question: 'What is a race condition? Write a scenario where it would happen and how to fix it.',
      hint: 'Two threads reading and writing the same variable without synchronization.',
      answer:
        'Race condition: two threads access shared mutable data, and the final result depends on thread scheduling. Example: balance = 1000. Thread A reads 1000, Thread B reads 1000. Both add 500 and write — final balance is 1500 instead of 2000 (one update is lost). Fix: `synchronized` keyword on the increment method, or use AtomicInteger, or explicitly lock with ReentrantLock. Key insight: read-compute-write sequences are NOT atomic without synchronization.',
      checkYourself:
        'Did you describe lost update scenario and provide a synchronization solution?',
    },
    {
      id: 'mt-p2',
      question: 'What is the difference between a process and a thread?',
      hint: 'Think about memory sharing, isolation, and overhead.',
      answer:
        'Process: independent program in execution with its own memory space (heap, stack, code, data). Isolated from other processes. High overhead to create/switch. Thread: a unit of execution within a process. Threads share the process heap and code but each has its own stack. Lower overhead to create/switch. Java threads share the JVM heap — this enables fast sharing but requires synchronization to avoid race conditions. Multiple threads in one process = multithreading. Multiple processes = multiprocessing.',
      checkYourself:
        'Did you explain memory isolation for processes vs sharing for threads, and the performance tradeoff?',
    },
    {
      id: 'mt-p3',
      question: 'What is deadlock? Describe the 4 conditions required for deadlock to occur.',
      hint: 'Deadlock theory has 4 necessary conditions — all must be present simultaneously.',
      answer:
        '1) Mutual Exclusion: resource can only be held by one thread at a time. 2) Hold and Wait: thread holds a resource while waiting for another. 3) No Preemption: resources can\'t be forcibly taken from a thread. 4) Circular Wait: Thread A waits for Thread B\'s lock, B waits for A\'s lock. Fix: break any one condition. Best practice: always acquire locks in the same order across all threads (breaks circular wait). Or use timed lockAttempt with ReentrantLock.tryLock().',
      checkYourself:
        'Did you name all 4 conditions and propose at least one concrete prevention strategy?',
    },
  ],

  // ─── Generics ─────────────────────────────────────────────────────────────
  'generics': [
    {
      id: 'gen-p1',
      question: 'Why were generics introduced in Java? What problem did they solve that existed before Java 5?',
      hint: 'Think about what you had to do with `List` before generics and what runtime errors could occur.',
      answer:
        'Before generics (Java 5), collections stored `Object` references. You had to cast every element retrieved: `String s = (String) list.get(0)` — no compile-time type check. If you accidentally stored an Integer and tried to cast to String, you got a ClassCastException at runtime. Generics moved this check to compile time: `List<String>` guarantees that only Strings go in, no cast needed on get(), and type errors are caught before runtime.',
      checkYourself:
        'Did you explain the pre-generics casting problem and how generics solve it at compile time?',
    },
    {
      id: 'gen-p2',
      question: 'What is type erasure in Java generics? What are its implications?',
      hint: 'Think about what happens to generic type information after compilation.',
      answer:
        'Type erasure: Java removes all generic type information at compile time and replaces type parameters with their bounds (Object by default). `List<String>` and `List<Integer>` both become `List` at runtime. Implications: 1) Cannot create new T() or new T[] in generic code. 2) Cannot use instanceof with generics (e.g., `x instanceof List<String>` is illegal). 3) Overloading by generic type alone fails at runtime. Erasure maintains backward compatibility with pre-Java-5 bytecode.',
      checkYourself:
        'Did you explain what erasure does, and list at least 2 limitations it causes?',
    },
  ],

  // ─── Lambda & Streams ─────────────────────────────────────────────────────
  'lambda-streams': [
    {
      id: 'ls-p1',
      question: 'What is a functional interface? Why does the @FunctionalInterface annotation exist?',
      hint: 'Think about what makes an interface usable as a lambda target.',
      answer:
        'A functional interface has exactly one abstract method. It can have any number of default and static methods. Lambda expressions can be assigned to functional interfaces because a lambda provides the implementation for that single abstract method. @FunctionalInterface annotation: optional but recommended — it causes the compiler to verify the interface has exactly one abstract method, generating a compile error if you accidentally add a second. Built-in: Predicate<T>, Function<T,R>, Consumer<T>, Supplier<T>, Runnable.',
      checkYourself:
        'Did you define functional interface, explain why single abstract method matters, and mention @FunctionalInterface\'s compile-time check?',
    },
    {
      id: 'ls-p2',
      question: 'What is the difference between `map()` and `flatMap()` in streams?',
      hint: 'Think about what happens when each element produces a collection.',
      answer:
        'map(f): applies function f to each element, producing one output per input — result shape is the same. `Stream<String>`.map(s -> s.length())` = `Stream<Integer>`. flatMap(f): apply f to each element where f returns a Stream, then flatten all streams into one. `["hello", "world"].flatMap(s -> Arrays.stream(s.split("")))` = `["h","e","l","l","o","w","o","r","l","d"]`. Use flatMap when each element can produce zero, one, or many results.',
      checkYourself:
        'Did you explain that flatMap flattens nested streams and give a concrete example?',
    },
    {
      id: 'ls-p3',
      question: 'Are Java streams lazy? Explain what that means with an example.',
      hint: 'Think about when intermediate operations actually execute.',
      answer:
        'Yes. Intermediate operations (filter, map, sorted) are lazy — they don\'t execute immediately. They build a pipeline definition. Execution happens only when a terminal operation (collect, forEach, count, findFirst) triggers it. Example: `stream.filter(x -> x > 5).map(x -> x * 2).findFirst()` — if the first element passes filter, it\'s mapped and returned immediately without processing remaining elements. Laziness enables short-circuiting and infinite streams.',
      checkYourself:
        'Did you explain lazy evaluation, when execution actually happens, and mention short-circuit benefit?',
    },
  ],

  // ─── JVM Memory ───────────────────────────────────────────────────────────
  'jvm-memory': [
    {
      id: 'jvm-p1',
      question: 'Describe the major memory areas in the JVM and what each stores.',
      hint: 'Think about Stack, Heap, Method Area, PC Register.',
      answer:
        'Heap: objects and instance variables. Shared by all threads. GC managed. Stack: per-thread. Stores stack frames (local variables, method call state). Automatically freed on method return. Method Area (Metaspace in Java 8+): class definitions, static variables, constants. Shared across threads. PC Register: per-thread program counter — which bytecode instruction is currently executing. Native Method Stack: for native (C/C++) method calls. Key: Stack is fast and auto-managed, Heap is larger and GC-managed.',
      checkYourself:
        'Did you name at least 4 areas and describe what each stores and who manages it?',
    },
    {
      id: 'jvm-p2',
      question: 'What is Garbage Collection? Explain the generational hypothesis behind Java GC.',
      hint: 'Think about Young Generation, Old Generation, and object lifetimes.',
      answer:
        'GC automatically reclaims memory from unreachable objects. Generational hypothesis: "most objects die young" (short-lived). Java heap is divided: Young Generation (eden + survivor spaces) — new objects created here, minor GC runs frequently. Objects that survive enough minor GCs are promoted to Old Generation (tenured) — less frequent major GC. Metaspace for class data. This design makes GC efficient: most collections are minor (fast) because most objects are short-lived.',
      checkYourself:
        'Did you explain the generational hypothesis and at least Young vs Old generation behavior?',
    },
  ],
};

// Helper: get practice questions for a topic slug
export function getPracticeQuestions(slug: string): PracticeQuestion[] {
  return practiceData[slug] ?? [];
}
