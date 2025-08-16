import React from "react";
import { configs } from "../configs";
import { MapHandle } from "../types/map";
import { Nullable } from "../types/misc";
import { cn } from "../utils/classname";

type Props = {
  className?: string;
  ref: React.RefObject<Nullable<MapHandle>>;
};

const Map: React.FC<Props> = ({ className, ref }) => {
  const [map, setMap] = React.useState<Nullable<kakao.maps.Map>>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const internalRef = React.useRef<Nullable<HTMLDivElement>>(null);

  React.useImperativeHandle(ref, () => ({
    map,
    isLoading,
    isLoaded,
    isError,
  }));

  React.useEffect(() => {
    const script = document.createElement("script");

    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${configs.KAKAO_MAP_API_KEY}&libraries=services,clusterer&autoload=false`;
    script.onload = handleLoad;
    script.onerror = handleError;

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return <div className={cn("", className)} ref={internalRef} />;

  async function handleLoad() {
    kakao.maps.load(() => {
      if (!internalRef.current) {
        return;
      }

      const map = new kakao.maps.Map(internalRef.current, {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      });

      setMap(map);
      setIsLoading(false);
      setIsLoaded(true);
      setIsError(false);
    });
  }

  function handleError() {
    console.error("Failed to load map");

    setIsLoading(false);
    setIsLoaded(false);
    setIsError(true);
  }
};

export default Map;
