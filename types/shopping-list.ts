export interface ShoppingList {
  id: string;
  weekId: string;
  items: ShoppingItem[];
  type: 'initial' | 'additional'; // initial - первоначальный список, additional - дополнительный после изменений
  createdAt: string;
  status: 'draft' | 'active' | 'completed';
}

export interface ShoppingItem {
  id: string;
  // product: Product;
  quantity: number;
  purchased: boolean;
  listType: 'initial' | 'additional';
}
