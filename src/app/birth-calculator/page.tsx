import { Metadata } from 'next';
import BirthCalculatorClient from './BirthCalculatorClient';

export const metadata: Metadata = {
  title: 'Plan B — Birth in Brazil Cost Calculator',
  description: 'Calculate the full cost of having a baby in Brazil: flights, accommodation, delivery, documents, and citizenship.',
};

export default function BirthCalculatorPage() {
  return <BirthCalculatorClient />;
}
