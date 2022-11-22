import { geoPath, GeoProjection } from 'd3-geo';
import { geoAlbersUsa, geoMercator, geoRobinson } from 'd3-geo-projection';
import { Feature, FeatureCollection, Geometry } from 'geojson';
import { feature } from 'topojson-client';
import { Topology } from 'topojson-specification';
import { Projection } from './emums';
import { BaseMapData, GeoParameters, MapData, TopologyObject } from './interfaces';

export const extractGeoParameters = (mapData: MapData, width: number, maxHeight: number): GeoParameters => {
  if (!mapData?.baseMap?.entities?.objects) throw new Error('No typologyObjects found in baseMap data.');

  if (!mapData.topologyObjectNames?.length) throw new Error('No topologyObjects provided.');

  if (!mapData.mainTopologyObject || !mapData.topologyObjectNames.includes(mapData.mainTopologyObject))
    throw new Error(`TopologyObject '${mapData.mainTopologyObject}' does no exist in topologyObjects.`);

  const topologyObjects: TopologyObject = {};
  mapData.topologyObjectNames.forEach(
    (name) => (topologyObjects[name] = getFeatureCollection(mapData.baseMap.entities, name))
  );

  let projection = getProjection(mapData.baseMap).fitWidth(width, topologyObjects[mapData.mainTopologyObject]);
  let path = geoPath(projection);
  let bounds = path.bounds(topologyObjects[mapData.mainTopologyObject]);
  const height = bounds[1][1];

  if (height > maxHeight) {
    projection = getProjection(mapData.baseMap).fitHeight(maxHeight, topologyObjects[mapData.mainTopologyObject]);
    path = geoPath(projection);
    bounds = path.bounds(topologyObjects[mapData.mainTopologyObject]);
  }

  return { path, bounds, topologyObjects, projection } as GeoParameters;
};

const getProjection = (baseMap: BaseMapData): GeoProjection => {
  const projection = baseMap?.config?.projection;
  switch (projection) {
    case Projection.ROBINSON:
      return geoRobinson();
    case Projection.ALBERS_USA:
      return geoAlbersUsa();
    case Projection.MERCATOR:
      return geoMercator();
    default:
      throw new Error(`Could not match '${baseMap?.config?.projection}' to any projection.`);
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
