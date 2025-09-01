// 카카오맵 API에서 실제 사용하는 타입들만 정의
export interface KakaoPlaceSearchResult {
  id: string;
  place_name: string;
  category_name: string;
  address_name: string;
  road_address_name: string;
  phone: string;
  x: string; // longitude
  y: string; // latitude
  distance: string;
}

export interface KakaoGeocoderResult {
  address: {
    address_name: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
  };
  road_address: {
    address_name: string;
    building_name?: string;
  } | null;
}

// 전역 kakao 객체 타입 정의
declare global {
  const kakao: {
    maps: {
      Map: new (
        container: HTMLElement,
        options: unknown,
      ) => {
        setCenter(latlng: unknown): void;
        getCenter(): {
          getLat(): number;
          getLng(): number;
        };
        setLevel(level: number): void;
      };

      LatLng: new (
        lat: number,
        lng: number,
      ) => {
        getLat(): number;
        getLng(): number;
      };

      services: {
        Status: {
          OK: "OK";
        };

        SortBy: {
          DISTANCE: 1;
        };

        Places: new () => {
          keywordSearch(
            keyword: string,
            callback: (data: KakaoPlaceSearchResult[], status: string) => void,
            options?: {
              location?: unknown;
              radius?: number;
              sort?: number;
            },
          ): void;
          categorySearch(
            category: string,
            callback: (data: KakaoPlaceSearchResult[], status: string) => void,
            options?: {
              location?: unknown;
              radius?: number;
              sort?: number;
            },
          ): void;
        };

        Geocoder: new () => {
          coord2Address(
            lng: number,
            lat: number,
            callback: (result: KakaoGeocoderResult[], status: string) => void,
          ): void;
        };
      };

      event: {
        addListener(target: unknown, type: string, handler: () => void): void;
        removeListener(
          target: unknown,
          type: string,
          handler: () => void,
        ): void;
      };
    };
  };
}
