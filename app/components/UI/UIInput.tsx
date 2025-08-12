import React, { forwardRef } from 'react';
import { View, Text, TextInput as RNTextInput } from 'react-native';
import {TextInput, TextInputProps} from 'react-native-paper';

type UIInputProps = {
    helperText?: string;
    errorMessage?: string | null;
} & TextInputProps;

export const UIInput = forwardRef<RNTextInput, UIInputProps>(
    ({ errorMessage, helperText, style, ...rest }, ref) => {
        const isError = !!errorMessage || rest.error;

        return (
            <View>
                <TextInput
                    mode="outlined"
                    ref={ref}
                    error={isError}
                    {...rest}
                />
                {(helperText || errorMessage) && (
                    <Text>
                        {errorMessage ?? helperText}
                    </Text>
                )}
            </View>
        );
    }
);

UIInput.displayName = 'UIInput';

