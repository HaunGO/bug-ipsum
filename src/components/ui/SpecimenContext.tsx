'use client';

import { createContext, useContext, useState } from 'react';

/** A catalog index, or `null` for "random" (no `image` param in the URL). */
export type SpecimenChoice = number | null;

interface SpecimenContextValue {
  specimen: SpecimenChoice;
  setSpecimen: (choice: SpecimenChoice) => void;
}

const SpecimenContext = createContext<SpecimenContextValue | undefined>(undefined);

export function SpecimenProvider({
  initialIndex,
  children,
}: {
  initialIndex: SpecimenChoice;
  children: React.ReactNode;
}) {
  const [specimen, setSpecimen] = useState<SpecimenChoice>(initialIndex);
  return (
    <SpecimenContext.Provider value={{ specimen, setSpecimen }}>
      {children}
    </SpecimenContext.Provider>
  );
}

export function useSpecimen() {
  const context = useContext(SpecimenContext);
  if (context === undefined) {
    throw new Error('useSpecimen must be used within a SpecimenProvider');
  }
  return context;
}
