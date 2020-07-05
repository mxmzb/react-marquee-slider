export const __safePerformanceNow = () => {
  if (typeof window !== "undefined" && window !== undefined) {
    return performance.now();
  }

  return 0;
};
