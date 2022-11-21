import { GeoPath } from 'd3-geo';
import { FeatureCollection } from 'geojson';

// TODO Rewrite baseMap according to JSONs stored in DB
// REVIEW Should we export types from this package? E.g. Basemap
// export interface BaseMap {
//   id: string;
//   title: string;
//   versions: BaseMapVersion[];
// }

// export interface BaseMapVersion {
//   validFrom: string;
//   source?: {
//     url: string;
//     label: string;
//   };
//   config: BaseMapConfig;
//   entities: any; // TODO
// }

// export interface BaseMapConfig {
//   defaultEntityType: string;
//   displayEntityType?: string;
//   entityTypes: EntityTypes;
//   projection: string;
// }

// export interface EntityTypes {
//   name?: string;
//   id?: string;
//   nuts?: string;
//   bfsNumber?: string;
//   code?: string;
//   key?: string;
//   ags?: string;
//   DEP?: string;
//   iso3?: string;
//   isoCode?: string;
// }

export interface GeoParameters {
  path: GeoPath;
  bounds: [[number, number], [number, number]];
  topologyObjects: TopologyObject;
}

export interface TopologyObject {
  [name: string]: FeatureCollection;
}

export interface GeoParameterConfig {
  topologyObjectNames?: Array<string>;
}
