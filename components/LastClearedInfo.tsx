import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppContext } from '@/hooks/useAppContext';
import { useTheme } from '@/hooks/useTheme';

export const LastClearedInfo: React.FC = () => {
  const { lastClearedTimestamp, badgesClearedCount } = useAppContext();
  const theme = useTheme();

  const formattedTimestamp = useMemo(() => {
    if (!lastClearedTimestamp) return 'Never';

    const date = new Date(lastClearedTimestamp);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    let prefix: string;
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      prefix = 'Today';
    } else if (
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear()
    ) {
      prefix = 'Yesterday';
    } else {
      const month = date.toLocaleString('default', { month: 'short' });
      prefix = `${month} ${date.getDate()}`;
    }

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;
    const minutesStr = minutes.toString().padStart(2, '0');

    return `${prefix} at ${hour12}:${minutesStr} ${ampm}`;
  }, [lastClearedTimestamp]);

  return (
    <View style={[styles.container, { backgroundColor: theme.surfaceAlt }]}>
      <Text style={[styles.label, { color: theme.textTertiary }]}>Last cleared:</Text>
      <Text style={[styles.value, { color: theme.text }]}>{formattedTimestamp}</Text>

      {badgesClearedCount > 0 && (
        <View style={[styles.counterContainer, { borderTopColor: theme.border }]}>
          <Text style={[styles.counterLabel, { color: theme.textTertiary }]}>
            You've cleared your notifications
          </Text>
          <Text style={[styles.counterValue, { color: theme.accent }]}>
            {badgesClearedCount} {badgesClearedCount === 1 ? 'time' : 'times'}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 24,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 16,
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 4,
  },
  value: {
    fontSize: 17,
    fontWeight: '600',
  },
  counterContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
  },
  counterLabel: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 4,
  },
  counterValue: {
    fontSize: 17,
    fontWeight: '600',
  },
});
