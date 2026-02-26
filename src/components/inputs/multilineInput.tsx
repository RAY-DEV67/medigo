import { TextInput } from "react-native";
import useTheme from "../../hooks/useThemes";

interface InputProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  disabled?: boolean;
}

const MultilineInput: React.FC<InputProps> = ({
  placeholder,
  value,
  onChangeText,
  disabled = false,
}) => {
  const { colors } = useTheme();
  return (
    <TextInput
      placeholderTextColor={colors.subTitleText}
      style={[
        {
          borderColor: colors.stroke,
          color: colors.titleText,
          backgroundColor: colors.surfacePrimary,
          borderWidth: 1,
          height: 107,
          textAlignVertical: "top",
          paddingVertical: 10,
          paddingHorizontal: 12,
          borderRadius: 8,
        },
      ]}
      placeholder={placeholder}
      multiline
      value={value}
      onChangeText={onChangeText}
      editable={!disabled}
    />
  );
};

export default MultilineInput;
