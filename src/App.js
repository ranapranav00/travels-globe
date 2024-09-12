import './App.css';
import Globe from 'react-globe.gl';
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import * as SVGS from './svgs';
import { Tooltip } from 'react-tooltip';
import { addDetails } from './details';
import Masonry, {ResponsiveMasonry} from 'react-responsive-masonry';


function App() {
  const globeElement = useRef();
  const [pins, setPins] = useState([]);
  const [selectedLoc, setSelectedLoc] = useState(null);
  const [images, setImages] = useState([]);

  // Configuring the data for the pins that are displayed on the globe
  useEffect(() => {
    const data = [
      { location: "Domincan Republic", lat: 18.7357, lng: -70.1627,  svg: SVGS.domincanRepublicFlag },          // Punta Cana
      { location: "Dubai",             lat: 25.2048, lng: 55.2708,   svg: SVGS.uaeFlag },                       // Dubai
      { location: "India",             lat: 20.5937, lng: 78.9629,   svg: SVGS.indiaFlag },                     // India
      { location: "Bahamas",           lat: 25.0343, lng: -77.3963,  svg: SVGS.bahamasFlag },                   // Bahamas
      { location: "Costa Rica",        lat: 9.7489,  lng: -83.7534,  svg: SVGS.costaRicaFlag },                 // Costa Rica
      { location: "Puerto Rico",       lat: 18.2208, lng: -66.5901,  svg: SVGS.puertoRicoFlag },                // Puerto Rico
      { location: "Egypt",             lat: 26.8206, lng: 30.8025,   svg: SVGS.egyptFlag },                     // Egypt
      { location: "Bermuda",           lat: 32.3078, lng: -64.7505,  svg: SVGS.bermudaFlag },                   // Bermuda
      { location: "Peru",              lat: -9.19,   lng: -75.0152,  svg: SVGS.peruFlag },                      // Peru
      { location: "Italy",             lat: 41.8967, lng: 12.4822,   svg: SVGS.italyFlag },                     // Italy
      { location: "Greece",            lat: 39.0742, lng: 21.8243,   svg: SVGS.greeceFlag },                    // Greece
      { location: "Mexico City",       lat: 19.4326, lng: -99.1322,  svg: SVGS.mexicoFlag },                    // Mexico City
      { location: "Banff",             lat: 51.4968, lng: -115.9281, svg: SVGS.canadaFlag },                    // Banff
      { location: "Kenya",             lat: -0.0236, lng: 37.9062,   svg: SVGS.kenyaFlag },                     // Kenya
      { location: "Tanzania",          lat: -6.3690, lng: 34.8888,   svg: SVGS.tanzaniaFlag },                  // Tanzania
      { location: "Guatemala",         lat: 14.5573, lng: -90.7332,  svg: SVGS.guatemalaFlag }                  // Guatemala
    ];
    setPins(data);
  }, []);

  // GET Call to retrieve selected image gallery from Local Files
  useEffect(() => {
    if (selectedLoc) {
      axios.get('http://localhost:3001/images/' + selectedLoc)
        .then(response => {
          setImages(response.data.map(img => ({
            src: img.url,
            alt: selectedLoc + 'travel'
          })));
        })
        .catch(error => {
          console.error('There was an error fetching the images!', error);
        });
    }
  }, [selectedLoc]);

  // Function to set the selected location upon clicking a pin
  const handleClick = (point) => {
    setSelectedLoc(point.location);
    setImages([])
  }

  // Calls function from details.js to add animations & clouds to Globe render
  useEffect(() => {
    addDetails(globeElement);
  }, []);


  const MasonryGallery = () => {
    return (
        <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2}}>
          <Masonry>
            {images.map((image, i) => (
              <img className = "image" key = {i} src = {image} />
            ))
            }
          </Masonry>
        </ResponsiveMasonry>
    );
  }

  const view = (image, idx) => {

  }

  return (
    // <div className="container">
    //   <div className="globe-container">
    //     <Globe
    //       id="globe"
    //       //backgroundColor='yellow'
    //       ref={globeElement}
    //       globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
    //       //backgroundImageUrl={'//unpkg.com/three-globe/example/img/night-sky.png'}
    //       htmlElementsData={pins}
    //       htmlElement={(d) => {
    //         console.log(d.svg);
    //         const pt = document.createElement('div');
    //         pt.innerHTML = d.svg;
    //         pt.style.padding = '2px 4px';
    //         pt.style.borderRadius = '3px';
    //         pt.style.whiteSpace = 'nowrap';
    //         pt.style.pointerEvents = 'auto';
    //         pt.style.cursor = 'pointer';
    //         pt.setAttribute('data-tooltip-id', 'globe-tooltip'); // Set the tooltip ID
    //         pt.setAttribute('data-tooltip-content', d.location); // Set the tooltip content
    //         pt.onclick = () => handleClick(d);
    //         const svgElement = pt.querySelector('svg'); // Access the SVG element within the pt div
    //         // Increase pin size upon hovering over pin
    //         pt.addEventListener('mouseenter', () => {
    //           if (svgElement) {
    //             svgElement.style.transition = 'transform 0.3s ease-in-out';
    //             svgElement.style.transform = 'scale(1.2) translateY(-8%)';
    //           }
    //         });
    //         // Decrease pin size upon unhovering over pin
    //         pt.addEventListener('mouseleave', () => {
    //           if (svgElement) {
    //             svgElement.style.transform = 'scale(1) translateY(0)';
    //           }
    //         });
    //         return pt;
    //       }}
    //     />
    //     <Tooltip id="globe-tooltip" />
    //   </div>
    //   <div className="image-container">
    //     <h1 className='header'>{selectedLoc}</h1>
        
    //     <div className="image-gallery">
    //       {images.map((image, idx) => (
    //         <div id='image-div'>
    //           <img key={idx} src={image.src} alt={image.alt} className="gallery-image" />
    //         </div>))}
    //     </div>
    //   </div>
    // </div>

    <div className="container">
    <div className="globe-container">
      <Globe
        id="globe"
        ref={globeElement}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        controls = {{
          minDistance: 200,
          maxDistance: 800,
          enableZoom: true
        }}
        //backgroundImageUrl={'//unpkg.com/three-globe/example/img/night-sky.png'}
        htmlElementsData={pins}
        htmlElement={(d) => {
          console.log(d.svg);
          const pt = document.createElement('div');
          pt.innerHTML = d.svg;
          pt.style.padding = '2px 4px';
          pt.style.borderRadius = '3px';
          pt.style.whiteSpace = 'nowrap';
          pt.style.pointerEvents = 'auto';
          pt.style.cursor = 'pointer';
          pt.setAttribute('data-tooltip-id', 'globe-tooltip'); // Set the tooltip ID
          pt.setAttribute('data-tooltip-content', d.location); // Set the tooltip content
          pt.onclick = () => handleClick(d);
          const svgElement = pt.querySelector('svg'); // Access the SVG element within the pt div
          // Increase pin size upon hovering over pin
          pt.addEventListener('mouseenter', () => {
            if (svgElement) {
              svgElement.style.transition = 'transform 0.3s ease-in-out';
              svgElement.style.transform = 'scale(1.2) translateY(-8%)';
            }
          });
          // Decrease pin size upon unhovering over pin
          pt.addEventListener('mouseleave', () => {
            if (svgElement) {
              svgElement.style.transform = 'scale(1) translateY(0)';
            }
          });
          return pt;
        }}
      />
      <Tooltip id="globe-tooltip" />
      </div>
      <div className="image-container">
        <div className="header-container">
        <h1 className='header'>{selectedLoc}</h1>
        </div>
        <div className="Masonrydiv">
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2}}>
            <Masonry gutter= "20px">
              {images.map((image, idx) => (
                <div id='image-div'>
                  <img 
                  key={idx} 
                  src={image.src} 
                  alt={image.alt} 
                  className="gallery-image"
                  onClick = {() => view(image, idx)}/>
                </div>))}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      </div>
    </div>
  );

}

export default App;


