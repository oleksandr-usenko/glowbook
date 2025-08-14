import UIInput from "@/src/components/UI/UIInput";
import {Button, Menu, TextInput, useTheme} from "react-native-paper";
import {Image, View} from "react-native";
import {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import {ImagePickerAsset} from "expo-image-picker";
import * as ImagePicker from "expo-image-picker";
import {CURRENCIES_LIST, TCurrency, TService} from "@/src/entities/services/types";

type DialogContentRef = {
    getValues: () => {
        name: string;
        description: string;
        price: number | null;
        currency: "UAH" | "EUR" | "USD";
        duration: number | null;
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

type ServiceFormProps = {
    service: TService | undefined;
}

const AddServiceForm = forwardRef<DialogContentRef, ServiceFormProps>(({service}, ref) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState<number | null>(null);
    const [duration, setDuration] = useState<number | null>(null);
    const [images, setImages] = useState<ImagePickerAsset[]>([]);
    const [imagesPreview, setImagesPreview] = useState<string[]>([])
    const [currency, setCurrency] = useState<TCurrency>({icon: "currency-usd", value: "USD"});

    const [currencyPickerOpen, setCurrencyPickerOpen] = useState(false);
    const [anchorPosition, setAnchorPosition] = useState<{ x: number; y: number } | null>(null);
    const iconRef = useRef<View>(null);

    useEffect(() => {
        if (service) {
            setName(service.name);
            setDescription(service.description || "");
            setPrice(service.price);
            setDuration(service.duration);
            const currencyMatch = CURRENCIES_LIST.find(c => c.value === service.currency)
            currencyMatch && setCurrency(currencyMatch);
            service.media_urls && setImagesPreview([...service.media_urls])
        }
    }, [service])

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
            images,
            currency: currency.value,
        })
    }))

    return (
        <View className="flex flex-col gap-1">
            <UIInput label="Title" value={name} onChangeText={setName}/>
            <UIInput multiline label="Description" value={description} onChangeText={setDescription}/>
            <CurrencySelector
                anchorPosition={anchorPosition}
                open={currencyPickerOpen}
                currency={currency}
                onSelect={handleCurrencySelect}
            />
            <View ref={iconRef}>
                <UIInput
                    label="Price"
                    keyboardType={'numeric'}
                    value={price !== null ? price.toString() : ""}
                    onChangeText={text => setPrice(text === "" ? null : Number(text))}
                    left={<TextInput.Icon icon={currency.icon} onPress={openCurrencyMenu}/>}
                />
            </View>
            <UIInput
                label="Duration"
                keyboardType={'numeric'}
                value={duration !== null ? duration.toString() : ""}
                onChangeText={text => setDuration(text === "" ? null : Number(text))}
                left={<TextInput.Icon icon="clock-outline" forceTextInputFocus={false} onPress={undefined}/>}
            />
            {imagesPreview.map(img => <Image width={64} key={img} src={img}/>)}
            <Button onPress={pickImage}>Add images</Button>
        </View>
    )
})
AddServiceForm.displayName = "AddServiceForm";

export default AddServiceForm;