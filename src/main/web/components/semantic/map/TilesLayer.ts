import { Props, createElement } from 'react';
import * as React from 'react';
import {Component, ComponentContext} from "platform/api/components";
import XYZ from "ol/source/xyz";
import OSM from "ol/source/osm";
import SemanticMap, {SemanticMapConfig, SemanticMapProps} from "platform/components/semantic/map/SemanticMap";
import * as maybe from "data.maybe";
import {findDOMNode} from "react-dom";


interface ProviderOptions {
  endpoint: string;
  crs: string;
  style: string;
  tileset_id: string;
}

enum Source {
  OSM = 'osm',
  MapBox = 'mapbox',
  MapBoxRasterTiles = 'mapboxRasterTiles',
  ComuneDiVenezia = 'ComuneDiVenezia'
}

export interface ProviderConfig {
  /**
   * Optional enum for calling the selected OpenLayer source
   * ENUM { "mapbox", "osm"}
   */
  provider?: Source;

  /**
   * Optional JSON object containing various user provided options
   */
  providerOptions?: ProviderOptions;


  receiveProviderFromChild?: any; 
}

export type ProviderProps = ProviderConfig & Props<any>;

export class TilesLayer extends Component<ProviderProps, any>{

  constructor(props: ProviderProps, context: ComponentContext) {
    super(props, context);
  }

///v4/{tileset_id}/{zoom}/{x}/{y}{@2x}.{format}
//gspinaci.1fedppsy
//https://api.mapbox.com/v4/mapbox.satellite/1/0/0@2x.jpg90?access_token=pk.eyJ1IjoiZ3NwaW5hY2kiLCJhIjoiY2szOHRpYnpjMGM5ZzNjcWZwZDR0OGEzeCJ9.dBzGlRpELo0yLMaWD4h2KA

  public componentDidMount() {
    let newProvider;
    switch (this.props.provider) {
      case Source.MapBox: {
        newProvider = new XYZ({
          url: 'http://localhost:10214/proxy/mapbox/styles/v1/' +
            this.props.providerOptions.style + '/tiles/256/{z}/{x}/{y}'
        });
        break;
      }
      case Source.MapBoxRasterTiles: {
        newProvider = new XYZ({
          url: 'http://localhost:10214/proxy/mapbox/v4/' +
            this.props.providerOptions.tileset_id + '/{z}/{x}/{y}@2x.png'
        });
        break;
      }
      case Source.ComuneDiVenezia: {
        newProvider = new XYZ({
          url: 'http://geoportale.comune.venezia.it/Geocortex/Essentials/REST/local-proxy/GeoPortale/11/RasterDataset_2014_2/MapServer/tile/{z}/{y}/{x}'
        });
        break;
      }
      default: {
        newProvider = new OSM({});
        break;
      }
    }
    this.sendProviderToParent(newProvider)
  }

  public render() {
    return null;
  }

  private sendProviderToParent(provider){
    this.props.receiveProviderFromChild(provider);
  }
}

export default TilesLayer;

