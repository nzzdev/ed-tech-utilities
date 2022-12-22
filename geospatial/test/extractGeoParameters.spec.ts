import { Position } from 'geojson';
import { extractGeoParameters } from '../src';
import { BaseMapData, GeoParameters } from '../src/interfaces';
import customGemeindeDaten from './fixture/custom-gemeinderatswahlen-zh.json';

describe('extractGeoParameters', () => {
  const width = 778;
  const maxHeight = 700;
  const mainTopologyObject = 'features';
  const expectedResult: GeoParameters = {
    bounds: [
      [0, 0],
      [734.8996766893761, 700],
    ],
    topologyObjects: {
      features: {
        type: 'FeatureCollection',
        features: [
          // partially omitted
        ],
      },
      outlines: {
        type: 'FeatureCollection',
        features: [],
      },
      water: {
        type: 'FeatureCollection',
        features: [],
      },
    },
    // TODO test differently
    path: undefined,
    // TODO test differently
    projection: undefined,
  };

  const result = extractGeoParameters(
    {
      baseMapData: customGemeindeDaten as unknown as BaseMapData, // TODO fix typing problem
      topologyObjectNames: ['features', 'outlines', 'water'],
      mainTopologyObject,
    },
    width,
    maxHeight
  );

  it('should extract correct bounds', () => {
    expect(result.bounds[0][0]).toEqual(expectedResult.bounds[0][0]);
    expect(result.bounds[0][1]).toEqual(expectedResult.bounds[0][1]);
    expect(result.bounds[1][0]).toEqual(expectedResult.bounds[1][0]);
    expect(result.bounds[1][1]).toEqual(expectedResult.bounds[1][1]);
  });

  it('should extract topologyObjects correctly', () => {
    const geometry = result.topologyObjects[mainTopologyObject].features[0].geometry;
    let coordinates: Position[][];
    if (geometry.type === 'Polygon') coordinates = geometry.coordinates;

    expect(result.topologyObjects['water'].features.length).toBe(0);
    expect(result.topologyObjects['outlines'].features.length).toBe(0);
  });

  // TODO how to test path and projection?
});
