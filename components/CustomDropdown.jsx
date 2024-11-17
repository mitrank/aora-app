import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";

const CustomDropdown = ({
  isOpen = false,
  isOpenChange = () => {},
  data = [],
  customStyles = "",
  labelStyles = "",
  maxContainerHeight = "28",
}) => {
  return isOpen ? (
    <ScrollView
      className={`bg-gray-100 w-20 h-max max-h-${maxContainerHeight} ${customStyles}`}
      nestedScrollEnabled
    >
      {data.map((item) => {
        return (
          <View key={item.id} className="p-2">
            <TouchableOpacity className="flex-row gap-2 justify-start items-center" onPress={() => isOpenChange(false)}>
              <View>{item.icon}</View>
              <Text className={`${labelStyles}`}>{item.label}</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </ScrollView>
  ) : null;
};

export default CustomDropdown;
