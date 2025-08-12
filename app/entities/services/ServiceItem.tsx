import {Card, Text} from "react-native-paper";
import {Dimensions, Image, View} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import {TService} from "@/app/entities/services/types";
import {HTMLProps} from "react";

type Props = {
    service: TService;
} & HTMLProps<any>

const { width } = Dimensions.get("window");

export const ServiceItem = ({ service }: Props) => {
    return (
        <Card>
            <View style={{ overflow: "hidden", borderTopLeftRadius: 4, borderTopRightRadius: 4 }}>
                <Carousel
                    loop
                    width={width - 32}
                    height={200}
                    data={service.media_urls || []}
                    scrollAnimationDuration={500}
                    vertical={false}
                    onConfigurePanGesture={(gesture) => {
                        'worklet';
                        gesture.activeOffsetX([-10, 10]);
                    }}
                    renderItem={({ item }) => (
                        <Image
                            source={{ uri: item }}
                            style={{
                                height: 200,
                                resizeMode: "cover",
                            }}
                        />
                    )}
                />
            </View>
            <Card.Content>
                <Text>{service.name}</Text>
                {service.description && <Text>{service.description}</Text>}
                <Text>{service.duration}</Text>
                <Text>{service.price}</Text>
            </Card.Content>
        </Card>
    );
}