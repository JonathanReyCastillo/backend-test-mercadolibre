export interface Category {
  id: string;
  name: string;
  path_from_root: [Category];
}
