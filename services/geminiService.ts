import { QuizState, Language } from "../types";

// MOCK SERVICE: No real API calls to Google Gemini
// This ensures no API key is needed and prevents leakage.

export const generateSkinAnalysis = async (answers: QuizState, language: Language): Promise<string> => {
  // Simulate network delay for realistic UX
  await new Promise(resolve => setTimeout(resolve, 1500));

  if (language === 'vn') {
    return `Dựa trên làn da ${translateSkinType(answers.skinType)} và vấn đề ${translateConcern(answers.concern)} của bạn, chúng tôi đã xây dựng một phác đồ tập trung vào việc củng cố hàng rào bảo vệ da. Các hoạt chất được chọn lọc kỹ lưỡng để giảm thiểu kích ứng trong khi vẫn đảm bảo hiệu quả điều trị tối ưu.`;
  }
  
  return `Based on your ${answers.skinType} skin and ${answers.concern} concerns, we have formulated a regimen focused on barrier support. Selected actives are balanced to minimize irritation while targeting textural irregularities and maintaining optimal hydration levels.`;
};

export const chatWithDermBot = async (query: string, context: string, language: Language): Promise<string> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (language === 'vn') {
        return "Đây là câu trả lời mô phỏng từ AI. Trong phiên bản thực tế, hệ thống sẽ phân tích câu hỏi của bạn về " + context + " để đưa ra lời khuyên y khoa cụ thể.";
    }

    return "This is a simulated AI response. In the production version, the system would analyze your specific question about " + context + " to provide dermatological guidance.";
}

// Helpers for mock data translation
function translateSkinType(type: string): string {
    const map: Record<string, string> = { 'oily': 'dầu', 'dry': 'khô', 'combination': 'hỗn hợp', 'normal': 'thường' };
    return map[type] || type;
}

function translateConcern(concern: string): string {
    const map: Record<string, string> = { 'acne': 'mụn', 'aging': 'lão hóa', 'pigmentation': 'sắc tố', 'dullness': 'xỉn màu' };
    return map[concern] || concern;
}