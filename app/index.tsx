import { SafeAreaView, StyleSheet, Text, View, Pressable } from "react-native";
import { router } from "expo-router";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.hero}>
        <Text style={styles.brand}>GYMON</Text>
        <Text style={styles.tagline}>REAL TRAINING. REAL EVOLUTION.</Text>
        <View style={styles.monsterPlaceholder}><Text style={styles.monster}>VOLTEX</Text><Text style={styles.level}>LV. 1</Text></View>
        <Text style={styles.title}>Your training builds your monster.</Text>
        <Text style={styles.copy}>Complete workouts, develop real fitness stats, unlock moves and evolve along your own path.</Text>
        <Pressable style={styles.button} onPress={() => router.push("/demo")}><Text style={styles.buttonText}>OPEN GYMON DEMO</Text></Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles=StyleSheet.create({
 page:{flex:1,backgroundColor:"#0B1020"},
 hero:{flex:1,padding:28,justifyContent:"center"},
 brand:{fontSize:38,fontWeight:"900",color:"#F7F8FC",letterSpacing:2},
 tagline:{fontSize:12,fontWeight:"700",color:"#9CA8C7",letterSpacing:1.5,marginBottom:40},
 monsterPlaceholder:{height:220,borderRadius:28,backgroundColor:"#151D34",alignItems:"center",justifyContent:"center",marginBottom:30},
 monster:{fontSize:30,fontWeight:"900",color:"#F7F8FC"},level:{marginTop:8,color:"#9CA8C7",fontWeight:"700"},
 title:{fontSize:28,lineHeight:34,fontWeight:"800",color:"#F7F8FC"},
 copy:{fontSize:16,lineHeight:24,color:"#AEB8D0",marginTop:12,marginBottom:28},
 button:{backgroundColor:"#F7F8FC",padding:18,borderRadius:16,alignItems:"center"},
 buttonText:{color:"#0B1020",fontWeight:"900"}
});
