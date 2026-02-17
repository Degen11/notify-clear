import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Switch,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import { ChevronRight, Bell, Moon, Smartphone, Vibrate, Clock } from 'lucide-react-native';
import { useAppContext, Settings } from '@/hooks/useAppContext';
import { useTheme } from '@/hooks/useTheme';
import { InfoCard } from '@/components/InfoCard';

type SettingItemProps = {
  icon: React.ReactNode;
  title: string;
  description?: string;
  toggle?: boolean;
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  onPress?: () => void;
  disabled?: boolean;
};

export default function SettingsScreen() {
  const { badgesClearedCount, settings, updateSetting, clearHistory } = useAppContext();
  const theme = useTheme();

  const handleClearHistory = () => {
    if (settings.showConfirmation) {
      Alert.alert(
        'Clear History',
        'This will reset your notification clearing count and timestamp. Continue?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Clear',
            style: 'destructive',
            onPress: async () => {
              try {
                await clearHistory();
              } catch {
                Alert.alert('Error', 'Failed to clear history. Please try again.');
              }
            },
          },
        ]
      );
    } else {
      clearHistory().catch(() => {
        Alert.alert('Error', 'Failed to clear history. Please try again.');
      });
    }
  };

  const SettingItem: React.FC<SettingItemProps> = ({
    icon,
    title,
    description,
    toggle,
    value,
    onValueChange,
    onPress,
    disabled = false,
  }) => (
    <TouchableOpacity
      style={[
        styles.settingItem,
        { backgroundColor: theme.surface },
        disabled && styles.settingItemDisabled,
      ]}
      onPress={onPress}
      disabled={!onPress || disabled}
    >
      <View style={[styles.settingIconContainer, { backgroundColor: theme.iconBg }]}>
        {icon}
      </View>
      <View style={styles.settingContent}>
        <Text style={[styles.settingTitle, { color: theme.text }]}>{title}</Text>
        {description && (
          <Text style={[styles.settingDescription, { color: theme.textTertiary }]}>
            {description}
          </Text>
        )}
      </View>
      {toggle ? (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: theme.switchTrack, true: theme.success }}
          thumbColor={Platform.OS === 'ios' ? '#FFFFFF' : value ? '#FFFFFF' : '#F4F3F4'}
          ios_backgroundColor={theme.switchTrack}
          disabled={disabled}
        />
      ) : onPress && !disabled ? (
        <ChevronRight size={20} color={theme.textTertiary} />
      ) : null}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>Settings</Text>
          <Text style={[styles.subtitle, { color: theme.textTertiary }]}>
            Customize your Badge Buster experience
          </Text>
        </View>

        <View style={styles.settingSection}>
          <Text style={[styles.sectionTitle, { color: theme.accent }]}>Appearance</Text>
          <SettingItem
            icon={<Moon size={22} color={theme.accent} />}
            title="Dark Mode"
            description="Use dark theme throughout the app"
            toggle
            value={settings.darkMode}
            onValueChange={(v) => updateSetting('darkMode', v)}
          />
        </View>

        <View style={styles.settingSection}>
          <Text style={[styles.sectionTitle, { color: theme.accent }]}>Behavior</Text>
          <SettingItem
            icon={<Smartphone size={22} color={theme.warning} />}
            title="Clear on App Launch"
            description="Automatically clear badges when app opens"
            toggle
            value={settings.clearOnLaunch}
            onValueChange={(v) => updateSetting('clearOnLaunch', v)}
          />
          <SettingItem
            icon={<Bell size={22} color={theme.danger} />}
            title="Show Confirmation"
            description="Ask before destructive actions"
            toggle
            value={settings.showConfirmation}
            onValueChange={(v) => updateSetting('showConfirmation', v)}
          />
          <SettingItem
            icon={<Vibrate size={22} color={theme.purple} />}
            title="Haptic Feedback"
            description="Vibrate when clearing notifications"
            toggle
            value={settings.hapticFeedback}
            onValueChange={(v) => updateSetting('hapticFeedback', v)}
            disabled={Platform.OS === 'web'}
          />
        </View>

        <View style={styles.settingSection}>
          <Text style={[styles.sectionTitle, { color: theme.accent }]}>Data</Text>
          <SettingItem
            icon={<Clock size={22} color={theme.success} />}
            title="Clear History"
            description={`Reset clearing history (${badgesClearedCount} ${badgesClearedCount === 1 ? 'entry' : 'entries'})`}
            onPress={handleClearHistory}
          />
        </View>

        <View style={styles.settingSection}>
          <InfoCard
            type="info"
            title="About Badge Buster"
            description="Version 1.0.0"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  header: {
    marginTop: 20,
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  settingSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 8,
    alignItems: 'center',
  },
  settingItemDisabled: {
    opacity: 0.5,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  settingDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginTop: 2,
  },
});
