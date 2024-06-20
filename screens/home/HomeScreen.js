import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute, useIsFocused, useNavigation } from '@react-navigation/native';
import { CheckBox } from 'react-native-elements';

const HomeScreen = () => {
    const route = useRoute();
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const [medications, setMedications] = useState(route.params?.medications || []);
    const [takenMedications, setTakenMedications] = useState({});
    const [trackingData, setTrackingData] = useState([]);

    useEffect(() => {
        console.log("HomeScreen mounted or focused");
        const meds = route.params?.medications || [];
        console.log("Medications received in HomeScreen:", meds);
        setMedications(meds);
    }, [route.params?.medications, isFocused]);

    const parseDate = (dateString) => {
        const [month, day, year] = dateString.split('/');
        return new Date(year, month - 1, day);
    };

    const shouldTakeToday = (medication) => {
        const today = new Date().toISOString().split('T')[0];
        const startDate = parseDate(medication.startDate);
        const endDate = parseDate(medication.endDate);
        const todayDate = new Date(today);

        // console.log(`Medication: ${medication.name}`);
        // console.log(`Today's Date: ${todayDate}`);
        // console.log(`Start Date: ${startDate}`);
        // console.log(`End Date: ${endDate}`);

        if (todayDate >= startDate && todayDate <= endDate) {
            const frequency = parseInt(medication.frequency);
            const daysSinceStart = Math.floor((todayDate - startDate) / (1000 * 60 * 60 * 24));
            // console.log(`Frequency: ${frequency}`);
            // console.log(`Days Since Start: ${daysSinceStart}`);
            // console.log(`Should Take Today: ${daysSinceStart % frequency === 0}`);
            return daysSinceStart % frequency === 0;
        }
        return false;
    };

    const handleCheckboxClick = (medication) => {
        const currentTime = new Date().toLocaleTimeString();
        const updatedTakenMedications = { ...takenMedications };

        if (updatedTakenMedications[medication.name]) {
            delete updatedTakenMedications[medication.name];
            const newTrackingData = trackingData.filter(entry => entry.medication.name !== medication.name);
            setTrackingData(newTrackingData);
        } else {
            updatedTakenMedications[medication.name] = currentTime;
            const newTrackingData = [{ medication, time: currentTime }, ...trackingData];
            setTrackingData(newTrackingData);
        }

        setTakenMedications(updatedTakenMedications);
        console.log('Updated taken medications:', updatedTakenMedications);
        console.log('New tracking data:', trackingData);
        navigation.navigate('Track Progress', { trackingData });
    };

    const sortedMedications = [...medications].sort((a, b) => {
        const aShouldTakeToday = shouldTakeToday(a);
        const bShouldTakeToday = shouldTakeToday(b);
        return bShouldTakeToday - aShouldTakeToday;
    });

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Medication Information</Text>
            {sortedMedications.map((medication, index) => {
                const isToday = shouldTakeToday(medication);
                return (
                    <View key={index} style={[styles.medicationItem, { backgroundColor: isToday ? 'green' : 'red' }]}>
                        <View style={styles.medicationDetails}>
                            <Text style={styles.medicationName}>{medication.name}</Text>
                            <Text style={styles.medicationText}>Dosage: {medication.dosage}</Text>
                            <Text style={styles.medicationText}>Time: {medication.time}</Text>
                            <Text style={styles.medicationText}>Instructions: {medication.instructions}</Text>
                        </View>
                        {isToday && (
                            <CheckBox
                                containerStyle={styles.checkbox}
                                checked={!!takenMedications[medication.name]}
                                onPress={() => handleCheckboxClick(medication)}
                            />
                        )}
                    </View>
                );
            })}
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
    medicationItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'green',
        marginBottom: 10,
        borderRadius: 10,
    },
    medicationDetails: {
        flex: 1,
    },
    medicationName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    medicationText: {
        fontSize: 16,
        color: 'white',
    },
    checkbox: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
    },
});

export default HomeScreen;