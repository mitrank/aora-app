import { View, Text, TextInput, Image, Alert } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { icons } from "../constants";
import { router, usePathname } from "expo-router";

const SearchInput = () => {
  const pathName = usePathname();
  const [query, setQuery] = useState("");

  return (
    <View className="w-full h-16 px-4 bg-black-100 border-black-200 rounded-2xl items-center focus:border-secondary flex-row space-x-4">
      <TextInput
        className="flex-1 text-base mt-0.5 text-white font-pregular"
        value={query}
        placeholder="Search for a video topic..."
        placeholderTextColor="#7B7B8B"
        onChangeText={(e) => setQuery(e)}
      />
      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert(
              "Missing query",
              "Please provide some input to search"
            );
          }
          if (pathName.startsWith("/search")) {
            router.setParams({ query });
          } else router.push(`/search/${query}`);
        }}
      >
        <Image
          source={icons.search}
          className=" w-5 h-5"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
