import { connection } from 'next/server';
import { SPECIMEN_COUNT } from '@/lib/bug-images';
import { HeroPlate } from '@/components/ui/HeroPlate';
import { BugBuilder } from '@/components/ui/BugBuilder';
import { LabProofs } from '@/components/ui/LabProofs';
import { SpecimenStrip } from '@/components/ui/SpecimenStrip';
import { AboutPlate } from '@/components/ui/AboutPlate';
import { SpecimenProvider } from '@/components/ui/SpecimenContext';

export default async function HomePage() {
  // Render per request so each load gets a different hero specimen.
  await connection();
  const heroIndex = Math.floor(Math.random() * SPECIMEN_COUNT);

  return (
    <SpecimenProvider initialIndex={heroIndex}>
      <HeroPlate imageIndex={heroIndex} />
      <BugBuilder />
      <LabProofs />
      <SpecimenStrip />
      <AboutPlate />
    </SpecimenProvider>
  );
}
