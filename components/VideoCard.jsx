import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import { ResizeMode, Video } from "expo-av";
import CustomDropdown from "./CustomDropdown";
import { FontAwesome } from "@expo/vector-icons";

const VideoCard = ({
  video: {
    title,
    thumbnail,
    video,
    creator: { username, avatar },
  },
}) => {
  const [play, setPlay] = useState(false);
  const [isShowMenu, setIsShowMenu] = useState(false);

  const data = [
    {
      label: "Save",
      id: "save",
      icon: <FontAwesome name="bookmark" size={16} color="#FF9C01" />,
    },
    {
      label: "Discard",
      id: "discard",
      icon: <FontAwesome name="remove" size={16} color="#FF9C01" />,
    },
  ];

  return (
    <View className="flex-col items-center px-4 mb-14 relative">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-full justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-full"
              resizeMode="cover"
            />
          </View>

          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs font-pregular text-gray-100"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>

        <View className="pt-2">
          <TouchableOpacity onPress={() => setIsShowMenu(!isShowMenu)}>
            <Image
              source={icons.menu}
              className="w-5 h-5"
              resizeMode="contain"
            />
          </TouchableOpacity>
          {isShowMenu && (
            <CustomDropdown
              isOpen={isShowMenu}
              isOpenChange={setIsShowMenu}
              data={data}
              customStyles="absolute -left-28 z-10 w-28 rounded-lg bg-primary border border-secondary-100"
              labelStyles="text-white"
            />
          )}
        </View>
      </View>

      {play ? (
        <Video
          source={{ uri: video }}
          // className="w-full h-60 rounded-xl mt-3"  // className property isnt working with Video element of expo-av
          style={{
            width: "100%", // w-52 in Tailwind (52 * 4 px)
            height: 240, // h-72 in Tailwind (72 * 4 px)
            borderRadius: 12, // rounded-xl (0.75 * 16 px)
            marginTop: 12, // mt-3 (3 * 4 px)
          }}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
