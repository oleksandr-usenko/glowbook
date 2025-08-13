import UIInput from "@/src/components/UI/UIInput";
import {Button, Menu, TextInput, useTheme} from "react-native-paper";
import {View} from "react-native";
import {forwardRef, useImperativeHandle, useRef, useState} from "react";
import {ImagePickerAsset} from "expo-image-picker";
import * as ImagePicker from "expo-image-picker";
import {TCurrency} from "@/src/entities/services/types";

type DialogContentRef = {
    getValues: () => {
        name: string;
        description: string;
        price: string;
        duration: string;
        images: ImagePickerAsset[];
    };
};

type CurrencySelectorProps = {
    open: boolean;
    currency: TCurrency;
    onSelect: (value: TCurrency) => void;
    anchorPosition: { x: number; y: number } | null;
}

const CurrencySelector = ({open, currency, onSelect, anchorPosition}: CurrencySelectorProps) => {
    const supportedCurrencies: TCurrency[] = [{icon: "currency-usd", value: "USD"}, {
        icon: "currency-eur",
        value: "EUR"
    }, {icon: "currency-uah", value: "UAH"}];
    const theme = useTheme();

    const handleSelect = (value: TCurrency) => {
        onSelect(value);
    }
    return (
        <View>
            <Menu visible={open} anchorPosition="top" anchor={anchorPosition} onDismiss={() => onSelect(currency)}>
                {supportedCurrencies.map(c =>
                    <Menu.Item
                        key={c.value}
                        leadingIcon={c.icon}
                        onPress={() => handleSelect(c)}
                        title={c.value}
                        style={{
                            backgroundColor: c.value === currency.value ? theme.colors.primary : theme.colors.primaryContainer
                        }}
                    />)
                }
            </Menu>
        </View>
    )
}

const AddServiceForm = forwardRef<DialogContentRef>((_, ref) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [duration, setDuration] = useState("");
    const [images, setImages] = useState<ImagePickerAsset[]>([]);
    const [currency, setCurrency] = useState<TCurrency>({icon: "currency-usd", value: "USD"});

    const [currencyPickerOpen, setCurrencyPickerOpen] = useState(false);
    const [anchorPosition, setAnchorPosition] = useState<{ x: number; y: number } | null>(null);
    const iconRef = useRef<View>(null);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsMultipleSelection: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImages(result.assets)
        }
        return null;
    }

    const openCurrencyMenu = () => {
        if (iconRef.current) {
            iconRef.current.measureInWindow((x, y, width, height) => {
                setAnchorPosition({x, y}); // Position just below the icon
                setCurrencyPickerOpen(true);
            });
        }
    };

    const handleCurrencySelect = (c: TCurrency) => {
        setCurrency(c);
        setCurrencyPickerOpen(false);
    }

    useImperativeHandle(ref, () => ({
        getValues: () => ({
            name,
            description,
            price,
            duration,
            images
        })
    }))

    return (
        <View className="flex flex-col gap-1">
            <UIInput label="Title" value={name} onChangeText={setName}/>
            <UIInput multiline label="Description" value={description} onChangeText={setDescription}/>
            <CurrencySelector anchorPosition={anchorPosition} open={currencyPickerOpen} currency={currency}
                              onSelect={handleCurrencySelect}/>
            <View ref={iconRef}>
                <UIInput
                    label="Price"
                    keyboardType={'numeric'}
                    value={price}
                    onChangeText={setPrice}
                    left={<TextInput.Icon icon={currency.icon} onPress={openCurrencyMenu}/>}
                />
            </View>
            <UIInput
                label="Duration"
                keyboardType={'numeric'}
                value={duration}
                onChangeText={setDuration}
                left={<TextInput.Icon icon="clock-outline" forceTextInputFocus={false} onPress={undefined}/>}
            />
            <Button onPress={pickImage}>Add images</Button>
        </View>
    )
})
AddServiceForm.displayName = "AddServiceForm";

export default AddServiceForm;