import { GeoParameters } from './interfaces';

export const findCentroid = (geoParameters: GeoParameters, targetObject: string): GeoParameters => {
  if (!geoParameters.projection) throw new Error(`GeoParameters do not contain a projection.`);

  if (!geoParameters.path) throw new Error(`GeoParameters do not contain a path.`);

  if (!geoParameters?.topologyObjects?.hasOwnProperty(targetObject))
    throw new Error(`Provided targetObject '${targetObject} does not exist in typologyObjects.`);

  if (geoParameters.topologyObjects[targetObject]?.type !== 'FeatureCollection')
    throw new Error(`'${geoParameters.topologyObjects[targetObject]?.type}' is not of type 'FeatureCollection'.`);

  for (const feature of geoParameters.topologyObjects[targetObject].features) {
    if (feature.properties?.centroid_lat && feature.properties.centroid_lon) {
      // If we already have a centroid, use that
      feature.properties.centroidPlanar = geoParameters.projection([
        feature.properties.centroid_lat,
        feature.properties.centroid_lon,
      ]);
      feature.properties.centroidSpherical = [feature.properties.centroid_lat, feature.properties.centroid_lon];
      delete feature.properties.centroid_lat;
      delete feature.properties.centroid_lon;
    } else {
      // Otherwise, calculate it from the geometry
      feature.properties.centroidPlanar = geoParameters.path.centroid(feature);
    }
  }

  return geoParameters;
};
