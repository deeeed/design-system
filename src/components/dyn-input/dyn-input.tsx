import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { MD3Theme, TextInput, useTheme } from 'react-native-paper';
import { Button } from '../button/Button';
import { SelectButtons, SelectOption } from '../select-buttons/select-buttons';

type InputType = 'text' | 'textarea' | 'number' | 'radio' | 'select-button';

export type DynamicType = string | number | SelectOption[] | SelectOption;

export interface DynInputProps {
  data: DynamicType;
  inputType: InputType;
  min?: number;
  max?: number;
  multiSelect?: boolean;
  showSearch?: boolean;
  showFooter?: boolean;
  label?: string;
  numberOfLines?: number;
  onFinish?: (value: DynamicType) => void;
  onCancel?: () => void;
}

const getStyles = (theme: MD3Theme) => {
  return StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      flexGrow: 1,
      backgroundColor: theme.colors.surface,
    },
    footer: {
      borderTopWidth: 2,
      borderTopColor: theme.colors.outline,
      marginBottom: 20,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
    },
    finishButton: {},
    cancelButton: {},
  });
};

export const DynInput = ({
  data,
  min,
  max,
  multiSelect,
  inputType,
  showSearch,
  showFooter = true,
  label,
  numberOfLines,
  onCancel,
  onFinish,
}: DynInputProps) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const [temp, setTemp] = useState(data);

  const handleChange = useCallback(
    (value: DynamicType) => {
      let formatedValue = value;

      if (Array.isArray(value) && value.length > 0 && !multiSelect) {
        formatedValue = value[0] as SelectOption;
      }

      setTemp(value);
      if (!showFooter) {
        onFinish?.(formatedValue);
      }
    },
    [multiSelect, onFinish, showFooter]
  );

  const renderNumber = () => {
    return (
      <View>
        <TextInput
          inputMode="numeric"
          value={temp as string}
          onChangeText={handleChange}
        />
      </View>
    );
  };

  const renderText = () => {
    return (
      <View>
        <TextInput
          multiline={!!(numberOfLines && numberOfLines > 0)}
          numberOfLines={numberOfLines}
          label={label}
          value={temp as string}
          onChangeText={handleChange}
        />
      </View>
    );
  };

  const handleCancel = useCallback(() => {
    setTemp(data); // restore initial value
    onCancel?.();
  }, [data, onCancel]);

  const handleFinish = useCallback(() => {
    console.log(`calling onFinish DynInput ==> temp`, temp);
    onFinish?.(temp);
  }, [onFinish, temp]);

  return (
    <View style={styles.container}>
      {inputType === 'text' && renderText()}
      {inputType === 'number' && renderNumber()}
      {inputType === 'select-button' && (
        <SelectButtons
          // Prevent passing references to the original data
          options={JSON.parse(JSON.stringify(temp)) as SelectOption[]}
          min={min}
          max={max}
          multiSelect={multiSelect}
          showSearch={showSearch}
          onChange={handleChange}
        />
      )}
      {showFooter && (
        <View style={styles.footer}>
          <Button
            style={styles.cancelButton}
            testID={'dyn-input-cancel'}
            onPress={handleCancel}
          >
            Cancel
          </Button>
          <Button
            style={styles.finishButton}
            testID={'dyn-input-finish'}
            mode="contained"
            onPress={handleFinish}
          >
            Done
          </Button>
        </View>
      )}
    </View>
  );
};