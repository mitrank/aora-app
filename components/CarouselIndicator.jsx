import { View } from "react-native";
import React from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const CarouselIndicator = ({ data, activeItem }) => {
  return (
    <View className="flex-row justify-center mt-2">
      {data.map((item, i) => {
        // Create a shared value for the width of each indicator
        const width = useSharedValue(activeItem === item.$id ? 16 : 8);

        // Update the width value whenever `activeItem` changes
        width.value = withTiming(activeItem === item.$id ? 16 : 8, {
          duration: 300,
        });

        // Define an animated style that uses the width shared value
        const animatedStyle = useAnimatedStyle(() => ({
          width: width.value,
        }));

        return (
          <Animated.View
            className={`h-2 rounded-lg bg-gray-100 mx-2
            `}
            style={animatedStyle}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
};

export default CarouselIndicator;
