
import React from 'react';
import { Product, ProductStatus } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'SerenityMind',
    description: 'Advanced neuro-linguistic analysis for tailored emotional resilience paths in high-stress demographics.',
    status: ProductStatus.EXISTING,
    domain: 'Neural Health',
    metrics: { demand: 88, differentiation: 75, feasibility: 92, monetization: 68, stickiness: 84, competition: 40 },
    comments: [],
    analysisTags: ['Bio-Sync', 'LLM-Empathetic', 'Privacy-Secure']
  },
  {
    id: '2',
    name: 'FluxFlow',
    description: 'Real-time focus orchestration using biometric synthesis and adaptive task-switching algorithms.',
    status: ProductStatus.IN_PROGRESS,
    domain: 'Cognitive Optimization',
    metrics: { demand: 65, differentiation: 98, feasibility: 50, monetization: 80, stickiness: 90, competition: 25 },
    comments: [],
    analysisTags: ['Biometric', 'Adaptive Logic', 'Performance']
  },
  {
    id: '3',
    name: 'NeoLocal',
    description: 'Decentralized neighborhood supply-chain nodes utilizing hyper-local predictive logistics.',
    status: ProductStatus.EXISTING,
    domain: 'Logistics 4.0',
    metrics: { demand: 70, differentiation: 45, feasibility: 88, monetization: 55, stickiness: 72, competition: 75 },
    comments: [],
    analysisTags: ['Mesh Network', 'Local-First', 'P2P']
  }
];

export const Icons = {
  Search: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
  ),
  Plus: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14m-7-7h14"/></svg>
  ),
  ArrowRight: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
  ),
  AIIcon: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" />
      <path d="M12 2V18" strokeDasharray="2 2" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Chart: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 20h18M3 16h4v4H3zM9 12h4v8H9zM15 8h4v12h4z"/></svg>
  ),
  Compare: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 3h5v5M4 21V13a4 4 0 0 1 4-4h12M15 21H9a4 4 0 0 1-4-4V3"/></svg>
  ),
  User: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  ),
  Globe: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10zM2 12h20"/></svg>
  )
};
