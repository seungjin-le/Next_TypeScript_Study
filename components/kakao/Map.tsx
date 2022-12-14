import React, {useEffect, useRef, useState} from 'react';
import {Map, MapMarker, MapTypeControl, Roadview, ZoomControl} from "react-kakao-maps-sdk"
import {CToast, CToastBody, CToastHeader} from '@coreui/react'

/*global kakao*/

const Maps = () => {
  const [loding, setLoding] = useState(false);
  const [mapsInfo, setMapsInfo] : Array<object>= useState([]);
  const [position, setPosition] = useState()
  const handlePostitionClick = (_t : any, {latLng} : any) => {
    console.log(position)
    setPosition({
      lat: latLng.getLat(),
      lng: latLng.getLng(),
    })
    setMapsInfo([
      {
        lat: latLng.getLat(),
        lng: latLng.getLng(),
      },
      ...mapsInfo
    ])
  }
  useEffect(() => {
    setLoding(true)
  }, []);
  return (
        <>
          <Roadview // 로드뷰를 표시할 Container
          position={{
            // 지도의 중심좌표
            ...position,
            radius: 50,
          }}
          style={{
            // 지도의 크기
            width: "100%",
            height: "450px",
          }}
        />
          <Map
            center={{ lat: 33.5563, lng: 126.79581 }}
            isPanto={true}
            style={{ width: "100%", height: "360px" }}
            level={3}
            onClick={(_t, mouseEvent) => {
              handlePostitionClick(_t, mouseEvent)
            }}
          >
            { loding &&
              <>
                <ZoomControl position={kakao.maps.ControlPosition.TOPRIGHT}/><MapTypeControl
                position={kakao.maps.ControlPosition.TOPRIGHT}/>
              </>
            }
            {mapsInfo.map((v : any,i : any) =>
              <MapMarker position={v} key={i}>
                <div style={{ color: "#000" }}>Hello World!</div>
              </MapMarker>
            )}
          </Map>
          {mapsInfo.map((v : any,i : number) =>
              <CToast delay={4000}  visible={true} key={i}>
                <CToastHeader closeButton>
                  <svg
                    className="rounded me-2"
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                    role="img"
                  >
                    <rect width="100%" height="100%" fill="#007aff"></rect>
                  </svg>
                  <strong className="me-auto">클릭하신 위치 포지션</strong>
                  <small>7 min ago</small>
                </CToastHeader>
                <CToastBody>{`lat : ${v.lat}`}</CToastBody>
                <CToastBody>{`lng : ${v.lng}`}</CToastBody>
              </CToast>
            )
          }
        </>
  );
};

export default Maps;
