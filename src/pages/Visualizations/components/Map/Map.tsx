import Map, { Layer, Source } from "react-map-gl";
import { Projection } from "mapbox-gl";
import { useCubeQuery } from "@cubejs-client/react";
import { useMemo } from "react";
import "mapbox-gl/dist/mapbox-gl.css";

import {
  clusterLayer,
  clusterCountLayer,
  unclusteredPointLayer,
} from "./layer";

import useCubeApi from "../../../../hooks/useCubeApi";
import ErrorCard from "../../../../components/ErrorCard/ErrorCard";
import Loader from "../../../../components/Loader/Loader";

const projection: Projection = {
  name: "mercator",
  center: [0, 0],
};

function MapVisualization() {
  const cubeApi = useCubeApi();
  const { resultSet, isLoading, error } = useCubeQuery(
    {
      dimensions: ["Meteorites.location"],
    },
    {
      cubeApi,
    },
  );

  const geoJson = useMemo(() => {
    const data = {
      type: "FeatureCollection",
      features: [],
    } as GeoJSON.FeatureCollection<GeoJSON.Geometry>;

    if (resultSet) {
      resultSet.tablePivot().forEach((item) => {
        const [lat, long] = (item["Meteorites.location"] as string).split(",");
        data.features.push({
          type: "Feature",
          properties: {
            value: item["Meteorites.count"],
          },
          geometry: {
            type: "Point",
            coordinates: [Number(long), Number(lat)],
          },
        });
      });
    }

    return data;
  }, [resultSet]);

  if (error) {
    <div className="flex justify-center">
      <ErrorCard />
    </div>;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <p>Meteorites data across the globe</p>
      <Map
        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        initialViewState={{ latitude: 0, longitude: 0, zoom: 1 }}
        projection={projection}
        style={{ width: 1080, height: 600 }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
      >
        <Source
          type="geojson"
          data={geoJson}
          cluster
          clusterMaxZoom={14}
          clusterRadius={50}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>
      </Map>
    </div>
  );
}

export default MapVisualization;
