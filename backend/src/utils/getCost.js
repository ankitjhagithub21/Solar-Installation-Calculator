export default function calculateSolarEstimate(area) {
  const panelArea = 2; // Average solar panel area in square meters
  const panelCost = 300; // Cost per panel
  const installationCostPerWatt = 2.5; // Installation cost per watt
  const panelWattage = 400; // Watts per panel
  
  const panelsNeeded = Math.ceil(area / panelArea);
  const totalWatts = panelsNeeded * panelWattage;
  const estimatedCost = totalWatts * installationCostPerWatt;
  const estimatedSavings = totalWatts * 0.15 * 365 * 0.12; // Assuming 15% efficiency, 365 days, $0.12/kWh
  const paybackPeriod = estimatedCost / (estimatedSavings / 12); // in months
  
  return {
    estimatedCost: Math.round(estimatedCost),
    panelsNeeded,
    estimatedSavings: Math.round(estimatedSavings),
    paybackPeriod: Math.round(paybackPeriod)
  };
}
