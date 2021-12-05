export interface ITodo{
  id: number,
  title: string,
}

export interface ITodoItem{
  item: ITodo,
  onRemove(id: number): void,
}
