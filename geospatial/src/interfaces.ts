import type { GeoPath, GeoProjection } from 'd3-geo';
import type { FeatureCollection } from 'geojson';
import type { Topology } from 'topojson-specification';

export interface MapData {
  baseMapData: BaseMapData;
  topologyObjectNames: Array<string>;
  mainTopologyObject: string;
}

export interface BaseMap {
  id: string;
  title: string;
  versions: BaseMapData[];
}

export interface BaseMapData {
  validFrom: string;
  source?: {
    url: string;
    label: string;
  };
  config: BaseMapConfig;
  entities: Topology; // TODO check: this is an array instead
}

export interface BaseMapConfig {
  defaultEntityType: string;
  displayEntityType?: string;
  entityTypes: EntityTypes;
  projection: string;
}

export interface EntityTypes {
  name?: string;
  id?: string;
  nuts?: string;
  bfsNumber?: string;
  code?: string;
  key?: string;
  ags?: string;
  DEP?: string;
  iso3?: string;
  isoCode?: string;
}

export interface GeoParameters {
  path: GeoPath;
  bounds: [[number, number], [number, number]];
  topologyObjects: TopologyObject;
  projection: GeoProjection;
}

export interface TopologyObject {
  // [name: string]: FeatureCollection<Polygon, { [name: string]: any }>;
  [name: string]: FeatureCollection;
}

export interface GeoParameterConfig {
  topologyObjectNames?: Array<string>;
}
