// Gemini Service is temporarily disabled
// import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({ 
//   apiKey: import.meta.env.VITE_GEMINI_API_KEY || '' 
// });

export const GeminiService = {
  async getConstructionAdvice(prompt: string): Promise<string> {
    try {
      // Service temporarily disabled
      return "سرویس مشاوره هوشمند در حال حاضر در دسترس نیست. لطفاً بعداً تلاش کنید.";
      
      /* Original Gemini API call (commented out)
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction: `You are a highly experienced senior civil engineer and architect working for "SazeYar". 
          Your goal is to help Iranian homeowners with renovation, construction costs, material selection, and interior design.
          
          Rules:
          1. Answer in Persian (Farsi).
          2. Be professional, polite, and technical but easy to understand.
          3. If asked about costs, give estimates based on the Iranian market (Toman) but warn that prices fluctuate.
          4. Suggest modern, sustainable building practices.
          5. Format your output nicely using Markdown (bullet points, bold text).`,
          temperature: 0.7,
        }
      });
      
      return response.text || "متاسفانه نتوانستم پاسخ مناسبی پیدا کنم. لطفاً دوباره تلاش کنید.";
      */
    } catch (error) {
      console.error("Error in Gemini Service:", error);
      return "خطایی در سرویس رخ داده است. لطفاً بعداً تلاش کنید.";
    }
  }
};