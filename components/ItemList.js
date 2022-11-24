import { View, Text, Switch, StyleSheet } from 'react-native'
import React from 'react';
import '../global';


const ItemList = ({ inventory, onValueChange, type }) => {
    return (
        <View>
            {inventory.map((item) => {
                if (item.ammount >= 1 || item.inOrder) {
                    return (
                        <View style={styles.itemContainer} key={item.text}>
                            <Text style={styles.itemText}>{item.text}</Text>
                            <Switch
                                value={item.inOrder}
                                onValueChange={(value) => onValueChange(value, item, type)}
                                trackColor={{ false: GREY, true: GOLDEN_ORANGE }}
                                ios_backgroundColor = {GREY}
                                thumbColor={'white'} />
                        </View>
                    )
                }
                else {
                    return
                }
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        //borderColor: '#ea00ff',
        //borderWidth: 2,
        marginBottom: 4,
        padding: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        borderBottomColor: '#B8B8B8',
        borderBottomWidth: 0.4,
    },
    itemText: {
        margin: 4,
        padding: 3,
        fontSize: 16,
        fontWeight: '300'
    },
})

export default ItemList