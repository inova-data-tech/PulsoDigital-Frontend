
export type Feature = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export type TagSearchState = {
  isLoading: boolean;
  tag: string;
};
