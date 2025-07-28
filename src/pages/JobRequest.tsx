import React from "react";
import Map from "../components/Map";
import { MapHandle } from "../types/map";
import { Nullable } from "../types/misc";

const JobRequest: React.FC = () => {
  const mapRef = React.useRef<Nullable<MapHandle>>(null);

  return <Map className="size-full" ref={mapRef} />;
};

export default JobRequest;
