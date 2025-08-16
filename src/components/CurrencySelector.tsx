import {TCurrency} from "@/src/entities/services/types";
import {View} from "react-native";
import {Menu, useTheme} from "react-native-paper";

type CurrencySelectorProps = {
    open: boolean;
    currency: TCurrency;
    onSelect: (value: TCurrency) => void;
    anchorPosition: { x: number; y: number } | null;
}

export const CurrencySelector = ({open, currency, onSelect, anchorPosition}: CurrencySelectorProps) => {
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
                            backgroundColor: c.value === currency.value ? theme.colors.primaryContainer : "#ece8f2"
                        }}
                    />)
                }
            </Menu>
        </View>
    )
}