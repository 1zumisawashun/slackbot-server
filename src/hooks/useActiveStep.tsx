import { useState, useCallback } from "react";

export const useActiveStep = () => {
  const [activeStep, setActiveStep] = useState(0);

  const stepBack = useCallback(() => setActiveStep((prev) => prev - 1), []);
  const stepNext = useCallback(() => setActiveStep((prev) => prev + 1), []);

  const step = useCallback((step: number) => setActiveStep((prev) => step), []);

  return { activeStep, stepBack, stepNext, step };
};
