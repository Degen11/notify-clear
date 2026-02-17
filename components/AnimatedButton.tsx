import React, { useEffect } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Platform,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { useAppContext } from '@/hooks/useAppContext';

type AnimatedButtonProps = {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  loadingText?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'outline';
};

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

function getBackgroundColor(variant: string, isDisabled: boolean): string {
  if (isDisabled) return '#E5E5EA';
  switch (variant) {
    case 'primary':
      return '#007AFF';
    case 'secondary':
      return '#FF3B30';
    case 'outline':
      return 'transparent';
    default:
      return '#007AFF';
  }
}

function getTextColor(variant: string, isDisabled: boolean): string {
  if (isDisabled) return '#8E8E93';
  switch (variant) {
    case 'outline':
      return '#007AFF';
    default:
      return '#FFFFFF';
  }
}

function getSizeStyles(size: string): ViewStyle {
  switch (size) {
    case 'small':
      return { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 16 };
    case 'large':
      return { paddingVertical: 16, paddingHorizontal: 32, borderRadius: 32 };
    default:
      return { paddingVertical: 12, paddingHorizontal: 24, borderRadius: 24 };
  }
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  title,
  onPress,
  isLoading = false,
  disabled = false,
  style,
  textStyle,
  loadingText = 'Processing...',
  size = 'medium',
  variant = 'primary',
}) => {
  const { settings } = useAppContext();
  const scale = useSharedValue(1);
  const backgroundColor = useSharedValue(getBackgroundColor(variant, false));
  const textColor = useSharedValue(getTextColor(variant, false));

  const handlePress = () => {
    if (Platform.OS !== 'web' && settings.hapticFeedback) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    scale.value = withSpring(0.95, { mass: 0.5, damping: 8 }, () => {
      scale.value = withSpring(1, { mass: 0.5, damping: 8 }, () => {
        runOnJS(onPress)();
      });
    });
  };

  useEffect(() => {
    backgroundColor.value = withTiming(getBackgroundColor(variant, disabled), { duration: 300 });
    textColor.value = withTiming(getTextColor(variant, disabled), { duration: 300 });
  }, [disabled, variant]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    backgroundColor: backgroundColor.value,
    borderColor: variant === 'outline' ? '#007AFF' : 'transparent',
    borderWidth: variant === 'outline' ? 2 : 0,
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    color: textColor.value,
  }));

  const sizeStyles = getSizeStyles(size);

  return (
    <AnimatedTouchable
      onPress={handlePress}
      disabled={isLoading || disabled}
      style={[styles.button, sizeStyles, animatedStyle, style]}
    >
      <Animated.Text
        style={[
          styles.text,
          textAnimatedStyle,
          size === 'small' && { fontSize: 14 },
          size === 'large' && { fontSize: 18 },
          textStyle,
        ]}
      >
        {isLoading ? loadingText : title}
      </Animated.Text>
    </AnimatedTouchable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});
