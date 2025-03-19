export const findNearestAngle = (deg: number): number => {
    const allowed = [0, 90, 180, 270];
    deg = ((deg % 360) + 360) % 360;
    return allowed.reduce((prev, curr) =>
      Math.abs(deg - curr) < Math.abs(deg - prev) ? curr : prev
    );
  };