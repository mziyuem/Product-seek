
export interface ProductMetrics {
  demand: number;
  differentiation: number;
  feasibility: number;
  monetization: number;
  stickiness: number;
  competition: number;
}

export interface Comment {
  id: string;
  user: string;
  content: string;
  timestamp: string;
  upvotes: number;
}

export enum ProductStatus {
  EXISTING = 'Existing',
  IN_PROGRESS = 'In Progress',
  IDEATION = 'Ideation'
}

export interface Product {
  id: string;
  name: string;
  description: string;
  status: ProductStatus;
  domain: string;
  metrics: ProductMetrics;
  comments: Comment[];
  analysisTags: string[];
}

export type ViewState = 'HOME' | 'EXPLORE' | 'DETAIL' | 'COMPARISON' | 'SUBMIT';

export interface IdeationResult {
  subDirections: string[];
  relatedProducts: string[];
  marketGaps: string[];
  suggestedPaths: string[];
  insightSummary: string;
}
