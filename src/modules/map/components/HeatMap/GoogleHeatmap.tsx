import React from 'react';

const GoogleHeatmap: React.FC<google.maps.visualization.HeatmapLayerOptions> = (
  options
) => {
  const [heatm, setheatm] =
    React.useState<google.maps.visualization.HeatmapLayer>();

  React.useEffect(() => {
    console.log('Cambio heatmap');
    if (!heatm) {
      console.log('Setting heatmap');
      setheatm(new google.maps.visualization.HeatmapLayer());
    }

    // remove marker from map on unmount
    return () => {
      if (heatm) {
        heatm.setMap(null);
      }
    };
  }, [heatm]);

  React.useEffect(() => {
    console.log('Setting options');
    if (heatm && options) {
      heatm.setOptions(options);
    }
  }, [heatm, options]);

  return null;
};
export default GoogleHeatmap;
