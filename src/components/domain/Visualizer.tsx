'use client';
import { motion } from 'framer-motion';

// ─── Flow Diagram (Main Method / Exception Handling) ───
function FlowVisualizer({ topic }: { topic: string }) {
  const flows: Record<string, { label: string; color: string }[]> = {
    'main-method': [
      { label: 'JVM Loads Class', color: '#6366f1' },
      { label: 'Finds main() Method', color: '#8b5cf6' },
      { label: 'Executes Statements', color: '#a855f7' },
      { label: 'Prints to Console', color: '#d946ef' },
      { label: 'Program Exits', color: '#ec4899' },
    ],
    'exception-handling': [
      { label: 'try { ... }', color: '#6366f1' },
      { label: 'Exception Thrown?', color: '#f59e0b' },
      { label: 'catch(Exception e)', color: '#ef4444' },
      { label: 'finally { ... }', color: '#10b981' },
      { label: 'Program Continues', color: '#6366f1' },
    ],
    'methods': [
      { label: 'Method Called', color: '#06b6d4' },
      { label: 'Args Copied (by value)', color: '#0ea5e9' },
      { label: 'Method Body Executes', color: '#3b82f6' },
      { label: 'Returns Value / void', color: '#6366f1' },
      { label: 'Caller Resumes', color: '#8b5cf6' },
    ],
  };

  const steps = flows[topic] ?? flows['main-method'];

  return (
    <div className="flex flex-col items-center gap-3 py-6">
      {steps.map((step, i) => (
        <div key={i} className="flex flex-col items-center w-full max-w-xs">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            className="w-full text-center px-5 py-3 rounded-xl text-white text-sm font-semibold shadow-lg"
            style={{ background: step.color }}
          >
            {step.label}
          </motion.div>
          {i < steps.length - 1 && (
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 + 0.08 }}
              className="w-px h-7 origin-top"
              style={{ background: `linear-gradient(to bottom, ${step.color}, ${steps[i + 1].color})` }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Memory Block (Strings / Arrays / Data Types) ───
function MemoryVisualizer({ topic }: { topic: string }) {
  if (topic === 'strings') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
        <div className="rounded-xl border-2 border-amber-400/40 bg-amber-400/5 p-4">
          <div className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-3">String Pool (Heap)</div>
          {['String a = "Java"', 'String b = "Java"', '↑ Both point here'].map((label, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`px-3 py-2 rounded-lg text-sm font-mono mb-1.5 ${
                i === 2 ? 'text-amber-600 dark:text-amber-400 italic text-xs' : 'bg-amber-500/10 text-slate-700 dark:text-slate-300'
              }`}
            >{label}</motion.div>
          ))}
        </div>
        <div className="rounded-xl border-2 border-rose-400/40 bg-rose-400/5 p-4">
          <div className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider mb-3">Heap (new String)</div>
          {['new String("Java") → 0x1A2B', 'new String("Java") → 0x3C4D', '↑ Different objects!'].map((label, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`px-3 py-2 rounded-lg text-sm font-mono mb-1.5 ${
                i === 2 ? 'text-rose-600 dark:text-rose-400 italic text-xs' : 'bg-rose-500/10 text-slate-700 dark:text-slate-300'
              }`}
            >{label}</motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (topic === 'data-types') {
    const types = [
      { name: 'byte', size: '1B', range: '-128 to 127', color: '#10b981', width: 8 },
      { name: 'short', size: '2B', range: '-32K to 32K', color: '#06b6d4', width: 16 },
      { name: 'int', size: '4B', range: '±2.1 Billion', color: '#6366f1', width: 32 },
      { name: 'long', size: '8B', range: '±9.2 Quintillion', color: '#8b5cf6', width: 64 },
      { name: 'float', size: '4B', range: '~6-7 decimal digits', color: '#f59e0b', width: 32 },
      { name: 'double', size: '8B', range: '~15 decimal digits', color: '#f97316', width: 64 },
    ];
    return (
      <div className="space-y-3 py-4">
        {types.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className="flex items-center gap-3"
          >
            <span className="font-mono text-sm font-bold w-14 text-right" style={{ color: t.color }}>{t.name}</span>
            <div className="flex-1 h-7 bg-slate-100 dark:bg-white/5 rounded-lg overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${t.width}%` }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 + 0.1, duration: 0.6, ease: 'easeOut' }}
                className="h-full rounded-lg flex items-center px-3"
                style={{ background: t.color }}
              >
                <span className="text-white text-xs font-bold">{t.size}</span>
              </motion.div>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 w-40">{t.range}</span>
          </motion.div>
        ))}
      </div>
    );
  }

  if (topic === 'arrays') {
    const values = [42, 17, 88, 5, 63];
    return (
      <div className="py-4">
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 font-mono">int[] arr = {'{'}42, 17, 88, 5, 63{'}'}</p>
        <div className="flex gap-1 justify-center flex-wrap">
          {values.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 border-2 border-indigo-500/60 bg-indigo-500/10 rounded-xl flex items-center justify-center">
                <span className="font-mono font-bold text-lg text-indigo-600 dark:text-indigo-400">{v}</span>
              </div>
              <span className="mt-1.5 text-xs font-mono text-slate-400">[{i}]</span>
            </motion.div>
          ))}
        </div>
        <p className="text-xs text-slate-400 text-center mt-4 font-mono">arr.length = 5 · Index: 0 to 4</p>
      </div>
    );
  }

  return null;
}

// ─── Hierarchy (Inheritance / Polymorphism) ───
function HierarchyVisualizer({ topic }: { topic: string }) {
  const trees: Record<string, { label: string; sub?: string[]; color: string }[]> = {
    polymorphism: [
      { label: 'Animal (Parent)', color: '#6366f1', sub: ['+ speak() { }'] },
      { label: 'Dog extends Animal', color: '#8b5cf6', sub: ['@Override speak() → "Woof!"'] },
      { label: 'Cat extends Animal', color: '#a855f7', sub: ['@Override speak() → "Meow!"'] },
    ],
    inheritance: [
      { label: 'Vehicle (Parent)', color: '#10b981', sub: ['brand', 'start()'] },
      { label: 'Car extends Vehicle', color: '#06b6d4', sub: ['doors', 'honk()'] },
      { label: 'ElectricCar extends Car', color: '#6366f1', sub: ['batteryCapacity', 'charge()'] },
    ],
    'abstraction-interfaces': [
      { label: '<<interface>> Payment', color: '#f59e0b', sub: ['+ pay(double amount)'] },
      { label: 'CreditCard implements Payment', color: '#10b981', sub: ['pay() → Credit Card flow'] },
      { label: 'UPI implements Payment', color: '#6366f1', sub: ['pay() → UPI flow'] },
    ],
  };

  const nodes = trees[topic] ?? trees['polymorphism'];

  return (
    <div className="flex flex-col items-center gap-0 py-6">
      {nodes.map((node, i) => (
        <div key={i} className="flex flex-col items-center w-full max-w-sm">
          {i > 0 && (
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              whileInView={{ opacity: 1, scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="w-px h-8 origin-top"
              style={{ background: node.color }}
            />
          )}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 + 0.05 }}
            className="w-full rounded-xl border-2 p-4"
            style={{ borderColor: node.color, background: `${node.color}12` }}
          >
            <div className="font-bold font-mono text-sm mb-1" style={{ color: node.color }}>{node.label}</div>
            {node.sub?.map((s, j) => (
              <div key={j} className="text-xs font-mono text-slate-500 dark:text-slate-400">{s}</div>
            ))}
          </motion.div>
        </div>
      ))}
    </div>
  );
}

// ─── Comparison Table (Overloading / Encapsulation / Abstract vs Interface) ───
function ComparisonVisualizer({ topic }: { topic: string }) {
  const tables: Record<string, { headers: string[]; rows: string[][] }> = {
    'method-overloading': {
      headers: ['Feature', 'Overloading', 'Overriding'],
      rows: [
        ['Where', 'Same class', 'Parent + Child class'],
        ['When resolved', 'Compile time', 'Runtime'],
        ['Signature', 'Must differ', 'Must be same'],
        ['Return type', 'Can differ', 'Must be same or covariant'],
        ['Type', 'Static polymorphism', 'Dynamic polymorphism'],
      ],
    },
    'abstraction-interfaces': {
      headers: ['Feature', 'Abstract Class', 'Interface'],
      rows: [
        ['Instantiation', '❌ No', '❌ No'],
        ['Multiple inheritance', '❌ No', '✅ Yes'],
        ['Constructors', '✅ Yes', '❌ No'],
        ['Instance fields', '✅ Yes', '❌ No (constants only)'],
        ['Default methods', '✅ Yes', '✅ Since Java 8'],
        ['Use when', 'IS-A + shared code', 'CAN-DO capability'],
      ],
    },
    'aggregation-composition': {
      headers: ['Feature', 'Composition', 'Aggregation'],
      rows: [
        ['Relationship', 'Strong HAS-A', 'Weak HAS-A'],
        ['Lifecycle', 'Child dies with parent', 'Child survives parent'],
        ['Ownership', 'Exclusive', 'Shared possible'],
        ['Example', 'Heart in Human', 'Professor in Dept'],
        ['Coupling', 'Tightly coupled', 'Loosely coupled'],
      ],
    },
    encapsulation: {
      headers: ['Without Encapsulation', 'With Encapsulation'],
      rows: [
        ['Fields are public', 'Fields are private'],
        ['Direct access: obj.age = -5', 'Validated: setAge(-5) → rejected'],
        ['No control over data', 'Business rules enforced'],
        ['Hard to debug', 'Easy to trace issues'],
      ],
    },
  };

  const table = tables[topic];
  if (!table) return null;

  return (
    <div className="overflow-x-auto py-4">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 dark:border-white/10">
            {table.headers.map((h) => (
              <th key={h} className="text-left py-2.5 px-4 font-bold text-slate-700 dark:text-slate-200 whitespace-nowrap bg-slate-50 dark:bg-white/3 first:rounded-tl-lg last:rounded-tr-lg">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, i) => (
            <motion.tr
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="border-b border-slate-100 dark:border-white/5 hover:bg-indigo-500/3 transition-colors"
            >
              {row.map((cell, j) => (
                <td key={j} className={`py-2.5 px-4 ${j === 0 ? 'font-semibold text-slate-800 dark:text-slate-200' : 'text-slate-600 dark:text-slate-400'}`}>
                  {cell}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Thread Lifecycle ───
function LifecycleVisualizer() {
  const states = [
    { label: 'NEW', desc: 'Thread created, not started', color: '#6366f1' },
    { label: 'RUNNABLE', desc: 'start() called', color: '#10b981' },
    { label: 'RUNNING', desc: 'CPU executing thread', color: '#f59e0b' },
    { label: 'WAITING / SLEEPING', desc: 'join() / sleep() called', color: '#8b5cf6' },
    { label: 'TERMINATED', desc: 'run() completed', color: '#ef4444' },
  ];
  return (
    <div className="flex flex-col items-center gap-2 py-6 overflow-x-auto">
      <div className="flex items-center gap-2 flex-wrap justify-center">
        {states.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="rounded-xl px-4 py-3 text-white text-center min-w-[110px] shadow-md"
              style={{ background: s.color }}
            >
              <div className="font-bold text-xs">{s.label}</div>
              <div className="text-xs opacity-80 mt-0.5 leading-tight">{s.desc}</div>
            </motion.div>
            {i < states.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 + 0.1 }}
                className="text-slate-400 text-lg font-bold"
              >→</motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Relationship (Aggregation / Composition) ───
function RelationshipVisualizer() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-4">
      <div className="rounded-xl border-2 border-indigo-500/40 bg-indigo-500/5 p-4">
        <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-3">Composition (Strong)</div>
        <div className="flex flex-col gap-2">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm font-bold text-center">🏠 House</motion.div>
          <div className="text-center text-xs text-indigo-400 font-mono">contains (owns)</div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="px-3 py-2 rounded-lg bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 text-sm font-bold text-center border border-indigo-500/30">🛋️ Room</motion.div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 text-center">Room cannot exist without House</p>
        </div>
      </div>
      <div className="rounded-xl border-2 border-amber-500/40 bg-amber-500/5 p-4">
        <div className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-3">Aggregation (Weak)</div>
        <div className="flex flex-col gap-2">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="px-3 py-2 rounded-lg bg-amber-500 text-white text-sm font-bold text-center">🏢 Department</motion.div>
          <div className="text-center text-xs text-amber-400 font-mono">uses (references)</div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="px-3 py-2 rounded-lg bg-amber-500/15 text-amber-700 dark:text-amber-300 text-sm font-bold text-center border border-amber-500/30">👨‍🏫 Professor</motion.div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 text-center">Professor can exist independently</p>
        </div>
      </div>
    </div>
  );
}

// ─── Main Visualizer Export ───
interface VisualizerProps {
  type: 'flow' | 'memory' | 'hierarchy' | 'comparison' | 'lifecycle' | 'relationship';
  topicSlug: string;
}

export default function Visualizer({ type, topicSlug }: VisualizerProps) {
  const map: Record<string, React.ReactNode> = {
    flow:         <FlowVisualizer topic={topicSlug} />,
    memory:       <MemoryVisualizer topic={topicSlug} />,
    hierarchy:    <HierarchyVisualizer topic={topicSlug} />,
    comparison:   <ComparisonVisualizer topic={topicSlug} />,
    lifecycle:    <LifecycleVisualizer />,
    relationship: <RelationshipVisualizer />,
  };

  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-white/5 bg-white/60 dark:bg-white/3 overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-200/60 dark:border-white/5 bg-slate-50/60 dark:bg-white/2">
        <span className="text-base">📊</span>
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Visual Concept Map</span>
        <span className="ml-auto text-xs text-slate-400 capitalize">{type} diagram</span>
      </div>
      <div className="px-5">
        {map[type] ?? <p className="py-6 text-sm text-slate-400">Visualizer coming soon.</p>}
      </div>
    </div>
  );
}
