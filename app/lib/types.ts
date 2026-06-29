export interface PromptRequest {
    text: string;
}

export interface ValidationError {
    loc: (string | number)[];
    msg: string;
    type: string;
    input?: unknown;
    ctx?: Record<string, unknown>;
}

export interface HTTPValidationError {
    detail: ValidationError[];
}

// Assuming a standard response format if not specified
export interface VerifyResponse {
    is_injection?: boolean;
    score?: number;
    [key: string]: unknown;
}