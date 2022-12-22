import { geoAlbersUsa, geoMercator, geoPath } from 'd3-geo';
import { geoRobinson } from 'd3-geo-projection';
import { feature } from 'topojson-client';
import { Projection } from './emums';
export const extractGeoParameters = (mapData, width, maxHeight) => {
    var _a, _b, _c;
    if (!((_b = (_a = mapData === null || mapData === void 0 ? void 0 : mapData.baseMapData) === null || _a === void 0 ? void 0 : _a.entities) === null || _b === void 0 ? void 0 : _b.objects))
        throw new Error('No typologyObjects found in baseMap data.');
    if (!((_c = mapData.topologyObjectNames) === null || _c === void 0 ? void 0 : _c.length))
        throw new Error('No topologyObjects provided.');
    if (!mapData.mainTopologyObject || !mapData.topologyObjectNames.includes(mapData.mainTopologyObject))
        throw new Error(`TopologyObject '${mapData.mainTopologyObject}' does no exist in topologyObjects.`);
    const topologyObjects = {};
    mapData.topologyObjectNames.forEach((name) => (topologyObjects[name] = getFeatureCollection(mapData.baseMapData.entities, name)));
    let projection = getProjection(mapData.baseMapData).fitWidth(width, topologyObjects[mapData.mainTopologyObject]);
    let path = geoPath(projection);
    let bounds = path.bounds(topologyObjects[mapData.mainTopologyObject]);
    const height = bounds[1][1];
    if (height > maxHeight) {
        projection = getProjection(mapData.baseMapData).fitHeight(maxHeight, topologyObjects[mapData.mainTopologyObject]);
        path = geoPath(projection);
        bounds = path.bounds(topologyObjects[mapData.mainTopologyObject]);
    }
    return { path, bounds, topologyObjects, projection };
};
const getProjection = (baseMap) => {
    var _a, _b;
    const projection = (_a = baseMap === null || baseMap === void 0 ? void 0 : baseMap.config) === null || _a === void 0 ? void 0 : _a.projection;
    switch (projection) {
        case Projection.ROBINSON:
            return geoRobinson();
        case Projection.ALBERS_USA:
            return geoAlbersUsa();
        case Projection.MERCATOR:
            return geoMercator();
        default:
            throw new Error(`Could not match '${(_b = baseMap === null || baseMap === void 0 ? void 0 : baseMap.config) === null || _b === void 0 ? void 0 : _b.projection}' to any supported projection.`);
    }
};
const getFeatureCollection = (topology, objectName) => {
    if (topology && topology.objects[objectName]) {
        return feature(topology, topology.objects[objectName]);
    }
    return makeFeatureCollection([]);
};
const makeFeatureCollection = (features) => {
    return {
        type: 'FeatureCollection',
        features,
    };
};
