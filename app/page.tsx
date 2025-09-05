import type { Metadata } from 'next';
import HomePageClient from './HomePageClient';

export const metadata: Metadata = {
  title: 'TEDxBeixinqiao - Ideas That Move',
  description:
    "TEDxBeixinqiao celebrates powerful ideas that move us - whether it's a leap of innovation, a shift in mindset, or a story that stirs something deep within us.",
};

export default function Home() {
  return <HomePageClient />;
}
