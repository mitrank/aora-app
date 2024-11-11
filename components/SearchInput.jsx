import { View, Text, TextInput, Image } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { icons } from "../constants";

const SearchInput = ({
  title,
  value,
  placeholder,
  handleChangeText,
  customStyles,
  keyboardType,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="w-full h-16 px-4 bg-black-100 border-black-200 rounded-2xl items-center focus:border-secondary flex-row space-x-4">
      <TextInput
        className="flex-1 text-base mt-0.5 text-white font-pregular"
        value={value}
        placeholder="Search for a video topic..."
        placeholderTextColor="#7B7B8B"
        onChangeText={handleChangeText}
        secureTextEntry={title === "Password" && !showPassword}
      />
      <TouchableOpacity>
        <Image source={icons.search} className=" w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
