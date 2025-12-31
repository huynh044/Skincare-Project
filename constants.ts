import { Product, RoutineBundle } from "./types";

export const PRODUCTS: Record<string, Product> = {
  SQUALANE_CLEANSER: {
    id: 'p1',
    name: 'Squalane Cleanser',
    type: 'Cleanser',
    description: {
      en: 'A gentle cleansing product formulated to target makeup removal whilst leaving the skin feeling smooth and moisturized.',
      vn: 'Sản phẩm làm sạch nhẹ nhàng được bào chế để tẩy trang đồng thời mang lại cảm giác mịn màng và ẩm mượt cho da.'
    },
    format: 'Emulsion',
    phLevel: '5.50-6.50',
    // Specific URL provided by user
    image: 'https://ordinary.com.vn/wp-content/uploads/2022/11/the-ordinary-niacinamide-10-zinc-1-30ml-510x510.jpg',
    price: 290000
  },
  NIACINAMIDE: {
    id: 'p2',
    name: 'Niacinamide 10% + Zinc 1%',
    type: 'Vitamin',
    activeIngredient: 'Niacinamide',
    description: {
      en: 'High-strength vitamin and mineral blemish formula.',
      vn: 'Công thức vitamin và khoáng chất nồng độ cao dành cho da mụn.'
    },
    format: 'Water-based Serum',
    phLevel: '5.00-6.50',
    // Minimalist dropper bottle
    image: 'https://ordinary.com.vn/wp-content/uploads/2022/09/the-ordinary-salicylic-acid-2-masque-50ml-247x296.jpg',
    price: 320000
  },
  HA_B5: {
    id: 'p3',
    name: 'Hyaluronic Acid 2% + B5',
    type: 'Hydrator',
    activeIngredient: 'Hyaluronic Acid',
    description: {
      en: 'A hydration support formula with ultra-pure, vegan hyaluronic acid.',
      vn: 'Công thức hỗ trợ cấp ẩm với axit hyaluronic thuần chay siêu tinh khiết.'
    },
    format: 'Water-based Serum',
    phLevel: '6.50-7.50',
    // Clear serum dropper
    image: 'https://ordinary.com.vn/wp-content/uploads/2022/09/the-ordinary-hyaluronic-acid-510x510.jpg',
    price: 280000
  },
  MOISTURIZER_FACTORS: {
    id: 'p4',
    name: 'Natural Moisturizing Factors + HA',
    type: 'Hydrator',
    description: {
      en: 'Surface hydration formula.',
      vn: 'Công thức dưỡng ẩm bề mặt.'
    },
    format: 'Cream',
    phLevel: '6.50-7.00',
    // Cream tube
    image: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=600&auto=format&fit=crop',
    price: 250000
  },
  SALICYLIC_ACID: {
    id: 'p5',
    name: 'Salicylic Acid 2% Solution',
    type: 'Acid',
    activeIngredient: 'Salicylic Acid',
    description: {
      en: 'A water-based serum formulated to target acne and allow skin to heal.',
      vn: 'Serum gốc nước được bào chế để trị mụn và giúp da phục hồi.'
    },
    format: 'Water-based Serum',
    phLevel: '3.20-4.00',
    // Small dropper bottle
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9af2fc?q=80&w=600&auto=format&fit=crop',
    price: 310000
  },
  GLYCOLIC_TONER: {
    id: 'p6',
    name: 'Glycolic Acid 7% Toning Solution',
    type: 'Acid',
    activeIngredient: 'Glycolic Acid',
    description: {
      en: 'An exfoliating toning solution.',
      vn: 'Dung dịch cân bằng và tẩy tế bào chết.'
    },
    format: 'Liquid',
    phLevel: '3.50-3.70',
    // Toner bottle style
    image: 'https://ordinary.com.vn/wp-content/uploads/2020/09/nuoc-hoa-hong-The-Ordinary-Glycolic-Acid-7-Toning-Solution-ph-3.6-240ml-510x510.jpg',
    price: 350000
  },
  RETINOL_02: {
    id: 'p7',
    name: 'Retinol 0.2% in Squalane',
    type: 'Vitamin',
    activeIngredient: 'Retinol',
    description: {
      en: 'Highly stable, water-free solution of pure retinol.',
      vn: 'Dung dịch retinol tinh khiết không chứa nước, độ ổn định cao.'
    },
    format: 'Anhydrous Solution',
    // Amber/Dark bottle
    image: 'https://images.unsplash.com/photo-1631730486784-5456119f69ae?q=80&w=600&auto=format&fit=crop',
    price: 270000
  },
  MINERAL_UV: {
    id: 'p8',
    name: 'Mineral UV Filters SPF 30 with Antioxidants',
    type: 'Sunscreen',
    description: {
      en: 'Broad spectrum SPF protection with antioxidant support.',
      vn: 'Bảo vệ phổ rộng SPF với sự hỗ trợ của chất chống oxy hóa.'
    },
    format: 'Cream',
    phLevel: '7.00-8.50',
    // Sunscreen tube
    image: 'https://theordinary.com/on/demandware.static/-/Library-Sites-DeciemSharedLibrary/default/dw9bd562e0/theordinary/gridbreakers/2025-09-15-Always-On-Grid-Breakers-which-antioxidant-blog.jpg',
    price: 390000
  }
};

export const ROUTINES: RoutineBundle[] = [
  {
    id: 'acne-oily',
    name: { en: 'Congestion & Blemish Regimen', vn: 'Quy trình cho Da mụn & Tắc nghẽn' },
    targetAudience: { en: 'Oily / Acne-Prone', vn: 'Da dầu / Dễ nổi mụn' },
    description: {
      en: 'A focused regimen to target signs of congestion and textural irregularities.',
      vn: 'Một quy trình tập trung vào các dấu hiệu tắc nghẽn lỗ chân lông và bề mặt da không đều.'
    },
    safetyNotes: [
      { en: 'Patch test required.', vn: 'Cần thử nghiệm trên vùng da nhỏ trước.' },
      { en: 'Use sunscreen daily (AHAs increase sun sensitivity).', vn: 'Sử dụng kem chống nắng hàng ngày (AHA làm tăng độ nhạy cảm với nắng).' },
      { en: 'Do not combine Niacinamide with Vitamin C.', vn: 'Không kết hợp Niacinamide với Vitamin C.' }
    ],
    steps: [
      { order: 1, timeOfDay: 'AM', product: PRODUCTS.SQUALANE_CLEANSER, instruction: { en: 'Cleanse gently.', vn: 'Rửa mặt nhẹ nhàng.' } },
      { order: 2, timeOfDay: 'AM', product: PRODUCTS.NIACINAMIDE, instruction: { en: 'Apply a few drops to entire face.', vn: 'Thoa vài giọt lên toàn bộ khuôn mặt.' } },
      { order: 3, timeOfDay: 'AM', product: PRODUCTS.MOISTURIZER_FACTORS, instruction: { en: 'Apply to lock in hydration.', vn: 'Thoa để khóa ẩm.' } },
      { order: 4, timeOfDay: 'AM', product: PRODUCTS.MINERAL_UV, instruction: { en: 'Apply liberally 15 mins before sun exposure.', vn: 'Thoa đều 15 phút trước khi ra nắng.' } },
      
      { order: 5, timeOfDay: 'PM', product: PRODUCTS.SQUALANE_CLEANSER, instruction: { en: 'Double cleanse if wearing makeup.', vn: 'Rửa mặt kép nếu trang điểm.' } },
      { order: 6, timeOfDay: 'PM', product: PRODUCTS.SALICYLIC_ACID, instruction: { en: 'Apply directly to spots or congested areas.', vn: 'Chấm trực tiếp lên mụn hoặc vùng da tắc nghẽn.' } },
      { order: 7, timeOfDay: 'PM', product: PRODUCTS.MOISTURIZER_FACTORS, instruction: { en: 'Finish with moisturizer.', vn: 'Kết thúc với kem dưỡng ẩm.' } },
    ]
  },
  {
    id: 'dry-sensitive',
    name: { en: 'Barrier Support & Hydration', vn: 'Hỗ trợ hàng rào bảo vệ & Cấp ẩm' },
    targetAudience: { en: 'Dry / Sensitive', vn: 'Da khô / Nhạy cảm' },
    description: {
      en: 'A minimalist routine focused on repairing the skin moisture barrier and reducing redness.',
      vn: 'Quy trình tối giản tập trung vào việc phục hồi hàng rào độ ẩm của da và giảm mẩn đỏ.'
    },
    safetyNotes: [
        { en: 'Avoid over-exfoliation.', vn: 'Tránh tẩy tế bào chết quá mức.' },
        { en: 'Introduce products one at a time.', vn: 'Giới thiệu từng sản phẩm một.' }
    ],
    steps: [
      { order: 1, timeOfDay: 'BOTH', product: PRODUCTS.SQUALANE_CLEANSER, instruction: { en: 'Massage into dry face, then rinse.', vn: 'Massage lên mặt khô, sau đó rửa sạch.' } },
      { order: 2, timeOfDay: 'BOTH', product: PRODUCTS.HA_B5, instruction: { en: 'Apply to damp skin.', vn: 'Thoa lên da ẩm.' } },
      { order: 3, timeOfDay: 'BOTH', product: PRODUCTS.MOISTURIZER_FACTORS, instruction: { en: 'Apply generously.', vn: 'Thoa một lượng vừa đủ.' } },
      { order: 4, timeOfDay: 'AM', product: PRODUCTS.MINERAL_UV, instruction: { en: 'Apply daily for protection.', vn: 'Thoa hàng ngày để bảo vệ.' } },
    ]
  },
  {
    id: 'aging-normal',
    name: { en: 'Signs of Aging & Texture', vn: 'Dấu hiệu lão hóa & Kết cấu da' },
    targetAudience: { en: 'Mature / Normal', vn: 'Da lão hóa / Thường' },
    description: {
      en: 'Targeting fine lines, dynamic lines, and textural irregularities.',
      vn: 'Nhắm vào các nếp nhăn nhỏ, nếp nhăn động và sự không đều màu của da.'
    },
    safetyNotes: [
        { en: 'Retinoids can cause irritation. Start slowly.', vn: 'Retinoid có thể gây kích ứng. Bắt đầu chậm.' },
        { en: 'Strict sun protection required.', vn: 'Yêu cầu chống nắng nghiêm ngặt.' }
    ],
    steps: [
      { order: 1, timeOfDay: 'AM', product: PRODUCTS.SQUALANE_CLEANSER, instruction: { en: 'Cleanse.', vn: 'Rửa mặt.' } },
      { order: 2, timeOfDay: 'AM', product: PRODUCTS.HA_B5, instruction: { en: 'Hydrate.', vn: 'Cấp ẩm.' } },
      { order: 3, timeOfDay: 'AM', product: PRODUCTS.MOISTURIZER_FACTORS, instruction: { en: 'Seal.', vn: 'Khóa ẩm.' } },
      { order: 4, timeOfDay: 'AM', product: PRODUCTS.MINERAL_UV, instruction: { en: 'Essential step when using Retinoids.', vn: 'Bước thiết yếu khi dùng Retinoid.' } },
      
      { order: 5, timeOfDay: 'PM', product: PRODUCTS.SQUALANE_CLEANSER, instruction: { en: 'Cleanse.', vn: 'Rửa mặt.' } },
      { order: 6, timeOfDay: 'PM', product: PRODUCTS.GLYCOLIC_TONER, instruction: { en: 'Swipe with cotton pad (Alternate nights).', vn: 'Lau bằng bông tẩy trang (Cách đêm).' } },
      { order: 7, timeOfDay: 'PM', product: PRODUCTS.RETINOL_02, instruction: { en: 'Apply small amount (Alternate nights).', vn: 'Thoa một lượng nhỏ (Cách đêm).' } },
      { order: 8, timeOfDay: 'PM', product: PRODUCTS.MOISTURIZER_FACTORS, instruction: { en: 'Seal.', vn: 'Khóa ẩm.' } },
    ]
  }
];