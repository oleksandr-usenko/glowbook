// MinuteBottomPicker.tsx
import React from "react";
import {Modal, View, StyleSheet, Platform, SafeAreaView, TouchableWithoutFeedback} from "react-native";
import {Picker} from "@react-native-picker/picker";
import {Button, Portal, Text} from "react-native-paper";

type Props = {
    visible: boolean;
    value: number;                 // 0..60
    onChange: (m: number) => void; // live change
    onConfirm: () => void;         // press Done
    onCancel: () => void;          // tap backdrop or Cancel
    minuteStep?: number;           // optional step (default 1)
    title?: string;
};

export default function UISelect({
                                     visible,
                                     value,
                                     onChange,
                                     onConfirm,
                                     onCancel,
                                     minuteStep = 1,
                                     title = "Select minutes",
                                 }: Props) {
    const items = React.useMemo(
        () => Array.from({length: Math.floor(60 / minuteStep) + 1}, (_, i) => i * minuteStep),
        [minuteStep]
    );

    return (
        <Portal>
            <Modal
                visible={visible}
                transparent
                animationType="slide"
                presentationStyle="overFullScreen"
                statusBarTranslucent
                onRequestClose={onCancel}
            >
                {/* Backdrop closes on tap */}
                <TouchableWithoutFeedback onPress={onCancel}>
                    <View style={styles.backdrop}/>
                </TouchableWithoutFeedback>

                {/* Bottom sheet */}
                <SafeAreaView style={styles.sheet}>
                    <View style={styles.header}>
                        <Button onPress={onCancel}>Cancel</Button>
                        <Text variant="titleMedium">{title}</Text>
                        <Button onPress={onConfirm}>Done</Button>
                    </View>

                    <View style={styles.pickerWrapper}>
                        <Picker
                            selectedValue={value}
                            onValueChange={(val) => onChange(val as number)}
                            style={styles.picker}
                            itemStyle={Platform.OS === "ios" ? styles.itemStyleIOS : undefined}
                        >
                            {items.map((m) => (
                                <Picker.Item key={m} label={`${m}`} value={m}/>
                            ))}
                        </Picker>
                    </View>
                </SafeAreaView>
            </Modal>
        </Portal>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.35)",
    },
    sheet: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        // Stick to bottom
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        // Elevation/Shadow
        ...Platform.select({
            ios: {shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 10, shadowOffset: {width: 0, height: -4}},
            android: {elevation: 12},
        }),
    },
    header: {
        paddingHorizontal: 12,
        paddingTop: 8,
        paddingBottom: 6,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    pickerWrapper: {
        height: 216,     // typical UIPickerView height
        justifyContent: "center",
    },
    picker: {
        width: "100%",
    },
    itemStyleIOS: {
        fontSize: 20,    // wheel row font on iOS
    },
});
