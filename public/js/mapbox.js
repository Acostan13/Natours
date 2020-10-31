/* eslint-disable */
const locations = JSON.parse(document.getElementById('map').dataset.locations)
console.log(locations)

mapboxgl.accessToken =
    'pk.eyJ1IjoiYWNvc3RhbiIsImEiOiJja2JncDMxZ2wxN282MnNvNWF4d3A5Z2M1In0.dQnoWJVGrurwYRm6fhsIYQ'

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/acostan/ckgy1gk3s0q8l19n3tt4l53an',
    scrollZoom: false
    // center: [-118.2437, 34.0522],
    // zoom: 8,
    // interactive: false
})

const bounds = new mapboxgl.LngLatBounds()

locations.forEach((loc) => {
    // Create marker
    const el = document.createElement('div')
    el.className = 'marker'

    // Add marker
    new mapboxgl.Marker({
        element: el,
        anchor: 'bottom'
    })
        .setLngLat(loc.coordinates)
        .addTo(map)

    // Add popup
    new mapboxgl.Popup({
        offset: 30
    })
        .setLngLat(loc.coordinates)
        .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
        .addTo(map)

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates)
})

map.fitBounds(bounds, {
    padding: { top: 200, bottom: 150, left: 100, right: 100 }
})
