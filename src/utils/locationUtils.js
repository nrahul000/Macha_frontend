export function getDistanceFromChoutuppal(lat, lng) {
    // Choutuppal coordinates
    const choutuppalLat = 17.2561;
    const choutuppalLng = 78.9638;
    const toRad = (v) => (v * Math.PI) / 180;
    const R = 6371; // Earth radius in km

    const dLat = toRad(lat - choutuppalLat);
    const dLng = toRad(lng - choutuppalLng);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(choutuppalLat)) *
        Math.cos(toRad(lat)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  }