
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

const FloatingDashboard = () => {
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
      const res = await fetch(`${import.meta.env.VITE_HUGE_BASE_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
      });

      const data = await res.json();

      const botMsg = {
        role: "bot",
        summary: Array.isArray(data.summary) ? data.summary : [],
        elaboration: data.elaboration || ""
      };

      setChat((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-24 right-6 z-[9999] w-[360px] h-[520px]
            rounded-3xl bg-white/80 backdrop-blur border shadow-xl flex flex-col overflow-hidden"
          >
            <div className="flex justify-between items-center px-5 py-3
            bg-gradient-to-r from-primary to-emerald-600 text-white">
              <div className="font-semibold">Sustainability AI</div>
              <button onClick={() => setOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {chat.map((c, i) => (
                <div key={i}>
                  {c.role === "user" ? (
                    <div className="ml-auto bg-primary text-white px-4 py-2 rounded-2xl max-w-[80%] text-sm">
                      {c.text}
                    </div>
                  ) : (
                    <div className="bg-white/70 border rounded-2xl p-4 max-w-[85%] space-y-3 text-sm shadow">
                      
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

                      {c.elaboration && (
                        <div>
                          <div className="font-semibold text-blue-600">📘 Explanation</div>
                          <p>{c.elaboration}</p>
                        </div>
                      )}

                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="text-xs animate-pulse">
                  AI is thinking...
                </div>
              )}
            </div>

            <div className="p-3 border-t flex gap-2 bg-white/60">
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

export default FloatingDashboard;
