import React from 'react';
import { colorHex, colors } from '@/constants';
import { LatLng, Marker, MyMapMarkerProps } from 'react-native-maps';
import styled from 'styled-components/native';
import { MarkerColor } from '@/types/domain';
import { StyleSheet } from 'react-native';

const Container = styled.View`
  width: 32px;
  height: 35px;
  align-items: center;
`;
const MarkerView = styled.View<{ backgroundColor: string }>`
  transform: rotate(45deg);
  width: 27px;
  height: 27px;
  border-radius: 27px;
  border-bottom-right-radius: 1px;
  border-width: 1px;
  border-color: ${colors.BLACK};
  background-color: ${({ backgroundColor }) => backgroundColor};
`;
type PositionType = 'left' | 'right';
const Eye = styled.View<{ position: PositionType }>`
  position: absolute;
  background-color: ${colors.BLACK};
  width: 4px;
  height: 4px;
  border-radius: 4px;
  top: ${({ position }) => (position === 'left' ? 12 : 5)}px;
  left: ${({ position }) => (position === 'left' ? 5 : 12)}px;
`;
const Mouth = styled.View``;

interface CustomMarkerProps extends MyMapMarkerProps {
  coordinate?: LatLng;
  color: MarkerColor;
  score?: number;
}

function CustomMarker({ coordinate, color, score = 5, ...props }: CustomMarkerProps) {
  const markerView = (
    <Container>
      <MarkerView backgroundColor={colorHex[color]}>
        <Eye position={'left'} />
        <Eye position={'right'} />
        {score > 3 && <Mouth style={[styles.mouth, styles.good]} />}
        {score === 3 && <Mouth style={styles.soso} />}
        {score < 3 && <Mouth style={[styles.mouth, styles.bad]} />}
      </MarkerView>
    </Container>
  );
  return coordinate ? (
    <Marker coordinate={coordinate} {...props}>
      {markerView}
    </Marker>
  ) : (
    markerView
  );
}

const styles = StyleSheet.create({
  mouth: {
    transform: [{ rotate: '45deg' }],
    borderTopColor: 'rgba(255,255,255 / 0.01)',
    borderBottomColor: 'rgba(255,255,255 / 0.01)',
    width: 12,
    height: 12,
    borderWidth: 1,
    borderRadius: 12,
  },
  good: {
    transform: [{ rotate: '225deg' }],
    marginLeft: 5,
    marginTop: 5,
    borderRightColor: 'rgba(255,255,255 / 0.01)',
    borderLeftColor: colors.BLACK,
  },
  soso: {
    marginLeft: 13,
    marginTop: 13,
    width: 8,
    height: 8,
    borderLeftColor: colors.BLACK,
    borderLeftWidth: 1,
    transform: [{ rotate: '45deg' }],
  },
  bad: {
    marginLeft: 12,
    marginTop: 12,
    borderRightColor: 'rgba(255,255,255 / 0.01)',
    borderLeftColor: colors.BLACK,
  },
});
export default CustomMarker;
