import { useState, useEffect } from "react";
import { View, Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logoImg from "../../assets/logo-nlw-esports.png";
import { Background } from "../../components/Background";
import { GameCard, GameCardProps } from "../../components/GameCard";
import { Heading } from "../../components/Heading";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);

  const navigation = useNavigation();

  function handleOpenGame({ id, title, bannerURL }: GameCardProps) {
    navigation.navigate("game", {
      id,
      title,
      bannerURL,
    });
  }

  useEffect(() => {
    fetch("http://192.168.1.10:3333/games")
      .then((response) => response.json())
      .then((data) => {
        setGames(data);
      });
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo} />
        <Heading
          title="Find your duo!"
          subtitle="Choose the game that you wish to play..."
        />
        <FlatList
          data={games}
          keyExtractor={(item) => item.id}
          renderItem={({ item: game }) => {
            return (
              <GameCard
                onPress={() => {
                  handleOpenGame(game);
                }}
                data={game}
              />
            );
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  );
}
