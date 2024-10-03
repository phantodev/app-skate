import React from "react";
import {
  TouchableHighlight,
  Text,
  ActivityIndicator,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
} from "react-native-reanimated";

const AnimatedTouchableHighlight =
  Animated.createAnimatedComponent(TouchableHighlight);

const DeleteButton = ({
  isDeleting,
  onPress,
}: {
  isDeleting: boolean;
  onPress: () => void;
}) => {
  const animation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(animation.value, [0, 0.5, 1], [1, 0.9, 1]);
    return {
      transform: [{ scale }],
    };
  });

  const handlePress = () => {
    animation.value = withSpring(1, {}, (finished) => {
      if (finished) {
        animation.value = 0;
      }
    });
    onPress();
  };

  return (
    <AnimatedTouchableHighlight
      className="bg-red-500 rounded-md mt-4"
      onPress={handlePress}
      style={animatedStyle}
    >
      <View className="flex flex-row justify-center items-center h-10">
        <Feather name="trash-2" size={24} color="white" />
        {!isDeleting ? (
          <Text className="ml-2 text-white font-semibold">Excluir spot</Text>
        ) : (
          <ActivityIndicator color="white" />
        )}
      </View>
    </AnimatedTouchableHighlight>
  );
};

export default React.memo(DeleteButton);
