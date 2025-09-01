import type { Nullable } from "@/types/misc";

export type MapHandle = {
  map: Nullable<kakao.maps.Map>;
  isLoading: boolean;
  isLoaded: boolean;
  isError: boolean;
  relayout: () => void;
};
