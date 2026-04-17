async function testAiHint() {
  const url = 'http://localhost:3000/api/ai/hint';
  const payload = {
    question: "What is the difference between final, finally, and finalize in Java?",
    userAnswer: "final is for constants, finally is for try blocks."
  };

  console.log("Testing AI Hint API...");
  console.log("Payload:", JSON.stringify(payload, null, 2));

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    console.log("Response:", JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Test failed:", error.message);
  }
}

testAiHint();
