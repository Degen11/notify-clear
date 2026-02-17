import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { X } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';

const GRID_ROWS = 3;
const APPS_PER_ROW = 4;
const DOCK_APPS = 4;

type AppIconProps = {
  badgeStyle: ReturnType<typeof useAnimatedStyle>;
  appColor: string;
};

const AppIcon: React.FC<AppIconProps> = ({ badgeStyle, appColor }) => (
  <View style={[styles.app, { backgroundColor: appColor }]}>
    <Animated.View style={[styles.badge, badgeStyle]}>
      <X size={8} color="#FFFFFF" strokeWidth={3} />
    </Animated.View>
  </View>
);

export const NotificationIllustration: React.FC<{ isClearing: boolean }> = ({
  isClearing,
}) => {
  const theme = useTheme();
  const scale = useSharedValue(1);
  const badgeOpacity = useSharedValue(1);
  const badgeScale = useSharedValue(1);

  useEffect(() => {
    if (isClearing) {
      badgeScale.value = withSequence(
        withTiming(1.2, { duration: 200, easing: Easing.out(Easing.cubic) }),
        withTiming(0, { duration: 300, easing: Easing.in(Easing.cubic) })
      );
      badgeOpacity.value = withTiming(0, { duration: 500 });
      scale.value = withSequence(
        withTiming(1.05, { duration: 100 }),
        withTiming(0.98, { duration: 100 }),
        withTiming(1.02, { duration: 100 }),
        withTiming(1, { duration: 100 })
      );
    } else {
      badgeScale.value = withDelay(500, withTiming(1, { duration: 300 }));
      badgeOpacity.value = withDelay(500, withTiming(1, { duration: 300 }));
    }
  }, [isClearing]);

  const phoneStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const badgeStyle = useAnimatedStyle(() => ({
    opacity: badgeOpacity.value,
    transform: [{ scale: badgeScale.value }],
  }));

  const renderRow = (count: number, key: string) => (
    <View style={styles.appRow} key={key}>
      {Array.from({ length: count }, (_, i) => (
        <AppIcon key={`${key}-${i}`} badgeStyle={badgeStyle} appColor={theme.appIcon} />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.phone, { backgroundColor: theme.phoneBody }, phoneStyle]}>
        <View style={[styles.screen, { backgroundColor: theme.phoneScreen }]}>
          <View style={styles.appGrid}>
            {Array.from({ length: GRID_ROWS }, (_, i) =>
              renderRow(APPS_PER_ROW, `row-${i}`)
            )}
          </View>
          <View style={[styles.dock, { backgroundColor: theme.dock }]}>
            {Array.from({ length: DOCK_APPS }, (_, i) => (
              <AppIcon key={`dock-${i}`} badgeStyle={badgeStyle} appColor={theme.appIcon} />
            ))}
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  phone: {
    width: 180,
    height: 360,
    borderRadius: 36,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  screen: {
    flex: 1,
    borderRadius: 24,
    overflow: 'hidden',
    paddingVertical: 20,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  appGrid: {
    flex: 1,
    marginBottom: 20,
  },
  appRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  app: {
    width: 32,
    height: 32,
    borderRadius: 8,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FF3B30',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  dock: {
    height: 60,
    borderRadius: 16,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
