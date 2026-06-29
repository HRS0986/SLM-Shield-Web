import { HTTPValidationError, PromptRequest, VerifyResponse } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function verifyPrompt(request: PromptRequest): Promise<VerifyResponse | { error: HTTPValidationError }> {
    try {
        const response = await fetch(`${API_BASE_URL}/verify-prompt`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });

        if (response.status === 422) {
            const errorData = await response.json();
            return { error: errorData as HTTPValidationError };
        }

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        return await response.json() as VerifyResponse;
    } catch (error) {
        console.error("Verification failed:", error);
        throw error;
    }
}

export async function checkHealth(): Promise<boolean> {
    try {
        const response = await fetch(`${API_BASE_URL}/health`);
        return response.ok;
    } catch {
        return false;
    }
}
