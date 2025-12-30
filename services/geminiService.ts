import { GoogleGenAI } from "@google/genai";
import { QuizState, Language } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateSkinAnalysis = async (answers: QuizState, language: Language): Promise<string> => {
  try {
    const prompt = `
      Act as a clinical dermatologist. 
      Analyze the following skin profile for a user building a routine with The Ordinary products:
      - Skin Type: ${answers.skinType}
      - Primary Concern: ${answers.concern}
      - Sensitivity Level: ${answers.sensitivity}
      - Experience Level: ${answers.experience}

      Provide a concise, scientific, yet accessible explanation (max 100 words) of why specific ingredients (like Niacinamide, Hyaluronic Acid, or Retinol) are chosen for this specific profile. 
      Focus on the biological mechanism (e.g., "regulates sebum production", "increases cell turnover").
      
      IMPORTANT: Respond in ${language === 'vn' ? 'Vietnamese' : 'English'}.
      Tone: Clinical, objective, reassuring.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || (language === 'vn' ? "Dựa trên thông tin của bạn, chúng tôi đã chọn một công thức cân bằng hiệu quả và bảo vệ da." : "Based on your inputs, we have selected a formulation that balances efficacy with barrier support.");
  } catch (error) {
    console.error("Gemini API Error:", error);
    return language === 'vn' ? "Dịch vụ tạm thời không khả dụng." : "Service temporarily unavailable.";
  }
};

export const chatWithDermBot = async (query: string, context: string, language: Language): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Context: User is viewing a skincare routine for ${context}.
            User Question: ${query}
            Language: ${language === 'vn' ? 'Vietnamese' : 'English'}
            
            Answer as a helpful scientific skincare guide in the specified language. Keep it brief (under 50 words).`,
        });
        return response.text || (language === 'vn' ? "Tôi không thể trả lời ngay lúc này." : "I cannot answer that at the moment.");
    } catch (error) {
        return language === 'vn' ? "Dịch vụ tạm thời không khả dụng." : "Service temporarily unavailable.";
    }
}