import fs from 'fs';

const filePath = 'd:/OneDrive/Desktop/Java Digital Notes/java-digital-notes/src/data/topics.ts';
let content = fs.readFileSync(filePath, 'utf8');

// The strategy:
// Match { ... explanation: '...', ... } where difficulty: is NOT present.
// We'll replace the block to include difficulty.

// We use a non-greedy match for the object content.
const objectRegex = /\{([^{}]*?explanation:\s*'((?:\\'|[^'])*)'[^{}]*?)\}/g;

let totalFixed = 0;
const newContent = content.replace(objectRegex, (match, objContent) => {
    // If it already has difficulty, leave it alone
    if (objContent.includes('difficulty:')) {
        return match;
    }
    
    totalFixed++;
    // Add difficulty: 'easy' at the end of the object properties
    // We'll find the last non-whitespace character before the end and add a comma and difficulty.
    
    // Check if it ends with a comma already
    const trimmed = objContent.trimEnd();
    if (trimmed.endsWith(',')) {
        return `{${trimmed}\n        difficulty: 'easy',\n      }`;
    } else {
        return `{${trimmed},\n        difficulty: 'easy',\n      }`;
    }
});

console.log(`Matched and fixed ${totalFixed} instances.`);

fs.writeFileSync(filePath, newContent);
