import { useRef } from "react";
import { Animated, Pressable } from "react-native";

/**
 * Reusable pressable wrapper that applies a subtle scale-down
 * animation on press. Used by GameCard, back buttons, etc.
 */
export default function AnimatedPressable({
  onPress,
  children,
  style,
  scaleTo = 0.95,
  accessibilityLabel,
  disabled = false,
}) {
  const scale = useRef(new Animated.Value(1)).current;

  const animateTo = (value) => {
    Animated.spring(scale, {
      toValue: value,
      speed: 30,
      bounciness: 6,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      onPressIn={() => animateTo(scaleTo)}
      onPressOut={() => animateTo(1)}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={{ opacity: disabled ? 0.5 : 1 }}
    >
      <Animated.View style={[style, { transform: [{ scale }] }]}>
        {children}
      </Animated.View>
    </Pressable>
  );
}
