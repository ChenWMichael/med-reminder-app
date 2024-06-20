import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

const TrackingScreen = () => {
    const route = useRoute();
    const trackingData = route.params?.trackingData || [];

    console.log('Received tracking data:', trackingData);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Tracking Information</Text>
            {trackingData.length === 0 ? (
                <Text style={styles.noDataText}>No medication data available.</Text>
            ) : (
                trackingData.map((entry, index) => (
                    <View key={index} style={styles.trackingItem}>
                        <Text style={styles.trackingText}>Medication: {entry.medication.name}</Text>
                        <Text style={styles.trackingText}>Dosage: {entry.medication.dosage}</Text>
                        <Text style={styles.trackingText}>Time Taken: {entry.time}</Text>
                        <Text style={styles.trackingText}>Instructions: {entry.medication.instructions}</Text>
                    </View>
                ))
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    noDataText: {
        fontSize: 18,
        color: 'gray',
    },
    trackingItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    trackingText: {
        fontSize: 16,
    },
});

export default TrackingScreen;