import { useEffect, useState } from "react";

import { View, TouchableOpacity, Image, FlatList, Text } from "react-native";
import { styles } from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";
import { GameParams } from "../../@types/navigation";
import { Entypo } from "@expo/vector-icons";
import { THEME } from "../../theme";
import logoImg from "../../assets/logo-nlw-esports.png";

import { Background } from "../../components/Background";
import { Heading } from "../../components/Heading";
import { DuoCard, DuoCardProps } from "../../components/DuoCard";
import { DuoMatch } from "../../components/DuoMatch";

export function Game() {
  const route = useRoute();
  const navigation = useNavigation();
  const game = route.params as GameParams;

  function handleGoBack() {
    navigation.goBack();
  }

  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const [discordSelected, setDiscordSelected] = useState<string>("");

  useEffect(() => {
    fetch(`http://192.168.1.10:3333/games/${game.id}/ads`)
      .then((response) => response.json())
      .then((data) => {
        setDuos(data);
      });
  }, []);

  async function getDiscordUser(adsId: number) {
    fetch(`http://192.168.1.10:3333/ads/${adsId}/discord`)
      .then((response) => response.json())
      .then((data) => {
        setDiscordSelected(data.discord);
      });
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>
          <Image source={logoImg} style={styles.logo} />
          <View style={styles.right} />
        </View>
        <Image
          source={{
            uri: game.bannerURL,
          }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading title={game.title} subtitle="Just connect to start playing!" />

        <FlatList
          data={duos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item: duo }) => {
            return (
              <DuoCard onConnect={() => getDiscordUser(duo.id)} data={duo} />
            );
          }}
          horizontal
          style={styles.containerList}
          contentContainerStyle={
            duos.length === 0 ? styles.emptyListContent : styles.contentList
          }
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => {
            return (
              <Text style={styles.emptyListText}>
                There are no ads for this game
              </Text>
            );
          }}
        />

        <DuoMatch
          handleClose={() => {
            setDiscordSelected("");
          }}
          visible={discordSelected.length ? true : false}
          discord={discordSelected}
        />
      </SafeAreaView>
    </Background>
  );
}
