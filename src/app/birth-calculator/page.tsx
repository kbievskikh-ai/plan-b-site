import { Metadata } from 'next';
import BirthCalculatorClient from './BirthCalculatorClient';

export const metadata: Metadata = {
  title: 'Калькулятор стоимости родов в Бразилии | GRONIS',
  description: 'Рассчитайте полную стоимость рождения ребёнка в Бразилии: перелёт, проживание, роды, документы, гражданство.',
};

export default function BirthCalculatorPage() {
  return <BirthCalculatorClient />;
}
