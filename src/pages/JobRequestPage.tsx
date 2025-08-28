import Map from "@/components/Map";
import { MapHandle } from "@/types/map";
import { Nullable } from "@/types/misc";
import React from "react";

const JobRequest: React.FC = () => {
  const mapRef = React.useRef<Nullable<MapHandle>>(null);

  return <Map className="size-full" ref={mapRef} />;
};

export default JobRequest;
