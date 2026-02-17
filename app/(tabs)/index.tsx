import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { NotificationIllustration } from '@/components/NotificationIllustration';
import { AnimatedButton } from '@/components/AnimatedButton';
import { LastClearedInfo } from '@/components/LastClearedInfo';
import { useAppContext } from '@/hooks/useAppContext';
import { useTheme } from '@/hooks/useTheme';
import { InfoCard } from '@/components/InfoCard';

export default function HomeScreen() {
  const { clearNotifications, isClearing } = useAppContext();
  const theme = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>Badge Buster</Text>
          <Text style={[styles.subtitle, { color: theme.textTertiary }]}>
            A UI concept for clearing red-dot badges
          </Text>
        </View>

        <View style={styles.illustrationContainer}>
          <NotificationIllustration isClearing={isClearing} />
        </View>

        <View style={styles.infoContainer}>
          <LastClearedInfo />
        </View>

        <View style={styles.buttonContainer}>
          <AnimatedButton
            title={isClearing ? 'Clearing...' : 'Clear Badges'}
            onPress={clearNotifications}
            isLoading={isClearing}
            size="large"
            style={styles.button}
            textStyle={styles.buttonText}
          />
        </View>

        <View style={styles.noteContainer}>
          <InfoCard
            type="info"
            title="How it works"
            description="Badge Buster is a concept demo. iOS/Android don’t allow one app to clear other apps’ badges, but this shows the UX for a one-tap “fresh start”."
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
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    textAlign: 'center',
  },
  illustrationContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  infoContainer: {
    marginBottom: 24,
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  button: {
    width: '80%',
  },
  buttonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
  },
  noteContainer: {
    marginBottom: 24,
  },
});
