import PromptAnalyzer from './components/PromptAnalyzer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-white font-sans selection:bg-purple-500/30">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/20 blur-[120px] mix-blend-screen animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px] mix-blend-screen animate-blob animation-delay-2000"></div>
        <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-pink-900/20 blur-[120px] mix-blend-screen animate-blob animation-delay-4000"></div>
        
        {/* Grid Pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-10 w-full max-w-7xl mx-auto min-h-screen">
        <div className="w-full">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
              SLM <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">Shield</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              Real-time enterprise grade prompt injection detection. Secure your AI applications with state-of-the-art analysis.
            </p>
          </div>

          <PromptAnalyzer />
        </div>
      </main>
      
      <footer className="py-6 text-center text-gray-500 text-sm relative z-10 border-t border-white/5">
        <p>© {new Date().getFullYear()} SLM Shield. All rights reserved.</p>
      </footer>
    </div>
  );
}
