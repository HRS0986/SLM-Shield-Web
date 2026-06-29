'use client';

import { useState } from 'react';
import { verifyPrompt } from '../lib/api';
import { PromptRequest, VerifyResponse, HTTPValidationError } from '../lib/types';

export default function PromptAnalyzer() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerifyResponse | null>(null);
  const [error, setError] = useState<HTTPValidationError | string | null>(null);

  const handleVerify = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const req: PromptRequest = { text: prompt };
      const res = await verifyPrompt(req);

      if ('error' in res) {
        setError(res.error);
      } else {
        setResult(res);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const isInjectionDetected = result?.decision === "INJECTION";
  const isSafe = result && !isInjectionDetected;

  return (
    <div className="w-full max-w-2xl mx-auto backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-3xl shadow-2xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(139,92,246,0.15)] relative overflow-hidden group">

      {/* Decorative gradient orb */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-700 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col gap-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
            Realtime Shield
          </h2>
          <p className="text-gray-400 text-sm">
            Enter your prompt below to scan for potential injection attacks or malicious intent.
          </p>
        </div>

        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type your prompt here..."
            className="w-full h-40 bg-black/40 border border-white/10 rounded-2xl p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 resize-none font-mono text-sm leading-relaxed shadow-inner"
          />
        </div>

        <button
          onClick={handleVerify}
          disabled={loading || !prompt.trim()}
          className="relative w-full py-4 rounded-2xl font-semibold text-white overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 active:scale-[0.98]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 transition-transform duration-500 group-hover:scale-105"></div>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer"></div>
          <span className="relative flex items-center justify-center gap-2">
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Scanning...
              </>
            ) : (
              'Verify Prompt'
            )}
          </span>
        </button>

        {/* Results Area */}
        <div className={`transition-all duration-500 ease-in-out ${result || error ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0 overflow-hidden'}`}>

          {error && (
            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400">
              <h3 className="font-semibold flex items-center gap-2 mb-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Error
              </h3>
              {typeof error === 'string' ? (
                <p className="text-sm">{error}</p>
              ) : (
                <ul className="text-sm list-disc list-inside space-y-1">
                  {error.detail.map((err, i) => (
                    <li key={i}>{err.msg} ({err.loc.join('.')})</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {result && (
            <div className={`p-6 rounded-2xl border backdrop-blur-sm transition-all duration-500 ${isInjectionDetected ? 'bg-red-500/10 border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.15)]' : 'bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.15)]'}`}>
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${isInjectionDetected ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                  {isInjectionDetected ? (
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  ) : (
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${isInjectionDetected ? 'text-red-400' : 'text-emerald-400'}`}>
                    {isInjectionDetected ? 'Injection Detected!' : 'Prompt is Safe'}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {JSON.stringify(result, null, 2)}
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
