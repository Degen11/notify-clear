import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function InfoScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Badge Buster</Text>

      <Text style={styles.lede}>
        Badge Buster is a UX concept exploring the idea of clearing notification
        badges and reducing interface noise.
      </Text>

      <Card title="How It Works">
        <Text style={styles.paragraph}>
          Badge Buster is built around a simple idea: clearing every
          notification badge across your phone.
        </Text>

        <Separator />

        <Text style={styles.paragraph}>
          In practice, modern mobile operating systems prevent apps from
          modifying notifications or badges belonging to other apps.
        </Text>
      </Card>

      <Card title="What It Won’t Do">
        <Text style={styles.paragraph}>
          Mobile operating systems sandbox apps for security and privacy.
        </Text>

        <Separator />

        <Text style={styles.paragraph}>
          This means Badge Buster cannot reset badges or notifications from
          other apps like Messages, WhatsApp, Instagram, or Mail.
        </Text>

        <Separator />

        <Text style={styles.paragraph}>
          If badges persist, they must be cleared directly within those apps or
          adjusted through your device’s notification settings.
        </Text>
      </Card>

      <AboutBubble>
        <Text style={styles.bubbleTitle}>About</Text>

        <Text style={styles.bubbleText}>
          Badge Buster is a UX concept exploring notification reset, attention
          management, and digital decluttering.
        </Text>

        <Separator light />

        <Text style={styles.bubbleText}>
          While platform restrictions prevent global badge control, the project
          reflects a common user frustration: persistent interface noise.
        </Text>
      </AboutBubble>
    </ScrollView>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      {children}
    </View>
  );
}

function AboutBubble({ children }: { children: React.ReactNode }) {
  return <View style={styles.bubble}>{children}</View>;
}

function Separator({ light = false }: { light?: boolean }) {
  return (
    <View
      style={[
        styles.separator,
        light && styles.separatorLight,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 50,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 6,
  },

  lede: {
    fontSize: 15,
    lineHeight: 22,
    opacity: 0.75,
    marginBottom: 24,
  },

  /* Glass / Frosted Card */

  card: {
    backgroundColor: "rgba(255,255,255,0.06)",  // glass effect 😏
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 12,
  },

  paragraph: {
    fontSize: 15,
    lineHeight: 22,
    opacity: 0.9,
    marginVertical: 10,
  },

  separator: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.08)",  // subtle divider
    marginVertical: 6,
  },

  separatorLight: {
    backgroundColor: "rgba(255,255,255,0.25)",  // for bubble
  },

  /* Softer Blue Bubble */

  bubble: {
    marginTop: 6,
    backgroundColor: "#2F6FED",   // softer / premium blue ✅
    borderRadius: 22,
    padding: 20,
  },

  bubbleTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "white",
    marginBottom: 12,
  },

  bubbleText: {
    fontSize: 15,
    lineHeight: 22,
    color: "white",
    opacity: 0.95,
    marginVertical: 6,
  },
});
