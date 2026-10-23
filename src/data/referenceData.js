/**
 * Reference data for form dropdowns and guidance lookups
 */

export const indianStates = [
  'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Gujarat',
  'Haryana', 'Karnataka', 'Madhya Pradesh', 'Maharashtra', 'Odisha',
  'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal'
];

export const soilTypes = [
  { value: 'alluvial', label: 'Alluvial Soil (जलोढ़ मिट्टी)' },
  { value: 'black', label: 'Black Soil (काली मिट्टी)' },
  { value: 'red', label: 'Red Soil (लाल मिट्टी)' },
  { value: 'clay', label: 'Clay Soil (चिकनी मिट्टी)' },
  { value: 'loamy', label: 'Loamy Soil (दोमट मिट्टी)' },
  { value: 'sandy', label: 'Sandy Soil (रेतीली मिट्टी)' },
  { value: 'sandy loam', label: 'Sandy Loam Soil (बलुई दोमट)' },
];

export const seasons = [
  { value: 'kharif', label: 'Kharif (खरीफ) — June to October (Monsoon crops)' },
  { value: 'rabi', label: 'Rabi (रबी) — November to March (Winter crops)' },
];

export const irrigationOptions = [
  { value: 'yes', label: 'Yes — I have reliable irrigation' },
  { value: 'limited', label: 'Limited — some irrigation available' },
  { value: 'no', label: 'No — rainfed only' },
];

export const soilGuidance = {
  alluvial: {
    description: 'Alluvial soil is found in river plains. It is very fertile and good for most crops.',
    preparation: 'Plough well before sowing. Add organic manure to maintain fertility. Ensure proper levelling for even water distribution.',
    suitableCrops: 'Rice, Wheat, Sugarcane, Maize, Potato, Onion',
    drainage: 'Good natural drainage in sandy alluvial; clay alluvial may need raised beds.',
    waterTips: 'Holds moisture well. Water requirements depend on the crop and season. Avoid overwatering in clay-rich alluvial areas.',
  },
  black: {
    description: 'Black soil (Regur) is dark in colour and good at holding water. Found mainly in Deccan plateau.',
    preparation: 'Deep ploughing in summer to break hard pan. Add farmyard manure. Forms hard clods when dry — work when moist.',
    suitableCrops: 'Cotton, Soybean, Chickpea, Jowar, Sunflower',
    drainage: 'Poor drainage — tends to become waterlogged. Use raised beds or ridges for better drainage.',
    waterTips: 'Retains water for a long time. Be careful not to overwater. Good for dryland crops that tolerate heavy soil.',
  },
  red: {
    description: 'Red soil is formed from weathering of rocks. Found in southern and eastern India. Less fertile but workable.',
    preparation: 'Add organic matter and compost to improve fertility. Lime application if soil is acidic. Light ploughing is sufficient.',
    suitableCrops: 'Groundnut, Bajra, Tomato, Millets, Pulses',
    drainage: 'Generally well-drained. May dry out quickly in hot weather.',
    waterTips: 'Does not hold water well. Needs more frequent but lighter irrigation. Mulching helps retain soil moisture.',
  },
  clay: {
    description: 'Clay soil is heavy and dense. It holds water well but can become hard and compacted.',
    preparation: 'Plough well and add organic matter to improve soil structure. Work the soil when it is moist, not too wet or dry.',
    suitableCrops: 'Rice, Wheat, Sugarcane, Cotton',
    drainage: 'Poor drainage — water can collect and cause root rot. Make drainage channels.',
    waterTips: 'Holds water for a long time. Water less frequently but ensure good drainage. Avoid waterlogging.',
  },
  loamy: {
    description: 'Loamy soil is a mixture of sand, silt, and clay. It is considered the best soil for most crops.',
    preparation: 'Standard ploughing and manuring. Easy to work with. Add compost for best results.',
    suitableCrops: 'Almost all crops — Wheat, Rice, Maize, Vegetables, Sugarcane, Cotton',
    drainage: 'Good natural drainage. Rarely waterlogged.',
    waterTips: 'Good water holding capacity. Water as per crop needs. Most crops grow well in this soil.',
  },
  sandy: {
    description: 'Sandy soil has large particles and feels rough. Water drains through very fast. Found in Rajasthan and coastal areas.',
    preparation: 'Add plenty of organic matter (compost, manure) to improve water holding. Mix clay if available. Mulch the surface.',
    suitableCrops: 'Bajra, Groundnut, Watermelon, Pulses, Millets',
    drainage: 'Very fast drainage — water runs through quickly.',
    waterTips: 'Needs frequent light watering. Drip irrigation is most efficient. Mulching is very important to conserve moisture.',
  },
  'sandy loam': {
    description: 'Sandy loam is a well-balanced mix of sand and loam. Good drainage and reasonable fertility.',
    preparation: 'Standard ploughing. Add organic manure to boost fertility. Responds well to proper management.',
    suitableCrops: 'Groundnut, Maize, Mustard, Potato, Vegetables',
    drainage: 'Good drainage. Rarely waterlogged unless in low-lying areas.',
    waterTips: 'Moderate water holding. Regular watering needed in dry periods. Mulch to conserve soil moisture.',
  },
};

export const fertilizerGuide = {
  'Rice (Paddy)': {
    stages: [
      { stage: 'Basal (at transplanting)', nutrients: 'DAP or SSP for Phosphorus + half of Potash (MOP)', note: 'Apply before or at transplanting and incorporate into soil.' },
      { stage: 'Tillering (21–25 days)', nutrients: 'First top-dressing of Urea (Nitrogen)', note: 'Apply when the field has shallow water. Drain and refill after 1 day.' },
      { stage: 'Panicle initiation (45–50 days)', nutrients: 'Second top-dressing of Urea + remaining Potash', note: 'Critical stage. Ensure field is well-watered.' },
    ],
    generalAdvice: 'Get a soil test done before the season to know exact nutrient deficiencies. Use recommended doses from your local agriculture office.',
    safetyTips: 'Store fertilizers in a dry place away from children. Wash hands after handling. Do not mix different fertilizers unless recommended.',
  },
  'Wheat': {
    stages: [
      { stage: 'At sowing', nutrients: 'DAP (for Nitrogen + Phosphorus) + full Potash (MOP)', note: 'Drill or broadcast before sowing and incorporate with last ploughing.' },
      { stage: 'First irrigation (21 days)', nutrients: 'First top-dressing of Urea', note: 'Apply urea just before irrigation for best uptake. Crown root initiation stage.' },
      { stage: 'Second irrigation (40–45 days)', nutrients: 'Optional second Urea top-dressing if crop looks pale', note: 'Only if recommended based on crop appearance.' },
    ],
    generalAdvice: 'Zinc deficiency is common in wheat. Apply zinc sulphate if recommended by soil test. Split nitrogen application gives better results than a single dose.',
    safetyTips: 'Wear gloves when handling fertilizers. Keep fertilizers away from seed to avoid burning. Never apply fertilizer on dry soil surface.',
  },
  'Maize (Corn)': {
    stages: [
      { stage: 'At sowing', nutrients: 'Full Phosphorus (DAP/SSP) + full Potash + 1/3 Nitrogen', note: 'Apply in furrows and cover with soil before sowing.' },
      { stage: 'Knee-height (25–30 days)', nutrients: 'Second dose of Nitrogen (Urea)', note: 'Earthing up along with fertilizer application.' },
      { stage: 'Tasseling (45–50 days)', nutrients: 'Final dose of Nitrogen', note: 'Critical for grain filling. Apply with irrigation.' },
    ],
    generalAdvice: 'Maize is a heavy feeder of nitrogen. Zinc application improves yields in deficient soils. FYM at 10 tonnes per hectare improves soil health.',
    safetyTips: 'Apply fertilizer at least 5 cm away from the plant base. Do not apply when the crop has moisture stress.',
  },
  'default': {
    stages: [
      { stage: 'Before sowing (basal)', nutrients: 'Apply farmyard manure and compost. Add Phosphorus (DAP or SSP) and Potash (MOP) as per soil test.', note: 'Incorporate into soil during last ploughing.' },
      { stage: 'Active growth', nutrients: 'Top-dress with Nitrogen (Urea) in splits', note: 'Apply with irrigation or just before expected rain.' },
      { stage: 'Flowering/fruiting', nutrients: 'Apply remaining nutrients if recommended', note: 'Potassium helps fruit quality and disease resistance.' },
    ],
    generalAdvice: 'Always get a soil test done first. Your local Krishi Vigyan Kendra (KVK) or agriculture office can guide you on exact doses for your area. Use organic manure along with chemical fertilizers for long-term soil health.',
    safetyTips: 'Store fertilizers in a cool, dry place. Keep away from children and animals. Wash hands thoroughly after handling. Do not eat, drink, or smoke while applying fertilizers.',
  },
};

export const weatherPrecautions = {
  hot: {
    condition: 'Hot weather (above 35°C)',
    precautions: [
      'Water crops early in the morning or late in the evening to reduce evaporation',
      'Use mulch (straw, dry leaves) around plants to keep soil cool and moist',
      'Provide shade for sensitive vegetable crops if possible',
      'Avoid spraying any chemicals during peak heat hours',
      'Watch for heat stress symptoms: wilting, leaf curling, flower drop',
    ],
  },
  warm: {
    condition: 'Warm weather (25–35°C)',
    precautions: [
      'Good growing weather for most kharif crops',
      'Maintain regular watering schedule',
      'Monitor for pest activity which increases in warm weather',
      'Continue scheduled fertilizer applications',
    ],
  },
  mild: {
    condition: 'Mild weather (15–25°C)',
    precautions: [
      'Good conditions for rabi crops like wheat, mustard, and chickpea',
      'Reduce irrigation frequency as evaporation is lower',
      'Watch for fungal diseases in cool, humid conditions',
      'Good time for sowing winter crops if the season is right',
    ],
  },
  cold: {
    condition: 'Cold weather (below 15°C)',
    precautions: [
      'Protect tender crops from frost — cover with straw or plastic sheets at night',
      'Light irrigation in the evening can protect crops from frost damage',
      'Avoid heavy irrigation — cold waterlogged soil damages roots',
      'Harvest mature crops before severe cold spells',
    ],
  },
  rainy: {
    condition: 'Rainy conditions',
    precautions: [
      'Ensure drainage channels are clear to prevent waterlogging',
      'Delay fertilizer application until rain stops — nutrients wash away',
      'Watch for fungal diseases that spread in wet conditions',
      'Spray protective fungicides before expected heavy rain if possible',
      'Check fields after heavy rain for waterlogging and drain excess water',
    ],
  },
};
