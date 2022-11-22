import { geoPath, GeoProjection } from 'd3-geo';
import { geoAlbersUsa, geoMercator, geoRobinson } from 'd3-geo-projection';
import { Feature, FeatureCollection, Geometry } from 'geojson';
import { feature } from 'topojson-client';
import { Topology } from 'topojson-specification';
import { GeoParameters, TopologyObject } from './interfaces';

export const extractGeoParameters = (
  baseMap: any, // TODO type baseMap
  width: number,
  maxHeight: number,
  topologyObjectNames: string[],
  mainFeature: string // REVIEW how much should be put in a config so the function can be refactored later?
): GeoParameters => {
  // REVIEW should values in objects be required?
  if (!baseMap?.entities?.objects) throw new Error('invalid basemap provided'); // TODO improve error

  if (!topologyObjectNames?.length) throw new Error('No topologyObjects provided'); // TODO improve error

  // REVIEW choose first if non provided or make mandatory and throw if not provided?
  if (!mainFeature || !topologyObjectNames.includes(mainFeature))
    throw new Error('mainFeature does no exist in topologyObjects'); // TODO improve error

  // create topologyObject for each topologyObjectName
  const topologyObjects: TopologyObject = {};
  topologyObjectNames.forEach((name) => (topologyObjects[name] = getFeatureCollection(baseMap.entities, name)));

  let projection = getProjection(baseMap).fitWidth(width, topologyObjects[mainFeature]);
  let path = geoPath(projection);
  let bounds = path.bounds(topologyObjects[mainFeature]);
  const height = bounds[1][1];

  // TODO check if this should be optional
  if (height > maxHeight) {
    projection = getProjection(baseMap).fitHeight(maxHeight, topologyObjects[mainFeature]);
    path = geoPath(projection);
    bounds = path.bounds(topologyObjects[mainFeature]);
  }

  return { path, bounds, topologyObjects, projection } as GeoParameters;
};

// TODO type
const getProjection = (baseMap): GeoProjection => {
  const projection = baseMap?.config?.projection;
  switch (projection) {
    case 'robinson':
      return geoRobinson();
    case 'albersUsa':
      return geoAlbersUsa();
    case 'mercator':
      return geoMercator();
    default:
      throw new Error('could not match to a projectsion:'); // TODO improve error
  }
};

const getFeatureCollection = (topology: Topology, objectName: string) => {
  if (topology && topology.objects[objectName]) {
    return feature(topology, topology.objects[objectName]) as FeatureCollection<Geometry, { [name: string]: any }>;
  }
  return makeFeatureCollection([]); // REVIEW should we throw if objectName does not exist in baseMap?
};

const makeFeatureCollection = (features: Array<Feature>): FeatureCollection => {
  return {
    type: 'FeatureCollection',
    features,
  };
};
