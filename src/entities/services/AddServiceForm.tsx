import UIInput from "@/src/components/UI/UIInput";
import {Button, TextInput} from "react-native-paper";
import {View} from "react-native";
import {useEffect, useRef, useState} from "react";
import {ImagePickerAsset} from "expo-image-picker";
import {CURRENCIES_LIST, TCurrency, TMediaItem, TService} from "@/src/entities/services/types";
import {AddServiceGallery} from "@/src/entities/services/AddServiceGallery";
import {useUpdateMedia} from "@/src/entities/services/queries/useUpdateMedia";
import {useUpdateServiceMediaOrder} from "@/src/entities/services/queries/useUpdateServiceMediaOrder";
import {useCreateService} from "@/src/entities/services/queries/useCreateService";
import {useUpdateService} from "@/src/entities/services/queries/useUpdateService";
import {CurrencySelector} from "@/src/components/CurrencySelector";

type ServiceFormProps = {
    service: TService | undefined;
    activeScreen: "form" | "gallery";
    close: () => void;
}

export type GenericImage = ImagePickerAsset | TMediaItem;

const AddServiceForm = ({service, activeScreen, close}: ServiceFormProps) => {
    const {mutateAsync: uploadImages} = useUpdateMedia();
    const {mutateAsync: updateMediaOrder} = useUpdateServiceMediaOrder();
    const {mutateAsync: createService} = useCreateService();
    const {mutateAsync: updateService} = useUpdateService();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState<number | null>(null);
    const [duration, setDuration] = useState<number | null>(null);
    const [images, setImages] = useState<GenericImage[]>([]);
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
            service.media && setImages([...service.media])
        }
    }, [service])

    const openCurrencyMenu = () => {
        if (iconRef.current) {
            iconRef.current.measureInWindow((x, y) => {
                setAnchorPosition({x, y});
                setCurrencyPickerOpen(true);
            });
        }
    };

    const handleCurrencySelect = (c: TCurrency) => {
        setCurrency(c);
        setCurrencyPickerOpen(false);
    }

    const handleImages = async (imgs: GenericImage[]) => {
        if (service) {
            await uploadImages({id: service.id, images: imgs});
        }
        setImages((old) => [...old, ...imgs])
    }

    const handleOrder = (imgs: GenericImage[]) => {
        setImages(imgs);
        if (service) {
            const normalizedMedia: TMediaItem[] = imgs.map((m) => ({
                uri: m.uri,
                mimeType: m.mimeType ?? "application/octet-stream",
                fileName: m.fileName ?? "unknown",
                public_id: "public_id" in m ? m.public_id : "",
            }));
            updateMediaOrder({id: service.id, media: normalizedMedia});
        }
    }

    const onSave = async () => {
        const payload = {
            name,
            description,
            price,
            currency: currency.value,
            duration,
            images: images as ImagePickerAsset[]
        };
        if (!payload.price || !payload.duration) return;

        if (service) {
            await updateService({id: service.id, payload});
        } else {
            await createService(payload);
            close();
        }
    };

    return (
        <View>
            {activeScreen === "form" && <View className="flex flex-col gap-2">
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
                  left={<TextInput.Icon icon={currency.icon} onPress={openCurrencyMenu} forceTextInputFocus={false}/>}
                />
              </View>
              <UIInput
                label="Duration"
                keyboardType={'numeric'}
                value={duration !== null ? duration.toString() : ""}
                onChangeText={text => setDuration(text === "" ? null : Number(text))}
                left={<TextInput.Icon icon="clock-outline" forceTextInputFocus={false} onPress={undefined}/>}
              />
              <Button icon="check" style={{width: "100%"}}
                      mode="contained"
                      onPress={onSave}>Save</Button>
            </View>}
            {activeScreen === "gallery" &&
              <AddServiceGallery
                images={images}
                setImages={handleImages}
                setOrder={handleOrder}
              />}
        </View>
    )
};

export default AddServiceForm;