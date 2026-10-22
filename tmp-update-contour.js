const fs = require('fs');
(async () => {
  const resp = await fetch('https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson');
  const obj = await resp.json();
  const feat = obj.features.find(f => (f.properties.ADMIN || f.properties.NAME) === 'Ukraine');
  if (!feat) throw new Error('Ukraine feature not found');
  const ring = feat.geometry.coordinates[0];
  const xs = ring.map(p => p[0]);
  const ys = ring.map(p => p[1]);
  const minLon = Math.min(...xs), maxLon = Math.max(...xs), minLat = Math.min(...ys), maxLat = Math.max(...ys);
  const points = ring.map(([lon, lat]) => {
    const x = 30 + ((lon - minLon) / (maxLon - minLon)) * 580;
    const y = 30 + ((maxLat - lat) / (maxLat - minLat)) * 360;
    return `${x.toFixed(2)} ${y.toFixed(2)}`;
  });
  const value = 'M ' + points.join(' L ') + ' Z';
  const file = fs.readFileSync('app.js', 'utf8');
  const start = file.indexOf("const mapContour = '");
  const end = file.indexOf("';", start);
  const updated = file.slice(0, start) + "const mapContour = '" + value + "';" + file.slice(end + 2);
  fs.writeFileSync('app.js', updated);
  console.log('updated contour from Natural Earth');
})();
