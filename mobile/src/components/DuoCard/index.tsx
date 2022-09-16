import { TouchableOpacity, View, Text } from "react-native";
import { THEME } from "../../theme";
import { DuoInfo } from "../DuoInfo";
import { GameController } from "phosphor-react-native";

import { styles } from "./styles";

export interface DuoCardProps {
  id: number;
  days: number[];
  hoursEnd: string;
  hoursStart: string;
  name: string;
  useVoiceChannel: boolean;
  yearsOfExperience: number;
}

interface Props {
  data: DuoCardProps;
  onConnect: () => void;
}

export function DuoCard({ data, onConnect }: Props) {
  return (
    <View style={styles.container}>
      <DuoInfo label="Name" value={data.name}></DuoInfo>
      <DuoInfo
        label="Time playing"
        value={`${data.yearsOfExperience} years`}
      ></DuoInfo>
      <DuoInfo
        label="Availability"
        value={`${data.days.length} days \u2022 ${data.hoursStart} - ${data.hoursEnd}`}
      ></DuoInfo>
      <DuoInfo
        label="Use VoiceChat?"
        value={data.useVoiceChannel ? "Yes" : "No"}
        colorValue={
          data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT
        }
      ></DuoInfo>
      <TouchableOpacity onPress={onConnect} style={styles.button}>
        <GameController color={THEME.COLORS.TEXT} size={20} />
        <Text style={styles.buttonTitle}> Connect</Text>
      </TouchableOpacity>
    </View>
  );
}
