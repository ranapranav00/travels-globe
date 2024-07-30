import './App.css';
import Globe from 'react-globe.gl';
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import * as SVGS from './svgs';


function App() {
  const globeElement = useRef();
  const [pins, setPins] = useState([]);
  const [selectedLoc, setSelectedLoc] = useState(null);
  const [images, setImages] = useState([]);

  
  useEffect(() => {
    const data = [
      { lat: 26.8206, lng: 30.8025, size: 1, color: 'red', location: "Egypt", svg: SVGS.egyptSvg}, // Egypt
      { lat: -9.19, lng: -75.0152, size: 1, color: 'red', location: "Peru",  svg: SVGS.machu_picchuSvg}, // Peru
      { lat: -0.0236, lng: 37.9062, size: 1, color: 'red', location: "Kenya", svg: SVGS.kenyaFlag }, // Kenya
      { lat: -6.3690, lng: 34.8888, size: 1, color: 'red', location: "Tanzania", svg: SVGS.tanzaniaFlag }, // Tanzania
      { lat: 39.0742, lng: 21.8243, size: 1, color: 'red', location: "Greece", svg: SVGS.greeceSvg }, // Greece
      { lat: 51.4968, lng: -115.9281, size: 1, color: 'red', location: "Banff", svg: "Banff" } // Banff
    ];
    setPins(data);
  }, []);

  useEffect(() => {
    if (selectedLoc) {
      axios.get('http://localhost:3001/images/' + selectedLoc)
      .then( response => {
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

  const handleClick = (point) => {
    setSelectedLoc(point.location);
    // setImages([]);
    //alert('clicked ' + point.location)

    //   const folder = axios.get
    //   let images = [];
    //   folder.keys().forEach((file) => {
    //     images.push({
    //       src: folder(file).default, // Ensure to use .default if you encounter issues with module.exports
    //       alt: `${point.location} travel`
    //     });
    //   });
    //   setImages(images);
  }

  const handleGlobeReady = (globe) => {
    globe.autoRotate = true;
    globe.autoRotateSpeed = 0.5;
  };
  

  // const renderImages = () => {
  //   if (!selectedLoc) return null;
  //   const images = loadImages(require.context('.\\Images\\'+ selectedLoc, false, /\.(png|jpe?g|svg)$/).keys())
  //   setImages(Object, values(images));
  //   return (
  //   <div className="image-gallery">
  //     {images.map((image, idx) => (
  //         <img key={idx} src={loadImages(require(`.\\Images\\${selectedLoc}\\${image.slice(2)}`)} alt={`${selectedLoc} travel`} />
  //       ))}
  //   </div>
  //   );
  // }

  return (
    <div className="container">
      <div className="globe-container">
        <Globe
          ref = {globeElement}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          htmlElementsData={pins}
          htmlElement={(d) => {
            console.log(d.svg);
            const pt = document.createElement('div');
            pt.innerHTML = d.svg; 
            pt.style.color = 'white';
            //pt.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            pt.style.padding = '2px 4px';
            pt.style.borderRadius = '3px';
            pt.style.whiteSpace = 'nowrap';
            pt.style.pointerEvents = 'auto';
            pt.style.cursor = 'pointer';
            pt.onclick = () => handleClick(d);
            return pt;
          }}
          //pointsData={pins}
          // pointAltitude={d => d.size / 20}
          // pointColor={d => d.color}
          // ringsData={pins}
          // ringAltitude={0}
          // ringColor={d => d.color}
          //onGlobeReady = {handleGlobeReady}
        />
      </div>,
      <div className = "image-container">
          <div className="image-gallery"> 
            {images.map((image, idx) => (
            <img key = {idx} src = {image.src} alt = {image.alt} className = "gallery-image"/>))}
          </div>
      </div>
    </div>
  );
}

export default App;

// import "./App.css";
// function App() {
//   return (
//     <div className="App">
//       <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 512 512" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" fill="#000000">
//         <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round">
//         </g>
//         <g id="SVGRepo_iconCarrier">
//           <path style="fill:#FFFFFF;" d="M341.101,265.419V59.465H203.799v289.862h137.303v-53.396c0-4.214,3.414-7.628,7.628-7.628v-15.257 C344.516,273.046,341.101,269.633,341.101,265.419z">
//           </path>
//           <g>
//             <path style="fill:#ED1F34;" d="M356.357,265.419c0,4.214-3.415,7.628-7.629,7.628v15.257c4.213,0,7.629,3.413,7.629,7.628v53.396 h137.302V59.465H356.357V265.419z">
//             </path>
//             <rect x="51.24" y="59.465" style="fill:#ED1F34;" width="137.304" height="289.866">
//             </rect>
//           </g>
//           <path d="M504.371,44.209H46.696c-4.212,0-7.628,3.414-7.628,7.629v305.116c0,4.213,3.415,7.629,7.628,7.629h457.676 c4.214,0,7.629-3.415,7.629-7.629V51.837C512,47.623,508.586,44.209,504.371,44.209z M493.659,349.326H356.357V295.93 c0-4.214-3.415-7.628-7.629-7.628s-7.628,3.413-7.628,7.628v53.396H203.799V59.465h137.303v205.954c0,4.214,3.414,7.628,7.628,7.628 s7.629-3.413,7.629-7.628V59.465h137.302v289.861H493.659z M51.24,59.465h137.302v289.862H51.24V59.465z">
//           </path>
//           <path style="fill:#2E3033;" d="M20.844,480.643c-6.391,0-11.591-5.2-11.591-11.591V42.841c0-6.332,5.152-11.484,11.484-11.484h1.514 c6.392,0,11.591,5.2,11.591,11.591v426.102c0,6.392-5.2,11.591-11.591,11.591h-1.407V480.643z">
//           </path>
//           <path d="M22.251,22.104h-1.514C9.302,22.104,0,31.407,0,42.841v426.21c0,11.494,9.351,20.844,20.844,20.844h1.406 c11.494,0,20.844-9.351,20.844-20.844V42.948C43.095,31.455,33.745,22.104,22.251,22.104z M27.674,469.052 c0,2.99-2.433,5.422-5.422,5.422h-1.406c-2.99,0-5.422-2.432-5.422-5.422V42.841c0-2.931,2.384-5.315,5.315-5.315h1.514 c2.99,0,5.422,2.433,5.422,5.422v426.103H27.674z"></path>
//         </g>
//       </svg>
//     </div>
//   );
// }
// export default App;