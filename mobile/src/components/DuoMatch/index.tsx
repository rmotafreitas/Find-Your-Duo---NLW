import { useState } from "react";
import {
  Text,
  View,
  Modal,
  ModalProps,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { CheckCircle } from "phosphor-react-native";
import * as Clipboard from "expo-clipboard";

import { styles } from "./styles";
import { THEME } from "../../theme";
import { Heading } from "../Heading";

interface Props extends ModalProps {
  discord: string;
  handleClose: () => void;
}

export function DuoMatch({ discord, handleClose, ...rest }: Props) {
  const [isCopying, setIsCopying] = useState<boolean>(false);

  async function handleCopyDcUserToClipboard() {
    setIsCopying(true);
    await Clipboard.setStringAsync(discord);
    Alert.alert(
      "Copied to clipboard",
      "User copied to clipboard to use in discord!"
    );
    setIsCopying(false);
  }

  return (
    <Modal animationType="fade" statusBarTranslucent transparent {...rest}>
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity onPress={handleClose} style={styles.closeIcon}>
            <MaterialIcons
              name="close"
              size={20}
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity>
          <CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight="bold" />
          <Heading
            style={{
              alignItems: "center",
              marginTop: 24,
            }}
            title="Let's play!"
            subtitle="Now you can start playing"
          />

          <Text style={styles.label}>Add the discord</Text>
          <TouchableOpacity
            onPress={handleCopyDcUserToClipboard}
            disabled={isCopying}
            style={styles.discordBtn}
          >
            <Text style={styles.discord}>
              {isCopying ? (
                <ActivityIndicator color={THEME.COLORS.PRIMARY} />
              ) : (
                discord
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
