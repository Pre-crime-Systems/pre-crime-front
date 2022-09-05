import React from 'react';
import { createCustomEqual, deepEqual } from 'fast-equals';
import { isLatLngLiteral } from '@googlemaps/typescript-guards';

interface MapProps extends google.maps.MapOptions {
  style: { [key: string]: string };
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
  children?: React.ReactNode;
}

const Map: React.FC<MapProps> = ({
  onClick,
  onIdle,
  children,
  style,
  ...options
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<google.maps.Map>();

  React.useEffect(() => {
    if (ref.current && !map) {
      let newMap = new window.google.maps.Map(ref.current, {});
      setMap(newMap);
    }
  }, [ref, map]);

  // React.useEffect(() => {
  //   if (map) {
  //     let heatmap = new window.google.maps.visualization.HeatmapLayer({
  //       data: getPoints(),
  //       map: map,
  //     });
  //   }
  // }, [ref, map]);

  // because React does not do deep comparisons, a custom hook is used
  // see discussion in https://github.com/googlemaps/js-samples/issues/946
  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  React.useEffect(() => {
    if (map) {
      ['click', 'idle'].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      );

      if (onClick) {
        map.addListener('click', onClick);
      }

      if (onIdle) {
        map.addListener('idle', () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);

  // Heatmap data: 500 Points
  function getPoints() {
    return [
      new google.maps.LatLng(37.782551, -122.445368),
      new google.maps.LatLng(37.782745, -122.444586),
      new google.maps.LatLng(37.782842, -122.443688),
      new google.maps.LatLng(37.782919, -122.442815),
    ];
  }
  console.log('Drawing map again');
  return (
    <>
      <div ref={ref} style={style} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
};

export default Map;

// const compare = (a: any, b: any) => {
//   console.log('comparing');

//   if (
//     isLatLngLiteral(a) ||
//     a instanceof google.maps.LatLng ||
//     isLatLngLiteral(b) ||
//     b instanceof google.maps.LatLng
//   ) {
//     return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
//   }

//   // TODO extend to other types

//   // use fast-equals for other objects
//   return deepEqual(a, b);

//   // return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
// };

const deepCompareEqualsForMaps = createCustomEqual(
  (deepEqual) => (a: any, b: any) => {
    if (
      isLatLngLiteral(a) ||
      a instanceof google.maps.LatLng ||
      isLatLngLiteral(b) ||
      b instanceof google.maps.LatLng
    ) {
      return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
    }

    // TODO extend to other types

    // use fast-equals for other objects
    return deepEqual(a, b);
  }
);

function useDeepCompareMemoize(value: any) {
  const ref = React.useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

function useDeepCompareEffectForMaps(
  callback: React.EffectCallback,
  dependencies: any[]
) {
  React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
}
