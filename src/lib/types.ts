export type Feature = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export type TagSearchState = {
  isLoading: boolean;
  tag: string;
  topic: string;
};

export type TimelinePoint = {
  date: string;
  value: number;
};

export type VolumePoint = {
  date: string;
  value: number;
};

export type AspectData = {
  name: string;
  timelineData: TimelinePoint[];
  volumeData: VolumePoint[];
};

export type SearchStatus = 'fetching' | 'analyzing' | 'completed' | 'not_started';

export type SearchHistoryItem = {
  tag: string;
  topic: string;
  status: SearchStatus;
  createdAt: number; // timestamp
};

export type Topic = {
  id: string;
  name: string;
  icon: string;
  description: string;
  sources: string[];
};
