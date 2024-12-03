// src/app/models/menu.model.ts
export interface MenuItem {
    id?: number;
    name: string;
    description: string;
    price: number;
    category: string;
    available: boolean;
    imageUrl?: string;
  }