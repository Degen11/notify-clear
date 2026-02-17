import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { InfoCard } from '@/components/InfoCard';
import { useTheme } from '@/hooks/useTheme';

export default function InfoScreen() {
  const theme = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>How It Works</Text>
          <Text style={[styles.subtitle, { color: theme.textTertiary }]}>
            A concept, plus the real-world limitations
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>What happens when you tap "Clear"</Text>
          <Text style={[styles.paragraph, { color: theme.textSecondary }]}>
            Badge Buster is built around a simple idea: clearing every notification badge across your phone.
          </Text>
          <Text style={[styles.paragraph, { color: theme.textSecondary }]}>
            In practice, modern mobile operating systems prevent apps from modifying notifications or badges belonging to other apps.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>What it won’t do</Text>
          <Text style={[styles.paragraph, { color: theme.textSecondary }]}>
            Mobile operating systems sandbox apps for security and privacy.
          </Text>
          <Text style={[styles.paragraph, { color: theme.textSecondary }]}>
            This means Badge Buster cannot reset badges or notifications from other apps like Messages, WhatsApp, Instagram, or Mail.
          </Text>
          <Text style={[styles.paragraph, { color: theme.textSecondary }]}>
            If badges persist, they must be cleared directly within those apps or adjusted through your device’s notification settings.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>About Badge Buster</Text>
          <Text style={[styles.paragraph, { color: theme.textSecondary }]}>
            Badge Buster is a UX concept exploring notification reset, attention management, and digital decluttering.
          </Text>
          <Text style={[styles.paragraph, { color: theme.textSecondary }]}>
            While platform restrictions prevent global badge control, the project reflects a common user frustration: persistent interface noise.
          </Text>
        </View>

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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    marginBottom: 12,
  },
  paragraph: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
});
