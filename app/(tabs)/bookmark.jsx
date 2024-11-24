import { View, Text, ScrollView, FlatList, Image } from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../../components/SearchInput";
import VideoCard from "../../components/VideoCard";
import { RefreshControl } from "react-native";
import { useAppwrite } from "../../lib/useAppwrite";
import { getSavedPosts } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import EmptyState from "../../components/EmptyState";
import { useFocusEffect } from "expo-router";

const Bookmark = () => {
  const { user } = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);
  const { data: posts, refetch } = useAppwrite(() => getSavedPosts(user.$id));

  useFocusEffect(
    useCallback(() => {
      const performRefresh = async () => {
        await refetch();
      };

      performRefresh();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="mb-6">
              <Text className="font-psemibold text-2xl text-white">
                Saved Videos
              </Text>
            </View>

            <SearchInput
              placeholder="Search your saved videos..."
              searchDocType="saved"
            />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subTitle="You don't have any saved videos!"
            buttonTitle="Back to Explore Videos"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Bookmark;
