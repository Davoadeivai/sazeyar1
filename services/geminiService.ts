import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const GeminiService = {
  async getConstructionAdvice(prompt: string, media?: { mimeType: string; data: string }): Promise<string> {
    try {
      const parts: any[] = [{ text: prompt }];

      // If media is provided, add it to the parts
      if (media) {
        parts.push({
          inlineData: {
            mimeType: media.mimeType,
            data: media.data
          }
        });
      }

      // Use the flash model which supports multimodal input
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: parts },
        config: {
          systemInstruction: `You are a highly experienced senior civil engineer and architect working for "SazeYar". 
          Your goal is to help Iranian homeowners with renovation, construction costs, material selection, and interior design.
          
          Rules:
          1. Answer in Persian (Farsi).
          2. Be professional, polite, and technical but easy to understand.
          3. If the user sends an image or video, analyze it carefully regarding construction/renovation context.
          4. If asked about costs, give estimates based on the Iranian market (Toman) but warn that prices fluctuate.
          5. Suggest modern, sustainable building practices.
          6. Format your output nicely using Markdown (bullet points, bold text).
          `,
          temperature: 0.7,
        }
      });
      
      return response.text || "متاسفانه نتوانستم پاسخ مناسبی پیدا کنم. لطفا دوباره تلاش کنید.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "خطایی در ارتباط با هوش مصنوعی رخ داده است. ممکن است حجم فایل زیاد باشد یا فرمت آن پشتیبانی نشود.";
    }
  }
};