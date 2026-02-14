import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

const FloatingChatbot = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = { role: "user", text: message };
    setChat((prev) => [...prev, userMsg]);
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_HUGE_BASE_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
      });

      const data = await res.json();
      console.log("API DATA:", data);
      // ⭐ STRUCTURED BOT MESSAGE
      const botMsg = {
        role: "bot",
        summary: data.summary || [],
        elaboration: data.elaboration || "",
        steps: data.implementation?.steps || [],
        sustainability: data.sustainability?.longTermImpact || ""
      };

      setChat((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <>
      {/* CHAT WINDOW */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-24 right-6 z-[9999] w-[360px] h-[520px]
            rounded-3xl bg-white/80 backdrop-blur border shadow-xl flex flex-col overflow-hidden"
          >
            {/* HEADER */}
            <div className="flex justify-between items-center px-5 py-3
            bg-gradient-to-r from-primary to-emerald-600 text-white">
              <div className="font-semibold">AI Assistant</div>
              <button onClick={() => setOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* CHAT AREA */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              
              {chat.map((c, i) => (
                <div key={i}>
                  {c.role === "user" ? (
                    <div className="ml-auto bg-primary text-white px-4 py-2 rounded-2xl max-w-[80%] text-sm">
                      {c.text}
                    </div>
                  ) : (
                    <div className="bg-white/70 backdrop-blur border rounded-2xl p-4 max-w-[85%] space-y-3 text-sm shadow">
                      
                      {/* 🌿 Summary */}
                      {c.summary?.length > 0 && (
                        <div>
                          <div className="font-semibold text-emerald-700">🌿 Summary</div>
                          <ul className="list-disc ml-4">
                            {c.summary.map((s: string, idx: number) => (
                              <li key={idx}>{s}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* 📘 Explanation */}
                      {c.elaboration && (
                        <div>
                          <div className="font-semibold text-blue-600">📘 Explanation</div>
                          <p>{c.elaboration}</p>
                        </div>
                      )}

                      {/* ⚡ Steps */}
                      {c.steps?.length > 0 && (
                        <div>
                          <div className="font-semibold text-yellow-600">⚡ Steps</div>
                          <ul className="list-decimal ml-4">
                            {c.steps.map((step: string, idx: number) => (
                              <li key={idx}>{step}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* ♻ Sustainability */}
                      {c.sustainability && (
                        <div>
                          <div className="font-semibold text-green-700">
                            ♻ Sustainability Impact
                          </div>
                          <p>{c.sustainability}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="text-xs text-muted-foreground animate-pulse">
                  AI is typing...
                </div>
              )}
            </div>

            {/* INPUT */}
            <div className="p-3 border-t flex gap-2 bg-white/60 backdrop-blur">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask about sustainability..."
                className="flex-1 rounded-xl border px-3 py-2 text-sm"
              />

              <button
                onClick={sendMessage}
                className="px-3 rounded-xl bg-primary text-white"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING ICON */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-[9999]
        w-16 h-16 rounded-full bg-gradient-to-r from-primary to-emerald-600
        text-white flex items-center justify-center shadow-xl"
      >
        <MessageCircle className="w-7 h-7" />
      </button>
    </>
  );
};

export default FloatingChatbot;
