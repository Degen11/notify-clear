import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CircleAlert as AlertCircle, CircleCheck as CheckCircle2, Info } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';

type InfoCardProps = {
  type: 'info' | 'warning' | 'success';
  title: string;
  description: string;
};

export const InfoCard: React.FC<InfoCardProps> = ({ type, title, description }) => {
  const theme = useTheme();
  const getIconAndColors = () => {
    switch (type) {
      case 'warning':
        return {
          icon: <AlertCircle size={24} color="#FF9500" />,
          backgroundColor: 'rgba(255, 149, 0, 0.1)',
          borderColor: 'rgba(255, 149, 0, 0.3)',
          titleColor: '#FF9500',
        };
      case 'success':
        return {
          icon: <CheckCircle2 size={24} color="#34C759" />,
          backgroundColor: 'rgba(52, 199, 89, 0.1)',
          borderColor: 'rgba(52, 199, 89, 0.3)',
          titleColor: '#34C759',
        };
      case 'info':
      default:
        return {
          icon: <Info size={24} color="#007AFF" />,
          backgroundColor: 'rgba(0, 122, 255, 0.1)',
          borderColor: 'rgba(0, 122, 255, 0.3)',
          titleColor: '#007AFF',
        };
    }
  };

  const { icon, backgroundColor, borderColor, titleColor } = getIconAndColors();

  return (
    <View style={[styles.container, { backgroundColor, borderColor }]}>
      <View style={styles.iconContainer}>{icon}</View>
      <View style={styles.content}>
        <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
        <Text style={[styles.description, { color: theme.textSecondary }]}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginVertical: 8,
  },
  iconContainer: {
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#3C3C43',
    lineHeight: 20,
  },
});