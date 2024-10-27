import { NextResponse } from 'next/server';

// Helper function to fetch affirmations from OpenRouter API
async function getAffirmation() {
    const content = `Generate a positive quote that shows how they can help the environment, themselves and their family by quitting smoking. Make it motivational and empowering. Jut return the quote without any introduction or conclusion or any object`;

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer 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`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "meta-llama/llama-3.1-8b-instruct:free",
                "messages": [
                    { "role": "user", "content": "Provide a motivational affirmation for quitting smoking." },
                    { "role": "system", "content": content },
                ]
            })
        });

        if (!response.ok) {
            throw new Error("Failed to fetch affirmation");
        }

        const result = await response.json();
        return result.choices[0].message.content;
    } catch (error) {
        return NextResponse.json({
            status: "Error",
            message: "Could not generate affirmation",
        });
    }
}

export async function POST(req, res) {
    try {
        // Call the getAffirmation function to generate an affirmation
        const affirmation = await getAffirmation();
        console.log("Affirmation generated:", affirmation);

        // Return the final result
        return NextResponse.json({
            status: "Success",
            message: affirmation,
        });
    } catch (e) {
        console.error("Error generating affirmation:", e.message);
        return NextResponse.json({
            status: "Error",
            message: "Could not generate affirmation",
        });
    }
}
