// src/hooks/useGeminiRag.ts
import { useCallback, useState } from "react";
import { buildKbEmbeddings, runRAG } from "../services/rag";

export function useGeminiRag() {
  const [loading, setLoading] = useState(false);

  async function init(apiKey: string) {
    setLoading(true);
    try {
      // builds embeddings (cached in sessionStorage)
      await buildKbEmbeddings(apiKey);
    } finally {
      setLoading(false);
    }
  }

  const ask = useCallback(async (apiKey: string, question: string) => {
    setLoading(true);
    try {
      const res = await runRAG(apiKey, question);
      return res;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    init,
    ask,
    loading
  };
}
