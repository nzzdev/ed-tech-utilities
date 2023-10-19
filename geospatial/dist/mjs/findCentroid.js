export const findCentroid = (geoParameters, targetObject) => {
    var _a, _b, _c, _d;
    if (!geoParameters.projection)
        throw new Error(`GeoParameters do not contain a projection.`);
    if (!geoParameters.path)
        throw new Error(`GeoParameters do not contain a path.`);
    if (!((_a = geoParameters === null || geoParameters === void 0 ? void 0 : geoParameters.topologyObjects) === null || _a === void 0 ? void 0 : _a.hasOwnProperty(targetObject)))
        throw new Error(`Provided targetObject '${targetObject} does not exist in typologyObjects.`);
    if (((_b = geoParameters.topologyObjects[targetObject]) === null || _b === void 0 ? void 0 : _b.type) !== 'FeatureCollection')
        throw new Error(`'${(_c = geoParameters.topologyObjects[targetObject]) === null || _c === void 0 ? void 0 : _c.type}' is not of type 'FeatureCollection'.`);
    for (const feature of geoParameters.topologyObjects[targetObject].features) {
        if (((_d = feature.properties) === null || _d === void 0 ? void 0 : _d.centroid_lat) && feature.properties.centroid_lon) {
            // If we already have a centroid, use that
            feature.properties.centroidPlanar = geoParameters.projection([
                feature.properties.centroid_lat,
                feature.properties.centroid_lon,
            ]);
            feature.properties.centroidSpherical = [feature.properties.centroid_lat, feature.properties.centroid_lon];
            delete feature.properties.centroid_lat;
            delete feature.properties.centroid_lon;
        }
        else {
            // Otherwise, calculate it from the geometry
            feature.properties.centroidPlanar = geoParameters.path.centroid(feature);
        }
    }
    return geoParameters;
};
