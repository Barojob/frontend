import type { Nullable } from "./misc";

export type MapHandle = {
  map: Nullable<kakao.maps.Map>;
  isLoading: boolean;
  isLoaded: boolean;
  isError: boolean;
  relayout: () => void;
};
