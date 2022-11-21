import { geoPath, GeoProjection } from 'd3-geo';
import { geoAlbersUsa, geoMercator, geoRobinson } from 'd3-geo-projection';
import { Feature, FeatureCollection, Geometry } from 'geojson';
import { feature } from 'topojson-client';
import { Topology } from 'topojson-specification';
import { GeoParameterConfig, GeoParameters, TopologyObject } from './interfaces';

export const extractGeoParameters = (
  baseMap: any,
  width: number,
  maxHeight: number,
  config?: GeoParameterConfig
): GeoParameters => {
  if (!baseMap || !baseMap.entities) return undefined;
  // TODO Throw error: in general rather throw errors early

  // TODO no default topology objects
  let topologyObjectNames = ['features', 'outlines', 'water'];
  // Add additional topology objects specified in config
  if (config?.topologyObjectNames?.length)
    topologyObjectNames = topologyObjectNames.concat(
      config.topologyObjectNames.filter((obj) => !topologyObjectNames.includes(obj))
    );

  // create topologyObject for each topologyObjectName
  const topologyObjects: TopologyObject = {};
  topologyObjectNames.forEach((name) => (topologyObjects[name] = getFeatureCollection(baseMap.entities, name)));

  // REVIEW we are currently using `features` to determine a whole bunch of stuff below. Should it be possible to use something else? See Solardächer Project --> yes
  let projection = getProjection(baseMap).fitWidth(width, topologyObjects.features);
  let path = geoPath(projection);
  let bounds = path.bounds(topologyObjects.features);
  const height = bounds[1][1];

  if (height > maxHeight) {
    projection = getProjection(baseMap).fitHeight(maxHeight, topologyObjects.features);
    path = geoPath(projection);
    bounds = path.bounds(topologyObjects.features);
  }

  // TODO move all this below to it's own exported function
  if (topologyObjects.features?.type === 'FeatureCollection') {
    for (const feature of topologyObjects.features.features) {
      if (feature.properties.centroid_lat && feature.properties.centroid_lon) {
        // If we already have a centroid, use that
        feature.properties.centroidPlanar = projection([
          feature.properties.centroid_lat,
          feature.properties.centroid_lon,
        ]);
        feature.properties.centroidSpherical = [feature.properties.centroid_lat, feature.properties.centroid_lon];
        delete feature.properties.centroid_lat;
        delete feature.properties.centroid_lon;
      } else {
        // Otherwise, calculate it from the geometry
        feature.properties.centroidPlanar = path.centroid(feature);
      }
    }
  }

  return { path, bounds, topologyObjects } as GeoParameters;
};

const getProjection = (baseMap): GeoProjection => {
  if (baseMap.config.projection === 'robinson') {
    return geoRobinson();
  } else if (baseMap.config.projection === 'albersUsa') {
    return geoAlbersUsa();
  } else {
    return geoMercator();
    // TODO throw if none of these
  }
};

const getFeatureCollection = (topology: Topology, objectName: string) => {
  if (topology && topology.objects[objectName]) {
    return feature(topology, topology.objects[objectName]) as FeatureCollection<Geometry, { [name: string]: any }>;
  }
  return makeFeatureCollection([]);
};

const makeFeatureCollection = (features: Array<Feature>): FeatureCollection => {
  return {
    type: 'FeatureCollection',
    features,
  };
};
