// app/pose-test/page.jsx

'use client';


import dynamic from 'next/dynamic';

const PoseClient = dynamic(() => import('@/components/PoseClient'), {
  ssr: false,
  loading: () => <div>Yükleniyor...</div>
});

export default function PoseTestPage() {
  return (
    <div>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
        Poz ve Hareket Analizi
      </h1>
      <PoseClient />
    </div>
  );
}