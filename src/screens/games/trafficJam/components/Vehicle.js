import { useEffect, useRef } from "react";
import { Animated, Easing, PanResponder, StyleSheet } from "react-native";
import Svg, { Circle, Rect } from "react-native-svg";

const INSET = 4;

function CarShape({ length, horizontal, color, isTarget }) {
  const w = horizontal ? length : 1;
  const h = horizontal ? 1 : length;
  const bodyW = 100 * w - 6;
  const bodyH = 100 * h - 6;
  const darker = isTarget ? "#B23B33" : "rgba(0,0,0,0.18)";

  return (
    <Svg width="100%" height="100%" viewBox={`0 0 ${100 * w} ${100 * h}`}>
      <Rect x={3} y={3} width={bodyW} height={bodyH} rx={18} fill={color} />
      <Rect
        x={3}
        y={3}
        width={bodyW}
        height={bodyH}
        rx={18}
        fill="none"
        stroke="rgba(0,0,0,0.22)"
        strokeWidth={2}
      />
      <Rect
        x={horizontal ? bodyW * 0.16 : bodyW * 0.26}
        y={horizontal ? bodyH * 0.26 : bodyH * 0.16}
        width={horizontal ? bodyW * 0.68 : bodyW * 0.48}
        height={horizontal ? bodyH * 0.48 : bodyH * 0.68}
        rx={8}
        fill="rgba(255,255,255,0.22)"
      />
      {horizontal ? (
        <>
          <Circle cx={bodyW * 0.22} cy={bodyH + 2} r={10} fill="#2B2B33" />
          <Circle cx={bodyW * 0.78} cy={bodyH + 2} r={10} fill="#2B2B33" />
        </>
      ) : (
        <>
          <Circle cx={-2} cy={bodyH * 0.22} r={10} fill="#2B2B33" />
          <Circle cx={-2} cy={bodyH * 0.78} r={10} fill="#2B2B33" />
        </>
      )}
      <Rect
        x={horizontal ? bodyW - 8 : bodyW * 0.3}
        y={horizontal ? bodyH * 0.3 : bodyH - 8}
        width={horizontal ? 8 : bodyW * 0.4}
        height={horizontal ? bodyH * 0.4 : 8}
        rx={3}
        fill={darker}
      />
    </Svg>
  );
}

export default function Vehicle({
  vehicle,
  color,
  cell,
  getRange,
  onMove,
  enabled,
}) {
  const horizontal = vehicle.orientation === "H";
  const cellIndex = horizontal ? vehicle.col : vehicle.row;

  const position = useRef(new Animated.Value(cellIndex * cell)).current;
  const glow = useRef(new Animated.Value(0)).current;
  const drag = useRef({ startIndex: 0, min: 0, max: 0, value: 0 });
  const latest = useRef({});
  latest.current = { vehicle, cell, horizontal, getRange, onMove, enabled };

  useEffect(() => {
    Animated.timing(position, {
      toValue: cellIndex * cell,
      duration: 200,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [cellIndex, cell, position]);

  useEffect(() => {
    if (!vehicle.isTarget) return undefined;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(glow, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(glow, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [vehicle.isTarget, glow]);

  const settle = () => {
    const { vehicle: current, cell: size, onMove: notify } = latest.current;
    const { startIndex, value } = drag.current;
    const targetIndex = Math.round(value / size);

    Animated.timing(position, {
      toValue: targetIndex * size,
      duration: 120,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished && targetIndex !== startIndex) {
        notify(current.id, targetIndex - startIndex);
      }
    });
  };

  const responder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => latest.current.enabled,
      onPanResponderGrant: () => {
        const {
          vehicle: current,
          cell: size,
          horizontal: isHorizontal,
          getRange: range,
        } = latest.current;
        const { back, forward } = range(current.id);
        const startIndex = isHorizontal ? current.col : current.row;
        position.stopAnimation();
        drag.current = {
          startIndex,
          min: (startIndex - back) * size,
          max: (startIndex + forward) * size,
          value: startIndex * size,
        };
      },
      onPanResponderMove: (_, gesture) => {
        const { cell: size, horizontal: isHorizontal } = latest.current;
        const { startIndex, min, max } = drag.current;
        const raw =
          startIndex * size + (isHorizontal ? gesture.dx : gesture.dy);
        const value = Math.min(Math.max(raw, min), max);
        drag.current.value = value;
        position.setValue(value);
      },
      onPanResponderRelease: settle,
      onPanResponderTerminate: settle,
    }),
  ).current;

  const length = vehicle.length * cell;
  const placement = horizontal
    ? {
        position: "absolute",
        left: position,
        top: vehicle.row * cell,
        width: length,
        height: cell,
      }
    : {
        position: "absolute",
        left: vehicle.col * cell,
        top: position,
        width: cell,
        height: length,
      };

  return (
    <Animated.View
      {...responder.panHandlers}
      style={[styles.touchArea, placement]}
    >
      {vehicle.isTarget && (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.glow,
            {
              opacity: glow.interpolate({
                inputRange: [0, 1],
                outputRange: [0.15, 0.5],
              }),
              transform: [
                {
                  scale: glow.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.08],
                  }),
                },
              ],
            },
          ]}
        />
      )}
      <CarShape
        length={vehicle.length}
        horizontal={horizontal}
        color={color}
        isTarget={vehicle.isTarget}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  touchArea: { padding: INSET },
  glow: {
    position: "absolute",
    top: -6,
    left: -6,
    right: -6,
    bottom: -6,
    borderRadius: 24,
    backgroundColor: "#F28B82",
  },
});
