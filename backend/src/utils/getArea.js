export default function calculatePolygonArea(polygon) {
  if (polygon.length < 3) return 0;
  
  let area = 0;
  const earthRadius = 6371000; // Earth's radius in meters
  
  for (let i = 0; i < polygon.length; i++) {
    const j = (i + 1) % polygon.length;
    const lat1 = polygon[i].lat * Math.PI / 180;
    const lat2 = polygon[j].lat * Math.PI / 180;
    const lng1 = polygon[i].lng * Math.PI / 180;
    const lng2 = polygon[j].lng * Math.PI / 180;
    
    area += (lng2 - lng1) * (2 + Math.sin(lat1) + Math.sin(lat2));
  }
  
  area = Math.abs(area) * earthRadius * earthRadius / 2;
  return Math.round(area);
}