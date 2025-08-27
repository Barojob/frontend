// Map 컴포넌트 몇가지 수정함 - 혹시 몰라서 기존 코드는 밑에 전체 주석처리 해둠
import Skeleton from "@/components/Skeleton";
import { configs } from "@/configs";
import { Nullable } from "@/types/misc";
import { cn } from "@/utils/classname";
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const MapContext = createContext<Nullable<kakao.maps.Map>>(null);
export const useMap = () => useContext(MapContext);

export const Map: React.FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  const mapElementRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Nullable<kakao.maps.Map>>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${configs.KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;
    script.onload = () => {
      kakao.maps.load(() => {
        if (!mapElementRef.current) return;

        const createMap = (lat: number, lng: number) => {
          const mapInstance = new kakao.maps.Map(mapElementRef.current!, {
            center: new kakao.maps.LatLng(lat, lng),
            level: 3, // 기본 레벨 3으로 고정
          });
          setMap(mapInstance);
          setIsLoading(false);
        };

        navigator.geolocation.getCurrentPosition(
          (position) => {
            createMap(position.coords.latitude, position.coords.longitude);
          },
          () => {
            createMap(37.2229, 127.1876); // Geolocation 실패 시 명지대
          },
        );
      });
    };
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <MapContext.Provider value={map}>
      <div ref={mapElementRef} className={cn("h-full w-full", className)}>
        {isLoading && <Skeleton className="h-full w-full" />}
      </div>
      {map && children}
    </MapContext.Provider>
  );
};

export default Map;

// import React from "react";
// import { configs } from "../configs";
// import { MapHandle } from "../types/map";
// import { Nullable } from "../types/misc";
// import { cn } from "../utils/classname";

// type Props = {
//   className?: string;
//   ref: React.RefObject<Nullable<MapHandle>>;
// };

// const Map: React.FC<Props> = ({ className, ref }) => {
//   const [map, setMap] = React.useState<Nullable<kakao.maps.Map>>(null);
//   const [isLoading, setIsLoading] = React.useState(true);
//   const [isLoaded, setIsLoaded] = React.useState(false);
//   const [isError, setIsError] = React.useState(false);

//   const internalRef = React.useRef<Nullable<HTMLDivElement>>(null);

//   React.useImperativeHandle(ref, () => ({
//     map,
//     isLoading,
//     isLoaded,
//     isError,
//     relayout: () => {
//       if (map && internalRef.current) {
//         try {
//           map.relayout();
//           console.log("🔄 Map 컴포넌트에서 relayout 실행됨");
//         } catch (error) {
//           console.error("❌ Map relayout 실행 중 오류:", error);
//         }
//       }
//     },
//   }));

//   React.useEffect(() => {
//     const script = document.createElement("script");

//     script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${configs.KAKAO_MAP_API_KEY}&libraries=services,clusterer&autoload=false`;
//     script.onload = handleLoad;
//     script.onerror = handleError;

//     document.head.appendChild(script);

//     return () => {
//       document.head.removeChild(script);
//     };
//   }, []);

//   return <div className={cn("", className)} ref={internalRef} />;

//   async function handleLoad() {
//     kakao.maps.load(() => {
//       if (!internalRef.current) {
//         return;
//       }

//       // 기본 위치 설정 함수
//       const createMapWithDefaultLocation = () => {
//         const map = new kakao.maps.Map(internalRef.current!, {
//           center: new kakao.maps.LatLng(37.5665, 126.978), // 서울 시청
//           level: 3,
//         });

//         setMap(map);
//         setIsLoading(false);
//         setIsLoaded(true);
//         setIsError(false);
//         console.log("🗺️ 지도 로드 완료 (기본 위치)");
//       };

//       // 현재 위치를 가져와서 지도 중심으로 설정 (timeout 추가)
//       if (navigator.geolocation) {
//         // 3초 후 강제로 기본 위치 사용
//         const timeoutId = setTimeout(() => {
//           console.log("⏰ 위치 요청 타임아웃, 기본 위치 사용");
//           createMapWithDefaultLocation();
//         }, 3000);

//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             clearTimeout(timeoutId);
//             const lat = position.coords.latitude;
//             const lng = position.coords.longitude;

//             const map = new kakao.maps.Map(internalRef.current!, {
//               center: new kakao.maps.LatLng(lat, lng),
//               level: 3,
//             });

//             setMap(map);
//             setIsLoading(false);
//             setIsLoaded(true);
//             setIsError(false);
//             console.log("🗺️ 지도 로드 완료 (현재 위치)");
//           },
//           (error) => {
//             clearTimeout(timeoutId);
//             console.log("📍 위치 정보 가져오기 실패:", error.message);
//             createMapWithDefaultLocation();
//           },
//           {
//             timeout: 5000, // 5초 타임아웃
//             enableHighAccuracy: false, // 빠른 응답을 위해 정확도 낮춤
//           },
//         );
//       } else {
//         // geolocation을 지원하지 않는 경우 기본 위치 사용
//         console.log("🚫 Geolocation 미지원, 기본 위치 사용");
//         createMapWithDefaultLocation();
//       }
//     });
//   }

//   function handleError() {
//     console.error("Failed to load map");

//     setIsLoading(false);
//     setIsLoaded(false);
//     setIsError(true);
//   }
// };

// export default Map;
