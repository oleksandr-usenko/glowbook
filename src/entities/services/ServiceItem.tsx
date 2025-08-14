import {Card, Chip, Text} from "react-native-paper";
import {Dimensions, Image, View} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import {TService} from "@/src/entities/services/types";
import {HTMLProps} from "react";

type Props = {
    service: TService;
    onPress: () => void;
} & HTMLProps<any>

const {width} = Dimensions.get("window");

const ServiceItem = ({service, onPress}: Props) => {
    return (
        <Card onPress={onPress}>
            <View style={{overflow: "hidden", borderTopLeftRadius: 4, borderTopRightRadius: 4}}>
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
                    renderItem={({item}) => (
                        <Image
                            source={{uri: item}}
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
                <View style={{flexDirection: "row", flexWrap: "wrap", gap: 8}}>
                    <Chip icon="clock-outline" elevated>{service.duration}</Chip>
                    <Chip elevated>{service.price}</Chip>
                </View>
            </Card.Content>
        </Card>
    );
}

export default ServiceItem;