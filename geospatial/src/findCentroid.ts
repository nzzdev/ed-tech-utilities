import { GeoParameters } from './interfaces';
// TODO write test file

export const findCentroid = (geoParameters: GeoParameters, targetObjet: string): GeoParameters => {
  if (geoParameters?.topologyObjects?.hasOwnProperty(targetObjet))
    if (geoParameters[targetObjet]?.type === 'FeatureCollection') {
      // TODO throw if not exists
      // TODO move all this below to it's own exported function
      for (const feature of geoParameters[targetObjet].features) {
        // TODO check if features exist
        if (feature.properties.centroid_lat && feature.properties.centroid_lon) {
          // If we already have a centroid, use that
          feature.properties.centroidPlanar = geoParameters.projection([
            // TODO throw if not exists
            feature.properties.centroid_lat,
            feature.properties.centroid_lon,
          ]);
          feature.properties.centroidSpherical = [feature.properties.centroid_lat, feature.properties.centroid_lon];
          delete feature.properties.centroid_lat;
          delete feature.properties.centroid_lon;
        } else {
          // Otherwise, calculate it from the geometry
          feature.properties.centroidPlanar = geoParameters.path.centroid(feature); // TODO throw if not exists
        }
      }
    }

  return geoParameters;
};
