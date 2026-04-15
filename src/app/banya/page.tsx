import { Metadata } from 'next';
import BanyaClient from './BanyaClient';

export const metadata: Metadata = {
  title: 'Русская Баня в Жюрере — Настоящее парение из розового кедра',
  description: 'Единственная русская баня в Бразилии. Парение вениками, обтирание солями, аромат розового кедра. Жюрере, Флорианополис.',
};

export default function BanyaPage() {
  return <BanyaClient />;
}
