import { View, Text } from "react-native";
import React from "react";
import { images } from "../constants";
import { Image } from "react-native";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

const EmptyState = ({
  title = "",
  subTitle = "",
  buttonTitle = "",
  handlePressButtonRoute = "/home",
}) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />

      <Text className="font-psemibold text-xl text-white text-center mt-2">
        {title}
      </Text>
      <Text className="font-pmedium text-sm text-gray-100">{subTitle}</Text>

      <CustomButton
        title={buttonTitle}
        handlePress={() => router.push(handlePressButtonRoute)}
        containerStyles="w-full my-5"
      />
    </View>
  );
};

export default EmptyState;
