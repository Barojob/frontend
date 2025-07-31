import React from "react";
import { MapHandle } from "../types/map";
import { Nullable } from "../types/misc";
import { cn } from "../utils/classname";
import { configs } from "../utils/configs";

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

      // 현재 위치를 가져와서 지도 중심으로 설정
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            const map = new kakao.maps.Map(internalRef.current!, {
              center: new kakao.maps.LatLng(lat, lng),
              level: 3,
            });

            setMap(map);
            setIsLoading(false);
            setIsLoaded(true);
            setIsError(false);
          },
          () => {
            // 위치 정보를 가져올 수 없는 경우 기본 위치 사용
            const map = new kakao.maps.Map(internalRef.current!, {
              center: new kakao.maps.LatLng(37.5665, 126.978), // 서울 시청
              level: 3,
            });

            setMap(map);
            setIsLoading(false);
            setIsLoaded(true);
            setIsError(false);
          },
        );
      } else {
        // geolocation을 지원하지 않는 경우 기본 위치 사용
        const map = new kakao.maps.Map(internalRef.current, {
          center: new kakao.maps.LatLng(37.5665, 126.978), // 서울 시청
          level: 3,
        });

        setMap(map);
        setIsLoading(false);
        setIsLoaded(true);
        setIsError(false);
      }
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
