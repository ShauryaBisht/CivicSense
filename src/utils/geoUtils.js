// Geo-distance utilities using the Haversine formula
// Calculates distance between two latitude/longitude points in meters

export function calculateDistanceMeters(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return Infinity;

  const R = 6371e3; // Earth radius in meters
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

// Find potential duplicate active issues within threshold meters
export function findNearbySimilarIssues(currentLocation, currentCategory, issues = [], thresholdMeters = 250) {
  if (!currentLocation?.lat || !currentLocation?.lng) return [];

  return issues
    .filter((issue) => {
      // Only compare with active/unresolved issues
      if (issue.status === 'Resolved') return false;
      if (!issue.location?.lat || !issue.location?.lng) return false;

      const distance = calculateDistanceMeters(
        currentLocation.lat,
        currentLocation.lng,
        issue.location.lat,
        issue.location.lng
      );

      // Same or similar location within threshold
      return distance <= thresholdMeters;
    })
    .map((issue) => ({
      ...issue,
      distanceMeters: calculateDistanceMeters(
        currentLocation.lat,
        currentLocation.lng,
        issue.location.lat,
        issue.location.lng
      ),
      isCategoryMatch: issue.category === currentCategory
    }))
    .sort((a, b) => a.distanceMeters - b.distanceMeters);
}
