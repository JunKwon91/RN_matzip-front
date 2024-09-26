import React, { useRef, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import MapView, {
  Callout,
  LatLng,
  LongPressEvent,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { alerts, colors, mapNavigations } from '@/constants';
import usePermission from '@/hooks/usePermission';
import useUserLocation from '@/hooks/useUserLocation';
import { MainDrawerParamList } from '@/navigations/drawer/MainDrawerNavigarot';
import { MapStackParamList } from '@/navigations/Stack/MapStackNavigator';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import mapStyle from '@/style/mapStyle';
import CustomMarker from '@/components/CustomMarker';
import useGetMarkers from '@/hooks/queries/useGetMarkers';
import MarkerModal from '@/components/MarkerModal';
import useModal from '@/hooks/useModal';

// MapView 컴포넌트 스타일링
const StyledMapView = styled(MapView)`
  flex: 1;
`;
const DrawerButton = styled.Pressable<{ inset: EdgeInsets }>`
  position: absolute;
  left: 0px;
  top: ${(props) => props.inset.top || 20}px;
  padding: 12px 10px;
  background-color: ${colors.PINK_700};
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
`;
const ButtonListContainer = styled.View`
  position: absolute;
  bottom: 20px;
  right: 15px;
  gap: 10px;
`;
const MapButton = styled.Pressable`
  background-color: ${colors.PINK_700};
  margin: 0px 5px;
  height: 48px;
  width: 48px;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
`;

type Navigation = CompositeNavigationProp<
  StackNavigationProp<MapStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

function MapHomeScreen() {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<Navigation>();
  const mapRef = useRef<MapView | null>(null);
  const { userLocation, isUserLocationError } = useUserLocation();
  const { data: markers } = useGetMarkers();
  const markerModal = useModal();
  usePermission('LOCATION');

  const [selectLocation, setSelectLocation] = useState<LatLng | null>();
  const [markerId, setMarkerId] = useState<number | null>(null);

  const moveMapView = (coordinate: LatLng) => {
    mapRef.current?.animateToRegion({
      ...coordinate,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  const handleLongPressMapView = ({ nativeEvent }: LongPressEvent) => {
    setSelectLocation(nativeEvent.coordinate);
  };

  const handlePressUserLocation = () => {
    console.log(isUserLocationError);

    if (isUserLocationError) {
      // 에러메세지 표시
      return;
    }

    moveMapView(userLocation);
  };

  const handlePressAddPost = () => {
    if (!selectLocation) {
      return Alert.alert(
        alerts.NOT_SELECTED_LOCATION.TITLE,
        alerts.NOT_SELECTED_LOCATION.DESCRIPTION
      );
    }

    navigation.navigate(mapNavigations.ADD_POST, {
      location: selectLocation,
    });

    setSelectLocation(null);
  };

  const handlePressMarker = (id: number, coordinate: LatLng) => {
    moveMapView(coordinate);
    setMarkerId(id);
    markerModal.show();
  };

  return (
    <>
      <StyledMapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        followsUserLocation
        showsMyLocationButton={false}
        customMapStyle={mapStyle}
        onLongPress={handleLongPressMapView}
        region={{ ...userLocation, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
      >
        {markers?.map(({ id, color, score, ...coordinate }) => (
          <CustomMarker
            key={id}
            coordinate={coordinate}
            color={color}
            score={score}
            onPress={() => handlePressMarker(id, coordinate)}
          />
        ))}
        {selectLocation && (
          <Callout>
            <Marker coordinate={selectLocation} />
          </Callout>
        )}
      </StyledMapView>
      <DrawerButton
        style={styles.shadow}
        inset={inset}
        onPress={() => navigation.openDrawer()}
      >
        <Ionicons name={'menu'} color={colors.WHITE} size={25} />
      </DrawerButton>

      <ButtonListContainer>
        <MapButton style={styles.shadow} onPress={handlePressAddPost}>
          <MaterialIcons name={'add'} color={colors.WHITE} size={25} />
        </MapButton>
        <MapButton style={styles.shadow} onPress={handlePressUserLocation}>
          <MaterialIcons name={'my-location'} color={colors.WHITE} size={25} />
        </MapButton>
      </ButtonListContainer>

      <MarkerModal
        markerId={markerId}
        isVisible={markerModal.isVisible}
        hide={markerModal.hide}
      />
    </>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.5,
    elevation: 5,
  },
});

export default MapHomeScreen;
