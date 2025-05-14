
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
