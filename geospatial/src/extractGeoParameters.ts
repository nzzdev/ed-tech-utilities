import { geoPath, GeoProjection } from 'd3-geo';
import { geoAlbersUsa, geoMercator, geoRobinson } from 'd3-geo-projection';
import { Feature, FeatureCollection, Geometry } from 'geojson';
import { feature } from 'topojson-client';
import { Topology } from 'topojson-specification';
import { BaseMapVersion, GeoParameters, TopologyObjectProperties } from './interfaces';

export const extractGeoParameters = (baseMap: BaseMapVersion, width: number, maxHeight: number): GeoParameters => {
  if (!baseMap) return undefined;

  const features = getFeatureCollection(baseMap.entities, 'features');
  const outlines = getFeatureCollection(baseMap.entities, 'outlines');
  const water = getFeatureCollection(baseMap.entities, 'water');
  let projection = getProjection(baseMap).fitWidth(width, features);
  let path = geoPath(projection);
  let bounds = path.bounds(features);
  const height = bounds[1][1];

  if (height > maxHeight) {
    projection = getProjection(baseMap).fitHeight(maxHeight, features);
    path = geoPath(projection);
    bounds = path.bounds(features);
  }

  if (features.type === 'FeatureCollection') {
    for (const feature of features.features) {
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

  return { path, bounds, features, outlines, water } as GeoParameters;
};

const getProjection = (baseMap): GeoProjection => {
  if (baseMap.config.projection === 'robinson') {
    return geoRobinson();
  } else if (baseMap.config.projection === 'albersUsa') {
    return geoAlbersUsa();
  } else {
    return geoMercator();
  }
};

const getFeatureCollection = (topology: Topology, objectName: TopologyObjectProperties) => {
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
