import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import { TouchableOpacity } from "react-native";
import { ResizeMode, Video } from "expo-av";
import { icons } from "../../constants";
import CustomButton from "../../components/CustomButton";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { createVideo } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const openPicker = async (fileType) => {
    // Request permissions
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permission to access documents is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        fileType === "image"
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (fileType === "image") {
        setForm({ ...form, thumbnail: result.assets[0] });
      }

      if (fileType === "video") {
        console.log(result.assets[0].uri)
        setForm({ ...form, video: result.assets[0] });
      }
    } else {
      setTimeout(() => {
        Alert.alert("Document selected", JSON.stringify(result, null, 2));
      }, 100);
    }
  };

  const submitForm = async () => {
    if (!form.prompt || !form.title || !form.thumbnail || !form.video) {
      Alert.alert("Please fill in all the fields!");
    }

    setUploading(true);

    try {
      await createVideo({ ...form, userId: user.$id });

      Alert.alert("Success", "Post uploaded successfully!");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setUploading(false);
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      });
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Upload Video</Text>

        <FormField
          title="Video Title"
          value={form.title}
          placeholder="Give your video a perfect title..."
          handleChangeText={(e) => setForm({ ...form, title: e })}
          customStyles="mt-10"
        />

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Video
          </Text>
          {form.video ? (
            <Video
              source={{ uri: form.video.uri }}
              className="w-full h-64 rounded-2xl"
              resizeMode={ResizeMode.COVER}
            />
          ) : (
            <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
              <TouchableOpacity onPress={() => openPicker("video")}>
                <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Thumbnai Image
          </Text>

          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode="contain"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200">
                <TouchableOpacity onPress={() => openPicker("image")}>
                  <View className="h-full justify-center items-center flex-row">
                    <Image
                      source={icons.upload}
                      resizeMode="contain"
                      className="h-1/2"
                    />
                    <Text className="text-sm text-gray-100 font-pmedium">
                      Choose a file
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title="AI Prompt"
          value={form.prompt}
          placeholder="The prompt you used to create this video"
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          customStyles="mt-7"
        />

        <CustomButton
          title="Publish"
          handlePress={submitForm}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
