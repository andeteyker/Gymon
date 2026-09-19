import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { demoWorkout } from "@/data/demoWorkout";

export default function WorkoutScreen() {
 return <SafeAreaView style={styles.page}><View style={styles.content}>
  <Text style={styles.kicker}>TODAY</Text><Text style={styles.title}>{demoWorkout.name}</Text>
  <Text style={styles.meta}>{demoWorkout.exercises.length} exercises · ~{demoWorkout.estimatedMinutes} min</Text>
  {demoWorkout.exercises.map(e=><View key={e.exerciseId} style={styles.card}><Text style={styles.exercise}>{e.name}</Text><Text style={styles.target}>{e.sets} × {e.reps} @ {e.weightKg} kg</Text></View>)}
  <Text style={styles.note}>v0.1: workout confirmation and progression calculation are the next implementation step.</Text>
 </View></SafeAreaView>
}
const styles=StyleSheet.create({page:{flex:1,backgroundColor:"#0B1020"},content:{padding:24},kicker:{color:"#8F9AB7",fontWeight:"800",marginTop:30},title:{color:"#F7F8FC",fontSize:32,fontWeight:"900",marginTop:6},meta:{color:"#AEB8D0",marginTop:6,marginBottom:24},card:{backgroundColor:"#151D34",padding:18,borderRadius:18,marginBottom:12},exercise:{color:"#F7F8FC",fontSize:18,fontWeight:"800"},target:{color:"#AEB8D0",fontSize:16,marginTop:6},note:{color:"#7F8AA6",lineHeight:20,marginTop:16}});
